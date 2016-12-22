const aws = require('aws-sdk')
const config = require('./config')

aws.config.constructor(config.aws)

module.exports = aws
