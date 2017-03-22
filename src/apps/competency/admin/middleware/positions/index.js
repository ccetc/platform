import { resources } from 'platform/middleware/rest'
import Position from '../../../models/position'

export default resources({
  model: Position,
  name: 'position'
})
