import localforage from 'localforage'

export default localforage.createTeam({
  name: 'platform',
  storeName: 'cache'
})
