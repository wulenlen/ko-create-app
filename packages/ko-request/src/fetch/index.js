import { fetch as _fetch } from 'whatwg-fetch'

class Fetch {
	constructor(props) {
		this.baseURL = props.baseURL || '';
		this.initConfig = props.initConfig || {};
		this.reqIntercept = props.reqIntercept || function(config, url) {
			return config
		};
		this.resIntercept = props.resIntercept || function(res, url) {
			return Promise.resolve(res)
		}
	}

	request(url, options) {
		// 合并初始化config
		const config = Object.assign(options, this.initConfig)

		return _fetch(this.baseURL + url, this.reqIntercept(config, url))
			.then(res => this.resIntercept(res, url))
			.then(res => {
				return res.json()
			})
			.catch(err => {
				//console.error("Fetch Err：",err);
				this.handleExcept(err);
			});
	}

	get(url, params) {
		let options = {
			method: 'GET'
		}
		let newUrl = params ? this.queryString(url, params) : url;
		console.log("newUrl", newUrl)
		return this.request(newUrl, options)
	}

	post(url, data) {
		let options = {
			method: 'POST',
			headers: {
				"content-type": "application/json;charset=UTF-8"
			},
			body: {}
		}
		if (data) options.body = JSON.stringify(data)
		return this.request(url, options)
	}

	delete(url, params) {
		let options = {
			method: 'DELETE'
		}
		let newUrl = params ? this.queryString(url, params) : url;
		return this.request(newUrl, options)
	}

	put(url, data) {
		let options = {
			method: 'PUT',
			body: {}
		}
		if (data) options.body = JSON.stringify(data)
		return this.request(url, options)
	}

	postForm(url, data, flag) {
		let options = {
			method: 'POST',
			body: {}
		}
		if (data) options.body = flag ? this.buildFormData(data) : new FormData(data);
		return this.request(url, options)
	}

	queryString(url, params) {
		const ps = []
		if (typeof params === 'object') {
			for (let p in params) {
				if (p) {
					ps.push(p + '=' + encodeURIComponent(params[p]));
				}
			}
			return url + '?' + ps.join('&')
		} else {
			return url.split(':')[0] + params
		}
	}

	buildFormData(params) {
		if (params) {
			const data = new FormData()
			for (let p in params) {
				if (p) {
					data.append(p, params[p])
				}
			}
			return data;
		}
	}

	handleExcept(e) {
		const status = e.name;
		//this.resIntercept()
		switch (status) {
			case 200:
				return res;
			case 302:
				message.info('登录超时, 请重新登录！')
				break;
			case 401:
				//window.push('login');
				break;
			case 504:
				console.error('网关错误:504', )
				break;
			default:
				console.error('请求错误:', status)
		}

	}
}

export const fetch = (url, body = {}, method = 'GET') => {
	let options = {
		method,
		headers: {
			"content-type": "application/json;charset=UTF-8"
		},
		body: JSON.stringify(body)
	}
	return _fetch(url, method === 'GET' ? {
			method: 'GET'
		} : options)
		.then(res => {
			return res.json()
		})
		.catch(err => {
			console.error("Fetch Err：", err);
		});
}
export default Fetch;
