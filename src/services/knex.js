import knex from 'knex'
import config from '../../knexfile'

export default knex(config[process.env.NODE_ENV])
