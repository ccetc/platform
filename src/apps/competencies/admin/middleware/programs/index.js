import { resources } from 'platform/middleware/rest'
import Program from '../../../models/program'

export default resources({
  model: Program,
  name: 'program'
})
