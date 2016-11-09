import config from './config'
import emitter from 'socket.io-emitter'

export default emitter(config.redis)
