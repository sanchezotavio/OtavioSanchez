import React from 'react'
import ReactDOM from 'react-dom'
import '../styles/scss/main.scss'

import {Router, hashHistory} from 'react-router';
import routes from './routes.js';
import './js/app';

const hashLinkScroll = () => {
    const {hash} = window.location;
    if (hash !== '') {
        setTimeout(() => {
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) 
                element.scrollIntoView();
            }
        , 0);
    }
}

ReactDOM.render(
    <Router history={hashHistory} routes={routes} onUpdate={hashLinkScroll}/>, document.getElementById('container'))