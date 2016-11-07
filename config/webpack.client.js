var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    platform: './src/client.js'
  },
  output: {
    path: './dist/public',
    filename: 'js/[name].js'
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
    new ExtractTextPlugin('css/styles.min.css')
  ]
}
