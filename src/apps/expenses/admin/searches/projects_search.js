import Promise from 'bluebird'
import Project from '../../models/project'

export default filters => {

  return new Promise((resolve, reject) => {

    Project.query(qb => {

      const term = `%${filters.q.toLowerCase()}%`
      qb.whereRaw('LOWER(title) LIKE ?', [term])

    }).fetchAll().then(results => {

      const json = results.map(result => ({
        text: result.get('title'),
        subtext: null,
        route: `/admin/expenses/projects/${result.get('id')}`
      }))

      resolve(json)

    }).catch(reject)

  })

}
