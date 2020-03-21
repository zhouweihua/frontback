const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const WebpackPluginHashOutput = require('webpack-plugin-hash-output')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const babelConfig = require('../babel.config')

module.exports = {
	mode: 'production',
	entry: __dirname + "/../app/app.js",
	devtool: 'none',
	optimization: {
	  splitChunks: {
		// 1. 只对入口 chunk 进行拆包
		// chunks: 'initial'
		// 2. 更加精细化控制拆包范围
		cacheGroups: {
		  styles: {
			name: 'styles',
			test: /\.(less|css)$/,
			chunks: 'all',
			enforce: true,
		  },
		},
	  },
	},
	output: {
	  path: __dirname + "/../build",
	  publicPath: "./",
	  filename: '[chunkhash].js',
	  chunkFilename: '[chunkhash].js',
	  hashDigestLength: 22,
	},
	module: {
		rules: [{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			loader: 'babel-loader?cacheDirectory',
			options: babelConfig,
		}, {
			test: /\.(less|css)$/,
			exclude: /node_modules/,
			use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'],
		}, {
			test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
			loader: 'url-loader',
			options: {
				limit: 1000
			}
		}]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
		  }),
		new HtmlWebpackPlugin({
			filename: __dirname + "/../build/index.html",
			template: 'index.html'
		}),
	],
}