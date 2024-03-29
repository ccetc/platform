import { resources } from 'platform/middleware/rest'
import Asset from 'platform/models/asset'
import AssetSerializer from 'platform/serializers/asset_serializer'

export default resources({
  name: 'asset',
  model: Asset,
  serializer: AssetSerializer
})
