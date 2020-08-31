import  'whatwg-fetch'

class Fetch {
	constructor(props) {
		this.baseURL = props.baseURL || '';		
		this.initConfig = props.initConfig || {};
		this.reqIntercept = props.reqIntercept || function(config, url){ return config};
		this.resIntercept = props.resIntercept ||  function(res, url){ return Promise.resolve(res)}
	}

	request(url, options) {
		// 合并初始化config
		const config = Object.assign(options, this.initConfig)
		

		return fetch(this.baseURL + url, this.reqIntercept(config,url))
			.then(res => this.resIntercept(res, url) )
			.then(res => {
				return res.json()
			})
			.catch(err => {
				console.error("Fetch Err：",err);
				this.handleExcept(err);
			});
	}

	get(url, params) {
		let options = {method: 'GET'}
		let newUrl = params ? this.queryString(url,params) : url;
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
		console.log("handleExcept", e, status)
		const status = e.name;
		this.resIntercept()
		if (status === 401) {
			window.location.href = '/login';
			return;
		}
		if (status === 403) {
			window.location.href = '/login';
			return;
		}
		if (status <= 504 && status >= 500) {
			window.location.href = '/login';
			return;
		}
		if (status >= 404 && status < 422) {
			window.location.href = '/login';
		}
	}
}
export default Fetch;
