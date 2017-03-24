import categories from './middleware/categories'
import classifications from './middleware/classifications'
import competencies from './middleware/competencies'
import plans from './middleware/plans'
import positions from './middleware/positions'
import programs from './middleware/programs'
import resources from './middleware/resources'

export default [
  ...categories,
  ...classifications,
  ...competencies,
  ...plans,
  ...positions,
  ...programs,
  ...resources
]
