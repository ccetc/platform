import jwt from 'utils/jwt'

export default (socket, next) => {
  if(socket.handshake.query.token == 123) return next()
  next(new Error('Authentication error'))
}
