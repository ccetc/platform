import config from 'server/services/config'
import Bull from 'bull'

export default (name, data) => {

  const queue = Bull(name, config.redis.port, config.redis.host)
  queue.add(data)

}
