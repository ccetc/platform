import rest from 'rest'
import mime from 'rest/interceptor/mime'
import defaultRequest from 'rest/interceptor/defaultRequest'
import errorCode from 'rest/interceptor/errorCode'
import params from 'rest/interceptor/params'

export default rest.wrap(params).wrap(mime).wrap(defaultRequest).wrap(errorCode)
