const config = require('../../../config/platform')

module.exports = config[process.env.NODE_ENV]
