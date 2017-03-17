import emitter from 'socket.io-emitter'

var io = emitter(process.env.REDIS_URL)

export default io
