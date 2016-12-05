import { Router } from 'express'
import resources from 'server/middleware/resources'
import App from 'platform/models/app'
import Asset from 'platform/models/asset'
import Search from 'platform/models/search'
import User from 'platform/models/user'
import AppSerializer from 'platform/serializers/app_serializer'
import AssetSerializer from 'platform/serializers/asset_serializer'
import SearchSerializer from 'platform/serializers/search_serializer'
import UserSerializer from 'platform/serializers/user_serializer'

const admin = Router()

admin.get('/activities', (req, res, next) => {
  res.status(200).json({
    status: 200,
    data: [
      { id: 1, story: { text: 'created the expense {subject} in the project {object1}' }, user: { id: 1, full_name: 'Ken Schlather', photo: '/images/ken.jpg'}, subject: { text: 'food supplies' }, object1: { text: 'Primitive Pursuits' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'created the expense {subject} in the project {object1}' }, user: { id: 1, full_name: 'Greg Kops', photo: '/images/greg.jpg'}, subject: { text: 'food supplies' }, object1: { text: 'Primitive Pursuits' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'created the expense {subject} in the project {object1}' }, user: { id: 1, full_name: 'Sandy Rep', photo: '/images/sandy.jpg'}, subject: { text: 'food supplies' }, object1: { text: 'Primitive Pursuits' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'created the expense {subject} in the project {object1}' }, user: { id: 1, full_name: 'Sharon Anderson', photo: '/images/sharon.jpg'}, subject: { text: 'food supplies' }, object1: { text: 'Primitive Pursuits' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'created the expense {subject} in the project {object1}' }, user: { id: 1, full_name: 'Ken Schlather', photo: '/images/ken.jpg'}, subject: { text: 'food supplies' }, object1: { text: 'Primitive Pursuits' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'created the expense {subject} in the project {object1}' }, user: { id: 1, full_name: 'Greg Kops', photo: '/images/greg.jpg'}, subject: { text: 'food supplies' }, object1: { text: 'Primitive Pursuits' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'created the expense {subject} in the project {object1}' }, user: { id: 1, full_name: 'Sandy Rep', photo: '/images/sandy.jpg'}, subject: { text: 'food supplies' }, object1: { text: 'Primitive Pursuits' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'created the expense {subject} in the project {object1}' }, user: { id: 1, full_name: 'Sharon Anderson', photo: '/images/sharon.jpg'}, subject: { text: 'food supplies' }, object1: { text: 'Primitive Pursuits' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'created the expense {subject} in the project {object1}' }, user: { id: 1, full_name: 'Ken Schlather', photo: '/images/ken.jpg'}, subject: { text: 'food supplies' }, object1: { text: 'Primitive Pursuits' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'created the expense {subject} in the project {object1}' }, user: { id: 1, full_name: 'Greg Kops', photo: '/images/greg.jpg'}, subject: { text: 'food supplies' }, object1: { text: 'Primitive Pursuits' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'created the expense {subject} in the project {object1}' }, user: { id: 1, full_name: 'Sandy Rep', photo: '/images/sandy.jpg'}, subject: { text: 'food supplies' }, object1: { text: 'Primitive Pursuits' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'created the expense {subject} in the project {object1}' }, user: { id: 1, full_name: 'Sharon Anderson', photo: '/images/sharon.jpg'}, subject: { text: 'food supplies' }, object1: { text: 'Primitive Pursuits' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'created the expense {subject} in the project {object1}' }, user: { id: 1, full_name: 'Ken Schlather', photo: '/images/ken.jpg'}, subject: { text: 'food supplies' }, object1: { text: 'Primitive Pursuits' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'created the expense {subject} in the project {object1}' }, user: { id: 1, full_name: 'Greg Kops', photo: '/images/greg.jpg'}, subject: { text: 'food supplies' }, object1: { text: 'Primitive Pursuits' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'created the expense {subject} in the project {object1}' }, user: { id: 1, full_name: 'Sandy Rep', photo: '/images/sandy.jpg'}, subject: { text: 'food supplies' }, object1: { text: 'Primitive Pursuits' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'created the expense {subject} in the project {object1}' }, user: { id: 1, full_name: 'Sharon Anderson', photo: '/images/sharon.jpg'}, subject: { text: 'food supplies' }, object1: { text: 'Primitive Pursuits' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'created the expense {subject} in the project {object1}' }, user: { id: 1, full_name: 'Ken Schlather', photo: '/images/ken.jpg'}, subject: { text: 'food supplies' }, object1: { text: 'Primitive Pursuits' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'created the expense {subject} in the project {object1}' }, user: { id: 1, full_name: 'Greg Kops', photo: '/images/greg.jpg'}, subject: { text: 'food supplies' }, object1: { text: 'Primitive Pursuits' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'created the expense {subject} in the project {object1}' }, user: { id: 1, full_name: 'Sandy Rep', photo: '/images/sandy.jpg'}, subject: { text: 'food supplies' }, object1: { text: 'Primitive Pursuits' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'created the expense {subject} in the project {object1}' }, user: { id: 1, full_name: 'Sharon Anderson', photo: '/images/sharon.jpg'}, subject: { text: 'food supplies' }, object1: { text: 'Primitive Pursuits' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'created the expense {subject} in the project {object1}' }, user: { id: 1, full_name: 'Ken Schlather', photo: '/images/ken.jpg'}, subject: { text: 'food supplies' }, object1: { text: 'Primitive Pursuits' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'created the expense {subject} in the project {object1}' }, user: { id: 1, full_name: 'Greg Kops', photo: '/images/greg.jpg'}, subject: { text: 'food supplies' }, object1: { text: 'Primitive Pursuits' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'created the expense {subject} in the project {object1}' }, user: { id: 1, full_name: 'Sandy Rep', photo: '/images/sandy.jpg'}, subject: { text: 'food supplies' }, object1: { text: 'Primitive Pursuits' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'created the expense {subject} in the project {object1}' }, user: { id: 1, full_name: 'Sharon Anderson', photo: '/images/sharon.jpg'}, subject: { text: 'food supplies' }, object1: { text: 'Primitive Pursuits' }, object2: null, created_at: new Date() }
    ],
    skip: 0,
    limit: 50,
    total: 1000
  })
})

admin.use(resources({
  name: 'app',
  path: 'apps',
  model: App,
  serializer: AppSerializer
}))

admin.use(resources({
  name: 'asset',
  path: 'assets',
  model: Asset,
  serializer: AssetSerializer
}))

admin.use(resources({
  name: 'search',
  path: 'searches',
  model: Search,
  serializer: SearchSerializer,
  only: ['find','create','remove']
}))

admin.use(resources({
  name: 'user',
  path: 'users',
  model: User,
  serializer: UserSerializer,
  include: ['photo']
}))

export default admin
