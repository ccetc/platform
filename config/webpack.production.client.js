var config = require('./webpack.client.js')
var webpackUglifyJsPlugin = require('webpack-uglify-js-plugin')
var uglify = new webpackUglifyJsPlugin({
  cacheFolder: '.',
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
