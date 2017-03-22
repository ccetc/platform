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

      const competencies = toMatrix('competencies.tsv', '\t')

      const data = competencies.reduce((data, record) => {


        const category = findOrCreate(data.categories, { title: record[0].replace("'",'') })

        const competency = findOrCreate(data.competencies, { category_id: category.id, title: record[1].replace("'",'') })

        const skill = findOrCreate(data.skills, { competency_id: competency.id, level: record[2], description: record[3].replace("'",'') })

        const id = data.resources.length + 1

        data.resources.push({
          id,
          team_id: 1,
          skill_id: skill.id,
          title: record[4].replace("'",''),
          description: record[5].replace("'",''),
          url: record[6],
          created_at: moment(),
          updated_at: moment()
        })

        return data

      }, { categories: [], competencies: [], skills: [], resources: [] })

      return new Promise(function(resolve, reject) {

        fs.writeFileSync(path.join(__dirname, '..', 'db', 'fixtures', 'categories.js'), `module.exports = ${toJSON({ tableName: 'competency_categories', records: data.categories })}`, reject)

        fs.writeFileSync(path.join(__dirname, '..', 'db', 'fixtures', 'competencies.js'), `module.exports = ${toJSON({ tableName: 'competency_competencies', records: data.competencies })}`, reject)

        fs.writeFileSync(path.join(__dirname, '..', 'db', 'fixtures', 'skills.js'), `module.exports = ${toJSON({ tableName: 'competency_skills', records: data.skills })}`, reject)

        fs.writeFileSync(path.join(__dirname, '..', 'db', 'fixtures', 'resources.js'), `module.exports = ${toJSON({ tableName: 'competency_resources', records: data.resources })}`, reject)

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

const findOrCreate = (collection, data) => {

  const item = _.find(collection, data)

  if(item) return item

  const id = collection.length + 1

  const newitem = _.assign({
    id,
    team_id: 1
  }, data, {
    created_at: moment(),
    updated_at: moment()
  })

  collection.push(newitem)

  return newitem

}
