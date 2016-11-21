import Bookshelf from 'bookshelf'
import knex from 'services/knex'

const bookshelf = Bookshelf(knex)

bookshelf.plugin('virtuals')

export default bookshelf
