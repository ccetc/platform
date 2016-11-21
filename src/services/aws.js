import aws from 'aws-sdk'
import config from 'services/config'

aws.config.constructor(config.aws)

export default aws
