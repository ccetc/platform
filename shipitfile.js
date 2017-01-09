module.exports = function (shipit) {

  const config = require('./config/platform.js')[shipit.options.environment]
  let shipitConfig = {}
  shipitConfig[shipit.options.environment] = config.deployment

  shipit.initConfig(shipitConfig)

  shipit.task('deploy', function () {
    return shipit.remote('cd /var/www/app && git reset --hard origin/master && git pull && npm run build && npm run compile && service nginx restart')
  })

}
