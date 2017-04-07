import React from 'react'
import ReactDOM from 'react-dom'
import '../styles/scss/main.scss'

import {Router, hashHistory} from 'react-router';
import routes from './routes.js';
import './js/app';

ReactDOM.render(<Router history={hashHistory} routes={routes}/>, document.getElementById('container'))