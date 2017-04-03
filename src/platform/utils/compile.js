const path = require('path')
const glob = require('glob')
const fs = require('fs')
const _ = require('lodash')

module.exports = function compileApps() {

  const root = path.resolve(__dirname, '..', '..')

  const configs = glob.sync(path.join(__dirname, '..', '..', '..', '**', 'apps', '**', 'app.js'))

  const apps = configs.map(config => {

    const contents = require(path.resolve(config))

    return Object.assign(contents, {
      name: contents.title.toLowerCase(),
      abspath: config.replace('/app.js',''),
      relpath: config.replace('/app.js','').replace(root, '..'),
      path: config.split(path.sep).slice(-2, -1)[0]
    })

  })

  const files = [
    './src/admin/reducer.js',
    './src/admin/style.less',
    './src/admin/client.js'
  ]

  files.map(file => {
    const template = _.template(fs.readFileSync(`${file}.template`), { imports: { fs, glob, path } })
    fs.writeFileSync(file, template({ apps }))
  })

}
