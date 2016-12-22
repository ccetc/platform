import { Router } from 'express'
import User from 'platform/models/user'

const session = Router()

session.get('/session', (req, res, next) => {
  User.where({ id: req.user.id }).fetch({ withRelated: ['photo', 'rights', 'apps'] }).then(user => {
    res.json({
      user: {
        name: user.get('full_name'),
        email: user.get('email'),
        photo: user.related('photo').get('url'),
        unread: Math.floor((Math.random() * 20) + 1),
        rights: user.related('rights').map(right => right.get('text'))
      }
    })
  })
})

export default session
