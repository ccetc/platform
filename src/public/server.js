import { buildRouter } from 'platform/middleware/rest'
import apps from 'platform/middleware/apps'

export default buildRouter([
  {
    routes: apps('public')
  }
])
