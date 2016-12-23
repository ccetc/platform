var path = require('path')
var glob = require('glob')
var fs   = require('fs')
var _    = require('lodash')

module.exports = function compileApps() {
  var appJsons = glob.sync('src/**/app.json')
  var manifest = appJsons.map(appFile => {
    var contents = require(path.resolve(appFile))
    return Object.assign(contents, {
      path:    path.join.apply(path, appFile.split(path.sep).slice(0, -1).slice(1)),
      urlPath: appFile.split(path.sep).slice(-2, -1)[0]
    })
  })

  var template = _.template(fs.readFileSync('src/templates/applications.js.template'))

  console.log(manifest)

  fs.writeFileSync('src/portals/admin/views/applications.gen.js', template({apps: manifest}))
}
