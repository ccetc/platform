const download = require('download')
const fs = require('fs')
const fse = require('fs-extra')
const decompress = require('decompress')
const _ = require('lodash')

const tmpdir = './tmp'
const appdir = './src/apps'
const apps = {
  expenses: {
    versions: [
      { version: '1.0.0', url: 'https://github.com/ccetc/platform-expenses/archive/master.zip' }
    ]
  }
}

module.exports = {

  install(args, environment) {

    // Find app
    const appname = args._[1]

    if(fs.existsSync(`${appdir}/${appname}`)) {
      console.log(`App '${appname}' is already installed`)
      return 2
    }

    if(!apps[appname]) {
      console.log(`Could not find app '${appname}' (>= 0)`)
      return 2
    }
    const app = apps[appname]

    // Find version
    const version = args._[2] || app.versions[app.versions.length - 1].version
    const index = _.findIndex(app.versions, { version })
    if(index === undefined) {
      console.log(`Could not find app '${appname}' (${version})`)
      return 2
    }
    const url = app.versions[index].url

    // Download and extract app
    const filename = url.substring(url.lastIndexOf('/')+1)
    return download(url, tmpdir).then(() => {

      return decompress(`./tmp/${filename}`, appdir).then(files => {

        // remove preexisting app
        const directory = files[0].path.replace('/','')
        if(fs.existsSync(`${appdir}/${appname}`)) {
          fse.removeSync(`${appdir}/${appname}`)
        }

        // move new app into place
        fs.renameSync(`${appdir}/${directory}`, `${appdir}/${appname}`)

        // remove zip file
        fs.unlinkSync(`${tmpdir}/${filename}`)

        console.log(`Successfully installed app '${appname}' (${version})`)

      }).catch(err => {
        console.log(err.message)
        fs.unlinkSync(`${tmpdir}/${filename}`)
        console.log("Unable to extract app")
      })

    }).catch(err => {
      console.log("Unable to download app")
    })

  },

  update(args, environment) {
  },

  remove(args, environment) {
    const appname = args._[1]
    if(!fs.existsSync(`${appdir}/${appname}`)) {
      console.log(`Could not find installed app '${appname}'`)
      return 2
    }

    fse.removeSync(`${appdir}/${appname}`)

    if(false) {
      console.log(`Could not remove app '${appname}'`)
      return 2
    }

    console.log(`Successfully removed app '${appname}'`)

  }


}
