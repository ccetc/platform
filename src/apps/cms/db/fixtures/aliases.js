module.exports = {
  tableName: "cms_aliases",
  records: [
    {
      id: 1,
      team_id: 1,
      website_id: 1,
      path: '/about-us',
      destination: '/content/nodes/1',
      is_primary: false,
      created_at: "2017-03-23T15:18:41.134Z",
      updated_at: "2017-03-23T15:18:41.135Z"
    },
    {
      id: 2,
      team_id: 1,
      website_id: 1,
      path: '/about',
      destination: '/content/nodes/1',
      is_primary: true,
      created_at: "2017-03-23T15:18:41.134Z",
      updated_at: "2017-03-23T15:18:41.135Z"
    }
  ]
}
