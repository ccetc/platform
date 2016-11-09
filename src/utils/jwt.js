import jwtSimple from 'jwt-simple'
import config from '../services/config'
import models from '../platform/models'

const encode = (json) => {

  const timestamp = Math.round(new Date() / 1000)
  const payload = { ...json, timestamp }
  return jwtSimple.encode(payload, config.secret)

}

const decode = (token) => {

  try {
    return jwtSimple.decode(token, config.secret)
  } catch (e) {
    return null
  }

}

const extract_token_from_header = (req, res) => {

  const header = req.header('Authorization')
  if(!header) {
    res.status(401).json({ message: 'nonexistant token' })
    return null
  }

  const matches = header.match('Bearer (.*)')
  if(!matches) {
    res.status(401).json({ message: 'malformed token' })
    return null
  }

  return matches[1]

}

const with_token = (req, res, token, lifespan, user_id_key, threshold, callback) => {

  const data = decode(token)
  if(!data) {
    return res.status(401).json({ message: 'invalid token' })
  }

  const timestamp = Math.round(new Date() / 1000)
  if(data.timestamp <= timestamp - lifespan) {
    return res.status(401).json({ message: 'expired token' })
  }

  models.user.where({ id: data[user_id_key] }).fetch().then(user => {

    if(!user) {
      return res.status(401).json({ message: 'cannot find user' })
    }

    const threshold = user.get(threshold)
    if(threshold && data.timestamp <= Math.round(threshold / 1000)) {
      return res.status(401).json({ message: 'expired token' })
    }

    return callback(req, res, user)

  })

}

export default {
  encode,
  decode,
  extract_token_from_header,
  with_token
}
