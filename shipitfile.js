const config = require('./deploy')

module.exports = function (shipit) {

  shipit.initConfig(config)

  shipit.task('deploy', function () {
    return shipit.remote('cd /var/www/app && git reset --hard origin/master && git pull && npm install && npm run build && npm run compile && service nginx restart')
  })

}
