module.exports = {
  entry: {
    platform: './src/client.js'
  },
  output: {
    path: './dist/public/js',
    filename: 'platform.js'
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
      }
    ]
  }
}
