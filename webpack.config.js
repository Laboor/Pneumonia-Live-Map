const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, './src/main.js'),
  output: {
    publicPath: './',
    path: path.resolve(__dirname, 'dist'),
    filename: './js/[name].[hash].js'
  },
  module: {
    rules: [
      { test: /\.html$/, use: 'html-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.tpl'),
      filename: 'index.html'
    })
  ]
}