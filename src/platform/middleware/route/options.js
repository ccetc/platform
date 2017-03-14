import chalk from 'chalk'
import _ from 'lodash'
import { coerceArray } from './utils'

const VALID_OPTIONS = ['access','after','authenticated','authorizer','alter','before','cacheFor','handler','logger','method','path','processor','renderer','responder','rights','serializer','story']
const REQUIRED_OPTIONS = ['method','path']

export const validateOptions = (options) => {

  const valid = checkOptions(options)

  const name = options.prefix || options.name || ''

  if(valid !== true) {
    printOptionErrors(name, valid)
    throw(new Error())
  }

}

export const checkValidOptions = (options, valid) => {

  return Object.keys(options).reduce((errors, option) => ([
    ...errors,
    ...(!_.includes(valid, option) ? [`option "${option}" is invalid`] : [])
  ]), [])

}

export const checkRequiredOptions = (options, required) => {

  return required.reduce((errors, option) => ([
    ...errors,
    ...(!options[option] ? [`attribute "${option}" is required`] : [])
  ]), [])

}

export const checkOptionType = (options, names, types) => {

  const getOperation = (type) => {
    if(type === 'array') return _.isArray
    if(type === 'boolean') return _.isBoolean
    if(type === 'function') return _.isFunction
    if(type === 'integer') return _.isInteger
    if(type === 'object') return _.isObject
    if(type === 'string') return _.isString
  }

  const allowed = coerceArray(types)

  return names.reduce((errors, option) => {

    const value = options[option]

    const valid = allowed.reduce((valid, type) => {

      return valid || getOperation(type)(value)

    }, false)


    return [
      ...errors,
      ...(value && !valid ? [`attribute "${option}" must be a ${allowed.join(' or ')}`] : [])
    ]

  }, [])

}

export const checkOptions = (options) => {

  const errors = [
    ...checkValidOptions(options, VALID_OPTIONS),
    ...checkRequiredOptions(options, REQUIRED_OPTIONS)
  ]

  return (errors.length === 0) ? true : errors

}

export const printOptionErrors = (name, issues) => {

  [
    chalk.red('================================================================================'),
    chalk.white(`Unable to build resource '${name}'`),
    chalk.red('================================================================================'),
    chalk.white('We found the following problems with your configuration:'),
    ...issues.map(issue => chalk.grey('> ' + issue)),
    chalk.red('================================================================================')
  ].map(statement => console.log(statement))

}

export const normalizeOptions = (userOptions) => {

  const defaultOptions = {
    authenticated: true
  }

  return {
    ...defaultOptions,
    ...userOptions
  }

}
