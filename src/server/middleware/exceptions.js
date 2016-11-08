
import Handlebars from 'handlebars'
import config from '../../services/config'
import mail from '../../utils/mail'

const details = (err, request) => {
  const source = '<h1>{{error}}</h1><h2>Request</h2><p>{{request}}</p><h2>Query</h2><p>{{query}}</p><h2>Body</h2><p>{{body}}</p><h2>Stacktrace</h2><p>{{{stack}}}</p>'
  const data = {
    error: err,
    request: JSON.stringify({
      path: request.path
    }),
    body: JSON.stringify(request.body),
    query: JSON.stringify(request.query),
    stack: err.stack.replace(/(?:\r\n|\r|\n)/g, '<br />')
  }
  const template = Handlebars.compile(source)
  return template(data)
}

export default (err, req, res, next) => {

  switch (config.exceptions.handler) {

  case 'render':
    return res.send(details(err, req))

  case 'email':
    mail({
      from: config.exceptions.from,
      to: config.exceptions.recipients,
      subject: `${config.exceptions.prefix} ${err}`,
      body: details(err, req)
    })
    return res.json({ message: 'application error' }).status(500)

  default:
    throw err

  }

}
