import aws from 'aws-sdk'
import config from './config'

aws.config.constructor(config.aws)

export default aws
