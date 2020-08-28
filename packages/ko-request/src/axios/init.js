import { Axios } from '@dtux/ko-request';

const http = new Axios({
	initConfig: {
		baseURL: '',
		timeout: 10000,
		withCredentials: false
	},
	beforeRequset: (url) => {
		if (url === '/login') {
			console.log("to login page")
		}
	},
	reqIntercept: (config) => {
		// 在这里添加loading、 配置token
		config.headers.Token = sessionStorage.getItem('token')
		return config
	},
	resIntercept: (res) => {
		// 在这里移除loading,对响应结果预先处理
		console.log("response success", res);
	}
});