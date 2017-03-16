import load from '../helpers/load'

export default options => {

  const processor = (req, resolve, reject) => load(options)(req).then(resolve)

  return {
    processor
  }

}
