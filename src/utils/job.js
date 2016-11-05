import payment from './platform/jobs/payment'
import { queue } from './services/kue'

queue.createJob('payment', {}).save()
