
import { Component } from 'react';

import { render } from 'react-dom';

import Main from './common/main.component.jsx'

/* Páginas */
import Home from './common/home.component.jsx'
import Projetos from './common/projetos.component.jsx'
import Sobre from './common/sobre.component.jsx'


render(
    <Home />,
    document.getElementById('container')
);