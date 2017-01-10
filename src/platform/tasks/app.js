const request = require('request-promise')
const fs = require('fs')
const fse = require('fs-extra')
const decompress = require('decompress')
const _ = require('lodash')
const knex = require('server/services/knex')

const registry = 'http://registry.thinktopography.com'
const tmpdir = './tmp'
const appdir = './src/apps'

module.exports = {

  install(args, environment) {

    return installApp(args._[1], args._[2])

  },

  create(args, environment) {

    return createApp(args._[1])

  },

  update(args, environment) {
  },

  remove(args, environment) {

    removeApp(args._[1])

  }

}

const createApp = (appname) => {
  return request({
    method: 'POST',
    uri: `${registry}/apps/${appname}`,
    json: true
  }).then(body => {
    console.log(body.message)
  }).catch(err => {
    if(err.statusCode) {
      console.log(err.error.message)
    } else {
      console.log("Unable to create app")
    }
  })

}

const installApp = (appname, version) => {

  if(fs.existsSync(`${appdir}/${appname}`)) {
    console.log(`App '${appname}' is already installed`)
    return 2
  }

  return download(`${registry}/apps`).then(data => {

    const apps = JSON.parse(data.toString())
    if(!apps[appname]) {
      console.log(`Could not find app '${appname}' (>= 0)`)
      return 2
    }
    const app = apps[appname]

    // Find version
    if(!version) {
      version = app.latest
    }
    if(!_.includes(app.versions, version)) {
      console.log(`Could not find app '${appname}' (${version})`)
      return 2
    }

    const url = `${registry}/apps/${appname}/${version}`

    // Download and extract app
    const filename = url.substring(url.lastIndexOf('/')+1)
    return request(url, tmpdir).then(() => {

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
