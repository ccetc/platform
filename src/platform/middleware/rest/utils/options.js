import chalk from 'chalk'
import _ from 'lodash'
import { coerceArray } from './index'

export const validateOptions = (options, checks) => {

  const valid = checkOptions(options, checks)

  const name = options.prefix || options.name || ''

  if(valid !== true) {
    printOptionErrors(name, valid)
    throw(new Error())
  }

}

export const checkValidOptions = (options, keys) => {

  if(!keys) return []

  return Object.keys(options).reduce((errors, key) => ([
    ...errors,
    ...(!_.includes(keys, key) ? [`option "${key}" is invalid`] : [])
  ]), [])

}

export const checkRequiredOptions = (options, keys) => {

  if(!keys) return []

  return keys.reduce((errors, key) => ([
    ...errors,
    ...(!options[key] ? [`attribute "${key}" is required`] : [])
  ]), [])

}

export const checkOptionType = (options, keys, types) => {

  if(!keys) return []

  const getOperation = (type) => {
    if(type === 'array') return _.isArray
    if(type === 'boolean') return _.isBoolean
    if(type === 'function') return _.isFunction
    if(type === 'integer') return _.isInteger
    if(type === 'object') return _.isObject
    if(type === 'string') return _.isString
  }

  const allowed = coerceArray(types)

  return keys.reduce((errors, key) => {

    const value = options[key]

    const valid = allowed.reduce((valid, type) => {

      return valid || getOperation(type)(value)

    }, false)


    return [
      ...errors,
      ...(value && !valid ? [`attribute "${key}" must be a ${allowed.join(' or ')}`] : [])
    ]

  }, [])

}

export const checkMappedOptions = (options, keys) => {

  if(!keys) return []

  const customActions = options.actions ? Object.keys(options.actions) : []

  const allowedActions = [
    ...['all','create','destroy','list','show','update'],
    ...customActions
  ]

  return keys.reduce((errors, key) => {

    if(_.isUndefined(options[key]) || !_.isPlainObject(options[key])) return errors

    const mappedActions = Object.keys(options[key])

    return [
      ...errors,
      ...checkMappedOption(key, mappedActions, allowedActions)
    ]

  }, [])

}

export const checkMappedOption = (key, mappedActions, allowedActions) => {

  return mappedActions.reduce((errors, action) => ([
    ...errors,
    ...(!_.includes(allowedActions, action) ? [`"${key}" maps an invalid action "${action}"`] : [])
  ]), [])

}

export const checkOptions = (options, checks) => {

  const errors = [
    ...checkValidOptions(options, checks.valid),
    ...checkRequiredOptions(options, checks.required),
    ...checkMappedOptions(options, checks.mapped),
    ...checkOptionType(options, checks.array_or_string, ['array','string']),
    ...checkOptionType(options, checks.object_or_function, ['object','function']),
    ...checkOptionType(options, checks.boolean, 'boolean'),
    ...checkOptionType(options, checks.string, 'string'),
    ...checkOptionType(options, checks.integer, 'integer'),
    ...checkOptionType(options, checks.function, 'function')
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
