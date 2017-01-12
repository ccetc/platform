const Promise = require('bluebird')
const request = require('request-promise')
const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const JSZip = require('jszip')
const knex = require('server/services/knex')

const registry = 'http://registry.thinktopography.com'
const appdir = './src/apps'

const install = (args, environment) => {
  return installApp(args._[1], args._[2])
}

const installApp = (appname, version) => {
  return verifyNotInstalled(appname, version)
  .then(result => getRemoteConfig(result))
  .then(result => verifyVersion(result))
  .then(result => downloadBundle(result))
  .then(result => extractBundle(result))
  .then(result => getLocalConfig(result))
  .then(result => insertApp(result))
  .then(result => insertRights(result))
  .then(result => {
    console.log(`Successfully installed app '${result.appname}' (${result.version})`)
    return 2
  })
  .catch(e => {
    console.log(e.message)
    return 2
  })
}

const verifyNotInstalled = (appname, version) => {

  return new Promise((resolve, reject) => {
    if(fs.existsSync(`${appdir}/${appname}`)) {
      reject(new Error(`App '${appname}' is already installed`))
    }
    resolve({ appname, version })
  })

}

const getRemoteConfig = ({ appname, version }) => {

  return new Promise((resolve, reject) => {
    return request({
      method: 'GET',
      uri: `${registry}/apps/${appname}`,
      json: true
    }).then(remoteConfig => {
      resolve({ appname, version, remoteConfig })
    }).catch(err => {
      if(err.statusCode) {
        reject(new Error(err.error.message))
      } else  {
        reject(new Error('Unable to download app manifest'))
      }
    })
  })

}

const verifyVersion = ({ appname, version, remoteConfig }) => {

  return new Promise((resolve, reject) => {
    if(!version) {
      version = remoteConfig.latest
    }
    if(_.includes(remoteConfig.versions, version)) {
      resolve({ appname, version, remoteConfig })
    } else {
      reject(new Error(`Could not find app '${appname}' (${version})`))
    }
  })

}

const downloadBundle = ({ appname, version, remoteConfig }) => {

  return new Promise((resolve, reject) => {
    return request({
      method: 'GET',
      uri: `${registry}/apps/${appname}/${version}`,
      encoding: null
    }).then(zipData => {
      resolve({ appname, version, remoteConfig, zipData })
    }).catch(err => {
      if(err.statusCode) {
        reject(new Error(err.error.message))
      } else  {
        reject(new Error('Unable to download app'))
      }
    })
  })

}

const extractBundle = ({ appname, version, remoteConfig, zipData }) => {

  return new Promise((resolve, reject) => {
    JSZip.loadAsync(zipData).then(data => {
      const promises = []
      Object.keys(data.files).map(key => {
        const file = data.files[key]
        const dest = path.resolve(`${appdir}/${file.name}`)
        if(file.dir) {
          promises.push(Promise.promisify(fs.mkdir)(dest))
        } else {
          promises.push(file.async('string').then(data => {
            fs.writeFileSync(dest, data)
          }))
        }
      })
      Promise.all(promises).then(result => {
        resolve({ appname, version, remoteConfig })
      }).catch(err => {
        reject(new Error(err))
      })
    }).catch(err => {
      reject(new Error(err))
    })
  })

}

const getLocalConfig = ({ appname, version, remoteConfig }) => {

  return new Promise((resolve, reject) => {
    const configPath = path.resolve(`${appdir}/${appname}/app.json`)
    fs.readFile(configPath, (err, data) => {
      if(err) {
        reject(new Error(`Unable to read config for app '${appname}'`))
      }
      const localConfig = JSON.parse(data.toString())
      resolve({ appname, version, remoteConfig, localConfig })
    })
  })

}

const insertApp = ({ appname, version, remoteConfig, localConfig  }) => {

  return new Promise((resolve, reject) => {
    return knex('apps').returning('id').insert({
      title: localConfig.title,
      short_description: localConfig.short_description,
      long_description: localConfig.long_description,
      version: localConfig.version,
      icon: localConfig.icon
    }).then(app => {
      resolve({ appname, version, remoteConfig, localConfig, app })
    }).catch(err => {
      reject(new Error(err))
    })
  })

}

const insertRights = ({ appname, version, remoteConfig, localConfig, app }) => {

  return new Promise((resolve, reject) => {
    return knex('rights').returning('id').insert(localConfig.rights.map(right => ({
      app_id: app[0],
      text: right.text,
      description: right.description
    }))).then(result => {
      resolve({ appname, version, remoteConfig, localConfig, app  })
    }).catch(err => {
      reject(new Error(err))
    })
  })

}

module.exports = install
