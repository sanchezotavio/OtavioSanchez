'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactRouter = require('react-router');

var _homeComponent = require('./common/home.component.jsx');

var _homeComponent2 = _interopRequireDefault(_homeComponent);

var _projetosComponent = require('./common/projetos.component.jsx');

var _projetosComponent2 = _interopRequireDefault(_projetosComponent);

var _sobreComponent = require('./common/sobre.component.jsx');

var _sobreComponent2 = _interopRequireDefault(_sobreComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _reactDom.render)(_react2.default.createElement(
    _reactRouter.Router,
    null,
    _react2.default.createElement(_reactRouter.Route, { path: '/', component: _homeComponent2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: '/projetos', component: _projetosComponent2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: '/sobre', component: sobre })
), document.getElementById('container'));

/* Páginas */