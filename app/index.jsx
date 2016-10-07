
import { Component } from 'react';

import { render } from 'react-dom';

import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import Main from './common/main.component.jsx'

/* Páginas */
import Home from './common/home.component.jsx'
import Projetos from './common/projetos.component.jsx'
import Sobre from './common/sobre.component.jsx'


render(
    <Router history={browserHistory}>
        <Route  path='/' component={Main}>
             <IndexRoute component={Home} />
            <Route path="projetos" component={Projetos}/>
            <Route path="sobre" component={Sobre}/>
        </Route>
    </Router>,
    document.getElementById('container')
);