import { Router } from 'express'
import service from 'server/middleware/service'
import App from 'platform/models/app'
import Asset from 'platform/models/asset'
import User from 'platform/models/user'
import AppSerializer from './serializers/app_serializer'
import AssetSerializer from './serializers/asset_serializer'
import UserSerializer from './serializers/user_serializer'

const admin = Router()
admin.use('/apps', service(App, { serializer: AppSerializer }))
admin.use('/assets', service(Asset, { serializer: AssetSerializer }))
admin.use('/users', service(User, { serializer: UserSerializer, include: ['photo'] }))

export default admin
