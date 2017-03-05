import fs from 'fs'
import path from 'path'

const maxFileSize = null
const fileParameterName = 'file'

const cleanIdentifier = identifier => {
  return identifier.replace(/^0-9A-Za-z_-/img, '')
}

const getChunkFilename = (identifier, chunkNumber, ) => {
  return path.join('.', 'tmp', 'resumable-'+cleanIdentifier(identifier)+'.'+chunkNumber)
}

const getAssetFilename = (filename) => {
  return path.join('.', 'assets', filename)
}

const validateRequest = (chunkNumber, chunkSize, totalSize, identifier, filename, fileSize) => {

  if (!chunkNumber || !chunkSize || !totalSize || !identifier || !filename) {
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

export const test = function(req, callback){

  const chunkNumber = req.query.resumableChunkNumber
  const chunkSize = req.query.resumableChunkSize
  const totalSize = req.query.resumableTotalSize
  const identifier = req.query.resumableIdentifier
  const filename = req.query.resumableFilename

  const validation = validateRequest(chunkNumber, chunkSize, totalSize, identifier, filename)

  if(validation !== 'valid') {
    return callback(validation)
  }

  if(fs.existsSync(getAssetFilename(filename)) || fs.existsSync(getChunkFilename(identifier, chunkNumber))) {
    return callback('found')
  }

  callback('not_found')

}

export const upload = function(req, callback){

  const chunkNumber = req.body.resumableChunkNumber
  const chunkSize = req.body.resumableChunkSize
  const totalSize = req.body.resumableTotalSize
  const totalChunks = req.body.resumableTotalChunks
  const identifier = cleanIdentifier(req.body.resumableIdentifier)
  const filename = req.body.resumableFilename
  const original_filename = req.body.resumableIdentifier

  if(!req.files[fileParameterName] || !req.files[fileParameterName].size) {
    callback('invalid_resumable_request')
    return
  }

  const validation = validateRequest(chunkNumber, chunkSize, totalSize, identifier, req.files[fileParameterName].size)

  if(validation !== 'valid') {
    return callback(validation, filename, original_filename, identifier)
  }

  const chunkFilename = getChunkFilename(identifier, chunkNumber)

  fs.renameSync(req.files[fileParameterName].path, chunkFilename)

  const chunkArray = Array(parseInt(totalChunks)).fill()

  const completed = chunkArray.reduce((completed, chunk, index) => {
    return completed ? fs.existsSync(getChunkFilename(identifier, index + 1)) : false
  }, true)

  if(!completed) {
    return callback('partly_done')
  }

  const data = chunkArray.map((i, index) => {
    return fs.readFileSync(getChunkFilename(identifier, index + 1))
  })

  fs.writeFileSync(path.join('./assets', filename), Buffer.concat(data))

  chunkArray.map((i, index) => {
    return fs.unlinkSync(getChunkFilename(identifier, index + 1))
  })

  callback('done')

}
