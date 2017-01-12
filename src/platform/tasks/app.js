const publishApp = require('./app/publish')
const installApp = require('./app/install')
const removeApp = require('./app/remove')

module.exports = {

  publish: publishApp,
  install: installApp,
  remove: removeApp

}
