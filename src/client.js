import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import platform from './platform/client'
import './client.scss'

ReactDOM.render(<Router routes={platform} history={browserHistory} />, document.getElementById('platform'))
