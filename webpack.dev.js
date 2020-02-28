const merge = require('webpack-merge');
const common = require('./webpack.config');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    host: 'localhost',
    port: 3001,
    open: true, //自动拉起浏览器
    hot: true, //热加载
    publicPath: "/",
    contentBase: './dist'
  }
})
