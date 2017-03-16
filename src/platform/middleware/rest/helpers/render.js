import _ from 'lodash'
import cache from '../helpers/cache'

export default (options) => {

  return (result) => {

    const serialize = () => {

      if(!options.serializer) {
        return result
      }

      return _.isPlainObject(result) ? result.toJSON() : options.serializer(result)

    }

    if(options.cacheFor) {

      const key = `${options.name}-${result.get('id')}-${Math.floor(result.get('updated_at').getTime() / 1000)}`

      return cache(key, options.cacheFor, serialize)

    }

    return serialize()

  }

}
