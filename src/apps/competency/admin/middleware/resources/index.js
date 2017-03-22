import { resources } from 'platform/middleware/rest'
import Resource from '../../../models/resource'

export default resources({
  filterParams: ['skill_id'],
  model: Resource,
  name: 'resource'
})
