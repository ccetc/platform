import { resources } from 'platform/middleware/rest'
import Category from '../../../models/category'

export default resources({
  model: Category,
  name: 'category'
})
