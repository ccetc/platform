
exports.seed = (knex, Promise) => {
  return knex('contacts').del()
    .then(() => {
      return Promise.all([
        knex('contacts').insert({
          instance_id: 1,
          first_name: 'Ken',
          last_name: 'Schlather',
          email: 'ks47@cornell.edu'
        }),
        knex('contacts').insert({
          instance_id: 1,
          first_name: 'Sharon',
          last_name: 'Anderson',
          email: 'ska2@cornell.edu'
        }),
        knex('contacts').insert({
          instance_id: 1,
          first_name: 'Sandy',
          last_name: 'Repp',
          email: 'sjr37@cornell.edu'
        }),
        knex('contacts').insert({
          instance_id: 1,
          first_name: 'Greg',
          last_name: 'Kops',
          email: 'gmk8@cornell.edu'
        })
      ])
    })
}
