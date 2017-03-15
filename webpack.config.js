const ExtractTextPlugin = require('extract-text-webpack-plugin')
const compile = require('./src/platform/utils/compile')
const WriteIndex = require('./src/platform/utils/write_index')

compile()

module.exports = {
  entry: {
    admin: './src/admin/index.js'
  },
  output: {
    path: './public',
    filename: 'js/[name]-[hash].min.js'
  },
  module: {
    noParse: /node_modules\/localforage\/dist\/localforage.js/,
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015','react','stage-0'],
          plugins: ['transform-flow-strip-types']
        }
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('css-loader!less-loader')
      }
    ]
  },
  resolve: {
    modules: ['node_modules', 'src']
  },
  plugins: [
    new ExtractTextPlugin('css/[name]-[hash].min.css'),
    new WriteIndex()
  ]
}
