const fs = require('fs')
const fse = require('fs-extra')

const appdir = './src/apps'

const remove = (args, environment) => {
  removeApp(args._[1])
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

module.exports = remove
