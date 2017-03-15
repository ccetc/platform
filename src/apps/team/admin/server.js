import access from './middleware/access'
import activities from './middleware/activities'
import appAuthors from './middleware/app_authors'
import appCategories from './middleware/app_categories'
import apps from './middleware/apps'
import assets from './middleware/assets'
import roles from './middleware/roles'
import searches from './middleware/searches'
import users from './middleware/users'

export default [
  ...access,
  ...activities.routes,
  ...appAuthors.routes,
  ...appCategories.routes,
  ...apps.routes,
  ...assets.routes,
  ...roles.routes,
  ...searches.routes,
  ...users.routes
]
