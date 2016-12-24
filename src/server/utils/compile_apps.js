const path = require('path')
const glob = require('glob')
const fs = require('fs')
const _ = require('lodash')

module.exports = function compileApps() {
  const configs = glob.sync('src/**/app.json')
  const apps = configs.map(config => {
    const contents = require(path.resolve(config))
    return Object.assign(contents, {
      filepath: path.join.apply(path, config.split(path.sep).slice(0, -1).slice(1)),
      path: config.split(path.sep).slice(-2, -1)[0]
    })
  })

  const template = _.template(fs.readFileSync('src/portals/admin/views/apps.js.template'))

  fs.writeFileSync('src/portals/admin/views/apps.js', template({ apps }))
}
