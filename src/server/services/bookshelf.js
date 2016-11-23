import Bookshelf from 'bookshelf'
import knex from 'server/services/knex'

const bookshelf = Bookshelf(knex)

bookshelf.plugin('virtuals')
bookshelf.plugin('pagination')

export default bookshelf
