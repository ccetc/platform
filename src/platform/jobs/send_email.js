import { queue } from 'server/services/queue'
import mail from 'server/utils/mail'

queue.process('send_reset_email', 20, function(job, done){
  mail(job.data)
  done()
})
