<<<<<<< HEAD
/*
 * @Description: 文件
 * @version: 1.0.0
 * @Company: 袋鼠云
 * @Author: Charles
 * @Date: 2020-03-03 18:11:12
 * @LastEditors: Charles
 * @LastEditTime: 2020-03-03 18:11:12
 */

const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    libraryExport: "default",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /js$|jsx$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              "plugins": [
                [
                  "@babel/plugin-proposal-decorators",
                  {
                      "legacy": true
                  }
                ],
                "@babel/plugin-proposal-class-properties",
              ]
            }
          }
        ]
      },
      {
        test: /css$/,
        use: ['css-loader']
      }
    ]
  }
}
=======
const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const babelConf=require('ko-babel-app');
console.log(babelConf,'babelConf');
module.exports = {
	mode: 'production', //编译模式3
	//target
	//context: __dirname, // webpack 的主目录(绝对路径)entry 和 module.rules.loader等相对于此目录解析
	// entry: { //文件输入配置
	//     app: [path.resolve(__dirname, './src/index.js')],
	// },
	entry: './src/index.js',
	output: {
		//文件输出配置
		path: path.resolve(__dirname, 'lib'), // 所有输出文件的目标路径
		filename: 'kov-base.min.js',
		library: 'kov-base', //  导出库(exported library)的名称
		libraryTarget: 'umd', // 通用模块定义    // 导出库
	},
	module: {
		//这些选项决定了如何处理项目中的不同类型的模块。
		rules: [
			{
				test: /\.jsx|.js?$/,
				//exclude: /(node_modules)/, //处理该文件时，排除的目录，建议使用include
				use: {
					loader: 'babel-loader',
					options: Object.assign({}, babelConf, {
                        cacheDirectory: true
                      }),
				},
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.(scss|sass)$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
		],
	},
	plugins: [
		//插件使用
		new MiniCssExtractPlugin({
			filename: 'css/[name].[hash].css',
			chunkFilename: 'css/[id].[hash].css',
		}),
        new webpack.NamedModulesPlugin(), //product 默认为此项
        new CleanWebpackPlugin(),
	],
	performance: {
		//打包性能配置
		hints: false, // 关闭性能提示
	},
	optimization: {
		//手动优化配置，并覆盖默认
		runtimeChunk: {
			name: 'manifest',
		},
		minimize: true, //无需配置
		//nameModules:true, //变异的的文件以名字显示
		noEmitOnErrors: true, //跳过错误的编译
		minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: false,
                terserOptions: {
                  output: {
                    comments: false,
                  },
                },
              }),
			new OptimizeCSSAssetsPlugin({}),
		],
		splitChunks: {
			minSize: 30000, //生成的块的最小大小
			maxSize: 3000000, //告诉webpack尝试将大于maxSize的块拆分成更小的部分
			minChunks: 1, //分割前必须共享模块的最小块数。
			maxAsyncRequests: 5, //加载模块时，最大请求数
			maxInitialRequests: 3, //初始最大最大请求数
			automaticNameDelimiter: '-', //名字分隔符，可不使用；
			name: true, //将根据块和缓存 组密钥自动生成名称
			cacheGroups: {
				//缓存组可以从splitChunks继承和/或覆盖任何选项。test,proiority只能在缓存组级别配置
				vendor: {
					chunks: 'initial',
					name: 'vendor',
					test: 'vendor',
				},
				biz: {
					test: /[\\/]bizcharts[\\/]/,
					name: 'biz',
					chunks: 'all',
				},
			},
		},
	},
	resolve: {
		//配置模块如何解析
		extensions: ['.js', '.jsx', '.scss', '.css', '.json'], //自动解析确定的扩展。覆盖原有扩展
		modules: [
			path.resolve(__dirname, 'src'), //告诉 webpack 解析模块时应该搜索的目录。
			path.resolve(__dirname, 'node_modules'),
		],
	},
	externals: {
		//防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖
	},
};
>>>>>>> update
