
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

function loadTask(taskIdentifier, env = environment, argv = argv) {
  console.log(`Running ${taskIdentifier}...`)

  let segments = taskIdentifier.split(':')
  let [namespace, task, subtask, modifier] = segments

  let searchPaths = [
    path.resolve(`src/${namespace}/tasks/${task}.js`),
    path.resolve(`src/apps/${namespace}/tasks/${task}.js`),
    path.resolve(`src/platform/apps/${namespace}/tasks/${task}.js`),
    path.resolve(`src/workbench/${namespace}/tasks/${task}.js`)
  ]

  return Promise.all(searchPaths.map(p => fs.statAsync(p).then(() => p).catch(e => null)))
    .tap(console.log.bind(console))
    .then(results => _.compact(results))
    .then(tasks => _.first(tasks))
    .then(task => {
      if(! task) {
        throw `Could not locate task ${taskIdentifier}`
      }
      else {
        return task
      }
    })
    .then(task => executeTask(task, subtask, modifier, env, argv))
}

function executeTask(module, subtask, modifier, env, args) {
  return fs.statAsync(module)
    .then(() => {
      const taskModule = require(module)
      // Try invoking
      try {
        let localEnv = _.assign({}, environment)
        localEnv.run = (task) => loadTask(task, env, args)
        const result = taskModule[camelCase(subtask)](args, localEnv, modifier)
        return Promise.resolve(result)
      } catch (e) {
        console.error(e)
        throw "Task could not be located or executed"
      }
    })
}

loadTask(task, environment, argv)
  .then(console.log.bind(console))
  .catch(console.error.bind(console))
  .finally(() => process.exit(0))
