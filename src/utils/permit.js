import _ from 'lodash'

const permit = (body, allowed) => _(body).pick(allowed).omitBy(_.isNil).value()

export default permit
