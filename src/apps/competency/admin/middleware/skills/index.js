import { resources } from 'platform/middleware/rest'
import Skill from '../../../models/skill'

export default resources({
  filterParams: ['level','competency_id'],
  model: Skill,
  name: 'skill'
})
