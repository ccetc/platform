import fs from 'fs'
import path from 'path'

const maxFileSize = null
const fileParameterName = 'file'

const cleanIdentifier = identifier => {
  return identifier.replace(/^0-9A-Za-z_-/img, '')
}

const getChunkFilename = (chunkNumber, identifier) => {
  identifier = cleanIdentifier(identifier)
  return path.join('./tmp', './tmp/resumable-'+identifier+'.'+chunkNumber)
}

const validateRequest = (chunkNumber, chunkSize, totalSize, identifier, filename, fileSize) => {
  identifier = cleanIdentifier(identifier)

  if (chunkNumber === 0 || chunkSize === 0 || totalSize === 0 || identifier.length === 0 || filename.length === 0) {
    return 'non_resumable_request'
  }

  const numberOfChunks = Math.max(Math.floor(totalSize / (chunkSize * 1.0)), 1)
  if (chunkNumber > numberOfChunks) {
    return 'invalid_resumable_request1'
  }

  if(maxFileSize && totalSize > maxFileSize) {
    return 'invalid_resumable_request2'
  }

  if(typeof(fileSize)!='undefined') {

    if(chunkNumber < numberOfChunks && fileSize != chunkSize) {
      return 'invalid_resumable_request3'
    }

    if(numberOfChunks > 1 && chunkNumber === numberOfChunks && fileSize != ((totalSize % chunkSize) + chunkSize)) {
      return 'invalid_resumable_request4'
    }

    if(numberOfChunks === 1 && fileSize != totalSize) {
      return 'invalid_resumable_request5'
    }
  }

  return 'valid'

}

export const get = function(req, callback){

  const chunkNumber = req.param('resumableChunkNumber', 0)
  const chunkSize = req.param('resumableChunkSize', 0)
  const totalSize = req.param('resumableTotalSize', 0)
  const identifier = req.param('resumableIdentifier', '')
  const filename = req.param('resumableFilename', '')

  if(validateRequest(chunkNumber, chunkSize, totalSize, identifier, filename) === 'valid') {
    const chunkFilename = getChunkFilename(chunkNumber, identifier)
    fs.exists(chunkFilename, exists => {
      if(exists){
        callback('found', chunkFilename, filename, identifier)
      } else {
        callback('not_found', null, null, null)
      }
    })
  } else {
    callback('not_found', null, null, null)
  }

}

export const post = function(req, callback){

  const fields = req.body
  const files = req.files
  const chunkNumber = fields['resumableChunkNumber']
  const chunkSize = fields['resumableChunkSize']
  const totalSize = fields['resumableTotalSize']
  const identifier = cleanIdentifier(fields['resumableIdentifier'])
  const filename = fields['resumableFilename']
  const original_filename = fields['resumableIdentifier']

  if(!files[fileParameterName] || !files[fileParameterName].size) {
    callback('invalid_resumable_request', null, null, null)
    return
  }

  const validation = validateRequest(chunkNumber, chunkSize, totalSize, identifier, files[fileParameterName].size)
  if(validation === 'valid') {
    const chunkFilename = getChunkFilename(chunkNumber, identifier)
    fs.rename(files[fileParameterName].path, chunkFilename, () => {
      let currentTestChunk = 1
      const numberOfChunks = Math.max(Math.floor(totalSize/(chunkSize*1.0)), 1)
      const testChunkExists = () => {
        fs.exists(getChunkFilename(currentTestChunk, identifier), exists => {
          if(exists) {
            currentTestChunk++
            if(currentTestChunk > numberOfChunks) {
              const data = Array(numberOfChunks).fill().map((i, index) => {
                return fs.readFileSync(getChunkFilename(index + 1, identifier))
              })
              fs.writeFileSync(path.join('./uploads', filename), Buffer.concat(data))
              callback('done', filename, original_filename, identifier)
            } else {
              testChunkExists()
            }
          } else {
            callback('partly_done', filename, original_filename, identifier)
          }
        })
      }
      testChunkExists()
    })
  } else {
    callback(validation, filename, original_filename, identifier)
  }
}

export default {
  get,
  post
}
