
import { Component } from 'react';

import { render } from 'react-dom';

import Main from './common/main.component.jsx'

/* Páginas */
import Sobre from './common/sobre.component.jsx'

render(
    <Sobre />,
    document.getElementById('container')
);