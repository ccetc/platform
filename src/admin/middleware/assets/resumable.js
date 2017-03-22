import fs from 'fs'
import path from 'path'
import Promise from 'bluebird'
import Asset from 'platform/models/asset'
import AssetSerializer from 'platform/serializers/asset_serializer'
import aws from 'platform/services/aws'

export const test = req => {

  return validateRequest(req.query, req.files, false).then(() => {

    return checkUploadedFile(req)

  })

}

export const upload = req => {

  return validateRequest(req.body, req.files, true).then(() => {

    return uploadChunk(req)

  })

}

const validateRequest = (params, files, requireFile) => {

  return new Promise((resolve, reject) => {

    const maxChunkSize = 1024 * 128
    const maxFileSize = 1024 * 1024 * 20
    const chunkNumber = params.resumableChunkNumber
    const chunkSize = params.resumableChunkSize
    const totalSize = params.resumableTotalSize
    const identifier = params.resumableIdentifier
    const filename = params.resumableFilename
    const totalChunks = params.resumableTotalChunks

    if (!chunkNumber || !chunkSize || !totalSize || !identifier || !filename || !totalChunks) {
      return reject({ message: 'non_resumable_request' })
    }

    if (parseInt(chunkNumber) > parseInt(totalChunks)) {
      return reject({ message: 'invalid_resumable_request1' })
    }

    if(parseInt(chunkSize) > parseInt(maxChunkSize)) {
      return reject({ message: 'invalid_resumable_request2' })
    }

    if(parseInt(totalSize) > parseInt(maxFileSize)) {
      return reject({ message: 'invalid_resumable_request3' })
    }

    if(requireFile) {

      const filesize = files['file'].size

      if(!files['file'] || !files['file'].size) {
        return reject({ message: 'invalid_resumable_request4' })
      }

      if(parseInt(chunkNumber) < parseInt(totalChunks) && parseInt(filesize) != parseInt(chunkSize)) {
        return reject({ message: 'invalid_resumable_request5' })
      }

    }

    resolve('valid')

  })

}

const checkUploadedFile = (req) => {

  const data = {
    file_size: req.query.resumableTotalSize,
    file_name: req.query.resumableFilename
  }

  return Asset.where(data).fetch().then(asset => {

    return new Promise((resolve, reject) => {

      if(asset) {
        return AssetSerializer(asset).then(data => resolve(data))
      }

      if(!fs.existsSync(getAssetFilename(req.query.resumableFilename)) || fs.existsSync(getChunkFilename(req.query.resumableIdentifier, req.query.resumableChunkNumber))) {
        return reject({ message: 'not_found' })
      }

      resolve('found')

    })

  })

}

const uploadChunk = (req) => {

  const chunkNumber = req.body.resumableChunkNumber
  const totalSize = req.body.resumableTotalSize
  const contentType = req.body.resumableType
  const totalChunks = req.body.resumableTotalChunks
  const identifier = cleanIdentifier(req.body.resumableIdentifier)
  const filename = req.body.resumableFilename
  const filepath = getAssetFilename(filename)

  return new Promise((resolve, reject) => {

    const chunkFilename = getChunkFilename(identifier, chunkNumber)

    fs.renameSync(req.files['file'].path, chunkFilename)

    const chunkArray = Array(parseInt(totalChunks)).fill()

    const completed = chunkArray.reduce((completed, chunk, index) => {
      return completed ? fs.existsSync(getChunkFilename(identifier, index + 1)) : false
    }, true)

    if(!completed) {
      return resolve('partly_done')
    }

    const filedata = Buffer.concat(chunkArray.map((i, index) => {
      return fs.readFileSync(getChunkFilename(identifier, index + 1))
    }))

    fs.writeFileSync(filepath, filedata)

    chunkArray.map((i, index) => {
      return fs.unlinkSync(getChunkFilename(identifier, index + 1))
    })

    return Asset.forge({
      team_id: req.team.get('id'),
      original_file_name: filename,
      file_name: filename,
      content_type: contentType,
      file_size: totalSize,
      chunks_total: totalChunks
    }).save().then(asset => {

      if(!asset) {
        return reject({ message: 'Unable to create asset' })
      }

      const data = {
        Bucket: process.env.AWS_BUCKET,
        Key: `assets/${asset.id}/${filename}`,
        ACL: 'public-read',
        Body: filedata,
        ContentType: contentType
      }

      const s3 = new aws.S3()

      return s3.upload(data).promise().then(results => {

        return fs.unlinkSync(filepath)

      }).then(() => {

        return AssetSerializer(asset)

      }).then(asset => {

        return resolve(asset)

      }).catch(err => {

        console.log(err)

        reject('Unable to upload asset')

      })

    })

  })

}

const cleanIdentifier = identifier => {
  return identifier.replace(/^0-9A-Za-z_-/img, '')
}

const getChunkFilename = (identifier, chunkNumber, ) => {
  return path.join('.', 'tmp', cleanIdentifier(identifier)+'.'+chunkNumber)
}

const getAssetFilename = (filename) => {
  return path.join('.', 'tmp', filename)
}
