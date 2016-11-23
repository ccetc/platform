import jwt from 'jsonwebtoken'
import config from 'server/services/config'

const encode = (data, duration) => {

  const iat = Math.floor(Date.now() / 1000)
  const exp = iat + duration
  return jwt.sign({ iat, exp, data }, config.secret)

}

const decode = (token) => {
  return jwt.verify(token, config.secret)
}

export default {
  encode,
  decode
}
