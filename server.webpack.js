var nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: {
    server: './src/server.js'
  },
  output: {
    path: './dist',
    filename: 'server.js'
  },
  target: 'node',
  externals: [nodeExternals()],
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
      }
    ]
  }
}
