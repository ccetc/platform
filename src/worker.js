import BullUI from 'bull-ui/app'
import bull from 'bull'
import glob from 'glob'
import path from 'path'
import config from 'server/services/config'

const files = glob.sync(path.resolve(__dirname, '**/jobs/*_job.js'))
files.map(file => {
  const job = require(file)
  const queue = bull(job.queue, config.redis.port, config.redis.host)
  queue.process(job.process)
})

const app = BullUI({
  redis: config.redis
})

app.listen(config.worker.port, () => {
  console.log('Worker listening on port ', config.worker.port)
})
