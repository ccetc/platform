const dotenv = require('dotenv')
const aws = require('aws-sdk')

dotenv.config({ path: '.env.' + process.env.NODE_ENV })

aws.config.constructor({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  region: process.env.AWS_REGION || '',
  bucket: process.env.AWS_BUCKET || ''
})

module.exports = aws
