import * as actionTypes from './action_types'
import api from 'admin/utils/api'

export function loadFiles(cid, ids) {
  return api.get({
    endpoint: '/admin/assets',
    params: { $ids: ids },
    meta: { cid },
    request: actionTypes.LOAD_FILES_REQUEST,
    success: actionTypes.LOAD_FILES_SUCCESS,
    failure: actionTypes.LOAD_FILES_FAILURE
  })
}

export function addFile(uniqueIdentifier, fileName, fileSize, contentType, totalChunks) {
  return {
    type: actionTypes.ADD_FILE,
    uniqueIdentifier,
    fileName,
    fileSize,
    contentType,
    totalChunks
  }
}

export function uploadBegin() {
  return {
    type: actionTypes.UPLOAD_BEGIN
  }
}

export function uploadProgress(uniqueIdentifier, progress) {
  return {
    type: actionTypes.UPLOAD_PROGRESS,
    uniqueIdentifier,
    progress
  }
}

export function uploadSuccess(uniqueIdentifier, response) {
  return {
    type: actionTypes.UPLOAD_SUCCESS,
    uniqueIdentifier,
    asset: response.data
  }
}

export function uploadFailure() {
  return {
    type: actionTypes.UPLOAD_FAILURE
  }
}

export function removeFile(uniqueIdentifier) {
  return {
    type: actionTypes.REMOVE_FILE,
    uniqueIdentifier
  }
}

export function uploadComplete() {
  return {
    type: actionTypes.UPLOAD_COMPLETE
  }
}
