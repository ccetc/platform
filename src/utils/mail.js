import aws from '../services/aws'

export default (from, to, subject, body) => {
  if(process.env.NODE_ENV != 'test') {
    var ses = new aws.SES()
    ses.sendEmail({
      Source: from,
      Destination: {
        ToAddresses: to
      },
      Message: {
        Subject: {
          Data: subject
        },
        Body: {
          Html: {
            Data: body
          }
        }
      }
    }, (err, data) => {
      if(err) throw err
    })
  }
}
