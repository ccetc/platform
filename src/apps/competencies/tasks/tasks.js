require('platform/services/environment')

const Promise = require('bluebird')
const fs = require('fs')
const path = require('path')
const parse = require('csv-parse/lib/sync')
const _ = require('lodash')
const moment = require('moment')

module.exports = {

  import(args, environment) {

    try {

      const competencies = toMatrix('competencies.tsv', '\t').slice(1)

      const data = competencies.reduce((data, record) => {

        const category = findOrCreate(data.categories, { title: sanitize(record[0]) }, true)

        const competency = findOrCreate(data.competencies, { category_id: category.id, title: sanitize(record[1]), level: record[2], description: sanitize(record[3]) }, true, { title: sanitize(record[1]) })

        const resource = findOrCreate(data.resources, { title: sanitize(record[4]), description: sanitize(record[5]), url: record[6] }, true, { title: sanitize(record[4]) })

        data.competencies_resources.push({
          competency_id: competency.id,
          resource_id: resource.id
        })

        return data

      }, { categories: [], competencies: [], resources: [], competencies_resources: [] })

      return new Promise(function(resolve, reject) {

        fs.writeFileSync(path.join(__dirname, '..', 'db', 'fixtures', 'categories.js'), `module.exports = ${toJSON({ tableName: 'competencies_categories', records: data.categories })}`, reject)

        fs.writeFileSync(path.join(__dirname, '..', 'db', 'fixtures', 'competencies.js'), `module.exports = ${toJSON({ tableName: 'competencies_competencies', records: data.competencies })}`, reject)

        fs.writeFileSync(path.join(__dirname, '..', 'db', 'fixtures', 'resources.js'), `module.exports = ${toJSON({ tableName: 'competencies_resources', records: data.resources })}`, reject)

        fs.writeFileSync(path.join(__dirname, '..', 'db', 'fixtures', 'competencies_resources.js'), `module.exports = ${toJSON({ tableName: 'competencies_competencies_resources', records: data.competencies_resources })}`, reject)

        resolve()

      })

    } catch(e) {
      console.log(e)
    }

  }

}

const toJSON = (object) => {
  return JSON.stringify(object, null, '  ').replace(/\"(\w*)\"\:/g, '$1:').replace(/\'/g, '')
}

const toMatrix = (filename, delimiter) => {
  return parse(fs.readFileSync(path.join(__dirname, '..', '..', '..', '..', 'data', filename), 'utf8'), { delimiter, quote: '^' })
}

const sanitize = (string) => {
  return string.replace("'",'').trim()
}

const findOrCreate = (collection, data, withId, compare = null) => {

  const item = _.find(collection, compare || data)

  if(item) return item

  const id = collection.length + 1

  const base = (withId) ? { id, team_id: 1 } : { team_id: 1 }

  const newitem = _.assign(base, data, {
    created_at: moment(),
    updated_at: moment()
  })

  collection.push(newitem)

  return newitem

}
