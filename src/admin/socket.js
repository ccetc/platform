import Promise from 'bluebird'
import jwt from 'platform/services/jwt'

export default (socket) => {

  const subscriptions = []

  socket.on('join', (data) => {

    return new Promise((resolve, reject) => {

      if(!data.token) return reject({ room: data.room, message: 'no token provided' })

      const tokenData = jwt.decode(data.token)

      if(!tokenData.data.user_id) return reject('invalid token')

      if(data.room === `/admin/users/${tokenData.data.user_id}/notifications`) {
        subscriptions.push(data.room)
        socket.join(data.room)
        resolve({ room: data.room })
      }

    }).then(result => {

      return socket.emit('join', { room: result.room, success: true })


    }).catch(err => {

      socket.emit('join', { room: err.room, message: err.message, success: false })

    })

  })

  socket.on('leave', (data) => {
    socket.leave(data.room)
  })


}
