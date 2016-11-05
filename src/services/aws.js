import aws from 'aws-sdk'
import config from '../../config/platform'

aws.config.constructor(config[process.env.NODE_ENV].aws)

export default aws
