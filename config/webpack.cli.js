var nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: {
    platform: './src/bin/platform.js'
  },
  output: {
    path: './bin',
    filename: '[name].js'
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
    ],
    resolve: {
      modulesDirectories: ['node_modules', 'src']
    }
  }
}
