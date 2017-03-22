import { resources } from 'platform/middleware/rest'
import Competency from '../../../models/competency'

export default resources({
  model: Competency,
  name: 'competency'
})
