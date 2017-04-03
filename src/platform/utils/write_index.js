const fs = require('fs')
const path = require('path')
const _ = require('lodash')

function MyPlugin() {}

MyPlugin.prototype.apply = function(compiler) {

  compiler.plugin('done', function(stats) {

    var template = fs.readFileSync(path.join('.', 'src', 'admin', 'index.html'), 'utf8')

    var html = _.template(template)({ hash: stats.hash })

    fs.writeFile(path.join('.', 'public', 'index.html'), html)

  })

}

module.exports = MyPlugin
