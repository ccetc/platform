
const minimist = require('minimist')
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const _ = require('lodash')
const path = require('path')

const snakeCase = _.snakeCase
const camelCase = _.camelCase
const pascalCase = _.flow(_.camelCase, _.capitalize)

const argv = minimist(process.argv.slice(2))
Object.freeze(argv)

const task = argv._[0]
const environment = {
  verbose: argv.v || argv.verbose || false
}

console.log(argv)

environment.logv = function(...logs) {
  if(environment.verbose) {
    console.log(...logs)
  }
}

function runTask(taskIdentifier, env = environment, argv = argv) {
  console.log(`Running ${taskIdentifier}...`)

  let segments = taskIdentifier.split(':')
  let [namespace, task, subtask, modifier] = segments

  switch(namespace) {
    case 'platform':
      const taskFile = path.resolve(`src/${namespace}/tasks/${task}.js`)
      return fs.statAsync(taskFile)
        .then(() => {
          const taskModule = require(taskFile)
          // Try invoking
          try {
            let localEnv = _.assign({}, environment)
            localEnv.run = (task) => runTask(task, env, argv)
            const result = taskModule[camelCase(subtask)](argv, localEnv, modifier)
            return Promise.resolve(result)
          } catch (e) {
            console.error(e)
            throw "Task could not be located or executed"
          }
        })
  }
}

runTask(task, environment, argv).then(console.log.bind(console)).then(() => process.exit(0))
