import { defaultRenderer, defaultResponder } from '../utils/defaults'
import load from '../helpers/load'

export default options => {

  const processor = (req, resolve, reject) => load(options)(req).then(resolve)

  return {
    processor,
    renderer: defaultRenderer(options),
    responder: defaultResponder(200, 'Success')
  }

}
