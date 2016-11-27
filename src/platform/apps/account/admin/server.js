import { Router } from 'express'
import resource from 'server/middleware/resource'
import User from 'platform/models/user'
import UserSerializer from 'platform/serializers/user_serializer'

const admin = Router()

admin.use(resource({
  name: 'account',
  path: 'account',
  model: User,
  serializer: UserSerializer,
  include: ['photo']
}))

export default admin
