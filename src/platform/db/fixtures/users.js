exports.seed = (knex, Promise) => {
  return knex('users').del()
    .then(() => {
      return Promise.all([
        knex('users').insert({
          instance_id: 1,
          first_name: 'Ken',
          last_name: 'Schlather',
          email: 'ks47@cornell.edu',
          password_salt: '$2a$10$wlhVrmkAu7H7Wttks/9vte',
          password_hash: '$2a$10$wlhVrmkAu7H7Wttks/9vte8KTY6afM7XHdKTXadrXlpvpVgfHyx6m'
        }),
        knex('users').insert({
          instance_id: 1,
          first_name: 'Sharon',
          last_name: 'Anderson',
          email: 'ska2@cornell.edu',
          password_salt: '$2a$10$wlhVrmkAu7H7Wttks/9vte',
          password_hash: '$2a$10$wlhVrmkAu7H7Wttks/9vte8KTY6afM7XHdKTXadrXlpvpVgfHyx6m'
        }),
        knex('users').insert({
          instance_id: 1,
          first_name: 'Sandy',
          last_name: 'Repp',
          email: 'sjr37@cornell.edu',
          password_salt: '$2a$10$wlhVrmkAu7H7Wttks/9vte',
          password_hash: '$2a$10$wlhVrmkAu7H7Wttks/9vte8KTY6afM7XHdKTXadrXlpvpVgfHyx6m',
          logged_out_at: new Date()
        }),
        knex('users').insert({
          instance_id: 1,
          first_name: 'Greg',
          last_name: 'Kops',
          email: 'gmk8@cornell.edu',
          password_salt: '$2a$10$wlhVrmkAu7H7Wttks/9vte',
          password_hash: '$2a$10$wlhVrmkAu7H7Wttks/9vte8KTY6afM7XHdKTXadrXlpvpVgfHyx6m'
        })
      ])
    })
}
