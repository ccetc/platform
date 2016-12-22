const Bookshelf = require('bookshelf')
const knex = require('server/services/knex')

const bookshelf = Bookshelf(knex)

bookshelf.plugin('virtuals')
bookshelf.plugin('pagination')

module.exports = bookshelf
