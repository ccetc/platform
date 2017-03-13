import log from 'platform/middleware/resources/helpers/log'

export default (type, action) => {

  return (req, resource) => {

    return resource.load(['project']).then(() => {

      return log(req, `${action} {object1} in {object2}`, type, resource.get('description'), 'project', resource.related('project').get('title')).then(() => resource)

    })

  }

}
