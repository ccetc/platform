module.exports = {
  tableName: "cms_aliases",
  records: [
    {
      id: 1,
      team_id: 1,
      website_id: 1,
      path: '/sample',
      destination: '/content/nodes/1',
      is_primary: false,
      created_at: "2017-03-23T15:18:41.134Z",
      updated_at: "2017-03-23T15:18:41.135Z"
    },
    {
      id: 2,
      team_id: 1,
      website_id: 1,
      path: '/sample-page',
      destination: '/content/nodes/1',
      is_primary: true,
      created_at: "2017-03-23T15:18:41.134Z",
      updated_at: "2017-03-23T15:18:41.135Z"
    },
    {
      id: 3,
      team_id: 1,
      website_id: 1,
      path: '/sample-post',
      destination: '/content/nodes/2',
      is_primary: true,
      created_at: "2017-03-23T15:18:41.134Z",
      updated_at: "2017-03-23T15:18:41.135Z"
    },
    {
      id: 4,
      team_id: 1,
      website_id: 1,
      path: '/sample-event',
      destination: '/content/nodes/3',
      is_primary: true,
      created_at: "2017-03-23T15:18:41.134Z",
      updated_at: "2017-03-23T15:18:41.135Z"
    },
    {
      id: 5,
      team_id: 1,
      website_id: 1,
      path: '/sample-product',
      destination: '/content/nodes/4',
      is_primary: true,
      created_at: "2017-03-23T15:18:41.134Z",
      updated_at: "2017-03-23T15:18:41.135Z"
    }
  ]
}
