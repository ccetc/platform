
import fs from 'fs'
import aws from './services/aws'

const key = 'assets/1/greg.jpg'
const stream = fs.createReadStream('/Users/mochini/Workspace/platform/src/public/images/greg.jpg')
stream.on('error', function (err) {
})
stream.on('open', function () {
  var s3 = new aws.S3()
  s3.putObject({
    Bucket: 'dev.cdn.mycce.io',
    Key: key,
    Expires: 60,
    ContentType: 'image/jpeg',
    ACL: 'public-read',
    Body: stream
  }, (err, data) => {
  })
})
