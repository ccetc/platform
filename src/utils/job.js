import { queue } from './services/kue'

queue.createJob('payment', {}).save()
