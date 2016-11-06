var wallabyWebpack = require('wallaby-webpack')
var wallabyPostprocessor = wallabyWebpack({
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
})

module.exports = function (wallaby) {
  return {

    files: [
      { pattern: 'node_modules/**/*.js', instrument: true },
      { pattern: 'node_modules/**/*.js', ignore: true },
      { pattern: 'src/public/js/jquery.min.js', ignore: true },
      { pattern: 'src/public/js/semantic.min.js', ignore: true },
      { pattern: 'src/public/js/socket.io.min.js', ignore: true },
      { pattern: 'src/**/*.js' }
    ],

    tests: [
      { pattern: 'src/**/*spec.js', load: false }
    ],

    testFramework: 'mocha',

    debug: true,

    compilers: {
      'src/**/*.js': wallaby.compilers.babel()
    },

    postprocessor: wallabyPostprocessor,

    env: {
      type: 'node'
    }

  }
}
