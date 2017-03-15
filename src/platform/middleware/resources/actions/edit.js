import { resourceResponder } from '../utils'
import load from '../helpers/load'

export default options => {

  const processor = (req, resolve, reject) => load('show', options)(req).then(resolve)

  const renderer = (req, result) => Promise.resolve(result)

  const responder = resourceResponder(200, `Sucessfully found ${options.name}`)

  return { processor, renderer, responder }

}
