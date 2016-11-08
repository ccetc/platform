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
    res.json({ message: 'nonexistant token' }).status(401)
    return null
  }

  const matches = header.match('Bearer (.*)')
  if(!matches) {
    res.json({ message: 'malformed token' }).status(401)
    return null
  }

  return matches[1]

}

const with_token = (req, res, token, lifespan, user_id_key, threshold, callback) => {

  const data = decode(token)
  if(!data) {
    return res.json({ message: 'invalid token' }).status(401)
  }

  const timestamp = Math.round(new Date() / 1000)
  if(data.timestamp <= timestamp - lifespan) {
    return res.json({ message: 'expired token' }).status(401)
  }

  models.user.where({ id: data[user_id_key] }).fetch().then(user => {

    if(!user) {
      return res.json({ message: 'cannot find user' }).status(401)
    }

    const threshold = user.get(threshold)
    if(threshold && data.timestamp <= Math.round(threshold / 1000)) {
      return res.json({ message: 'expired token' }).status(401)
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
