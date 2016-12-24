var ExtractTextPlugin = require('extract-text-webpack-plugin')
var compileApps = require('../src/server/utils/compile_apps')

compileApps()

module.exports = {
  entry: {
    account: './src/account.js',
    admin: './src/admin.js'
  },
  output: {
    path: './public',
    filename: 'js/[name].min.js'
  },
  module: {
    noParse: /node_modules\/localforage\/dist\/localforage.js/,
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015','react','stage-0'],
          plugins: ['transform-flow-strip-types']
        }
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('css!less')
      }
    ]
  },
  resolve: {
    modulesDirectories: ['node_modules', 'src']
  },
  plugins: [
    new ExtractTextPlugin('css/[name].min.css')
  ]
}
