import aws from './services/aws'

var ses = new aws.SES()
ses.sendEmail({
  Source: 'notifier@cms.cce.cornell.edu',
  Destination: {
    ToAddresses: ['greg@thinktopography.com']
  },
  Message: {
    Subject: {
      Data: 'A Message To You Rudy'
    },
    Body: {
      Text: {
        Data: 'Stop your messing around'
      }
    }
  }
}, (err, data) => {
  if(err) throw err
})
