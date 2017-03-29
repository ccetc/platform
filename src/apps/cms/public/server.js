import Promise from 'bluebird'
import Alias from 'apps/cms/models/alias'
import Domain from 'apps/cms/models/domain'
import Revision from 'apps/cms/models/revision'

export default (req, res, next) => {

  return router(req, res)

}

const NODE_PATH = /^\/content\/nodes\/(\d*)$/
const USER_PATH = /^\/content\/users\/(\d*)$/
const SEARCH_PATH = /^\/content\/search$/

const router = (req, res) => {

  return Promise.resolve().then(() => {

    return lookupDomain(req)

  }).then(result => {

    if(result.response) return result

    return lookupPath(req, result)

  }).then(result => {

    if(result.response) return result

    return buildResponse(result)

  }).then(result => {

    renderResponse(res, result.response)

  }).catch(err => {

    res.send(err)

  })

}

const lookupDomain = (req) => {

  return Domain.where({ name: req.hostname }).fetch({ withRelated: ['website'] }).then(domain => {

    if(!domain) {
      return {
        response: {
          status: 404,
          result: 'invalid domain'
        }
      }
    }

    const website = domain.related('website')

    if(!domain.get('is_primary')) {

      return Domain.where({ website_id: website.get('id'), is_primary: true }).fetch().then(domain => {

        return {
          response: {
            redirect: `http://${domain.get('name')}:${process.env.SERVER_PORT}${req.path}`
          }
        }

      })

    }

    return {
      website
    }

  })

}


const lookupPath = (req, result) => {

  return Alias.where({ website_id: result.website.get('id'), path: req.path }).fetch().then(alias => {

    if(!alias) {
      return {
        response: {
          status: 404,
          result: 'invalid path'
        }
      }
    }

    if(!alias.get('is_primary')) {


      return Alias.where({ destination: alias.get('destination'), is_primary: true }).fetch().then(alias => {

        return {
          response: {
            redirect: `${req.protocol}://${req.get('host')}${alias.get('path')}`
          }
        }

      })

    }

    return {
      ...result,
      alias
    }

  })

}

const buildResponse = (result) => {

  const destination = result.alias.get('destination')

  if(destination.match(NODE_PATH)) {
    const parts = destination.match(NODE_PATH)
    return buildNodeResponse(parts[1], result)
  }

}

const buildNodeResponse = (node_id, result) => {

  return Revision.where({ node_id }).fetch({ withRelated: ['node'] }).then(revision => {

    return {
      ...result,
      response: {
        status: 200,
        content: revision.get('data').body
      }
    }

  })

}

const renderResponse = (res, response) => {

  if(response.redirect) {

    res.redirect(response.redirect)

  } else if(response.status) {

    res.status(response.status).send(response.content)

  }

}
