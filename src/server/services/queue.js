
const dotenv = require('dotenv')
const Bull = require('bull')

dotenv.config({ path: '.env.' + process.env.NODE_ENV })

export default (name, data) => {

  const queue = Bull(name, process.env.REDIS_PORT, process.env.REDIS_HOST)
  queue.add(data)

}
