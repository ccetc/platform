exports.seed = (knex, Promise) => {
  return knex('instances').del()
  .then(() => {
    return knex('instances').insert([
      {
        title: 'Cornell Cooperative Extension of Tompkins County'
      }
    ])
  })
  .then(() => {
    return knex('assets').del()
  })
  .then(() => {
    return knex('assets').insert([
      {
        instance_id: 1,
        original_file_name: 'ken.jpg',
        file_name: 'ken.jpg',
        content_type: 'image/jpeg',
        file_size: 12345,
        fingerprint: 'aefasdf7dsaf6sd87sda6f'
      }, {
        instance_id: 1,
        original_file_name: 'sharon.jpg',
        file_name: 'sharon.jpg',
        content_type: 'image/jpeg',
        file_size: 12345,
        fingerprint: 'aefasdf7dsaf6sd87sda6f'
      }, {
        instance_id: 1,
        original_file_name: 'sandy.jpg',
        file_name: 'sandy.jpg',
        content_type: 'image/jpeg',
        file_size: 12345,
        fingerprint: 'aefasdf7dsaf6sd87sda6f'
      }, {
        instance_id: 1,
        original_file_name: 'greg.jpg',
        file_name: 'greg.jpg',
        content_type: 'image/jpeg',
        file_size: 12345,
        fingerprint: 'aefasdf7dsaf6sd87sda6f'
      }
    ])
  })
  .then(() => {
    return knex('users').del()
  })
  .then(() => {
    return knex('users').insert([
      {
        instance_id: 1,
        first_name: 'Ken',
        last_name: 'Schlather',
        email: 'ks47@cornell.edu',
        password_salt: '$2a$10$wlhVrmkAu7H7Wttks/9vte',
        password_hash: '$2a$10$wlhVrmkAu7H7Wttks/9vte8KTY6afM7XHdKTXadrXlpvpVgfHyx6m',
        photo_id: 1
      }, {
        instance_id: 1,
        first_name: 'Sharon',
        last_name: 'Anderson',
        email: 'ska2@cornell.edu',
        password_salt: '$2a$10$wlhVrmkAu7H7Wttks/9vte',
        password_hash: '$2a$10$wlhVrmkAu7H7Wttks/9vte8KTY6afM7XHdKTXadrXlpvpVgfHyx6m',
        photo_id: 2
      }, {
        instance_id: 1,
        first_name: 'Sandy',
        last_name: 'Repp',
        email: 'sjr37@cornell.edu',
        password_salt: '$2a$10$wlhVrmkAu7H7Wttks/9vte',
        password_hash: '$2a$10$wlhVrmkAu7H7Wttks/9vte8KTY6afM7XHdKTXadrXlpvpVgfHyx6m',
        photo_id: 3,
        logged_out_at: new Date()
      }, {
        instance_id: 1,
        first_name: 'Greg',
        last_name: 'Kops',
        email: 'gmk8@cornell.edu',
        password_salt: '$2a$10$wlhVrmkAu7H7Wttks/9vte',
        password_hash: '$2a$10$wlhVrmkAu7H7Wttks/9vte8KTY6afM7XHdKTXadrXlpvpVgfHyx6m',
        photo_id: 4
      }
    ])
  })
  .then(() => {
    return knex('apps').del()
  })
  .then(() => {
    return knex('apps').insert([
      {
        title: 'CRM'
      }, {
        title: 'Expenses'
      }, {
        title: 'Instance'
      }
    ])
  })
}
