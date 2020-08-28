import axios from 'axios';

class Axios {
	constructor(props) {
		this.initConfig = props.initConfig;
		this.baseURL = props.baseURL;
		this.beforeRequset = props.beforeRequset
		this.reqIntercept = props.reqIntercept
		this.resIntercept = props.resIntercept	
	}

	//设置拦截器
	setInterceptors(instance, url) {
		// 这里的url可供你针对需要特殊处理的接口路径设置不同拦截器。
		this.beforeRequset(url)
		instance.interceptors.request.use((config) => { // 请求拦截器
			return this.reqIntercept(config);
		}, err => Promise.reject(err));

		instance.interceptors.response.use((response) => { // 响应拦截器
			// 在这里移除loading
			// todo: 想根据业务需要，对响应结果预先处理的，都放在这里
			this.resIntercept(response)
			switch (response.status) {
				case 200:
					return response.data;
				case 301:
					return;
				default:
					return Promise.reject('error');
			}
		}, (err) => {
			console.log("response err", err)
			if (err.response) { // 响应错误码处理
				switch (err.response.status) {
					case '403':
						console.log("403 ERR!")
						break;
					case '404':
						console.warn("404 ERR!")
						break;
					default:
						break;
				}
				return Promise.reject(err.response);
			}
			if (err.request) { // 请求超时处理
				if (err.request.readyState === 4 && err.request.status === 0) {
					// 当一个请求在上面的timeout属性中设置的时间内没有完成，则触发超时错误
					// todo handler request timeout error
					console.error("请求超时!")
				}
				console.log('err.request: ', err);
				return Promise.reject(err.request);
			}
			// if (!window.navigator.online) { // 断网处理
			// 	// todo: jump to offline page
			// 	return -1;
			// }
			console.log('err: ', err);
			return Promise.reject(err);
		});
	}

	request(url, options) {
		// 每次请求都会创建新的axios实例。
		const instance = axios.create();
		const config = { // 将用户传过来的参数与公共配置合并。
			url,
			...options,
			...this.initConfig
		};
		// 配置拦截器，支持根据不同url配置不同的拦截器
		//通过了拦截器才能继续返回data
		this.setInterceptors(instance, url);
		return instance(config); // 返回axios实例的执行结果
	}

	get(url, params, config) {
		let options = {
			method: 'GET',
			...config
		}
		let req_url = params ? this.buildUrl(url, params) : url;
		// console.log("url", req_url)
		return this.request(req_url, options)
	}

	post(url, data,config) {
		let options = {
			method: 'POST',
			headers: {
				"content-type": "application/json;charset=UTF-8"
			},
			...config,
			data: {}
		}
		console.log("222", url, data,JSON.stringify(data))
		if (data) options.data = JSON.stringify(data)
		return this.request(url, options)
	}

	delete(url, params) {
		let options = {
			method: 'DELETE'
		}
		let req_url = params ? this.buildUrl(url, params) : url;
		return this.request(req_url, options)
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
	head(url) {
		let options = {
			method: 'Head'
		}
		return this.request(url, options)
	}
	buildUrl(url, params) {
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


}

export default  Axios;
