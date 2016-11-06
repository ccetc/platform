import localforage from 'localforage'

export default localforage.createInstance({
  name: 'platform',
  storeName: 'cache'
})
