import fetch from 'isomorphic-unfetch'
import { message } from 'antd'
import queryString from 'query-string'
import localStorage from 'localStorage'

const dns = {
  API_ROOT: '',
  API_ROOT_LOCAL: 'http://localhost:80',
  REMOTE_HOSTS: ['http://server.dreamma.vip'],
}

class Axios  {
	constructor(props) {
	    this.API_ROOT=props.API_ROOT;
		this.TOKEN = props.TOKEN
				
	}
  authorization: null,
  authorizationKey: 'Token',

  getAuthorization() {
    R.authorization = localStorage.getItem(R.authorizationKey)
    return R.authorization
  },

  setAuthorization(s) {
    console.info(s)
    R.authorization = s
    localStorage.setItem(R.authorizationKey, s)
    return s
  },

  removeAuthorization() {
    localStorage.removeItem(R.authorizationKey)
  },

  headers() {
    return {
      Authorization: R.getAuthorization(),
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  },

  async testApiRoot(rootUrl) {
    const response = await fetch(`${rootUrl}/ping`)
    const { ok, status } = response
    if (ok && status === 200) {
      return response.text().then(text => {
        if (text === 'pong') {
          return rootUrl
        }
        return Promise.reject()
      })
    }
    return Promise.reject(new Error(`ok: ${ok}, status: ${status}`))
  },

  getApiRoot() {
    if (localStorage.getItem('resolveByLocal') === 'true') {
      return R.setApiRoot(dns.API_ROOT_LOCAL)
    }//localhost 不需要ping
    return Promise.race(dns.REMOTE_HOSTS.map(R.testApiRoot))
      .then(R.setApiRoot)
      .catch(error => {
        const msg = `Failed to ping any remote: ${error}`
        message.error(msg)
        return Promise.reject(new Error(msg))
      })
  },

  async setApiRoot(newApiRoot) {
    dns.API_ROOT = newApiRoot
    localStorage.setItem('API_ROOT', newApiRoot)
    return newApiRoot
  },


  delete(path, data) {
    R.getAuthorization()
    return fetch(`${dns.API_ROOT}/${path}`, {
      method: 'DELETE',
      body: JSON.stringify(R.body(data)),
      headers: R.headers()
    })
  },

  body(data) {
    return {
      //ORIGIN: global.location.origin,
      //DEVICE_TYPE,
      // locale: global.LANGUAGE,
      ...data
    }
  },

  async parseResponse(res) {
    const authorization = res.headers.get('Authorization')
    //去除response header 里面的token,只有第一次sign_in 里面才有
    console.info('parseResponse:', authorization )
    if (authorization) {
      console.info(authorization)
      R.setAuthorization(authorization)
    }
    console.info('Confirm parseResponse:', R.getAuthorization())
    //res.headers.forEach((v,k)=>console.log(k,v))
    //localStorage.setItem(R.authorizationKey, authorization)

    const json = await res.json()
    if (res.status >= 400) {
      json.status = res.status
    }
    if (res.status === 401) {
      R.setAuthorization('401')
    }
    return json
  },

  async get(path, data = {}, root = null) {
    //R.getAuthorization()
    const params = R.body(data)
    const query = queryString.stringify(params)
    console.info(`${root || dns.API_ROOT}/${path}?${query}`)
    const res = await fetch(`${root || dns.API_ROOT}/${path}?${query}`, {
      method: 'GET',
      headers: R.headers()
    })
    const authorization = res.headers.get('Authorization')
    console.info(authorization )
    const content = await R.parseResponse(res)
    return content
  },

  async patch(path, data) {
    R.getAuthorization()
    const res = await fetch(`${dns.API_ROOT}/${path}`, {
      method: 'PATCH',
      headers: R.headers(),
      body: JSON.stringify(R.body(data))
    })
    const content = await R.parseResponse(res)
    return content
  },

  async post(path, data) {
    R.getAuthorization()
    const res = await fetch(`${dns.API_ROOT}/${path}`, {
      method: 'POST',
      headers: R.headers(),
      body: JSON.stringify(R.body(data))
    })
    const content = await R.parseResponse(res)
    console.info(content )
    return content //返回一个Promise 给login界面
  },

  async put(path, data) {
    R.getAuthorization()
    const res = await fetch(`${dns.API_ROOT}/${path}`, {
      method: 'PUT',
      headers: R.headers(),
      body: JSON.stringify(R.body(data))
    })

    const content = await R.parseResponse(res)
    return content
  }
}

export default R
