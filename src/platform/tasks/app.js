const download = require('download')
const fs = require('fs')
const fse = require('fs-extra')
const decompress = require('decompress')
const _ = require('lodash')
const knex = require('server/services/knex')

const manifest = 'https://raw.githubusercontent.com/ccetc/platform/master/apps.json'
const tmpdir = './tmp'
const appdir = './src/apps'

module.exports = {

  install(args, environment) {

    installApp(args._[1], args._[2])

  },

  update(args, environment) {
  },

  remove(args, environment) {

    removeApp(args._[1])

  }

}

const installApp = (appname, version) => {

  if(fs.existsSync(`${appdir}/${appname}`)) {
    console.log(`App '${appname}' is already installed`)
    return 2
  }

  return download(manifest).then(data => {

    const apps = JSON.parse(data.toString())
    if(!apps[appname]) {
      console.log(`Could not find app '${appname}' (>= 0)`)
      return 2
    }
    const app = apps[appname]

    // Find version
    if(!version) {
      version = app.versions[app.versions.length - 1].version
    }
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

        const config = JSON.parse(fs.readFileSync(`${appdir}/${appname}/app.json`))

        return knex('apps').returning('id').insert({
          title: config.title,
          short_description: config.short_description,
          long_description: config.long_description,
          version: config.version,
          icon: config.icon
        }).then(result => {

          return knex('rights').returning('id').insert(config.rights.map(right => ({
            app_id: result[0],
            text: right.text,
            description: right.description
          }))).then(result => {

            console.log(`Successfully installed app '${appname}' (${version})`)

          }).catch(err => {
            console.log(err)
            console.log('Unable to update app database')
          })


        }).catch(err => {
          console.log(err)
          console.log('Unable to update app database')
        })

      }).catch(err => {
        console.log(err.message)
        fs.unlinkSync(`${tmpdir}/${filename}`)
        console.log("Unable to extract app")
      })

    }).catch(err => {
      console.log("Unable to download app")
    })

  }).catch(err => {
    console.log("Unable to download app manifest")
  })

}

const removeApp = (appname) => {

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
