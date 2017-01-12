const Promise = require('bluebird')
const request = require('request-promise')
const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const JSZip = require('jszip')
const Zip = require('adm-zip')

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
    console.log(result)
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
    const zip = Zip(zipData)
    zip.getEntries().forEach(zipEntry => {
      const dest = path.resolve(`${appdir}/${zipEntry.entryName}`)
      console.log(dest)
      if(zipEntry.isDirectory) {
        fs.mkdirSync(dest)
      } else {
        fs.writeFileSync(dest, zipEntry.data.toString('utf8'))
      }
    })
    resolve({ appname, version, remoteConfig })
  })

}

const getLocalConfig = ({ appname, remoteConfig }) => {

  return new Promise((resolve, reject) => {
    const configPath = path.resolve(`${appdir}/${appname}/app.json`)
    console.log(configPath)
    fs.readFile(configPath, (err, data) => {
      if(err) {
        reject(new Error(`Unable to read config for app '${appname}'`))
      }
      console.log(data)
      const localConfig = JSON.parse(data.toString())
      console.log(localConfig)
      resolve({ appname, remoteConfig, localConfig })
    })
  })

}

const insertApp = ({ appname, version, remoteConfig, zipData }) => {

  return new Promise((resolve, reject) => {
  })

}

const insertRights = ({ appname, version, remoteConfig, zipData }) => {

  return new Promise((resolve, reject) => {
  })

}

const installAppOld = (appname, version) => {

  // if(fs.existsSync(`${appdir}/${appname}`)) {
  //   console.log(`App '${appname}' is already installed`)
  //   return 2
  // }

  // return download(`${registry}/apps`).then(data => {

    // const apps = JSON.parse(data.toString())
    // if(!apps[appname]) {
    //   console.log(`Could not find app '${appname}' (>= 0)`)
    //   return 2
    // }
    // const app = apps[appname]

    // Find version
    // if(!version) {
    //   version = app.latest
    // }
    // if(!_.includes(app.versions, version)) {
    //   console.log(`Could not find app '${appname}' (${version})`)
    //   return 2
    // }
    //
    // const url = `${registry}/apps/${appname}/${version}`
    //
    // // Download and extract app
    // const filename = url.substring(url.lastIndexOf('/')+1)
    // return request(url, tmpdir).then(() => {

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

    // }).catch(err => {
    //   console.log("Unable to download app")
    // })

  // }).catch(err => {
  //   console.log("Unable to download app manifest")
  // })

}

module.exports = install
