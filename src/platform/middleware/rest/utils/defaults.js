import Promise from 'bluebird'
import _ from 'lodash'
import { succeed } from 'platform/utils/responses'
import { applyToRecords, coerceArray } from '../utils'
import log from '../helpers/log'
import notify from '../helpers/notify'
import render from '../helpers/render'
import authenticator from '../helpers/authenticator'
import verifier from '../helpers/verifier'

export const defaultAuthenticator = (options) => {

  return authenticator(options)

}

export const defaultAuthorizer = (options) => {

  return (req) => {

    return new Promise((resolve, reject) => {

      if(!options.rights) return resolve()

      const allowed = options.rights.reduce((allowed, right) => {
        return allowed ? _.includes(req.rights, right) : false
      }, true)

      if(!allowed) return reject({ code: 403, message: 'You do not have the rights to access this resource.' })

      resolve()

    }).then(() => {

      if(!options.access) return true

      return Promise.map(coerceArray(options.access), fn => fn(req))

    })

  }

}

export const defaultVerifier = (options) => {

  return verifier(options)

}

export const defaultRenderer = (options) => {

  const renderer = render(options)

  return (req, result) => {

    if(!result) return null

    return (result.records) ? applyToRecords(req, result, renderer).then(result => result.records) : renderer(result)

  }

}

export const defaultActivity = (options, action) => {

  if(options.activity === undefined) {

    return (req, result, resolve, reject) => {

      const object1 = result.get('activity')

      if(!object1) resolve({})

      resolve({
        text: `${action} {object1}`,
        object1_type: object1.type,
        object1_text: object1.text
      })

    }

  } else if(options.activity !== false) {

    return options.activity

  }

  return null

}

export const defaultLogger = (activityCreator) => {

  return (req, result) => {

    if(!activityCreator) return result

    return new Promise((resolve, reject) => {

      return activityCreator(req, result, resolve, reject)

    }).then(activity => {

      return activity ? log(req, activity).then(() => result) : null

    }).then(() => {

      return result

    })

  }

}

export const defaultNotifier = (notificationCreator) => {

  return (req, result) => {

    if(!notificationCreator) return result

    return new Promise((resolve, reject) => {

      return notificationCreator(req, result, resolve, reject)

    }).then(notification => {

      return notification ? notify(req, notification).then(() => result) : null

    }).then(() => {

      return result

    })

  }


}

export const defaultResponder = (status, message) => {

  return (req, res, next, data) => {

    const extra = data ? { data } : null

    return succeed(res, status, message, extra)

  }

}
