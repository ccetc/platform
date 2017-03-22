import Promise from 'bluebird'
import Domain from 'apps/cms/models/domain'
import Alias from 'apps/cms/models/alias'

export default (req, res, next) => {

  return router(req, res)

}

const router = (req, res) => {

  return Promise.resolve().then(() => {

    return lookupDomain(req.hostname, res)

  }).then(website => {

    return lookupPath(website, req.path)

  }).then(() => {

    res.send('<p>This is a test</p>')

  }).catch(err => {

    res.send(err)

  })

}

const lookupDomain = (hostname, res) => {

  return Domain.where({ name: hostname }).fetch({ withRelated: ['website'] }).then(domain => {

    if(!domain) return () => { res.status(404).send('Invalid domain') }

    const website = domain.related('website')

    if(!domain.get('is_primary')) {

      return Domain.where({ website_id: website.get('id'), is_primary: true }).fetch().then(domain => {

        return () => { res.redirect(`http://${domain.get('name')}`) }

      })

    }



  })

}


const lookupPath = (website, pathname) => {

  return Alias.where({ website_id: website.get('id'), path: pathname }).fetch(alias => {

    if(!alias) reject('invalid path')

    resolve(alias)

  })

}
