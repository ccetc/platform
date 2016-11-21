import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import account from './portals/account/client'
import './portals/account/client.less'

ReactDOM.render(<Router routes={account} history={browserHistory} />, document.getElementById('platform'))
