import log from 'platform/middleware/rest/helpers/log'

export default (type, action) => {

  return (req, resource) => {

    const verb = (resource.get('is_submitted')) ? 'submitted' : action

    return resource.load(['project']).then(() => {

      return log(req, `${verb} {object1} in {object2}`, type, resource.get('description'), 'project', resource.related('project').get('title')).then(() => resource)

    })

  }

}
