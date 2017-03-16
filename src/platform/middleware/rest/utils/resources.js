import pluralize from 'pluralize'
import _ from 'lodash'
import { coerceArray, mergeParams } from './index'
import { validateOptions } from './options'
import { buildHandler } from './index'
import { buildRoute } from './route'

export const buildResources = (userOptions) => {

  const checks = {
    valid: ['access','actions','activity','after','allowedParams','authorizer','alter','before','cacheFor','defaultParams','defaultSort','dependents','except','filterParams','log','logger','model','name','notification','only','ownedByTeam','ownedByUser','path','pathPrefix','prefix','processor','query','renderer','resources','responder','rights','searchParams','serializer','softDelete','sortParams','withRelated'],
    required: ['name','model'],
    mapped: ['access','activity','alter','after','allowedParams','authorizer','before','log','logger','notification','processor','query','renderer','responder','rights','serializer','withRelated'],
    array_or_string: ['allowedParams','defaultSort','except','filterParams','only','searchParams','sortParams','withRelated'],
    object_or_function: ['actions','after','authorizer','alter','before','logger','processor','renderer','responder','serializer'],
    boolean: ['ownedByTeam','ownedByUser','softDelete'],
    integer: ['cacheFor'],
    string: ['name','path','pathPrefix','prefix'],
    function: ['defaultParams']
  }

  validateOptions(userOptions, checks)

  const options = normalizeOptions(userOptions)

  const prefix = options.prefix ? `${options.prefix}_` : `${options.name}_`

  const pathPrefix = options.pathPrefix || ''

  return [
    ...buildCustomRoutes(options, prefix, pathPrefix),
    ...buildStandardRoutes(options, prefix, pathPrefix),
    ...buildNestedRoutes(options, prefix, pathPrefix)
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
    activity: mapOptionToActions(userOptions.activity),
    alter: mapOptionToActions(userOptions.alter),
    after: mapOptionToActions(userOptions.after),
    allowedParams: mapOptionToActions(userOptions.allowedParams),
    authorizer: mapOptionToActions(userOptions.authorizer),
    before: mapOptionToActions(userOptions.before),
    log: mapOptionToActions(userOptions.log),
    logger: mapOptionToActions(userOptions.logger),
    notification: mapOptionToActions(userOptions.notification),
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

export const mapOptionToActions = (value) => {

  return value !== null ? (!_.isPlainObject(value) ? { all: value } : value) : {}

}

export const buildCustomRoutes = (options, prefix, pathPrefix) => {

  return Object.keys(options.actions).reduce((routes, name) => {

    const action = options.actions[name]

    const routeOptions = {
      ..._.omit(action, ['on']),
      path: (action.on === 'collection') ? `${pathPrefix}/${options.path}/${action.path}` : `${pathPrefix}/${options.path}/:id/${action.path}`
    }

    return [
      ...routes,
      buildRoute(routeOptions)
    ]

  }, [])

}

export const buildStandardRoutes = (options, prefix, pathPrefix) => {

  const routes = [
    { name: 'list', method: 'get', path: '(\.:ext)?' },
    { name: 'create', method: 'post', path: '' },
    { name: 'show', method: 'get', path: '/:id' },
    { name: 'edit', method: 'get', path: '/:id/edit' },
    { name: 'update', method: 'patch', path: '/:id' },
    { name: 'destroy', method: 'delete', path: '/:id' }
  ]

  return routes.reduce((routes, route) => {

    if(!includeAction(route.name, options.only, options.except)) {
      return routes
    }

    return [
      ...routes,
      buildStandardRoute(options, route, pathPrefix)
    ]

  }, [])

}

export const buildStandardRoute = (options, route, pathPrefix) => {

  const builder = require(`../actions/${route.name}`).default

  const handlerOptions = {
    access: mergeParams(options.access.all, options.access[route.name]),
    activity: options.activity[route.name] || options.activity.all,
    after: mergeParams(options.after.all, options.after[route.name]),
    allowedParams: mergeParams(options.allowedParams.all, options.allowedParams[route.name]),
    alter: mergeParams(options.alter.all, options.alter[route.name]),
    authenticated: options.authenticated,
    before: mergeParams(options.before.all, options.before[route.name]),
    cacheFor: options.cacheFor,
    defaultParams: options.defaultParams,
    defaultSort: options.defaultSort,
    filterParams: options.filterParams,
    log: options.log[route.name] || options.log.all,
    model: options.model,
    name: options.name,
    notification: options.notification[route.name] || options.notification.all,
    ownedByTeam: options.ownedByTeam,
    ownedByUser: options.ownedByUser,

    method: route.method,
    path: route.path,

    query: options.query[route.name] || options.query.all,
    rights: mergeParams(options.rights.all, options.rights[route.name]),
    serializer: options.serializer[route.name] || options.serializer.all,
    searchParams: options.searchParams,
    sortParams: options.sortParams,
    withRelated: options.withRelated[route.name] || options.withRelated.all
  }

  const handler = buildHandler(builder, handlerOptions)

  const routeOptions = {
    method: route.method,
    path: `${pathPrefix}/${options.path}${route.path}`,
    handler
  }

  return buildRoute(routeOptions)

}

export const buildNestedRoutes = (options, prefix, pathPrefix) => {

  return options.resources.reduce((routes, resource) => [
    ...routes,
    ...buildResources({
      ...resource,
      pathPrefix: `${pathPrefix}/${options.path}/:${options.name}_id`
    })
  ], [])

}

export const includeAction = (action, only, except) => {

  if(only) {
    const included = coerceArray(only)
    if(!_.includes(included, action)) {
      return false
    }
  } else if(except) {
    const excluded = coerceArray(except)
    if(_.includes(excluded, action)) {
      return false
    }
  }

  return true

}
