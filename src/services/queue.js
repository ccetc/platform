import kue from 'kue'
import config from 'services/config'

const queue = kue.createQueue({
  prefix: 'q',
  redis: config.redis
})

queue.watchStuckJobs(1000 * 10)

queue.on('ready', () => {
})

queue.on('error', (err) => {
})

export { queue }

export default kue
