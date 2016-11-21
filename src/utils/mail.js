import aws from 'services/aws'

export default (messaage) => {
  if(process.env.NODE_ENV != 'test') {
    var ses = new aws.SES()
    ses.sendEmail({
      Source: messaage.from,
      Destination: {
        ToAddresses: messaage.to
      },
      Message: {
        Subject: {
          Data: messaage.subject
        },
        Body: {
          Html: {
            Data: messaage.body
          }
        }
      }
    }, (err, data) => {
      if(err) throw err
    })
  }
}
