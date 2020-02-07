// Rollup plugins
import path from 'path';
import buble from '@rollup/plugin-buble';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import cpy from 'rollup-plugin-cpy';
import {terser} from "rollup-plugin-terser";

export default {
  input: path.join(__dirname,'src/index.js'),
  output: {
    name:'util',  //当format为iife和umd时必须提供，将作为全局变量挂在window(浏览器环境)下：window.A=...
    file: path.join(__dirname,process.env.NODE_ENV === 'production' ? 'lib/ko-base-com.min.js':'lib/ko-base-com.js'),
    format: 'umd' //  五种输出格式：amd /  es6 / iife / umd / cjs
  },
  plugins: [
    json(),
    resolve({
      browser: true,
    }),
    terser(),
    commonjs(),
    buble(),
    replace({
      exclude: 'node_modules/**'
    }),
    cpy([
      { files: './src', dest: './es' },
    ])
  ]
}