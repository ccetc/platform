require('platform/services/environment')

import { printRoutingTable } from 'platform/middleware/rest/utils/console'
import { apiRoutes } from 'admin/server'

const method = process.argv[2] || 'all'

printRoutingTable(apiRoutes, method)

process.exit()
