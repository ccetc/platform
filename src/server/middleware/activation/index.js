import { Router } from 'express'
import Error from 'server/utils/error'
import passport from 'server/services/passport'

export const middleware = (req, res, next) => {

  passport('activation_user_id').authenticate('jwt', { session: false }, (err, user, info) => {

    if(err) {
      const error = new Error({ code: 401, message: err  })
      return next(error)
    }

    if(!user) {
      const error = new Error({ code: 401, message: info.message })
      return next(error)
    }

    req.user = user
    next()
    return null

  })(req, res, next)

}

export const claim = (req, res, next) => {
  res.status(201).json({ success: true })
}

export const security = (req, res, next) => {

  if(!req.body.security_question_1_answer && !req.body.security_question_2_answer) {
    const error = new Error({ code: 422, message: 'you must provide the answer to at least 1 security question' })
    return next(error)
  }

  if(req.body.security_question_1_answer && req.body.security_question_1_answer !== req.user.get('security_question_1_answer')) {
    const error = new Error({ code: 422, message: 'your answer does not match the one we have on file' })
    return next(error)
  }

  if(req.body.security_question_2_answer && req.body.security_question_2_answer !== req.user.get('security_question_2_answer')) {
    const error = new Error({ code: 422, message: 'your answer does not match the one we have on file' })
    return next(error)
  }


  return res.status(200).json({ success: true })

}

export const password = (req, res, next) => {
  res.json({ success: req.user })
}

const router = Router()
router.get('/activation/:token', claim)
router.use('/activation*', middleware)
router.get('/activation/security', security)
router.get('/activation/password', password)

export default router
