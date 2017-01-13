module.exports = function (shipit) {

  const shipitConfig = require('./deploy')

  shipit.initConfig(shipitConfig)

  shipit.task('deploy', function () {
    return shipit.remote('cd /var/www/app && git reset --hard origin/master && git pull && npm run build && npm run compile && service nginx restart')
  })

}
