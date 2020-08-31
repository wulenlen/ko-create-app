import { message} from 'antd';
import { Fetch } from '@dtux/ko-request';
//import ProgressBar from '@/components/ProgressBar';
const http = new Fetch({
	baseURL: '',
	initConfig: {
		credentials: 'same-origin',
		headers: {
			'Accept': '*/*',
			'Content-Type': 'application/json',
		}
	},
	reqIntercept: (config, url) => {
		// 在这里添加loading、 配置token
		config.headers.Token = sessionStorage.getItem('token')
		if (url === '/login') {
			console.log("to login page")
		}
		return config
	},
	resIntercept: (res, url) => {
		// 在这里移除loading,对响应结果预先处理
		console.log("response success", res);
		if (url === '/login' && res.status === 200) {
			sessionStorage.setItem('token', res.header.Token)

		}
		//ProgressBar.hide();
		switch (res.status) {
			case 200:
				return res;
			case 302:
				message.info('登录超时, 请重新登录！')
				break;
			case 401:
					//window.push('login');
				break;
			default:
				if (process.env.NODE_ENV !== 'production') {
					console.error('Request error: ',res,  res.code, res.message)
				}
				 Promise.resolve(res);
		}

		return Promise.resolve(res);
	}
});

