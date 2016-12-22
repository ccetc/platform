const fs = require('fs')
const path = require('path')

module.exports = function(filename) {
  const roots = ['../src/platform','../src/']
  const output = {}
  roots.map(function(root) {
    fs.readdirSync(path.join(__dirname, root, 'apps')).filter(function(app) {
      const appPath = path.join(__dirname, root, 'apps', app, filename)
      if(fs.existsSync(appPath)) {
        output[app] = require(appPath)
      }
    })
  })
  return output
}
