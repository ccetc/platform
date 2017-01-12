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
  .then(result => getAuthor(result))
  .then(result => getCategory(result))
  .then(result => insertApp(result))
  .then(result => getAdminConfig(result))
  .then(result => insertAdminRights(result))
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

const getAuthor = ({ appname, version, remoteConfig, localConfig  }) => {

  return new Promise((resolve, reject) => {
    knex.select('*')
    .from('app_authors')
    .where({ name: localConfig.author })
    .then(function(rows) {
      if(rows.length > 0) {
        const author = rows[0]
        resolve({ appname, version, remoteConfig, localConfig, author })
      } else {
        createAuthor(localConfig.author).then(author => {
          resolve({ appname, version, remoteConfig, localConfig, author })
        }).catch(err => {
          reject(err.message)
        })
      }
    }).catch(err => {
      reject(new Error(`Unable to load author for app '${appname}'`))
    })
  })

}

const createAuthor = (name) => {

  return new Promise((resolve, reject) => {
  })

}

const getCategory = ({ appname, version, remoteConfig, localConfig, author }) => {

  return new Promise((resolve, reject) => {
    knex.select('*')
    .from('app_categories')
    .where({ name: localConfig.author })
    .then(rows => {
      if(rows.length > 0) {
        const category = rows[0]
        resolve({ appname, version, remoteConfig, localConfig, author, category })
      } else {
        reject(new Error(`Unable to load category for app '${appname}'`))
      }
    }).catch(err => {
      reject(new Error(`Unable to load category for app '${appname}'`))
    })
  })

}

const insertApp = ({ appname, version, remoteConfig, localConfig, author, category }) => {

  return new Promise((resolve, reject) => {
    return knex('apps').returning('id').insert({
      app_author_id: author.id,
      app_category: category.id,
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

const getAdminConfig = ({ appname, version, remoteConfig, localConfig, app  }) => {

  return new Promise((resolve, reject) => {
    const configPath = path.resolve(`${appdir}/${appname}/admin/config.js`)
    const adminConfig = (fs.existsSync(configPath)) ? require(configPath) : null
    resolve({ appname, version, remoteConfig, localConfig, app, adminConfig })
  })

}

const insertAdminRights = ({ appname, version, remoteConfig, localConfig, app, adminConfig }) => {

  return new Promise((resolve, reject) => {
    if(adminConfig) {
      return knex('rights').returning('id').insert(adminConfig.rights.map(right => ({
        app_id: app[0],
        text: right.text,
        description: right.description
      }))).then(result => {
        resolve({ appname, version, remoteConfig, localConfig, app, adminConfig })
      }).catch(err => {
        reject(new Error(err))
      })
    } else {
      resolve({ appname, version, remoteConfig, localConfig, app, adminConfig })
    }
  })

}

module.exports = install
