exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({
          id: 1,
          instance_id: 1,
          first_name: 'Greg',
          last_name: 'Kops',
          email: 'gmk8@cornell.edu'
        }),
        knex('users').insert({
          id: 2,
          instance_id: 1,
          first_name: 'Ken',
          last_name: 'Schlather',
          email: 'ks47@cornell.edu'
        })
      ])
    })
}
