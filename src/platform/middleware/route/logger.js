import _ from 'lodash'
import chalk from 'chalk'
import moment from 'moment'
import knex from 'platform/services/knex'

let queries = []

const captureQueries = builder => {

  var startTime = process.hrtime()
  var group = []

  builder.on('query', query => {
    group.push(query)
    queries.push(query)
  })

  builder.on('end', () => {
    const diff = process.hrtime(startTime)
    const ms = diff[0] * 1e3 + diff[1] * 1e-6
    group.forEach(query => {
      query.duration = ms.toFixed(3)
    })
  })

}

export const wrapWithLogger = (req, res, handler) => {

  const started = moment()

  return Promise.resolve().then(() => {

    queries = []

    return knex.client.on('start', captureQueries)

  }).then(() => {

    return handler()

  }).then(() => {

    return knex.client.removeListener('start', captureQueries)

  }).then(() => {

    console.log('=========================================================')
    console.log('%s %s', chalk.red(req.method), req.path)
    console.log('=========================================================')
    if(!_.isEmpty(req.params)) console.log('%s %s', chalk.red('PARAMS:'), JSON.stringify(req.params))
    if(!_.isEmpty(req.query))  console.log('%s %s', chalk.red('QUERY:'), JSON.stringify(req.query))
    if(!_.isEmpty(req.body))   console.log('%s %s', chalk.red('BODY:'), JSON.stringify(req.body))
    if(req.team)               console.log('%s %s', chalk.red('TEAM:'), req.team.get('title'))
    if(req.user)               console.log('%s %s', chalk.red('USER:'), req.user.get('full_name'))
    queries.forEach(query => {
      console.log('%s %s %s %s', chalk.green('SQL:'), query.sql, chalk.magenta(`{${query.bindings.join(', ')}}`), chalk.grey(`${query.duration}ms`))
    })
    console.log('%s %s rendered in %sms', chalk.red('RESPONSE:'), res.statusCode, moment().diff(started, 'milliseconds'))
    console.log('=========================================================')
    console.log('')

  })

}
