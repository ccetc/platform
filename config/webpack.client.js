var ExtractTextPlugin = require('extract-text-webpack-plugin')
var path = require('path')
var compassPath = path.resolve(__dirname, '../node_modules/compass-mixins/lib')

module.exports = {
  entry: {
    platform: './src/client.js'
  },
  output: {
    path: './dist/public',
    filename: 'js/[name].js'
  },
  module: {
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
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass?outputStyle=compressed&sourceMapEmbed=true&includePaths[]='+compassPath)
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/styles.min.css')
  ]
}
