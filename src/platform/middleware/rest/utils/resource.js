import pluralize from 'pluralize'
import _ from 'lodash'
import { validateOptions } from './options'

export const buildResource = (userOptions) => {

  validateOptions(userOptions)

  const options = normalizeOptions(userOptions)

  return [
    {
      method: options.method,
      path: options.path,
      handler: options.handler
    }
  ]

}

export const normalizeOptions = (userOptions) => {

  const defaultOptions = {
    authenticated: true,
    actions: [],
    defaultSort: '-created_at',
    ownedByTeam: true,
    ownedByUser: false,
    primaryKey: 'id',
    resources: [],
    softDelete: false
  }

  return {
    ...defaultOptions,
    ...userOptions,
    access: mapOptionToActions(userOptions.access),
    alter: mapOptionToActions(userOptions.alter),
    after: mapOptionToActions(userOptions.after),
    allowedParams: mapOptionToActions(userOptions.allowedParams),
    authorizer: mapOptionToActions(userOptions.authorizer),
    before: mapOptionToActions(userOptions.before),
    log: mapOptionToActions(userOptions.log),
    logger: mapOptionToActions(userOptions.logger),
    path: userOptions.path || pluralize(userOptions.name),
    processor: mapOptionToActions(userOptions.processor),
    query:  mapOptionToActions(userOptions.query),
    renderer: mapOptionToActions(userOptions.renderer),
    responder: mapOptionToActions(userOptions.responder),
    rights: mapOptionToActions(userOptions.rights),
    serializer: mapOptionToActions(userOptions.serializer),
    withRelated: mapOptionToActions(userOptions.withRelated)
  }

}

// maps a single value to all if the value is not already mapped to one or more
// actions
export const mapOptionToActions = (value) => {

  return value !== null ? (!_.isPlainObject(value) ? { all: value } : value) : {}

}
