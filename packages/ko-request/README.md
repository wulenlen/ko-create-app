
# ko-requset
[![npm version](https://img.shields.io/npm/v/ts-loader.svg)](https://www.npmjs.com/package/ko-script)
[![Linux Build Status](https://travis-ci.org/TypeStrong/ts-loader.svg?branch=master)](https://npmjs.org/package/ko-script)

> 基于axios和fetch封装的request工具，方便设置拦截器，配合swagger可以方便快速配置使用
### Install
```
yarn add @dtux/ko-requset
npm install @dtux/ko-request
```
### Axios  Usage
|    参数名    | 描述   | 类型|  是否必须   | 
| :--| :----------------: | : -----: | -----------: |
| beforeRequset    | 发起请求前的回调  |url => null |false|
|initConfig| 初始化配置 | Object |false|
|reqIntercept| request拦截器 |(config) => config  |false|
|resIntercept| response拦截器  |(res) => Promise  |false|

```
import { Axios } from '@dtux/ko-request';
const http = new Fetch({
	initConfig: {
		baseURL: '',
		headers: {}
	},
	beforeRequset: (url) => {
		
	},
	reqIntercept: (config, url) => {
		// reqeset Intercept在这里添加loading、 配置token
		return config
	},
	resIntercept: (res, url) => {
		// response Intercept在这里关闭loading
		return Promise.resolve(res);
	}
});
```
### Fetch  Usage
|    参数名    | 描述   | 类型|  是否必须   | 
| :--| :----------------: | : -----: | -----------: |
| baseURL    | 接口地址  |String |false|
|initConfig| 初始化配置 | Object |false|
|reqIntercept| request拦截器 |(config, url) => config  |false|
|resIntercept| response拦截器  |(res, url) => Promise  |false|

```
import { Fetch } from '@dtux/ko-request';
const http = new Fetch({
	baseURL: '',
	initConfig: {
		headers: {
			'Content-Type': 'application/json'
		}
	},
	reqIntercept: (config, url) => {
		// 配置token
		config.headers.Token = sessionStorage.getItem('token')
		
		在这里添加loading、
		return config
	},
	resIntercept: (res, url) => {
		// response Intercept在这里关闭loading
		return Promise.resolve(res);
	}
});


const res = await http.get('/users')

```
