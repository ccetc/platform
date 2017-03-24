import { resources } from 'platform/middleware/rest'
import Competency from '../../../models/competency'

export default resources({
  filterParams: ['category_id'],
  model: Competency,
  name: 'competency',
  sortParams: ['title'],
  searchParams: ['title','description']
})
