import { resources } from 'platform/middleware/rest'
import Classification from '../../../models/classification'

export default resources({
  model: Classification,
  name: 'classification'
})
