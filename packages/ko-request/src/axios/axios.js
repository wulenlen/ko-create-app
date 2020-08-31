import axios from 'axios'
const instance = axios.create({
  baseURL:'', // api的前缀
  timeout: 5000 // 设置请求超时
})

// 请求拦截添加头部参数等
instance.interceptors.request.use(config => {
  config.headers['Authorization'] = sessionStorage.getItem('token') || ''
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

// 响应拦截
instance.interceptors.response.use(
  response => {
    switch(response.status){
      case 200:
      return response.data;
      case  401:
      return;
      default:
      return Promise.reject('error');
    }
  },
  error => {
    console.log('err' + error)
    return Promise.reject(error)
  })


const myAxios = {
  post(url, data, config) {
    return instance({
      url,
      data,
      ...config,
      method: 'post',
    })
  },
  get(url, params, config) {
    console.log(url, params)
    return instance({
      url,
      params,
      ...config,
      method: 'get',
    })
  },
  postFormData(url, data, config){
    return instance({
      url,
      data, //formdata形式传入
      ...config,
      method: 'post'
    })
  }
}

export default myAxios;
