import { resources } from 'platform/middleware/rest'
import Plan from '../../../models/plan'

export default resources({
  model: Plan,
  name: 'plan'
})
