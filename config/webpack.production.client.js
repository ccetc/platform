var config = require('./webpack.client.js')
var path = require('path')
var webpackUglifyJsPlugin = require('webpack-uglify-js-plugin')
var uglify = new webpackUglifyJsPlugin({
  cacheFolder: path.resolve(__dirname, '../uglify_cache'),
  minimize: true,
  sourceMap: true,
  output: {
    comments: false
  },
  compressor: {
    warnings: false
  }
})
module.exports = Object.assign(config, {
  plugins: config.plugins.concat([uglify])
})
