import React from 'react'
import _ from 'lodash'
import { getActiveTeam } from 'admin/components/admin/selectors'
import Resumable from 'resumablejs'
import bytes from 'bytes'
import component from 'admin/components/component'
import * as actions from './actions'

class FileField extends React.Component {

  static propTypes = {
    files: React.PropTypes.array,
    multiple: React.PropTypes.bool,
    prompt: React.PropTypes.string,
    status: React.PropTypes.string,
    onAddFile: React.PropTypes.func,
    onUploadBegin: React.PropTypes.func,
    onUploadProgress: React.PropTypes.func,
    onUploadProcess: React.PropTypes.func,
    onUploadSuccess: React.PropTypes.func,
    onUploadFailure: React.PropTypes.func,
    onRemoveFile: React.PropTypes.func,
    onChangeFile: React.PropTypes.func
  }

  static defaultProps = {
    prompt: 'Choose File(s)',
    multiple: false
  }

  render() {
    const { files, multiple, prompt, status } = this.props
    let classes = ['filefield', status]
    return (
      <div className={classes.join(' ')}>
        { files.map((file, index) => {
          return (
            <div key={`filefield_${index}`} className="filefield-token">
              <div className="filefield-details">
                { _.includes(['added'], file.status) &&
                  <div className="ui small progress" />
                }
                { file.status === 'uploading' &&
                  <div className="filefield-progress">
                    <div className="ui small green progress" ref={`filefield_${file.uniqueIdentifier}_progress`}>
                      <div className="bar" />
                    </div>
                    <p>
                      { file.fileName } <span>({ bytes(file.fileSize, { decimalPlaces: 2, unitSeparator: ' ' }).toUpperCase() })</span>
                    </p>
                  </div>
                }
                { file.status === 'success' &&
                  <div className="filefield-preview">
                    <img src={file.asset.thumbnail_url} />
                    <div className="filefield-preview-caption">
                      <p>
                        { file.fileName } ({ bytes(file.fileSize, { decimalPlaces: 2, unitSeparator: ' ' }).toUpperCase() })
                      </p>
                    </div>
                  </div>
                }
              </div>
              <div className="filefield-remove">
                <i className="remove circle icon" onClick={ this._handleRemoveFile.bind(this, file.uniqueIdentifier) }/>
              </div>
            </div>
          )
        }) }
        { (files.length === 0 || multiple === true) &&
          <div ref="browseButton" className="ui browse button">
            { prompt }
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    const { cid, defaultValue, onLoadFiles } = this.props
    const ids = !_.isArray(defaultValue) ? [defaultValue] : defaultValue
    onLoadFiles(cid, ids)
    this._initializeResumable()
  }

  componentDidUpdate(prevProps) {
    const { files } = this.props
    if(files.length > prevProps.files.length) {
      this._handleUploadBegin()
    } else if(files.length <= prevProps.files.length && this.refs.browse) {
      this._initializeResumable()
    }
    files.map((file, index) => {
      if(!prevProps.files[index] || prevProps.files[index].progress < file.progress) {
        $(this.refs[`filefield_${file.uniqueIdentifier}_progress`]).progress({
          percent: file.progress
        })
      }
    })
  }

  _initializeResumable() {
    const { multiple, team } = this.props
    this.resumable = new Resumable({
      target: '/api/admin/assets/upload',
      chunkSize: 1024 * 8,
      maxFiles: multiple ? undefined : 1,
      headers: {
        'Authorization': `Bearer ${team.token}`
      }
    })
    this.resumable.on('fileAdded', this._handleFileAdded.bind(this))
    this.resumable.on('fileProgress', this._handleUploadProgress.bind(this))
    this.resumable.on('fileSuccess', this._handleUploadSuccess.bind(this))
    this.resumable.on('error', this._handleUploadFailure.bind(this))
    this.resumable.on('complete', this._handleUploadComplete.bind(this))
    this.resumable.assignBrowse(this.refs.browseButton)
  }

  _handleFileAdded(file) {
    this.props.onAddFile(file.uniqueIdentifier, file.file.name, file.file.size, file.file.type, file.chunks.length)
  }

  _handleUploadBegin() {
    this.resumable.upload()
    this.props.onUploadBegin()
  }

  _handleUploadProgress(file) {
    this.props.onUploadProgress(file.file.uniqueIdentifier, file.progress())
  }

  _handleUploadFailure(file, message) {
    this.props.onUploadFailure(message)
  }

  _handleUploadSuccess(file, message) {
    const asset = JSON.parse(message)
    this.props.onUploadSuccess(file.file.uniqueIdentifier, asset)
    this.props.onChange(asset.id)
  }

  _handleRemoveFile(uniqueIdentifier) {
    const file = this.resumable.getFromUniqueIdentifier(uniqueIdentifier)
    this.resumable.removeFile(file)
    this.props.onRemoveFile(uniqueIdentifier)
  }

  _handleUploadComplete() {
    this.props.onUploadComplete()
  }

}

const mapStateToProps = (state, props) => ({
  files: state.filefield[props.cid].files,
  status: state.filefield[props.cid].status,
  team: getActiveTeam(state)
})

const mapDispatchToProps = {
  onLoadFiles: actions.loadFiles,
  onAddFile: actions.addFile,
  onUploadBegin: actions.uploadBegin,
  onUploadProgress: actions.uploadProgress,
  onUploadProcess: actions.uploadProcess,
  onUploadFailure: actions.uploadFailure,
  onUploadSuccess: actions.uploadSuccess,
  onRemoveFile: actions.removeFile,
  onUploadComplete: actions.uploadComplete
}

export default component(mapStateToProps, mapDispatchToProps, FileField, 'filefield', true)
