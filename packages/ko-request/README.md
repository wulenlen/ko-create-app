
### ko-requset
[![npm version](https://img.shields.io/npm/v/ts-loader.svg)](https://www.npmjs.com/package/ko-script)
[![Linux Build Status](https://travis-ci.org/TypeStrong/ts-loader.svg?branch=master)](https://npmjs.org/package/ko-script)


#### Install
```
yarn add @dtux/ko-requset
npm install @dtux/ko-request
```
#### Axios  Usage
```
import { Axios } from '@dtux/ko-request';
const http = new Fetch({
	baseURL: '', //接口地址，设置了代理的话可以不填
	initConfig: {
		headers: {}
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
#### Fetch  Usage
```
import { Fetch } from '@dtux/ko-request';
const http = new Fetch({
	baseURL: '',
	initConfig: {
		headers: {}
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


const res = await http.get('/users')

```
