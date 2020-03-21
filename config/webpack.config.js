const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { staticPrefix, pagePrefix } = require('./app.config')

const srcPath = path.join(__dirname, '../app')
const babelConfig = require('../babel.config')

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, '/../app/app.js'),
  devtool: 'none',
  optimization: {
    splitChunks: {
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
  resolve: {
    alias: {
      containers: path.join(srcPath, 'containers'),
      components: path.join(srcPath, 'components'),
      common: path.join(srcPath, 'common'),
      utils: path.join(srcPath, 'utils'),
      assets: path.join(srcPath, 'assets'),
    },
  },
  output: {
    path: path.join(__dirname, '/../build'),
    publicPath: `${staticPrefix}`,
    filename: '[chunkhash].js',
    chunkFilename: '[chunkhash].js',
    hashDigestLength: 22,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader?cacheDirectory',
        options: babelConfig,
      },
      {
        test: /\.(less|css)$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        pagePrefix: JSON.stringify(pagePrefix),
      },
    }),
    new HtmlWebpackPlugin({
      filename: path.join(__dirname, '/../build/index.html'),
      template: 'index.html',
    }),
  ],
}
