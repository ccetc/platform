const Promise = require('bluebird')
const request = require('request-promise')
const fs = require('fs')
const _ = require('lodash')
const JSZip = require('jszip')
const glob = require('glob')
const path = require('path')

const registry = 'http://registry.thinktopography.com'
const appdir = './src/apps'

const publish = (args, environment) => {
  return publishApp(args._[1])
}

const publishApp = (appname) => {
  return appExists(appname)
  .then(result => getRemoteConfig(result))
  .then(result => getLocalConfig(result))
  .then(result => verifyConfig(result))
  .then(result => createBundle(result))
  .then(result => saveBundle(result))
  .then(result => uploadBundle(result))
  .then(result => removeBundle(result))
  .then(result => {
    console.log(`Bundle successfully created for the app '${result.appname}' with version '${result.localConfig.version}`)
    return 2
  })
  .catch(e => {
    console.log(e.message)
    return 2
  })
}

const appExists = (appname) => {

  return new Promise((resolve, reject) => {
    if(!fs.existsSync(`${appdir}/${appname}`)) {
      reject(new Error(`App '${appname}' does not exist`))
    }
    resolve({ appname })
  })

}

const getRemoteConfig = ({ appname }) => {

  return new Promise((resolve, reject) => {
    return request({
      method: 'GET',
      uri: `${registry}/apps/${appname}`,
      json: true
    }).then(remoteConfig => {
      resolve({ appname, remoteConfig })
    }).catch(err => {
      if(err.statusCode) {
        createRemoteConfig(appname).then(remoteConfig => {
          resolve({ appname, remoteConfig })
        }).catch(err => {
          reject(err.message)
        })
      } else  {
        reject(new Error(`Unable to location app '${appname}' in registry`))
      }
    })
  })

}

const createRemoteConfig = (appname) => {
  return new Promise((resolve, reject) => {
    request({
      method: 'POST',
      uri: `${registry}/apps/${appname}`,
      json: true
    }).then(remoteConfig => {
      resolve({
        latest: null,
        versions: []
      })
    }).catch(err => {
      if(err.statusCode) {
        reject(new Error(err.error.message))
      } else {
        reject(new Error('Unable to create app'))
      }
    })
  })

}

const getLocalConfig = ({ appname, remoteConfig }) => {

  return new Promise((resolve, reject) => {
    fs.readFile(`./src/apps/${appname}/app.json`, (err, data) => {
      if(err) {
        reject(new Error(`Unable to read config for app '${appname}'`))
      }
      const localConfig = JSON.parse(data.toString())
      resolve({ appname, remoteConfig, localConfig })
    })
  })

}

const verifyConfig = ({ appname, remoteConfig, localConfig }) => {

  return new Promise((resolve, reject) => {
    if(_.includes(remoteConfig.versions, localConfig.version)) {
      reject(new Error(`The version '${localConfig.version}' already exists for app '${appname}'`))
    }
    resolve({ appname, remoteConfig, localConfig })
  })

}

const createBundle = ({ appname, remoteConfig, localConfig }) => {

  return new Promise((resolve, reject) => {
    const zip = new JSZip()
    glob(`${appdir}/${appname}/**`, {}, (er, files) => {
      files.map(file => {
        const filepath = file.replace(`${appdir}/`,'')
        if(fs.lstatSync(file).isDirectory()) {
          zip.folder(filepath)
        } else {
          zip.file(filepath, fs.readFileSync(path.resolve(file)))
        }
      })
      zip.generateAsync({
        type: 'nodebuffer'
      }).then(zipData => {
        resolve({ appname, remoteConfig, localConfig, zipData })
      }).catch(err => {
        reject(new Error(`Unable to zip app '${appname}'`))
      })
    })
  })

}

const saveBundle = ({ appname, remoteConfig, localConfig, zipData }) => {

  return new Promise((resolve, reject) => {
    fs.writeFile(`./tmp/${appname}-${localConfig.version}.zip`, zipData, err => {
      if(err) {
        reject(new Error(`Unable to save bundle for ${appname}`))
      }
      resolve({ appname, remoteConfig, localConfig })
    })
  })

}

const uploadBundle = ({ appname, remoteConfig, localConfig }) => {

  return new Promise((resolve, reject) => {
    request({
      method: 'POST',
      uri: `${registry}/apps/${appname}/${localConfig.version}`,
      json: true,
      formData: {
        bundle: fs.createReadStream(`./tmp/${appname}-${localConfig.version}.zip`)
      }
    }).then(response => {
      resolve({ appname, remoteConfig, localConfig })
    }).catch(err => {
      if(err.statusCode === 404) {
        reject(new Error(err.error.message))
      } else {
        reject(new Error(`Unable to upload bundle for ${appname}`))
      }
    })
  })

}

const removeBundle = ({ appname, remoteConfig, localConfig }) => {

  return new Promise((resolve, reject) => {
    fs.unlink(`./tmp/${appname}-${localConfig.version}.zip`, err => {
      if(err) {
        reject(new Error(err))
      } else {
        resolve({ appname, remoteConfig, localConfig })
      }
    })
  })

}

module.exports = publish
