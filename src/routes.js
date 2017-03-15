require('platform/services/environment')

import { printRoutingTable } from 'platform/middleware/resources/utils'
import { adminRoutes } from 'admin/server'

const method = process.argv[2] || 'all'

printRoutingTable(adminRoutes, method)

process.exit()
