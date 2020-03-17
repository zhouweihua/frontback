const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const babelConfig = require('./babel.config')

module.exports = {
	mode: 'production',
	entry: __dirname + "/app/index.js",
	devtool: "source-map",
	output: {
		path: __dirname + "/build",
		filename: "bundle.js"
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
			filename: __dirname + "/build/index.html",
			template: 'index.html'
		}),

	],
}