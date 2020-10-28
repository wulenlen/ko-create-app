## ko-babel-app

[![npm version](https://img.shields.io/npm/v/ts-loader.svg)](https://www.npmjs.com/package/ko-babel-app)
[![Downloads](http://img.shields.io/npm/dm/ts-loader.svg)](https://npmjs.org/package/ko-babel-app)
[![node version](https://github.githubassets.com/images/icons/emoji/unicode/1f420.png)](https://www.npmjs.com/package/babel-loader)

```text
babel预设集合，支持react,typescript,antd动态引入
```

## Installation

```text
$ npm install ko-babel-app --dev.

$ yarn add  ko-babel-app --dev.
```

## Usage

Syntax

```js
const koBabelApp = require('ko-babel-app');
const babelConf = koBabelApp([, plugins], [, targets]);
```

- plugins

  babel plugins will be added in config

- targets

  the environments you support/target for your project.
  Default targets is **defaults**. Checkout the available [options](https://github.com/browserslist/browserslist)

Then use **babelConf** in babel loader as below

```js
{
  test: /\.(js|jsx|mjs)$/,
  exclude: /node_modules/,
  loader: BABEL_LOADER,
  options: deepAssign({}, babelConf, {
  cacheDirectory: true
  })
}
```

## Tips

> 1.可配合 ko-script 使用;

> 2.可单独配置 webpack 中使用，省去安装各种 babel;
