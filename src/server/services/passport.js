const passport = require('passport')
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
const config = require('server/services/config')
const User = require('platform/models/user')

module.exports = (key) => {

  const fromUrl = (req) => {
    const matches = req.path.match(/[\w\-]*\.[\w\-]*\.[\w\-]*/)
    return (matches) ? matches[0] : null
  }

  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderWithScheme('Bearer'), fromUrl]),
    secretOrKey: config.secret
  }

  passport.use(new JwtStrategy(jwtOptions, function(payload, done) {

    if(!payload.data[key]) {
      return done(null, false, { message: 'invalid jwt' })
    }

    return User.where({ id: payload.data[key] }).fetch({ withRelated: ['photo'] }).then(user => {

      if(!user) {
        return done(null, false, { message: 'cannot find user' })
      }

      return done(null, user, payload)

    }).catch(err => {
      return done(null, false, { message: 'unable to load user' })
    })

  }))

  passport.use(new LocalStrategy({ usernameField: 'email' }, (username, password, done) => {

    return User.where({ email: username }).fetch().then(user => {

      if(!user) {
        return done(null, false, { message: 'cannot find user' })
      }

      if(!user.authenticate(password)) {
        return done(null, false, { message: 'invalid password' })
      }

      return done(null, user)

    })

  }))

  return passport

}
