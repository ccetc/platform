import { queue } from '../../services/kue'

queue.process('payment', 20, function(job, done){
  done()
})

const create = (data, done) => {
  queue.create('payment', data)
  .priority('critical')
  .attempts(8)
  .backoff(true)
  .removeOnComplete(false)
  .save(err => {
    if (err) {
      done(err)
    }
    if (!err) {
      done()
    }
  })
}

export default { create }
