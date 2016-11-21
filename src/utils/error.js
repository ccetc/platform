const names = {
  400: 'BadRequest',
  401: 'NotAuthenticated',
  402: 'PaymentError',
  403: 'Forbidden',
  404: 'NotFound',
  405: 'MethodNotAllowed',
  406: 'NotAcceptable',
  408: 'Timeout',
  409: 'Conflict',
  411: 'LengthRequired',
  422: 'Unprocessable',
  429: 'TooManyRequests',
  500: 'GeneralError',
  501: 'NotImplemented',
  502: 'BadGateway',
  503: 'Unavailable'
}

const defaults = {
  name: 'GeneralError',
  message: 'General error',
  code: 500,
  data: {},
  errors: {}
}

export default class Error {

  constructor(options) {

    this.error = {
      ...defaults,
      name: names[options.code],
      ...options
    }

  }

  toJSON() {
    return this.error
  }

  name() {
    return this.error.name
  }

  message() {
    return this.error.message
  }

  code() {
    return this.error.code
  }

  data() {
    return this.error.data
  }

  errors() {
    return this.error.errors
  }

}
