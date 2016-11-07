import { queue } from '../../services/queue'
import mail from '../../utils/mail'

queue.process('send_reset_email', 20, function(job, done){
  mail(job.data)
  done()
})

const create = (data, done) => {
  queue.create('send_reset_email', data)
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
