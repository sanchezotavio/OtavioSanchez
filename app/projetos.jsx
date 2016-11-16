
import { Component } from 'react';

import { render } from 'react-dom';

import Main from './common/main.component.jsx'

/* Páginas */
import Projetos from './common/projetos.component.jsx'

render(
    <Projetos />,
    document.getElementById('container')
);