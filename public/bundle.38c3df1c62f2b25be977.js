webpackJsonp([1],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = routerWarning;
exports._resetWarned = _resetWarned;

var _warning = __webpack_require__(259);

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var warned = {};

function routerWarning(falseToWarn, message) {
  // Only issue deprecation warnings once.
  if (message.indexOf('deprecated') !== -1) {
    if (warned[message]) {
      return;
    }

    warned[message] = true;
  }

  message = '[react-router] ' + message;

  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  _warning2.default.apply(undefined, [falseToWarn, message].concat(args));
}

function _resetWarned() {
  warned = {};
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (undefined !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;


/***/ }),
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = function() {};

if (undefined !== 'production') {
  warning = function(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
        '`warning(condition, format, ...args)` requires a warning ' +
        'message argument'
      );
    }

    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
      throw new Error(
        'The warning format should be able to uniquely identify this ' +
        'warning. Please, use a more descriptive format than: ' + format
      );
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' +
        format.replace(/%s/g, function() {
          return args[argIndex++];
        });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch(x) {}
    }
  };
}

module.exports = warning;


/***/ }),
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.isReactChildren = isReactChildren;
exports.createRouteFromReactElement = createRouteFromReactElement;
exports.createRoutesFromReactChildren = createRoutesFromReactChildren;
exports.createRoutes = createRoutes;

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isValidChild(object) {
  return object == null || _react2.default.isValidElement(object);
}

function isReactChildren(object) {
  return isValidChild(object) || Array.isArray(object) && object.every(isValidChild);
}

function createRoute(defaultProps, props) {
  return _extends({}, defaultProps, props);
}

function createRouteFromReactElement(element) {
  var type = element.type;
  var route = createRoute(type.defaultProps, element.props);

  if (route.children) {
    var childRoutes = createRoutesFromReactChildren(route.children, route);

    if (childRoutes.length) route.childRoutes = childRoutes;

    delete route.children;
  }

  return route;
}

/**
 * Creates and returns a routes object from the given ReactChildren. JSX
 * provides a convenient way to visualize how routes in the hierarchy are
 * nested.
 *
 *   import { Route, createRoutesFromReactChildren } from 'react-router'
 *
 *   const routes = createRoutesFromReactChildren(
 *     <Route component={App}>
 *       <Route path="home" component={Dashboard}/>
 *       <Route path="news" component={NewsFeed}/>
 *     </Route>
 *   )
 *
 * Note: This method is automatically used when you provide <Route> children
 * to a <Router> component.
 */
function createRoutesFromReactChildren(children, parentRoute) {
  var routes = [];

  _react2.default.Children.forEach(children, function (element) {
    if (_react2.default.isValidElement(element)) {
      // Component classes may have a static create* method.
      if (element.type.createRouteFromReactElement) {
        var route = element.type.createRouteFromReactElement(element, parentRoute);

        if (route) routes.push(route);
      } else {
        routes.push(createRouteFromReactElement(element));
      }
    }
  });

  return routes;
}

/**
 * Creates and returns an array of routes from the given object which
 * may be a JSX route, a plain object route, or an array of either.
 */
function createRoutes(routes) {
  if (isReactChildren(routes)) {
    routes = createRoutesFromReactChildren(routes);
  } else if (routes && !Array.isArray(routes)) {
    routes = [routes];
  }

  return routes;
}

/***/ }),
/* 18 */,
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.extractPath = extractPath;
exports.parsePath = parsePath;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = __webpack_require__(12);

var _warning2 = _interopRequireDefault(_warning);

function extractPath(string) {
  var match = string.match(/^https?:\/\/[^\/]*/);

  if (match == null) return string;

  return string.substring(match[0].length);
}

function parsePath(path) {
  var pathname = extractPath(path);
  var search = '';
  var hash = '';

  undefined !== 'production' ? _warning2['default'](path === pathname, 'A path must be pathname + search + hash only, not a fully qualified URL like "%s"', path) : undefined;

  var hashIndex = pathname.indexOf('#');
  if (hashIndex !== -1) {
    hash = pathname.substring(hashIndex);
    pathname = pathname.substring(0, hashIndex);
  }

  var searchIndex = pathname.indexOf('?');
  if (searchIndex !== -1) {
    search = pathname.substring(searchIndex);
    pathname = pathname.substring(0, searchIndex);
  }

  if (pathname === '') pathname = '/';

  return {
    pathname: pathname,
    search: search,
    hash: hash
  };
}

/***/ }),
/* 20 */,
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.routes = exports.route = exports.components = exports.component = exports.history = undefined;
exports.falsy = falsy;

var _react = __webpack_require__(3);

var func = _react.PropTypes.func;
var object = _react.PropTypes.object;
var arrayOf = _react.PropTypes.arrayOf;
var oneOfType = _react.PropTypes.oneOfType;
var element = _react.PropTypes.element;
var shape = _react.PropTypes.shape;
var string = _react.PropTypes.string;
function falsy(props, propName, componentName) {
  if (props[propName]) return new Error('<' + componentName + '> should not have a "' + propName + '" prop');
}

var history = exports.history = shape({
  listen: func.isRequired,
  push: func.isRequired,
  replace: func.isRequired,
  go: func.isRequired,
  goBack: func.isRequired,
  goForward: func.isRequired
});

var component = exports.component = oneOfType([func, string]);
var components = exports.components = oneOfType([component, object]);
var route = exports.route = oneOfType([object, element]);
var routes = exports.routes = oneOfType([route, arrayOf(route)]);

/***/ }),
/* 22 */,
/* 23 */,
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Indicates that navigation was caused by a call to history.push.
 */


exports.__esModule = true;
var PUSH = 'PUSH';

exports.PUSH = PUSH;
/**
 * Indicates that navigation was caused by a call to history.replace.
 */
var REPLACE = 'REPLACE';

exports.REPLACE = REPLACE;
/**
 * Indicates that navigation was caused by some other action such
 * as using a browser's back/forward buttons and/or manually manipulating
 * the URL in a browser's location bar. This is the default.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate
 * for more information.
 */
var POP = 'POP';

exports.POP = POP;
exports['default'] = {
  PUSH: PUSH,
  REPLACE: REPLACE,
  POP: POP
};

/***/ }),
/* 25 */,
/* 26 */,
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.compilePattern = compilePattern;
exports.matchPattern = matchPattern;
exports.getParamNames = getParamNames;
exports.getParams = getParams;
exports.formatPattern = formatPattern;

var _invariant = __webpack_require__(8);

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function _compilePattern(pattern) {
  var regexpSource = '';
  var paramNames = [];
  var tokens = [];

  var match = void 0,
      lastIndex = 0,
      matcher = /:([a-zA-Z_$][a-zA-Z0-9_$]*)|\*\*|\*|\(|\)/g;
  while (match = matcher.exec(pattern)) {
    if (match.index !== lastIndex) {
      tokens.push(pattern.slice(lastIndex, match.index));
      regexpSource += escapeRegExp(pattern.slice(lastIndex, match.index));
    }

    if (match[1]) {
      regexpSource += '([^/]+)';
      paramNames.push(match[1]);
    } else if (match[0] === '**') {
      regexpSource += '(.*)';
      paramNames.push('splat');
    } else if (match[0] === '*') {
      regexpSource += '(.*?)';
      paramNames.push('splat');
    } else if (match[0] === '(') {
      regexpSource += '(?:';
    } else if (match[0] === ')') {
      regexpSource += ')?';
    }

    tokens.push(match[0]);

    lastIndex = matcher.lastIndex;
  }

  if (lastIndex !== pattern.length) {
    tokens.push(pattern.slice(lastIndex, pattern.length));
    regexpSource += escapeRegExp(pattern.slice(lastIndex, pattern.length));
  }

  return {
    pattern: pattern,
    regexpSource: regexpSource,
    paramNames: paramNames,
    tokens: tokens
  };
}

var CompiledPatternsCache = Object.create(null);

function compilePattern(pattern) {
  if (!CompiledPatternsCache[pattern]) CompiledPatternsCache[pattern] = _compilePattern(pattern);

  return CompiledPatternsCache[pattern];
}

/**
 * Attempts to match a pattern on the given pathname. Patterns may use
 * the following special characters:
 *
 * - :paramName     Matches a URL segment up to the next /, ?, or #. The
 *                  captured string is considered a "param"
 * - ()             Wraps a segment of the URL that is optional
 * - *              Consumes (non-greedy) all characters up to the next
 *                  character in the pattern, or to the end of the URL if
 *                  there is none
 * - **             Consumes (greedy) all characters up to the next character
 *                  in the pattern, or to the end of the URL if there is none
 *
 *  The function calls callback(error, matched) when finished.
 * The return value is an object with the following properties:
 *
 * - remainingPathname
 * - paramNames
 * - paramValues
 */
function matchPattern(pattern, pathname) {
  // Ensure pattern starts with leading slash for consistency with pathname.
  if (pattern.charAt(0) !== '/') {
    pattern = '/' + pattern;
  }

  var _compilePattern2 = compilePattern(pattern);

  var regexpSource = _compilePattern2.regexpSource;
  var paramNames = _compilePattern2.paramNames;
  var tokens = _compilePattern2.tokens;


  if (pattern.charAt(pattern.length - 1) !== '/') {
    regexpSource += '/?'; // Allow optional path separator at end.
  }

  // Special-case patterns like '*' for catch-all routes.
  if (tokens[tokens.length - 1] === '*') {
    regexpSource += '$';
  }

  var match = pathname.match(new RegExp('^' + regexpSource, 'i'));
  if (match == null) {
    return null;
  }

  var matchedPath = match[0];
  var remainingPathname = pathname.substr(matchedPath.length);

  if (remainingPathname) {
    // Require that the match ends at a path separator, if we didn't match
    // the full path, so any remaining pathname is a new path segment.
    if (matchedPath.charAt(matchedPath.length - 1) !== '/') {
      return null;
    }

    // If there is a remaining pathname, treat the path separator as part of
    // the remaining pathname for properly continuing the match.
    remainingPathname = '/' + remainingPathname;
  }

  return {
    remainingPathname: remainingPathname,
    paramNames: paramNames,
    paramValues: match.slice(1).map(function (v) {
      return v && decodeURIComponent(v);
    })
  };
}

function getParamNames(pattern) {
  return compilePattern(pattern).paramNames;
}

function getParams(pattern, pathname) {
  var match = matchPattern(pattern, pathname);
  if (!match) {
    return null;
  }

  var paramNames = match.paramNames;
  var paramValues = match.paramValues;

  var params = {};

  paramNames.forEach(function (paramName, index) {
    params[paramName] = paramValues[index];
  });

  return params;
}

/**
 * Returns a version of the given pattern with params interpolated. Throws
 * if there is a dynamic segment of the pattern for which there is no param.
 */
function formatPattern(pattern, params) {
  params = params || {};

  var _compilePattern3 = compilePattern(pattern);

  var tokens = _compilePattern3.tokens;

  var parenCount = 0,
      pathname = '',
      splatIndex = 0;

  var token = void 0,
      paramName = void 0,
      paramValue = void 0;
  for (var i = 0, len = tokens.length; i < len; ++i) {
    token = tokens[i];

    if (token === '*' || token === '**') {
      paramValue = Array.isArray(params.splat) ? params.splat[splatIndex++] : params.splat;

      !(paramValue != null || parenCount > 0) ? undefined !== 'production' ? (0, _invariant2.default)(false, 'Missing splat #%s for path "%s"', splatIndex, pattern) : (0, _invariant2.default)(false) : void 0;

      if (paramValue != null) pathname += encodeURI(paramValue);
    } else if (token === '(') {
      parenCount += 1;
    } else if (token === ')') {
      parenCount -= 1;
    } else if (token.charAt(0) === ':') {
      paramName = token.substring(1);
      paramValue = params[paramName];

      !(paramValue != null || parenCount > 0) ? undefined !== 'production' ? (0, _invariant2.default)(false, 'Missing "%s" parameter for path "%s"', paramName, pattern) : (0, _invariant2.default)(false) : void 0;

      if (paramValue != null) pathname += encodeURIComponent(paramValue);
    } else {
      pathname += token;
    }
  }

  return pathname.replace(/\/+/g, '/');
}

/***/ }),
/* 28 */,
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.createMemoryHistory = exports.hashHistory = exports.browserHistory = exports.applyRouterMiddleware = exports.formatPattern = exports.useRouterHistory = exports.match = exports.routerShape = exports.locationShape = exports.PropTypes = exports.RoutingContext = exports.RouterContext = exports.createRoutes = exports.useRoutes = exports.RouteContext = exports.Lifecycle = exports.History = exports.Route = exports.Redirect = exports.IndexRoute = exports.IndexRedirect = exports.withRouter = exports.IndexLink = exports.Link = exports.Router = undefined;

var _RouteUtils = __webpack_require__(17);

Object.defineProperty(exports, 'createRoutes', {
  enumerable: true,
  get: function get() {
    return _RouteUtils.createRoutes;
  }
});

var _PropTypes2 = __webpack_require__(67);

Object.defineProperty(exports, 'locationShape', {
  enumerable: true,
  get: function get() {
    return _PropTypes2.locationShape;
  }
});
Object.defineProperty(exports, 'routerShape', {
  enumerable: true,
  get: function get() {
    return _PropTypes2.routerShape;
  }
});

var _PatternUtils = __webpack_require__(27);

Object.defineProperty(exports, 'formatPattern', {
  enumerable: true,
  get: function get() {
    return _PatternUtils.formatPattern;
  }
});

var _Router2 = __webpack_require__(231);

var _Router3 = _interopRequireDefault(_Router2);

var _Link2 = __webpack_require__(106);

var _Link3 = _interopRequireDefault(_Link2);

var _IndexLink2 = __webpack_require__(225);

var _IndexLink3 = _interopRequireDefault(_IndexLink2);

var _withRouter2 = __webpack_require__(244);

var _withRouter3 = _interopRequireDefault(_withRouter2);

var _IndexRedirect2 = __webpack_require__(226);

var _IndexRedirect3 = _interopRequireDefault(_IndexRedirect2);

var _IndexRoute2 = __webpack_require__(227);

var _IndexRoute3 = _interopRequireDefault(_IndexRoute2);

var _Redirect2 = __webpack_require__(107);

var _Redirect3 = _interopRequireDefault(_Redirect2);

var _Route2 = __webpack_require__(229);

var _Route3 = _interopRequireDefault(_Route2);

var _History2 = __webpack_require__(224);

var _History3 = _interopRequireDefault(_History2);

var _Lifecycle2 = __webpack_require__(228);

var _Lifecycle3 = _interopRequireDefault(_Lifecycle2);

var _RouteContext2 = __webpack_require__(230);

var _RouteContext3 = _interopRequireDefault(_RouteContext2);

var _useRoutes2 = __webpack_require__(243);

var _useRoutes3 = _interopRequireDefault(_useRoutes2);

var _RouterContext2 = __webpack_require__(43);

var _RouterContext3 = _interopRequireDefault(_RouterContext2);

var _RoutingContext2 = __webpack_require__(232);

var _RoutingContext3 = _interopRequireDefault(_RoutingContext2);

var _PropTypes3 = _interopRequireDefault(_PropTypes2);

var _match2 = __webpack_require__(241);

var _match3 = _interopRequireDefault(_match2);

var _useRouterHistory2 = __webpack_require__(112);

var _useRouterHistory3 = _interopRequireDefault(_useRouterHistory2);

var _applyRouterMiddleware2 = __webpack_require__(234);

var _applyRouterMiddleware3 = _interopRequireDefault(_applyRouterMiddleware2);

var _browserHistory2 = __webpack_require__(235);

var _browserHistory3 = _interopRequireDefault(_browserHistory2);

var _hashHistory2 = __webpack_require__(239);

var _hashHistory3 = _interopRequireDefault(_hashHistory2);

var _createMemoryHistory2 = __webpack_require__(109);

var _createMemoryHistory3 = _interopRequireDefault(_createMemoryHistory2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Router = _Router3.default; /* components */

exports.Link = _Link3.default;
exports.IndexLink = _IndexLink3.default;
exports.withRouter = _withRouter3.default;

/* components (configuration) */

exports.IndexRedirect = _IndexRedirect3.default;
exports.IndexRoute = _IndexRoute3.default;
exports.Redirect = _Redirect3.default;
exports.Route = _Route3.default;

/* mixins */

exports.History = _History3.default;
exports.Lifecycle = _Lifecycle3.default;
exports.RouteContext = _RouteContext3.default;

/* utils */

exports.useRoutes = _useRoutes3.default;
exports.RouterContext = _RouterContext3.default;
exports.RoutingContext = _RoutingContext3.default;
exports.PropTypes = _PropTypes3.default;
exports.match = _match3.default;
exports.useRouterHistory = _useRouterHistory3.default;
exports.applyRouterMiddleware = _applyRouterMiddleware3.default;

/* histories */

exports.browserHistory = _browserHistory3.default;
exports.hashHistory = _hashHistory3.default;
exports.createMemoryHistory = _createMemoryHistory3.default;

/***/ }),
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
exports.canUseDOM = canUseDOM;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = __webpack_require__(12);

var _warning2 = _interopRequireDefault(_warning);

var _queryString = __webpack_require__(149);

var _runTransitionHook = __webpack_require__(50);

var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

var _PathUtils = __webpack_require__(19);

var _deprecate = __webpack_require__(49);

var _deprecate2 = _interopRequireDefault(_deprecate);

var SEARCH_BASE_KEY = '$searchBase';

function defaultStringifyQuery(query) {
  return _queryString.stringify(query).replace(/%20/g, '+');
}

var defaultParseQueryString = _queryString.parse;

function isNestedObject(object) {
  for (var p in object) {
    if (Object.prototype.hasOwnProperty.call(object, p) && typeof object[p] === 'object' && !Array.isArray(object[p]) && object[p] !== null) return true;
  }return false;
}

/**
 * Returns a new createHistory function that may be used to create
 * history objects that know how to handle URL queries.
 */
function useQueries(createHistory) {
  return function () {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var history = createHistory(options);

    var stringifyQuery = options.stringifyQuery;
    var parseQueryString = options.parseQueryString;

    if (typeof stringifyQuery !== 'function') stringifyQuery = defaultStringifyQuery;

    if (typeof parseQueryString !== 'function') parseQueryString = defaultParseQueryString;

    function addQuery(location) {
      if (location.query == null) {
        var search = location.search;

        location.query = parseQueryString(search.substring(1));
        location[SEARCH_BASE_KEY] = { search: search, searchBase: '' };
      }

      // TODO: Instead of all the book-keeping here, this should just strip the
      // stringified query from the search.

      return location;
    }

    function appendQuery(location, query) {
      var _extends2;

      var searchBaseSpec = location[SEARCH_BASE_KEY];
      var queryString = query ? stringifyQuery(query) : '';
      if (!searchBaseSpec && !queryString) {
        return location;
      }

      undefined !== 'production' ? _warning2['default'](stringifyQuery !== defaultStringifyQuery || !isNestedObject(query), 'useQueries does not stringify nested query objects by default; ' + 'use a custom stringifyQuery function') : undefined;

      if (typeof location === 'string') location = _PathUtils.parsePath(location);

      var searchBase = undefined;
      if (searchBaseSpec && location.search === searchBaseSpec.search) {
        searchBase = searchBaseSpec.searchBase;
      } else {
        searchBase = location.search || '';
      }

      var search = searchBase;
      if (queryString) {
        search += (search ? '&' : '?') + queryString;
      }

      return _extends({}, location, (_extends2 = {
        search: search
      }, _extends2[SEARCH_BASE_KEY] = { search: search, searchBase: searchBase }, _extends2));
    }

    // Override all read methods with query-aware versions.
    function listenBefore(hook) {
      return history.listenBefore(function (location, callback) {
        _runTransitionHook2['default'](hook, addQuery(location), callback);
      });
    }

    function listen(listener) {
      return history.listen(function (location) {
        listener(addQuery(location));
      });
    }

    // Override all write methods with query-aware versions.
    function push(location) {
      history.push(appendQuery(location, location.query));
    }

    function replace(location) {
      history.replace(appendQuery(location, location.query));
    }

    function createPath(location, query) {
      undefined !== 'production' ? _warning2['default'](!query, 'the query argument to createPath is deprecated; use a location descriptor instead') : undefined;

      return history.createPath(appendQuery(location, query || location.query));
    }

    function createHref(location, query) {
      undefined !== 'production' ? _warning2['default'](!query, 'the query argument to createHref is deprecated; use a location descriptor instead') : undefined;

      return history.createHref(appendQuery(location, query || location.query));
    }

    function createLocation(location) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var fullLocation = history.createLocation.apply(history, [appendQuery(location, location.query)].concat(args));
      if (location.query) {
        fullLocation.query = location.query;
      }
      return addQuery(fullLocation);
    }

    // deprecated
    function pushState(state, path, query) {
      if (typeof path === 'string') path = _PathUtils.parsePath(path);

      push(_extends({ state: state }, path, { query: query }));
    }

    // deprecated
    function replaceState(state, path, query) {
      if (typeof path === 'string') path = _PathUtils.parsePath(path);

      replace(_extends({ state: state }, path, { query: query }));
    }

    return _extends({}, history, {
      listenBefore: listenBefore,
      listen: listen,
      push: push,
      replace: replace,
      createPath: createPath,
      createHref: createHref,
      createLocation: createLocation,

      pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
      replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
    });
  };
}

exports['default'] = useQueries;
module.exports = exports['default'];

/***/ }),
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _invariant = __webpack_require__(8);

var _invariant2 = _interopRequireDefault(_invariant);

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _deprecateObjectProperties = __webpack_require__(44);

var _deprecateObjectProperties2 = _interopRequireDefault(_deprecateObjectProperties);

var _getRouteParams = __webpack_require__(238);

var _getRouteParams2 = _interopRequireDefault(_getRouteParams);

var _RouteUtils = __webpack_require__(17);

var _routerWarning = __webpack_require__(7);

var _routerWarning2 = _interopRequireDefault(_routerWarning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _React$PropTypes = _react2.default.PropTypes;
var array = _React$PropTypes.array;
var func = _React$PropTypes.func;
var object = _React$PropTypes.object;

/**
 * A <RouterContext> renders the component tree for a given router state
 * and sets the history object and the current location in context.
 */

var RouterContext = _react2.default.createClass({
  displayName: 'RouterContext',


  propTypes: {
    history: object,
    router: object.isRequired,
    location: object.isRequired,
    routes: array.isRequired,
    params: object.isRequired,
    components: array.isRequired,
    createElement: func.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      createElement: _react2.default.createElement
    };
  },


  childContextTypes: {
    history: object,
    location: object.isRequired,
    router: object.isRequired
  },

  getChildContext: function getChildContext() {
    var _props = this.props;
    var router = _props.router;
    var history = _props.history;
    var location = _props.location;

    if (!router) {
      undefined !== 'production' ? (0, _routerWarning2.default)(false, '`<RouterContext>` expects a `router` rather than a `history`') : void 0;

      router = _extends({}, history, {
        setRouteLeaveHook: history.listenBeforeLeavingRoute
      });
      delete router.listenBeforeLeavingRoute;
    }

    if (undefined !== 'production') {
      location = (0, _deprecateObjectProperties2.default)(location, '`context.location` is deprecated, please use a route component\'s `props.location` instead. http://tiny.cc/router-accessinglocation');
    }

    return { history: history, location: location, router: router };
  },
  createElement: function createElement(component, props) {
    return component == null ? null : this.props.createElement(component, props);
  },
  render: function render() {
    var _this = this;

    var _props2 = this.props;
    var history = _props2.history;
    var location = _props2.location;
    var routes = _props2.routes;
    var params = _props2.params;
    var components = _props2.components;

    var element = null;

    if (components) {
      element = components.reduceRight(function (element, components, index) {
        if (components == null) return element; // Don't create new children; use the grandchildren.

        var route = routes[index];
        var routeParams = (0, _getRouteParams2.default)(route, params);
        var props = {
          history: history,
          location: location,
          params: params,
          route: route,
          routeParams: routeParams,
          routes: routes
        };

        if ((0, _RouteUtils.isReactChildren)(element)) {
          props.children = element;
        } else if (element) {
          for (var prop in element) {
            if (Object.prototype.hasOwnProperty.call(element, prop)) props[prop] = element[prop];
          }
        }

        if ((typeof components === 'undefined' ? 'undefined' : _typeof(components)) === 'object') {
          var elements = {};

          for (var key in components) {
            if (Object.prototype.hasOwnProperty.call(components, key)) {
              // Pass through the key as a prop to createElement to allow
              // custom createElement functions to know which named component
              // they're rendering, for e.g. matching up to fetched data.
              elements[key] = _this.createElement(components[key], _extends({
                key: key }, props));
            }
          }

          return elements;
        }

        return _this.createElement(components, props);
      }, element);
    }

    !(element === null || element === false || _react2.default.isValidElement(element)) ? undefined !== 'production' ? (0, _invariant2.default)(false, 'The root route must render a single element') : (0, _invariant2.default)(false) : void 0;

    return element;
  }
});

exports.default = RouterContext;
module.exports = exports['default'];

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.canUseMembrane = undefined;

var _routerWarning = __webpack_require__(7);

var _routerWarning2 = _interopRequireDefault(_routerWarning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canUseMembrane = exports.canUseMembrane = false;

// No-op by default.
var deprecateObjectProperties = function deprecateObjectProperties(object) {
  return object;
};

if (undefined !== 'production') {
  try {
    if (Object.defineProperty({}, 'x', {
      get: function get() {
        return true;
      }
    }).x) {
      exports.canUseMembrane = canUseMembrane = true;
    }
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */

  if (canUseMembrane) {
    deprecateObjectProperties = function deprecateObjectProperties(object, message) {
      // Wrap the deprecated object in a membrane to warn on property access.
      var membrane = {};

      var _loop = function _loop(prop) {
        if (!Object.prototype.hasOwnProperty.call(object, prop)) {
          return 'continue';
        }

        if (typeof object[prop] === 'function') {
          // Can't use fat arrow here because of use of arguments below.
          membrane[prop] = function () {
            undefined !== 'production' ? (0, _routerWarning2.default)(false, message) : void 0;
            return object[prop].apply(object, arguments);
          };
          return 'continue';
        }

        // These properties are non-enumerable to prevent React dev tools from
        // seeing them and causing spurious warnings when accessing them. In
        // principle this could be done with a proxy, but support for the
        // ownKeys trap on proxies is not universal, even among browsers that
        // otherwise support proxies.
        Object.defineProperty(membrane, prop, {
          get: function get() {
            undefined !== 'production' ? (0, _routerWarning2.default)(false, message) : void 0;
            return object[prop];
          }
        });
      };

      for (var prop in object) {
        var _ret = _loop(prop);

        if (_ret === 'continue') continue;
      }

      return membrane;
    };
  }
}

exports.default = deprecateObjectProperties;

/***/ }),
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.addEventListener = addEventListener;
exports.removeEventListener = removeEventListener;
exports.getHashPath = getHashPath;
exports.replaceHashPath = replaceHashPath;
exports.getWindowPath = getWindowPath;
exports.go = go;
exports.getUserConfirmation = getUserConfirmation;
exports.supportsHistory = supportsHistory;
exports.supportsGoWithoutReloadUsingHash = supportsGoWithoutReloadUsingHash;

function addEventListener(node, event, listener) {
  if (node.addEventListener) {
    node.addEventListener(event, listener, false);
  } else {
    node.attachEvent('on' + event, listener);
  }
}

function removeEventListener(node, event, listener) {
  if (node.removeEventListener) {
    node.removeEventListener(event, listener, false);
  } else {
    node.detachEvent('on' + event, listener);
  }
}

function getHashPath() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  return window.location.href.split('#')[1] || '';
}

function replaceHashPath(path) {
  window.location.replace(window.location.pathname + window.location.search + '#' + path);
}

function getWindowPath() {
  return window.location.pathname + window.location.search + window.location.hash;
}

function go(n) {
  if (n) window.history.go(n);
}

function getUserConfirmation(message, callback) {
  callback(window.confirm(message));
}

/**
 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
 *
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/rackt/react-router/issues/586
 */

function supportsHistory() {
  var ua = navigator.userAgent;
  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) {
    return false;
  }
  return window.history && 'pushState' in window.history;
}

/**
 * Returns false if using go(n) with hash history causes a full page reload.
 */

function supportsGoWithoutReloadUsingHash() {
  var ua = navigator.userAgent;
  return ua.indexOf('Firefox') === -1;
}

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = __webpack_require__(12);

var _warning2 = _interopRequireDefault(_warning);

function deprecate(fn, message) {
  return function () {
    undefined !== 'production' ? _warning2['default'](false, '[history] ' + message) : undefined;
    return fn.apply(this, arguments);
  };
}

exports['default'] = deprecate;
module.exports = exports['default'];

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = __webpack_require__(12);

var _warning2 = _interopRequireDefault(_warning);

function runTransitionHook(hook, location, callback) {
  var result = hook(location, callback);

  if (hook.length < 2) {
    // Assume the hook runs synchronously and automatically
    // call the callback with the return value.
    callback(result);
  } else {
    undefined !== 'production' ? _warning2['default'](result === undefined, 'You should not "return" in a transition hook with a callback argument; call the callback instead') : undefined;
  }
}

exports['default'] = runTransitionHook;
module.exports = exports['default'];

/***/ }),
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.loopAsync = loopAsync;
exports.mapAsync = mapAsync;
function loopAsync(turns, work, callback) {
  var currentTurn = 0,
      isDone = false;
  var sync = false,
      hasNext = false,
      doneArgs = void 0;

  function done() {
    isDone = true;
    if (sync) {
      // Iterate instead of recursing if possible.
      doneArgs = [].concat(Array.prototype.slice.call(arguments));
      return;
    }

    callback.apply(this, arguments);
  }

  function next() {
    if (isDone) {
      return;
    }

    hasNext = true;
    if (sync) {
      // Iterate instead of recursing if possible.
      return;
    }

    sync = true;

    while (!isDone && currentTurn < turns && hasNext) {
      hasNext = false;
      work.call(this, currentTurn++, next, done);
    }

    sync = false;

    if (isDone) {
      // This means the loop finished synchronously.
      callback.apply(this, doneArgs);
      return;
    }

    if (currentTurn >= turns && hasNext) {
      isDone = true;
      callback();
    }
  }

  next();
}

function mapAsync(array, work, callback) {
  var length = array.length;
  var values = [];

  if (length === 0) return callback(null, values);

  var isDone = false,
      doneCount = 0;

  function done(index, error, value) {
    if (isDone) return;

    if (error) {
      isDone = true;
      callback(error);
    } else {
      values[index] = value;

      isDone = ++doneCount === length;

      if (isDone) callback(null, values);
    }
  }

  array.forEach(function (item, index) {
    work(item, index, function (error, value) {
      done(index, error, value);
    });
  });
}

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.router = exports.routes = exports.route = exports.components = exports.component = exports.location = exports.history = exports.falsy = exports.locationShape = exports.routerShape = undefined;

var _react = __webpack_require__(3);

var _deprecateObjectProperties = __webpack_require__(44);

var _deprecateObjectProperties2 = _interopRequireDefault(_deprecateObjectProperties);

var _InternalPropTypes = __webpack_require__(21);

var InternalPropTypes = _interopRequireWildcard(_InternalPropTypes);

var _routerWarning = __webpack_require__(7);

var _routerWarning2 = _interopRequireDefault(_routerWarning);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var func = _react.PropTypes.func;
var object = _react.PropTypes.object;
var shape = _react.PropTypes.shape;
var string = _react.PropTypes.string;
var routerShape = exports.routerShape = shape({
  push: func.isRequired,
  replace: func.isRequired,
  go: func.isRequired,
  goBack: func.isRequired,
  goForward: func.isRequired,
  setRouteLeaveHook: func.isRequired,
  isActive: func.isRequired
});

var locationShape = exports.locationShape = shape({
  pathname: string.isRequired,
  search: string.isRequired,
  state: object,
  action: string.isRequired,
  key: string
});

// Deprecated stuff below:

var falsy = exports.falsy = InternalPropTypes.falsy;
var history = exports.history = InternalPropTypes.history;
var location = exports.location = locationShape;
var component = exports.component = InternalPropTypes.component;
var components = exports.components = InternalPropTypes.components;
var route = exports.route = InternalPropTypes.route;
var routes = exports.routes = InternalPropTypes.routes;
var router = exports.router = routerShape;

if (undefined !== 'production') {
  (function () {
    var deprecatePropType = function deprecatePropType(propType, message) {
      return function () {
        undefined !== 'production' ? (0, _routerWarning2.default)(false, message) : void 0;
        return propType.apply(undefined, arguments);
      };
    };

    var deprecateInternalPropType = function deprecateInternalPropType(propType) {
      return deprecatePropType(propType, 'This prop type is not intended for external use, and was previously exported by mistake. These internal prop types are deprecated for external use, and will be removed in a later version.');
    };

    var deprecateRenamedPropType = function deprecateRenamedPropType(propType, name) {
      return deprecatePropType(propType, 'The `' + name + '` prop type is now exported as `' + name + 'Shape` to avoid name conflicts. This export is deprecated and will be removed in a later version.');
    };

    exports.falsy = falsy = deprecateInternalPropType(falsy);
    exports.history = history = deprecateInternalPropType(history);
    exports.component = component = deprecateInternalPropType(component);
    exports.components = components = deprecateInternalPropType(components);
    exports.route = route = deprecateInternalPropType(route);
    exports.routes = routes = deprecateInternalPropType(routes);

    exports.location = location = deprecateRenamedPropType(location, 'location');
    exports.router = router = deprecateRenamedPropType(router, 'router');
  })();
}

var defaultExport = {
  falsy: falsy,
  history: history,
  location: location,
  component: component,
  components: components,
  route: route,
  // For some reason, routes was never here.
  router: router
};

if (undefined !== 'production') {
  defaultExport = (0, _deprecateObjectProperties2.default)(defaultExport, 'The default export from `react-router/lib/PropTypes` is deprecated. Please use the named exports instead.');
}

exports.default = defaultExport;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = createTransitionManager;

var _routerWarning = __webpack_require__(7);

var _routerWarning2 = _interopRequireDefault(_routerWarning);

var _computeChangedRoutes2 = __webpack_require__(236);

var _computeChangedRoutes3 = _interopRequireDefault(_computeChangedRoutes2);

var _TransitionUtils = __webpack_require__(233);

var _isActive2 = __webpack_require__(240);

var _isActive3 = _interopRequireDefault(_isActive2);

var _getComponents = __webpack_require__(237);

var _getComponents2 = _interopRequireDefault(_getComponents);

var _matchRoutes = __webpack_require__(242);

var _matchRoutes2 = _interopRequireDefault(_matchRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hasAnyProperties(object) {
  for (var p in object) {
    if (Object.prototype.hasOwnProperty.call(object, p)) return true;
  }return false;
}

function createTransitionManager(history, routes) {
  var state = {};

  // Signature should be (location, indexOnly), but needs to support (path,
  // query, indexOnly)
  function isActive(location) {
    var indexOnlyOrDeprecatedQuery = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
    var deprecatedIndexOnly = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

    var indexOnly = void 0;
    if (indexOnlyOrDeprecatedQuery && indexOnlyOrDeprecatedQuery !== true || deprecatedIndexOnly !== null) {
      undefined !== 'production' ? (0, _routerWarning2.default)(false, '`isActive(pathname, query, indexOnly) is deprecated; use `isActive(location, indexOnly)` with a location descriptor instead. http://tiny.cc/router-isActivedeprecated') : void 0;
      location = { pathname: location, query: indexOnlyOrDeprecatedQuery };
      indexOnly = deprecatedIndexOnly || false;
    } else {
      location = history.createLocation(location);
      indexOnly = indexOnlyOrDeprecatedQuery;
    }

    return (0, _isActive3.default)(location, indexOnly, state.location, state.routes, state.params);
  }

  var partialNextState = void 0;

  function match(location, callback) {
    if (partialNextState && partialNextState.location === location) {
      // Continue from where we left off.
      finishMatch(partialNextState, callback);
    } else {
      (0, _matchRoutes2.default)(routes, location, function (error, nextState) {
        if (error) {
          callback(error);
        } else if (nextState) {
          finishMatch(_extends({}, nextState, { location: location }), callback);
        } else {
          callback();
        }
      });
    }
  }

  function finishMatch(nextState, callback) {
    var _computeChangedRoutes = (0, _computeChangedRoutes3.default)(state, nextState);

    var leaveRoutes = _computeChangedRoutes.leaveRoutes;
    var changeRoutes = _computeChangedRoutes.changeRoutes;
    var enterRoutes = _computeChangedRoutes.enterRoutes;


    (0, _TransitionUtils.runLeaveHooks)(leaveRoutes, state);

    // Tear down confirmation hooks for left routes
    leaveRoutes.filter(function (route) {
      return enterRoutes.indexOf(route) === -1;
    }).forEach(removeListenBeforeHooksForRoute);

    // change and enter hooks are run in series
    (0, _TransitionUtils.runChangeHooks)(changeRoutes, state, nextState, function (error, redirectInfo) {
      if (error || redirectInfo) return handleErrorOrRedirect(error, redirectInfo);

      (0, _TransitionUtils.runEnterHooks)(enterRoutes, nextState, finishEnterHooks);
    });

    function finishEnterHooks(error, redirectInfo) {
      if (error || redirectInfo) return handleErrorOrRedirect(error, redirectInfo);

      // TODO: Fetch components after state is updated.
      (0, _getComponents2.default)(nextState, function (error, components) {
        if (error) {
          callback(error);
        } else {
          // TODO: Make match a pure function and have some other API
          // for "match and update state".
          callback(null, null, state = _extends({}, nextState, { components: components }));
        }
      });
    }

    function handleErrorOrRedirect(error, redirectInfo) {
      if (error) callback(error);else callback(null, redirectInfo);
    }
  }

  var RouteGuid = 1;

  function getRouteID(route) {
    var create = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    return route.__id__ || create && (route.__id__ = RouteGuid++);
  }

  var RouteHooks = Object.create(null);

  function getRouteHooksForRoutes(routes) {
    return routes.reduce(function (hooks, route) {
      hooks.push.apply(hooks, RouteHooks[getRouteID(route)]);
      return hooks;
    }, []);
  }

  function transitionHook(location, callback) {
    (0, _matchRoutes2.default)(routes, location, function (error, nextState) {
      if (nextState == null) {
        // TODO: We didn't actually match anything, but hang
        // onto error/nextState so we don't have to matchRoutes
        // again in the listen callback.
        callback();
        return;
      }

      // Cache some state here so we don't have to
      // matchRoutes() again in the listen callback.
      partialNextState = _extends({}, nextState, { location: location });

      var hooks = getRouteHooksForRoutes((0, _computeChangedRoutes3.default)(state, partialNextState).leaveRoutes);

      var result = void 0;
      for (var i = 0, len = hooks.length; result == null && i < len; ++i) {
        // Passing the location arg here indicates to
        // the user that this is a transition hook.
        result = hooks[i](location);
      }

      callback(result);
    });
  }

  /* istanbul ignore next: untestable with Karma */
  function beforeUnloadHook() {
    // Synchronously check to see if any route hooks want
    // to prevent the current window/tab from closing.
    if (state.routes) {
      var hooks = getRouteHooksForRoutes(state.routes);

      var message = void 0;
      for (var i = 0, len = hooks.length; typeof message !== 'string' && i < len; ++i) {
        // Passing no args indicates to the user that this is a
        // beforeunload hook. We don't know the next location.
        message = hooks[i]();
      }

      return message;
    }
  }

  var unlistenBefore = void 0,
      unlistenBeforeUnload = void 0;

  function removeListenBeforeHooksForRoute(route) {
    var routeID = getRouteID(route, false);
    if (!routeID) {
      return;
    }

    delete RouteHooks[routeID];

    if (!hasAnyProperties(RouteHooks)) {
      // teardown transition & beforeunload hooks
      if (unlistenBefore) {
        unlistenBefore();
        unlistenBefore = null;
      }

      if (unlistenBeforeUnload) {
        unlistenBeforeUnload();
        unlistenBeforeUnload = null;
      }
    }
  }

  /**
   * Registers the given hook function to run before leaving the given route.
   *
   * During a normal transition, the hook function receives the next location
   * as its only argument and can return either a prompt message (string) to show the user,
   * to make sure they want to leave the page; or `false`, to prevent the transition.
   * Any other return value will have no effect.
   *
   * During the beforeunload event (in browsers) the hook receives no arguments.
   * In this case it must return a prompt message to prevent the transition.
   *
   * Returns a function that may be used to unbind the listener.
   */
  function listenBeforeLeavingRoute(route, hook) {
    // TODO: Warn if they register for a route that isn't currently
    // active. They're probably doing something wrong, like re-creating
    // route objects on every location change.
    var routeID = getRouteID(route);
    var hooks = RouteHooks[routeID];

    if (!hooks) {
      var thereWereNoRouteHooks = !hasAnyProperties(RouteHooks);

      RouteHooks[routeID] = [hook];

      if (thereWereNoRouteHooks) {
        // setup transition & beforeunload hooks
        unlistenBefore = history.listenBefore(transitionHook);

        if (history.listenBeforeUnload) unlistenBeforeUnload = history.listenBeforeUnload(beforeUnloadHook);
      }
    } else {
      if (hooks.indexOf(hook) === -1) {
        undefined !== 'production' ? (0, _routerWarning2.default)(false, 'adding multiple leave hooks for the same route is deprecated; manage multiple confirmations in your own code instead') : void 0;

        hooks.push(hook);
      }
    }

    return function () {
      var hooks = RouteHooks[routeID];

      if (hooks) {
        var newHooks = hooks.filter(function (item) {
          return item !== hook;
        });

        if (newHooks.length === 0) {
          removeListenBeforeHooksForRoute(route);
        } else {
          RouteHooks[routeID] = newHooks;
        }
      }
    };
  }

  /**
   * This is the API for stateful environments. As the location
   * changes, we update state and call the listener. We can also
   * gracefully handle errors and redirects.
   */
  function listen(listener) {
    // TODO: Only use a single history listener. Otherwise we'll
    // end up with multiple concurrent calls to match.
    return history.listen(function (location) {
      if (state.location === location) {
        listener(null, state);
      } else {
        match(location, function (error, redirectLocation, nextState) {
          if (error) {
            listener(error);
          } else if (redirectLocation) {
            history.replace(redirectLocation);
          } else if (nextState) {
            listener(null, nextState);
          } else {
            undefined !== 'production' ? (0, _routerWarning2.default)(false, 'Location "%s" did not match any routes', location.pathname + location.search + location.hash) : void 0;
          }
        });
      }
    });
  }

  return {
    isActive: isActive,
    match: match,
    listenBeforeLeavingRoute: listenBeforeLeavingRoute,
    listen: listen
  };
}

//export default useRoutes

module.exports = exports['default'];

/***/ }),
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "./images/otavio-sanchez.jpg";

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "./images/igapira-1.png";

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "./images/igapira-2.png";

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "./images/nilsan-1.PNG";

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*eslint-disable no-empty */


exports.__esModule = true;
exports.saveState = saveState;
exports.readState = readState;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = __webpack_require__(12);

var _warning2 = _interopRequireDefault(_warning);

var KeyPrefix = '@@History/';
var QuotaExceededErrors = ['QuotaExceededError', 'QUOTA_EXCEEDED_ERR'];

var SecurityError = 'SecurityError';

function createKey(key) {
  return KeyPrefix + key;
}

function saveState(key, state) {
  try {
    if (state == null) {
      window.sessionStorage.removeItem(createKey(key));
    } else {
      window.sessionStorage.setItem(createKey(key), JSON.stringify(state));
    }
  } catch (error) {
    if (error.name === SecurityError) {
      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
      // attempt to access window.sessionStorage.
      undefined !== 'production' ? _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available due to security settings') : undefined;

      return;
    }

    if (QuotaExceededErrors.indexOf(error.name) >= 0 && window.sessionStorage.length === 0) {
      // Safari "private mode" throws QuotaExceededError.
      undefined !== 'production' ? _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available in Safari private mode') : undefined;

      return;
    }

    throw error;
  }
}

function readState(key) {
  var json = undefined;
  try {
    json = window.sessionStorage.getItem(createKey(key));
  } catch (error) {
    if (error.name === SecurityError) {
      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
      // attempt to access window.sessionStorage.
      undefined !== 'production' ? _warning2['default'](false, '[history] Unable to read state; sessionStorage is not available due to security settings') : undefined;

      return null;
    }
  }

  if (json) {
    try {
      return JSON.parse(json);
    } catch (error) {
      // Ignore invalid JSON.
    }
  }

  return null;
}

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _invariant = __webpack_require__(8);

var _invariant2 = _interopRequireDefault(_invariant);

var _ExecutionEnvironment = __webpack_require__(35);

var _DOMUtils = __webpack_require__(48);

var _createHistory = __webpack_require__(81);

var _createHistory2 = _interopRequireDefault(_createHistory);

function createDOMHistory(options) {
  var history = _createHistory2['default'](_extends({
    getUserConfirmation: _DOMUtils.getUserConfirmation
  }, options, {
    go: _DOMUtils.go
  }));

  function listen(listener) {
    !_ExecutionEnvironment.canUseDOM ? undefined !== 'production' ? _invariant2['default'](false, 'DOM history needs a DOM') : _invariant2['default'](false) : undefined;

    return history.listen(listener);
  }

  return _extends({}, history, {
    listen: listen
  });
}

exports['default'] = createDOMHistory;
module.exports = exports['default'];

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = __webpack_require__(12);

var _warning2 = _interopRequireDefault(_warning);

var _invariant = __webpack_require__(8);

var _invariant2 = _interopRequireDefault(_invariant);

var _Actions = __webpack_require__(24);

var _PathUtils = __webpack_require__(19);

var _ExecutionEnvironment = __webpack_require__(35);

var _DOMUtils = __webpack_require__(48);

var _DOMStateStorage = __webpack_require__(78);

var _createDOMHistory = __webpack_require__(79);

var _createDOMHistory2 = _interopRequireDefault(_createDOMHistory);

function isAbsolutePath(path) {
  return typeof path === 'string' && path.charAt(0) === '/';
}

function ensureSlash() {
  var path = _DOMUtils.getHashPath();

  if (isAbsolutePath(path)) return true;

  _DOMUtils.replaceHashPath('/' + path);

  return false;
}

function addQueryStringValueToPath(path, key, value) {
  return path + (path.indexOf('?') === -1 ? '?' : '&') + (key + '=' + value);
}

function stripQueryStringValueFromPath(path, key) {
  return path.replace(new RegExp('[?&]?' + key + '=[a-zA-Z0-9]+'), '');
}

function getQueryStringValueFromPath(path, key) {
  var match = path.match(new RegExp('\\?.*?\\b' + key + '=(.+?)\\b'));
  return match && match[1];
}

var DefaultQueryKey = '_k';

function createHashHistory() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  !_ExecutionEnvironment.canUseDOM ? undefined !== 'production' ? _invariant2['default'](false, 'Hash history needs a DOM') : _invariant2['default'](false) : undefined;

  var queryKey = options.queryKey;

  if (queryKey === undefined || !!queryKey) queryKey = typeof queryKey === 'string' ? queryKey : DefaultQueryKey;

  function getCurrentLocation() {
    var path = _DOMUtils.getHashPath();

    var key = undefined,
        state = undefined;
    if (queryKey) {
      key = getQueryStringValueFromPath(path, queryKey);
      path = stripQueryStringValueFromPath(path, queryKey);

      if (key) {
        state = _DOMStateStorage.readState(key);
      } else {
        state = null;
        key = history.createKey();
        _DOMUtils.replaceHashPath(addQueryStringValueToPath(path, queryKey, key));
      }
    } else {
      key = state = null;
    }

    var location = _PathUtils.parsePath(path);

    return history.createLocation(_extends({}, location, { state: state }), undefined, key);
  }

  function startHashChangeListener(_ref) {
    var transitionTo = _ref.transitionTo;

    function hashChangeListener() {
      if (!ensureSlash()) return; // Always make sure hashes are preceeded with a /.

      transitionTo(getCurrentLocation());
    }

    ensureSlash();
    _DOMUtils.addEventListener(window, 'hashchange', hashChangeListener);

    return function () {
      _DOMUtils.removeEventListener(window, 'hashchange', hashChangeListener);
    };
  }

  function finishTransition(location) {
    var basename = location.basename;
    var pathname = location.pathname;
    var search = location.search;
    var state = location.state;
    var action = location.action;
    var key = location.key;

    if (action === _Actions.POP) return; // Nothing to do.

    var path = (basename || '') + pathname + search;

    if (queryKey) {
      path = addQueryStringValueToPath(path, queryKey, key);
      _DOMStateStorage.saveState(key, state);
    } else {
      // Drop key and state.
      location.key = location.state = null;
    }

    var currentHash = _DOMUtils.getHashPath();

    if (action === _Actions.PUSH) {
      if (currentHash !== path) {
        window.location.hash = path;
      } else {
        undefined !== 'production' ? _warning2['default'](false, 'You cannot PUSH the same path using hash history') : undefined;
      }
    } else if (currentHash !== path) {
      // REPLACE
      _DOMUtils.replaceHashPath(path);
    }
  }

  var history = _createDOMHistory2['default'](_extends({}, options, {
    getCurrentLocation: getCurrentLocation,
    finishTransition: finishTransition,
    saveState: _DOMStateStorage.saveState
  }));

  var listenerCount = 0,
      stopHashChangeListener = undefined;

  function listenBefore(listener) {
    if (++listenerCount === 1) stopHashChangeListener = startHashChangeListener(history);

    var unlisten = history.listenBefore(listener);

    return function () {
      unlisten();

      if (--listenerCount === 0) stopHashChangeListener();
    };
  }

  function listen(listener) {
    if (++listenerCount === 1) stopHashChangeListener = startHashChangeListener(history);

    var unlisten = history.listen(listener);

    return function () {
      unlisten();

      if (--listenerCount === 0) stopHashChangeListener();
    };
  }

  function push(location) {
    undefined !== 'production' ? _warning2['default'](queryKey || location.state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;

    history.push(location);
  }

  function replace(location) {
    undefined !== 'production' ? _warning2['default'](queryKey || location.state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;

    history.replace(location);
  }

  var goIsSupportedWithoutReload = _DOMUtils.supportsGoWithoutReloadUsingHash();

  function go(n) {
    undefined !== 'production' ? _warning2['default'](goIsSupportedWithoutReload, 'Hash history go(n) causes a full page reload in this browser') : undefined;

    history.go(n);
  }

  function createHref(path) {
    return '#' + history.createHref(path);
  }

  // deprecated
  function registerTransitionHook(hook) {
    if (++listenerCount === 1) stopHashChangeListener = startHashChangeListener(history);

    history.registerTransitionHook(hook);
  }

  // deprecated
  function unregisterTransitionHook(hook) {
    history.unregisterTransitionHook(hook);

    if (--listenerCount === 0) stopHashChangeListener();
  }

  // deprecated
  function pushState(state, path) {
    undefined !== 'production' ? _warning2['default'](queryKey || state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;

    history.pushState(state, path);
  }

  // deprecated
  function replaceState(state, path) {
    undefined !== 'production' ? _warning2['default'](queryKey || state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;

    history.replaceState(state, path);
  }

  return _extends({}, history, {
    listenBefore: listenBefore,
    listen: listen,
    push: push,
    replace: replace,
    go: go,
    createHref: createHref,

    registerTransitionHook: registerTransitionHook, // deprecated - warning is in createHistory
    unregisterTransitionHook: unregisterTransitionHook, // deprecated - warning is in createHistory
    pushState: pushState, // deprecated - warning is in createHistory
    replaceState: replaceState // deprecated - warning is in createHistory
  });
}

exports['default'] = createHashHistory;
module.exports = exports['default'];

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = __webpack_require__(12);

var _warning2 = _interopRequireDefault(_warning);

var _deepEqual = __webpack_require__(125);

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _PathUtils = __webpack_require__(19);

var _AsyncUtils = __webpack_require__(145);

var _Actions = __webpack_require__(24);

var _createLocation2 = __webpack_require__(147);

var _createLocation3 = _interopRequireDefault(_createLocation2);

var _runTransitionHook = __webpack_require__(50);

var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

var _deprecate = __webpack_require__(49);

var _deprecate2 = _interopRequireDefault(_deprecate);

function createRandomKey(length) {
  return Math.random().toString(36).substr(2, length);
}

function locationsAreEqual(a, b) {
  return a.pathname === b.pathname && a.search === b.search &&
  //a.action === b.action && // Different action !== location change.
  a.key === b.key && _deepEqual2['default'](a.state, b.state);
}

var DefaultKeyLength = 6;

function createHistory() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var getCurrentLocation = options.getCurrentLocation;
  var finishTransition = options.finishTransition;
  var saveState = options.saveState;
  var go = options.go;
  var getUserConfirmation = options.getUserConfirmation;
  var keyLength = options.keyLength;

  if (typeof keyLength !== 'number') keyLength = DefaultKeyLength;

  var transitionHooks = [];

  function listenBefore(hook) {
    transitionHooks.push(hook);

    return function () {
      transitionHooks = transitionHooks.filter(function (item) {
        return item !== hook;
      });
    };
  }

  var allKeys = [];
  var changeListeners = [];
  var location = undefined;

  function getCurrent() {
    if (pendingLocation && pendingLocation.action === _Actions.POP) {
      return allKeys.indexOf(pendingLocation.key);
    } else if (location) {
      return allKeys.indexOf(location.key);
    } else {
      return -1;
    }
  }

  function updateLocation(newLocation) {
    var current = getCurrent();

    location = newLocation;

    if (location.action === _Actions.PUSH) {
      allKeys = [].concat(allKeys.slice(0, current + 1), [location.key]);
    } else if (location.action === _Actions.REPLACE) {
      allKeys[current] = location.key;
    }

    changeListeners.forEach(function (listener) {
      listener(location);
    });
  }

  function listen(listener) {
    changeListeners.push(listener);

    if (location) {
      listener(location);
    } else {
      var _location = getCurrentLocation();
      allKeys = [_location.key];
      updateLocation(_location);
    }

    return function () {
      changeListeners = changeListeners.filter(function (item) {
        return item !== listener;
      });
    };
  }

  function confirmTransitionTo(location, callback) {
    _AsyncUtils.loopAsync(transitionHooks.length, function (index, next, done) {
      _runTransitionHook2['default'](transitionHooks[index], location, function (result) {
        if (result != null) {
          done(result);
        } else {
          next();
        }
      });
    }, function (message) {
      if (getUserConfirmation && typeof message === 'string') {
        getUserConfirmation(message, function (ok) {
          callback(ok !== false);
        });
      } else {
        callback(message !== false);
      }
    });
  }

  var pendingLocation = undefined;

  function transitionTo(nextLocation) {
    if (location && locationsAreEqual(location, nextLocation)) return; // Nothing to do.

    pendingLocation = nextLocation;

    confirmTransitionTo(nextLocation, function (ok) {
      if (pendingLocation !== nextLocation) return; // Transition was interrupted.

      if (ok) {
        // treat PUSH to current path like REPLACE to be consistent with browsers
        if (nextLocation.action === _Actions.PUSH) {
          var prevPath = createPath(location);
          var nextPath = createPath(nextLocation);

          if (nextPath === prevPath && _deepEqual2['default'](location.state, nextLocation.state)) nextLocation.action = _Actions.REPLACE;
        }

        if (finishTransition(nextLocation) !== false) updateLocation(nextLocation);
      } else if (location && nextLocation.action === _Actions.POP) {
        var prevIndex = allKeys.indexOf(location.key);
        var nextIndex = allKeys.indexOf(nextLocation.key);

        if (prevIndex !== -1 && nextIndex !== -1) go(prevIndex - nextIndex); // Restore the URL.
      }
    });
  }

  function push(location) {
    transitionTo(createLocation(location, _Actions.PUSH, createKey()));
  }

  function replace(location) {
    transitionTo(createLocation(location, _Actions.REPLACE, createKey()));
  }

  function goBack() {
    go(-1);
  }

  function goForward() {
    go(1);
  }

  function createKey() {
    return createRandomKey(keyLength);
  }

  function createPath(location) {
    if (location == null || typeof location === 'string') return location;

    var pathname = location.pathname;
    var search = location.search;
    var hash = location.hash;

    var result = pathname;

    if (search) result += search;

    if (hash) result += hash;

    return result;
  }

  function createHref(location) {
    return createPath(location);
  }

  function createLocation(location, action) {
    var key = arguments.length <= 2 || arguments[2] === undefined ? createKey() : arguments[2];

    if (typeof action === 'object') {
      undefined !== 'production' ? _warning2['default'](false, 'The state (2nd) argument to history.createLocation is deprecated; use a ' + 'location descriptor instead') : undefined;

      if (typeof location === 'string') location = _PathUtils.parsePath(location);

      location = _extends({}, location, { state: action });

      action = key;
      key = arguments[3] || createKey();
    }

    return _createLocation3['default'](location, action, key);
  }

  // deprecated
  function setState(state) {
    if (location) {
      updateLocationState(location, state);
      updateLocation(location);
    } else {
      updateLocationState(getCurrentLocation(), state);
    }
  }

  function updateLocationState(location, state) {
    location.state = _extends({}, location.state, state);
    saveState(location.key, location.state);
  }

  // deprecated
  function registerTransitionHook(hook) {
    if (transitionHooks.indexOf(hook) === -1) transitionHooks.push(hook);
  }

  // deprecated
  function unregisterTransitionHook(hook) {
    transitionHooks = transitionHooks.filter(function (item) {
      return item !== hook;
    });
  }

  // deprecated
  function pushState(state, path) {
    if (typeof path === 'string') path = _PathUtils.parsePath(path);

    push(_extends({ state: state }, path));
  }

  // deprecated
  function replaceState(state, path) {
    if (typeof path === 'string') path = _PathUtils.parsePath(path);

    replace(_extends({ state: state }, path));
  }

  return {
    listenBefore: listenBefore,
    listen: listen,
    transitionTo: transitionTo,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    createKey: createKey,
    createPath: createPath,
    createHref: createHref,
    createLocation: createLocation,

    setState: _deprecate2['default'](setState, 'setState is deprecated; use location.key to save state instead'),
    registerTransitionHook: _deprecate2['default'](registerTransitionHook, 'registerTransitionHook is deprecated; use listenBefore instead'),
    unregisterTransitionHook: _deprecate2['default'](unregisterTransitionHook, 'unregisterTransitionHook is deprecated; use the callback returned from listenBefore instead'),
    pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
    replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
  };
}

exports['default'] = createHistory;
module.exports = exports['default'];

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = __webpack_require__(12);

var _warning2 = _interopRequireDefault(_warning);

var _ExecutionEnvironment = __webpack_require__(35);

var _PathUtils = __webpack_require__(19);

var _runTransitionHook = __webpack_require__(50);

var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

var _deprecate = __webpack_require__(49);

var _deprecate2 = _interopRequireDefault(_deprecate);

function useBasename(createHistory) {
  return function () {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var history = createHistory(options);

    var basename = options.basename;

    var checkedBaseHref = false;

    function checkBaseHref() {
      if (checkedBaseHref) {
        return;
      }

      // Automatically use the value of <base href> in HTML
      // documents as basename if it's not explicitly given.
      if (basename == null && _ExecutionEnvironment.canUseDOM) {
        var base = document.getElementsByTagName('base')[0];
        var baseHref = base && base.getAttribute('href');

        if (baseHref != null) {
          basename = baseHref;

          undefined !== 'production' ? _warning2['default'](false, 'Automatically setting basename using <base href> is deprecated and will ' + 'be removed in the next major release. The semantics of <base href> are ' + 'subtly different from basename. Please pass the basename explicitly in ' + 'the options to createHistory') : undefined;
        }
      }

      checkedBaseHref = true;
    }

    function addBasename(location) {
      checkBaseHref();

      if (basename && location.basename == null) {
        if (location.pathname.indexOf(basename) === 0) {
          location.pathname = location.pathname.substring(basename.length);
          location.basename = basename;

          if (location.pathname === '') location.pathname = '/';
        } else {
          location.basename = '';
        }
      }

      return location;
    }

    function prependBasename(location) {
      checkBaseHref();

      if (!basename) return location;

      if (typeof location === 'string') location = _PathUtils.parsePath(location);

      var pname = location.pathname;
      var normalizedBasename = basename.slice(-1) === '/' ? basename : basename + '/';
      var normalizedPathname = pname.charAt(0) === '/' ? pname.slice(1) : pname;
      var pathname = normalizedBasename + normalizedPathname;

      return _extends({}, location, {
        pathname: pathname
      });
    }

    // Override all read methods with basename-aware versions.
    function listenBefore(hook) {
      return history.listenBefore(function (location, callback) {
        _runTransitionHook2['default'](hook, addBasename(location), callback);
      });
    }

    function listen(listener) {
      return history.listen(function (location) {
        listener(addBasename(location));
      });
    }

    // Override all write methods with basename-aware versions.
    function push(location) {
      history.push(prependBasename(location));
    }

    function replace(location) {
      history.replace(prependBasename(location));
    }

    function createPath(location) {
      return history.createPath(prependBasename(location));
    }

    function createHref(location) {
      return history.createHref(prependBasename(location));
    }

    function createLocation(location) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return addBasename(history.createLocation.apply(history, [prependBasename(location)].concat(args)));
    }

    // deprecated
    function pushState(state, path) {
      if (typeof path === 'string') path = _PathUtils.parsePath(path);

      push(_extends({ state: state }, path));
    }

    // deprecated
    function replaceState(state, path) {
      if (typeof path === 'string') path = _PathUtils.parsePath(path);

      replace(_extends({ state: state }, path));
    }

    return _extends({}, history, {
      listenBefore: listenBefore,
      listen: listen,
      push: push,
      replace: replace,
      createPath: createPath,
      createHref: createHref,
      createLocation: createLocation,

      pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
      replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
    });
  };
}

exports['default'] = useBasename;
module.exports = exports['default'];

/***/ }),
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _routerWarning = __webpack_require__(7);

var _routerWarning2 = _interopRequireDefault(_routerWarning);

var _invariant = __webpack_require__(8);

var _invariant2 = _interopRequireDefault(_invariant);

var _PropTypes = __webpack_require__(67);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _React$PropTypes = _react2.default.PropTypes;
var bool = _React$PropTypes.bool;
var object = _React$PropTypes.object;
var string = _React$PropTypes.string;
var func = _React$PropTypes.func;
var oneOfType = _React$PropTypes.oneOfType;


function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

// TODO: De-duplicate against hasAnyProperties in createTransitionManager.
function isEmptyObject(object) {
  for (var p in object) {
    if (Object.prototype.hasOwnProperty.call(object, p)) return false;
  }return true;
}

function createLocationDescriptor(to, _ref) {
  var query = _ref.query;
  var hash = _ref.hash;
  var state = _ref.state;

  if (query || hash || state) {
    return { pathname: to, query: query, hash: hash, state: state };
  }

  return to;
}

/**
 * A <Link> is used to create an <a> element that links to a route.
 * When that route is active, the link gets the value of its
 * activeClassName prop.
 *
 * For example, assuming you have the following route:
 *
 *   <Route path="/posts/:postID" component={Post} />
 *
 * You could use the following component to link to that route:
 *
 *   <Link to={`/posts/${post.id}`} />
 *
 * Links may pass along location state and/or query string parameters
 * in the state/query props, respectively.
 *
 *   <Link ... query={{ show: true }} state={{ the: 'state' }} />
 */
var Link = _react2.default.createClass({
  displayName: 'Link',


  contextTypes: {
    router: _PropTypes.routerShape
  },

  propTypes: {
    to: oneOfType([string, object]),
    query: object,
    hash: string,
    state: object,
    activeStyle: object,
    activeClassName: string,
    onlyActiveOnIndex: bool.isRequired,
    onClick: func,
    target: string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      onlyActiveOnIndex: false,
      style: {}
    };
  },
  handleClick: function handleClick(event) {
    if (this.props.onClick) this.props.onClick(event);

    if (event.defaultPrevented) return;

    !this.context.router ? undefined !== 'production' ? (0, _invariant2.default)(false, '<Link>s rendered outside of a router context cannot navigate.') : (0, _invariant2.default)(false) : void 0;

    if (isModifiedEvent(event) || !isLeftClickEvent(event)) return;

    // If target prop is set (e.g. to "_blank"), let browser handle link.
    /* istanbul ignore if: untestable with Karma */
    if (this.props.target) return;

    event.preventDefault();

    var _props = this.props;
    var to = _props.to;
    var query = _props.query;
    var hash = _props.hash;
    var state = _props.state;

    var location = createLocationDescriptor(to, { query: query, hash: hash, state: state });

    this.context.router.push(location);
  },
  render: function render() {
    var _props2 = this.props;
    var to = _props2.to;
    var query = _props2.query;
    var hash = _props2.hash;
    var state = _props2.state;
    var activeClassName = _props2.activeClassName;
    var activeStyle = _props2.activeStyle;
    var onlyActiveOnIndex = _props2.onlyActiveOnIndex;

    var props = _objectWithoutProperties(_props2, ['to', 'query', 'hash', 'state', 'activeClassName', 'activeStyle', 'onlyActiveOnIndex']);

    undefined !== 'production' ? (0, _routerWarning2.default)(!(query || hash || state), 'the `query`, `hash`, and `state` props on `<Link>` are deprecated, use `<Link to={{ pathname, query, hash, state }}/>. http://tiny.cc/router-isActivedeprecated') : void 0;

    // Ignore if rendered outside the context of router, simplifies unit testing.
    var router = this.context.router;


    if (router) {
      // If user does not specify a `to` prop, return an empty anchor tag.
      if (to == null) {
        return _react2.default.createElement('a', props);
      }

      var location = createLocationDescriptor(to, { query: query, hash: hash, state: state });
      props.href = router.createHref(location);

      if (activeClassName || activeStyle != null && !isEmptyObject(activeStyle)) {
        if (router.isActive(location, onlyActiveOnIndex)) {
          if (activeClassName) {
            if (props.className) {
              props.className += ' ' + activeClassName;
            } else {
              props.className = activeClassName;
            }
          }

          if (activeStyle) props.style = _extends({}, props.style, activeStyle);
        }
      }
    }

    return _react2.default.createElement('a', _extends({}, props, { onClick: this.handleClick }));
  }
});

exports.default = Link;
module.exports = exports['default'];

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _invariant = __webpack_require__(8);

var _invariant2 = _interopRequireDefault(_invariant);

var _RouteUtils = __webpack_require__(17);

var _PatternUtils = __webpack_require__(27);

var _InternalPropTypes = __webpack_require__(21);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _React$PropTypes = _react2.default.PropTypes;
var string = _React$PropTypes.string;
var object = _React$PropTypes.object;

/**
 * A <Redirect> is used to declare another URL path a client should
 * be sent to when they request a given URL.
 *
 * Redirects are placed alongside routes in the route configuration
 * and are traversed in the same manner.
 */

var Redirect = _react2.default.createClass({
  displayName: 'Redirect',


  statics: {
    createRouteFromReactElement: function createRouteFromReactElement(element) {
      var route = (0, _RouteUtils.createRouteFromReactElement)(element);

      if (route.from) route.path = route.from;

      route.onEnter = function (nextState, replace) {
        var location = nextState.location;
        var params = nextState.params;


        var pathname = void 0;
        if (route.to.charAt(0) === '/') {
          pathname = (0, _PatternUtils.formatPattern)(route.to, params);
        } else if (!route.to) {
          pathname = location.pathname;
        } else {
          var routeIndex = nextState.routes.indexOf(route);
          var parentPattern = Redirect.getRoutePattern(nextState.routes, routeIndex - 1);
          var pattern = parentPattern.replace(/\/*$/, '/') + route.to;
          pathname = (0, _PatternUtils.formatPattern)(pattern, params);
        }

        replace({
          pathname: pathname,
          query: route.query || location.query,
          state: route.state || location.state
        });
      };

      return route;
    },
    getRoutePattern: function getRoutePattern(routes, routeIndex) {
      var parentPattern = '';

      for (var i = routeIndex; i >= 0; i--) {
        var route = routes[i];
        var pattern = route.path || '';

        parentPattern = pattern.replace(/\/*$/, '/') + parentPattern;

        if (pattern.indexOf('/') === 0) break;
      }

      return '/' + parentPattern;
    }
  },

  propTypes: {
    path: string,
    from: string, // Alias for path
    to: string.isRequired,
    query: object,
    state: object,
    onEnter: _InternalPropTypes.falsy,
    children: _InternalPropTypes.falsy
  },

  /* istanbul ignore next: sanity check */
  render: function render() {
     true ? undefined !== 'production' ? (0, _invariant2.default)(false, '<Redirect> elements are for router configuration only and should not be rendered') : (0, _invariant2.default)(false) : void 0;
  }
});

exports.default = Redirect;
module.exports = exports['default'];

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.createRouterObject = createRouterObject;
exports.createRoutingHistory = createRoutingHistory;

var _deprecateObjectProperties = __webpack_require__(44);

var _deprecateObjectProperties2 = _interopRequireDefault(_deprecateObjectProperties);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createRouterObject(history, transitionManager) {
  return _extends({}, history, {
    setRouteLeaveHook: transitionManager.listenBeforeLeavingRoute,
    isActive: transitionManager.isActive
  });
}

// deprecated
function createRoutingHistory(history, transitionManager) {
  history = _extends({}, history, transitionManager);

  if (undefined !== 'production') {
    history = (0, _deprecateObjectProperties2.default)(history, '`props.history` and `context.history` are deprecated. Please use `context.router`. http://tiny.cc/router-contextchanges');
  }

  return history;
}

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = createMemoryHistory;

var _useQueries = __webpack_require__(36);

var _useQueries2 = _interopRequireDefault(_useQueries);

var _useBasename = __webpack_require__(82);

var _useBasename2 = _interopRequireDefault(_useBasename);

var _createMemoryHistory = __webpack_require__(148);

var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createMemoryHistory(options) {
  // signatures and type checking differ between `useRoutes` and
  // `createMemoryHistory`, have to create `memoryHistory` first because
  // `useQueries` doesn't understand the signature
  var memoryHistory = (0, _createMemoryHistory2.default)(options);
  var createHistory = function createHistory() {
    return memoryHistory;
  };
  var history = (0, _useQueries2.default)((0, _useBasename2.default)(createHistory))(options);
  history.__v2_compatible__ = true;
  return history;
}
module.exports = exports['default'];

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (createHistory) {
  var history = void 0;
  if (canUseDOM) history = (0, _useRouterHistory2.default)(createHistory)();
  return history;
};

var _useRouterHistory = __webpack_require__(112);

var _useRouterHistory2 = _interopRequireDefault(_useRouterHistory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

module.exports = exports['default'];

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = makeStateWithLocation;

var _deprecateObjectProperties = __webpack_require__(44);

var _routerWarning = __webpack_require__(7);

var _routerWarning2 = _interopRequireDefault(_routerWarning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeStateWithLocation(state, location) {
  if (undefined !== 'production' && _deprecateObjectProperties.canUseMembrane) {
    var stateWithLocation = _extends({}, state);

    // I don't use deprecateObjectProperties here because I want to keep the
    // same code path between development and production, in that we just
    // assign extra properties to the copy of the state object in both cases.

    var _loop = function _loop(prop) {
      if (!Object.prototype.hasOwnProperty.call(location, prop)) {
        return 'continue';
      }

      Object.defineProperty(stateWithLocation, prop, {
        get: function get() {
          undefined !== 'production' ? (0, _routerWarning2.default)(false, 'Accessing location properties directly from the first argument to `getComponent`, `getComponents`, `getChildRoutes`, and `getIndexRoute` is deprecated. That argument is now the router state (`nextState` or `partialNextState`) rather than the location. To access the location, use `nextState.location` or `partialNextState.location`.') : void 0;
          return location[prop];
        }
      });
    };

    for (var prop in location) {
      var _ret = _loop(prop);

      if (_ret === 'continue') continue;
    }

    return stateWithLocation;
  }

  return _extends({}, state, location);
}
module.exports = exports['default'];

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = useRouterHistory;

var _useQueries = __webpack_require__(36);

var _useQueries2 = _interopRequireDefault(_useQueries);

var _useBasename = __webpack_require__(82);

var _useBasename2 = _interopRequireDefault(_useBasename);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useRouterHistory(createHistory) {
  return function (options) {
    var history = (0, _useQueries2.default)((0, _useBasename2.default)(createHistory))(options);
    history.__v2_compatible__ = true;
    return history;
  };
}
module.exports = exports['default'];

/***/ }),
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


$(document).ready(function () {
  $(window).scroll(function () {
    if (window.pageYOffset > 0) {
      $('.scroll').addClass('hidden');
    } else {
      $('.scroll').removeClass('hidden');
    }

    if (window.pageYOffset > 300) {
      $('#logo').addClass('visible');
      $('#logo').removeClass('hidden');
      $('#menu-bar').addClass('menu__bar');
    } else {
      $('#logo').addClass('hidden');
      $('#logo').removeClass('visible');
      $('#menu-bar').removeClass('menu__bar');
    }
  });
});

$(".projetos__list").hover(function () {
  $(".projetos__list").removeClass("no-opacity").addClass("opacity");
  $(this).addClass("no-opacity").removeClass("opacity");
});

/* Parallax End */

/* Load */

$(window).on('load', function () {
  $('#load-item').fadeOut('fast', function () {
    $('.load').animate({ left: '-100%' }, function () {
      $('#home__titleNameMain').css('opacity', '1');
      $('#home__titleName').css('opacity', '1');
      $('#home__titleSub').css('opacity', '1');
      $('.fadeOn').css('opacity', '1');
    });
  });
}

/* End Load */

/* Slide */

);var menu = true;
var item_width = 0;
var item_width_2 = 0;
var left_indent = 0;
var left_indent_2 = 0;
var item = 0;
var speed = 2000;

$(document).ready(function () {
  $('#visor').css('width', $('.carousel__item').outerWidth()).css('height', $('.carousel__item').outerHeight());
  $('.carousel__item').clone().prependTo('#carousel_container-2 .slide').clone().prependTo('#carousel_container-2 .slide');
  rotate();
  timeout();
});

function timeout() {
  setTimeout(function () {
    rotate();
    rotateMobile();
    timeout();
  }, speed);
}

function rotate() {
  item_width_2 = $('#carousel_container-2 .carousel__item').outerWidth();
  left_indent_2 = parseInt($('.slide').css('left')) + item_width_2;
  $('#carousel_container-2 .slide:not(:animated)').animate({ 'left': left_indent_2 }, 500, function () {
    $('#carousel_container-2 .carousel__item:first').before($('#carousel_container-2 .carousel__item:last'));
    $('#carousel_container-2 .slide').css({ 'left': -item_width_2 + 'px' });
  });
}

function rotateMobile() {
  item_width = $('#carousel_container .carousel__item').outerWidth();
  left_indent = parseInt($('.slide').css('left')) + item_width;
  $('#carousel_container .slide:not(:animated)').animate({ 'left': left_indent }, 500, function () {
    $('#carousel_container .carousel__item:first').before($('#carousel_container .carousel__item:last'));
    $('#carousel_container .slide').css({ 'left': -item_width + 'px' });
  });
}

/* Slide End */

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(29);

var _main = __webpack_require__(121);

var _main2 = _interopRequireDefault(_main);

var _home = __webpack_require__(120);

var _home2 = _interopRequireDefault(_home);

var _projetos = __webpack_require__(122);

var _projetos2 = _interopRequireDefault(_projetos);

var _sobre = __webpack_require__(123);

var _sobre2 = _interopRequireDefault(_sobre);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createElement(
    _reactRouter.Route,
    { component: _main2.default },
    _react2.default.createElement(_reactRouter.IndexRoute, { component: _home2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: '/projetos', component: _projetos2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: '/quem_sou', component: _sobre2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: '/home', component: _home2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: '*', component: _home2.default })
);

/***/ }),
/* 119 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(18);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactParticlesJs = __webpack_require__(223);

var _reactParticlesJs2 = _interopRequireDefault(_reactParticlesJs);

var _reactRouter = __webpack_require__(29);

var _nilsan = __webpack_require__(77);

var _nilsan2 = _interopRequireDefault(_nilsan);

var _igapira = __webpack_require__(75);

var _igapira2 = _interopRequireDefault(_igapira);

var _igapira3 = __webpack_require__(76);

var _igapira4 = _interopRequireDefault(_igapira3);

var _otavioSanchez = __webpack_require__(74);

var _otavioSanchez2 = _interopRequireDefault(_otavioSanchez);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var particles = 120;
var area = 1000;

if ($(window).width() < 800) {
    particles = 50;
    area = 500;
}
var particles = 120;
var area = 1000;

if ($(window).width() < 800) {
    particles = 50;
    area = 500;
}

var Home = function (_Component) {
    _inherits(Home, _Component);

    function Home() {
        _classCallCheck(this, Home);

        return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).apply(this, arguments));
    }

    _createClass(Home, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            window.scrollTo(0, 0);
            document.title = "Otávio Sanchez - Desenvolvedor Web";
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'wrap' },
                _react2.default.createElement(HomeSection, null),
                _react2.default.createElement(SobreSection, null),
                _react2.default.createElement(ProjetosSection, null),
                _react2.default.createElement(ServicosSection, null),
                _react2.default.createElement(SocialSection, null),
                _react2.default.createElement(ContatoSection, null)
            );
        }
    }]);

    return Home;
}(_react.Component);

var ParticlesHome = function (_React$Component) {
    _inherits(ParticlesHome, _React$Component);

    function ParticlesHome() {
        _classCallCheck(this, ParticlesHome);

        return _possibleConstructorReturn(this, (ParticlesHome.__proto__ || Object.getPrototypeOf(ParticlesHome)).apply(this, arguments));
    }

    _createClass(ParticlesHome, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'ParticlesHome' },
                _react2.default.createElement(_reactParticlesJs2.default, {
                    params: {
                        'particles': {
                            'number': {
                                'value': particles,
                                'density': {
                                    'enable': true,
                                    'value_area': area
                                }
                            },
                            'color': {
                                'value': ['#f26838', '#6d737f']
                            },
                            'shape': {
                                'type': 'circle',
                                'stroke': {
                                    'width': 0,
                                    'color': '#fff'
                                },
                                'polygon': {
                                    'nb_sides': 5
                                },
                                'image': {
                                    'src': 'img/github.svg',
                                    'width': 100,
                                    'height': 100
                                }
                            },
                            'opacity': {
                                'value': 0.6,
                                'random': false,
                                'anim': {
                                    'enable': false,
                                    'speed': 1,
                                    'opacity_min': 0.1,
                                    'sync': false
                                }
                            },
                            'size': {
                                'value': 2,
                                'random': true,
                                'anim': {
                                    'enable': false,
                                    'speed': 40,
                                    'size_min': 0.3,
                                    'sync': false
                                }
                            },
                            'line_linked': {
                                'enable': true,
                                'distance': 100,
                                'color': '#ffffff',
                                'opacity': 0.2,
                                'width': 1
                            }
                        },
                        'interactivity': {
                            'detect_on': 'canvas',
                            'events': {
                                'onhover': {
                                    'enable': true,
                                    'mode': 'grab'
                                },
                                'onclick': {
                                    'enable': false
                                },
                                'resize': true
                            },
                            'modes': {
                                'grab': {
                                    'distance': 140,
                                    'line_linked': {
                                        'opacity': 1
                                    }
                                },
                                'bubble': {
                                    'distance': 400,
                                    'size': 40,
                                    'duration': 2,
                                    'opacity': 8,
                                    'speed': 3
                                },
                                'repulse': {
                                    'distance': 200,
                                    'duration': 0.4
                                },
                                'push': {
                                    'particles_nb': 4
                                },
                                'remove': {
                                    'particles_nb': 2
                                }
                            }
                        },
                        'retina_detect': true
                    } })
            );
        }
    }]);

    return ParticlesHome;
}(_react2.default.Component);

var HomeSection = function (_React$Component2) {
    _inherits(HomeSection, _React$Component2);

    function HomeSection(props) {
        _classCallCheck(this, HomeSection);

        var _this3 = _possibleConstructorReturn(this, (HomeSection.__proto__ || Object.getPrototypeOf(HomeSection)).call(this, props));

        _this3.handleClick = _this3.handleClick.bind(_this3);
        return _this3;
    }

    _createClass(HomeSection, [{
        key: 'handleClick',
        value: function handleClick() {
            document.getElementById('projetos').scrollIntoView();
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'section',
                { className: 'home', id: 'home' },
                _react2.default.createElement(ParticlesHome, null),
                _react2.default.createElement(
                    'article',
                    { className: 'home__article' },
                    _react2.default.createElement(
                        'div',
                        { className: 'home__center' },
                        _react2.default.createElement(
                            'hgroup',
                            { className: 'home__group' },
                            _react2.default.createElement(
                                'h1',
                                { id: 'home__titleNameMain', className: 'home__title' },
                                'Ot\xE1vio'
                            ),
                            _react2.default.createElement(
                                'h1',
                                { id: 'home__titleName', className: 'home__title' },
                                'Sanchez'
                            ),
                            _react2.default.createElement(
                                'h1',
                                { id: 'home__titleSub', className: 'home__title--sub' },
                                'DESENVOLVEDOR WEB'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'row display-flex fadeOn' },
                            _react2.default.createElement(
                                'div',
                                { className: 'o-col-xs-12' },
                                _react2.default.createElement(
                                    'a',
                                    { className: 'button button-1--main', onClick: this.handleClick },
                                    _react2.default.createElement(
                                        'svg',
                                        null,
                                        _react2.default.createElement('rect', { fill: 'none', height: '100%', width: '100%', x: '0', y: '0' })
                                    ),
                                    'Conhe\xE7a Meus Projetos'
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return HomeSection;
}(_react2.default.Component);

;

var ServicosSection = function (_React$Component3) {
    _inherits(ServicosSection, _React$Component3);

    function ServicosSection() {
        _classCallCheck(this, ServicosSection);

        return _possibleConstructorReturn(this, (ServicosSection.__proto__ || Object.getPrototypeOf(ServicosSection)).apply(this, arguments));
    }

    _createClass(ServicosSection, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'section',
                { className: 'section servicos border', id: 'servicos' },
                _react2.default.createElement(
                    'header',
                    { className: 'servicos__header', id: 'app' },
                    _react2.default.createElement(
                        'h1',
                        { className: 'servicos__title' },
                        'Servi\xE7os'
                    ),
                    _react2.default.createElement('span', { className: 'division' })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'container--body' },
                    _react2.default.createElement(
                        'article',
                        { className: 'servico' },
                        _react2.default.createElement(
                            'div',
                            { className: 'o-col-xs-6 o-col-md-12 order-2', id: 'servico3' },
                            _react2.default.createElement(
                                'h2',
                                { className: 'servicos__title' },
                                'Planejamento e efici\xEAncia'
                            ),
                            _react2.default.createElement(
                                'p',
                                { className: 'paragraph' },
                                'Cada sistema web \xE9 desenvolvido sob medida.Isso permite uma resposta adequada \xE0s suas necessidades e elimina funcionalidades e custos desnecess\xE1rios.'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'o-col-xs-6 o-col-md-12 order-1' },
                            _react2.default.createElement(SVGSprite, { id: 'servicos_3', 'class': 'servicos__image' })
                        )
                    ),
                    _react2.default.createElement(
                        'article',
                        { className: 'servico' },
                        _react2.default.createElement(
                            'div',
                            { className: 'o-col-xs-6 o-col-md-12 order-1' },
                            _react2.default.createElement(SVGSprite, { id: 'servicos_2', 'class': 'servicos__image' })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'o-col-xs-6 o-col-md-12 order-2', id: 'servico2' },
                            _react2.default.createElement(
                                'h2',
                                { className: 'servicos__title' },
                                'Desenvolvimento de Sistemas Web'
                            ),
                            _react2.default.createElement(
                                'p',
                                { className: 'paragraph' },
                                'Desenvolvimento de sistemas web exclusivos, personalizados e criativos de acordo com os seus requisitos.Buscando sempre novas tecnologias, capazes de otimizar os processos de seu neg\xF3cio.'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'article',
                        { className: 'servico' },
                        _react2.default.createElement(
                            'div',
                            { className: 'o-col-xs-6 o-col-md-12 order-2', id: 'servico1' },
                            _react2.default.createElement(
                                'h2',
                                { className: 'servicos__title' },
                                'Id\xE9ias para o seu neg\xF3cio'
                            ),
                            _react2.default.createElement(
                                'p',
                                { className: 'paragraph' },
                                'Estudando e entendendo os usu\xE1rio que v\xE3o utilizar o sistema web, unindo a vis\xE3o de neg\xF3cio com a vis\xE3o do usu\xE1rio e a tecnologia necess\xE1ria.'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'o-col-xs-6 o-col-md-12 order-1' },
                            _react2.default.createElement(SVGSprite, { id: 'servicos_1', 'class': 'servicos__image' })
                        )
                    )
                )
            );
        }
    }]);

    return ServicosSection;
}(_react2.default.Component);

var ProjetosSection = function (_React$Component4) {
    _inherits(ProjetosSection, _React$Component4);

    function ProjetosSection() {
        _classCallCheck(this, ProjetosSection);

        return _possibleConstructorReturn(this, (ProjetosSection.__proto__ || Object.getPrototypeOf(ProjetosSection)).apply(this, arguments));
    }

    _createClass(ProjetosSection, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'section',
                { className: 'section projetos border', id: 'projetos' },
                _react2.default.createElement(
                    'header',
                    { className: 'projetos__header' },
                    _react2.default.createElement(
                        'h1',
                        { className: 'projetos__title' },
                        'Projetos'
                    ),
                    _react2.default.createElement('span', { className: 'division' }),
                    _react2.default.createElement(
                        'h2',
                        { className: 'projetos__title--sub' },
                        'Conhe\xE7a meu Portf\xF3lio e alguns de meus projetos pessoais.'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'row' },
                        _react2.default.createElement(
                            'div',
                            { className: 'o-col-xs-12' },
                            _react2.default.createElement(
                                _reactRouter.Link,
                                { className: 'button button-1', to: '/projetos' },
                                _react2.default.createElement(
                                    'svg',
                                    null,
                                    _react2.default.createElement('rect', { fill: 'none', height: '100%', width: '100%', x: '0', y: '0' })
                                ),
                                'Ver Todos'
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'article' },
                    _react2.default.createElement(
                        'div',
                        { className: 'carousel' },
                        _react2.default.createElement(
                            'div',
                            { className: 'mobile' },
                            _react2.default.createElement(
                                'div',
                                { id: 'visor', className: 'visor' },
                                _react2.default.createElement(
                                    'div',
                                    { id: 'carousel_container' },
                                    _react2.default.createElement(
                                        'ul',
                                        { className: 'slide', id: 'carousel_ul' },
                                        _react2.default.createElement(
                                            'li',
                                            { className: 'carousel__item' },
                                            _react2.default.createElement('img', { className: 'carousel__image', src: _nilsan2.default, alt: 'Slide 1' })
                                        ),
                                        _react2.default.createElement(
                                            'li',
                                            { className: 'carousel__item' },
                                            _react2.default.createElement('img', { className: 'carousel__image', src: _igapira2.default, alt: 'Slide 1' })
                                        ),
                                        _react2.default.createElement(
                                            'li',
                                            { className: 'carousel__item' },
                                            _react2.default.createElement('img', { className: 'carousel__image', src: _igapira4.default, alt: 'Slide 1' })
                                        ),
                                        _react2.default.createElement(
                                            'li',
                                            { className: 'carousel__item' },
                                            _react2.default.createElement('img', { className: 'carousel__image', src: _nilsan2.default, alt: 'Slide 1' })
                                        ),
                                        _react2.default.createElement(
                                            'li',
                                            { className: 'carousel__item' },
                                            _react2.default.createElement('img', { className: 'carousel__image', src: _igapira4.default, alt: 'Slide 1' })
                                        )
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement('div', { className: 'carousel__bg' }),
                        _react2.default.createElement(
                            'div',
                            { id: 'carousel_container-2' },
                            _react2.default.createElement(
                                'div',
                                { id: 'carousel_inner-2' },
                                _react2.default.createElement('ul', { className: 'slide', id: 'carousel_ul-2' })
                            )
                        )
                    )
                )
            );
        }
    }]);

    return ProjetosSection;
}(_react2.default.Component);

;

var SobreSection = function (_React$Component5) {
    _inherits(SobreSection, _React$Component5);

    function SobreSection() {
        _classCallCheck(this, SobreSection);

        return _possibleConstructorReturn(this, (SobreSection.__proto__ || Object.getPrototypeOf(SobreSection)).apply(this, arguments));
    }

    _createClass(SobreSection, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'section',
                { className: 'sobre border', id: 'quemsou' },
                _react2.default.createElement(
                    'header',
                    { className: 'sobre__header' },
                    _react2.default.createElement(
                        'h2',
                        { className: 'sobre__title' },
                        'Quem Sou'
                    ),
                    _react2.default.createElement('span', { className: 'division' })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'container--body' },
                    _react2.default.createElement(
                        'div',
                        { className: 'quem_sou' },
                        _react2.default.createElement(
                            'div',
                            { className: 'o-col-xs-12 align_h_center' },
                            _react2.default.createElement(
                                'figure',
                                { className: 'sobre__figure' },
                                _react2.default.createElement('img', {
                                    src: _otavioSanchez2.default,
                                    className: 'sobre__image',
                                    alt: 'Ot\xE1vio Sanchez',
                                    title: 'Ot\xE1vio Sanchez' })
                            ),
                            _react2.default.createElement(
                                'article',
                                { id: 'quemsou' },
                                _react2.default.createElement(
                                    'p',
                                    { className: 'paragraph' },
                                    'Ol\xE1, eu sou Ot\xE1vio Sanchez.Sou Desenvolvedor Web, entusiasta de tecnologia, autodidata e apaixonado por c\xF3digo.'
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'paragraph' },
                                    'Estudante do Bacharelado em Ci\xEAncia e Tecnologia pela Universidade Federal do ABC - curso multidisciplinar - que me permitiu abrir espa\xE7o para novas possibilidades atrav\xE9s da tecnologia da informa\xE7\xE3o em suas mais diferentes vertentes.'
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'sobre__row' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'o-col-xs-12' },
                                        _react2.default.createElement(
                                            _reactRouter.Link,
                                            { className: 'button button-1', to: '/quem_sou' },
                                            _react2.default.createElement(
                                                'svg',
                                                null,
                                                _react2.default.createElement('rect', { fill: 'none', height: '100%', width: '100%', x: '0', y: '0' })
                                            ),
                                            'Veja Completo'
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return SobreSection;
}(_react2.default.Component);

var mobileItem = function (_React$Component6) {
    _inherits(mobileItem, _React$Component6);

    function mobileItem() {
        _classCallCheck(this, mobileItem);

        return _possibleConstructorReturn(this, (mobileItem.__proto__ || Object.getPrototypeOf(mobileItem)).apply(this, arguments));
    }

    _createClass(mobileItem, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'o-col-md-12 o-col-xs-6' },
                _react2.default.createElement(
                    'div',
                    { className: 'sobre__mobile' },
                    _react2.default.createElement(
                        'div',
                        { className: 'display' },
                        _react2.default.createElement(SVGSprite, { id: 'battery', 'class': 'battery' }),
                        _react2.default.createElement(
                            'div',
                            { className: 'hour' },
                            new Date().toLocaleString('en-US', {
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true
                            })
                        ),
                        _react2.default.createElement(SVGSprite, { id: 'wifi', 'class': 'wifi' })
                    )
                )
            );
        }
    }]);

    return mobileItem;
}(_react2.default.Component);

;

var SocialSection = function (_React$Component7) {
    _inherits(SocialSection, _React$Component7);

    function SocialSection() {
        _classCallCheck(this, SocialSection);

        return _possibleConstructorReturn(this, (SocialSection.__proto__ || Object.getPrototypeOf(SocialSection)).apply(this, arguments));
    }

    _createClass(SocialSection, [{
        key: 'render',
        value: function render() {
            var _React$createElement;

            return _react2.default.createElement(
                'div',
                { className: 'content_social border' },
                _react2.default.createElement('div', { className: 'overlay' }),
                _react2.default.createElement(
                    'header',
                    { className: 'content_social__header' },
                    _react2.default.createElement(
                        'h1',
                        { className: 'content_social__title' },
                        'Redes Sociais'
                    ),
                    _react2.default.createElement('span', { className: 'division' })
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'nav',
                        { className: 'nav' },
                        _react2.default.createElement(
                            'ul',
                            { className: 'social_network' },
                            _react2.default.createElement(
                                'li',
                                { className: 'social_network__item--lite' },
                                _react2.default.createElement(
                                    'a',
                                    {
                                        className: 'social_network__link',
                                        title: 'GitHub',
                                        target: '_blank',
                                        href: 'https://github.com/sanchezotavio' },
                                    _react2.default.createElement(SVGSprite, { id: 'githubWhite', 'class': 'social_network__image' })
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                { className: 'social_network__item--lite' },
                                _react2.default.createElement(
                                    'a',
                                    (_React$createElement = {
                                        className: 'social_network__link',
                                        title: 'Linkedin',
                                        target: '_blank'
                                    }, _defineProperty(_React$createElement, 'target', '_blank'), _defineProperty(_React$createElement, 'href', 'https://www.linkedin.com/in/ot%C3%A1vio-sanchez-a3ba967a'), _React$createElement),
                                    _react2.default.createElement(SVGSprite, { id: 'linkedinWhite', 'class': 'social_network__image' })
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return SocialSection;
}(_react2.default.Component);

;

var ContatoSection = function (_React$Component8) {
    _inherits(ContatoSection, _React$Component8);

    function ContatoSection() {
        _classCallCheck(this, ContatoSection);

        return _possibleConstructorReturn(this, (ContatoSection.__proto__ || Object.getPrototypeOf(ContatoSection)).apply(this, arguments));
    }

    _createClass(ContatoSection, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'section',
                { id: 'contato', className: 'contato border' },
                _react2.default.createElement(
                    'header',
                    { className: 'contato__header' },
                    _react2.default.createElement(
                        'h1',
                        { className: 'contato__title' },
                        'Contato'
                    ),
                    _react2.default.createElement('span', { className: 'division' }),
                    _react2.default.createElement(
                        'h2',
                        { className: 'contato__title--sub' },
                        'Deseja entrar em contato?'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'container' },
                    _react2.default.createElement(
                        'div',
                        { id: 'contatos', className: 'o-col-md-12 o-col-xs-12 align_h_center' },
                        _react2.default.createElement(
                            'div',
                            { className: 'contato__text' },
                            'Email:\xA0',
                            _react2.default.createElement(
                                'a',
                                { className: 'link first after', href: 'mailto:dev@otaviosanchez.com' },
                                'dev@otaviosanchez.com'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'contato__text first after' },
                            'S\xE3o Paulo - SP'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'contato__text' },
                            'Celular:\xA0',
                            _react2.default.createElement(
                                'a',
                                { className: 'link first after', href: 'tel:11945336910' },
                                '(11) 94533-6910'
                            )
                        )
                    )
                )
            );
        }
    }]);

    return ContatoSection;
}(_react2.default.Component);

;

var FormContato = function (_React$Component9) {
    _inherits(FormContato, _React$Component9);

    function FormContato() {
        _classCallCheck(this, FormContato);

        return _possibleConstructorReturn(this, (FormContato.__proto__ || Object.getPrototypeOf(FormContato)).apply(this, arguments));
    }

    _createClass(FormContato, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'form',
                { className: 'form', action: 'mailto:dev@otaviosanchez.com', method: 'post' },
                _react2.default.createElement(
                    'div',
                    { className: 'o-col-md-12 o-col-xs-6' },
                    _react2.default.createElement('input', {
                        type: 'text',
                        name: 'assunto',
                        id: 'assunto',
                        className: 'textbox',
                        placeholder: 'Assunto*',
                        required: true })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'o-col-md-12 o-col-xs-6' },
                    _react2.default.createElement('input', {
                        type: 'tel',
                        name: 'telefone',
                        id: 'telefone',
                        className: 'textbox',
                        placeholder: 'Telefone' })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'o-col-md-12 o-col-xs-6' },
                    _react2.default.createElement('input', {
                        type: 'text',
                        name: 'name',
                        id: 'name',
                        className: 'textbox',
                        placeholder: 'Seu Nome*',
                        required: true })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'o-col-md-12 o-col-xs-6' },
                    _react2.default.createElement('input', {
                        type: 'email',
                        name: 'email',
                        id: 'email',
                        className: 'textbox',
                        placeholder: 'Email*',
                        required: true })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'o-col-md-12 o-col-xs-12' },
                    _react2.default.createElement('textarea', {
                        className: 'textbox--mensagem',
                        name: 'comment',
                        id: 'comment',
                        placeholder: 'Mensagem*',
                        required: true })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement('input', {
                        type: 'submit',
                        className: 'button button-2',
                        value: 'Enviar',
                        name: 'enviar',
                        id: 'enviar' })
                )
            );
        }
    }]);

    return FormContato;
}(_react2.default.Component);

;

var SVGSprite = function (_React$Component10) {
    _inherits(SVGSprite, _React$Component10);

    function SVGSprite() {
        _classCallCheck(this, SVGSprite);

        return _possibleConstructorReturn(this, (SVGSprite.__proto__ || Object.getPrototypeOf(SVGSprite)).apply(this, arguments));
    }

    _createClass(SVGSprite, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'svg',
                { className: this.props.class },
                _react2.default.createElement('use', { xlinkHref: "#" + this.props.id })
            );
        }
    }]);

    return SVGSprite;
}(_react2.default.Component);

;

var SVG = function (_React$Component11) {
    _inherits(SVG, _React$Component11);

    function SVG() {
        _classCallCheck(this, SVG);

        return _possibleConstructorReturn(this, (SVG.__proto__ || Object.getPrototypeOf(SVG)).apply(this, arguments));
    }

    _createClass(SVG, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'svg',
                { alt: this.props.name, className: this.props.class },
                _react2.default.createElement('use', { xlinkHref: '#' + this.props.id })
            );
        }
    }]);

    return SVG;
}(_react2.default.Component);

;

exports.default = Home;

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(18);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = __webpack_require__(29);

var _scroll = __webpack_require__(144);

var _scroll2 = _interopRequireDefault(_scroll);

var _load = __webpack_require__(143);

var _load2 = _interopRequireDefault(_load);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Load = function (_React$Component) {
    _inherits(Load, _React$Component);

    function Load() {
        _classCallCheck(this, Load);

        return _possibleConstructorReturn(this, (Load.__proto__ || Object.getPrototypeOf(Load)).apply(this, arguments));
    }

    _createClass(Load, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'load ' + this.props.loading },
                _react2.default.createElement('img', {
                    name: 'load-item',
                    title: 'load-item',
                    className: 'load__item',
                    src: _load2.default })
            );
        }
    }]);

    return Load;
}(_react2.default.Component);

var SVGSprite = function (_React$Component2) {
    _inherits(SVGSprite, _React$Component2);

    function SVGSprite() {
        _classCallCheck(this, SVGSprite);

        return _possibleConstructorReturn(this, (SVGSprite.__proto__ || Object.getPrototypeOf(SVGSprite)).apply(this, arguments));
    }

    _createClass(SVGSprite, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'svg',
                { className: this.props.class },
                _react2.default.createElement('use', { xlinkHref: "#" + this.props.id })
            );
        }
    }]);

    return SVGSprite;
}(_react2.default.Component);

;

var Header = function (_React$Component3) {
    _inherits(Header, _React$Component3);

    function Header(props) {
        _classCallCheck(this, Header);

        var _this3 = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));

        _this3.state = {
            isToggleOn: true
        };

        _this3.handleClick = _this3.handleClick.bind(_this3);
        return _this3;
    }

    _createClass(Header, [{
        key: 'handleClick',
        value: function handleClick() {
            this.setState(function (prevState) {
                return {
                    isToggleOn: !prevState.isToggleOn
                };
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { id: 'menu-bar', className: 'container--header' },
                    _react2.default.createElement(
                        'div',
                        { className: 'o-col-xs-5 align_h_left' },
                        _react2.default.createElement('button', {
                            className: 'button--menu ' + (this.state.isToggleOn ? 'open' : 'close'),
                            onClick: this.handleClick })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'o-col-xs-2 align_h_center' },
                        _react2.default.createElement(Logo, { href: mainLink, title: name, logo: "<OS>" })
                    ),
                    _react2.default.createElement(
                        'nav',
                        { className: 'o-col-xs-5 align_h_right' },
                        _react2.default.createElement(NavRedesSociais, null)
                    )
                ),
                _react2.default.createElement(
                    'div',
                    {
                        id: 'Menu',
                        className: 'menu ' + (this.state.isToggleOn ? 'menu-open' : 'menu-close') },
                    _react2.default.createElement(
                        'nav',
                        { className: 'nav__menu o-col-xs-12' },
                        _react2.default.createElement(
                            'ul',
                            { className: 'list', id: 'navigation' },
                            paginas.map(function (l) {
                                return _react2.default.createElement(
                                    'li',
                                    { key: l.id + '-paginas-menu', className: 'list__item' },
                                    _react2.default.createElement(
                                        _reactRouter.Link,
                                        {
                                            className: 'list__link link first after',
                                            title: l.title,
                                            onClick: this.handleClick.bind(this),
                                            key: l.id + '-paginas-menu',
                                            to: '/' + l.href },
                                        l.title
                                    )
                                );
                            }, this)
                        )
                    )
                )
            );
        }
    }]);

    return Header;
}(_react2.default.Component);

;

var Logo = function (_React$Component4) {
    _inherits(Logo, _React$Component4);

    function Logo() {
        _classCallCheck(this, Logo);

        return _possibleConstructorReturn(this, (Logo.__proto__ || Object.getPrototypeOf(Logo)).apply(this, arguments));
    }

    _createClass(Logo, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'h1',
                { id: 'logo', className: 'logo__title hidden' },
                _react2.default.createElement(
                    _reactRouter.Link,
                    { to: '/', className: 'logo__link', title: this.props.title },
                    this.props.logo
                )
            );
        }
    }]);

    return Logo;
}(_react2.default.Component);

;

var ScrollItem = function (_React$Component5) {
    _inherits(ScrollItem, _React$Component5);

    function ScrollItem() {
        _classCallCheck(this, ScrollItem);

        return _possibleConstructorReturn(this, (ScrollItem.__proto__ || Object.getPrototypeOf(ScrollItem)).apply(this, arguments));
    }

    _createClass(ScrollItem, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'scroll' },
                _react2.default.createElement('img', { id: 'scroll', className: 'scroll__button', src: _scroll2.default })
            );
        }
    }]);

    return ScrollItem;
}(_react2.default.Component);

;

var FooterText = function (_React$Component6) {
    _inherits(FooterText, _React$Component6);

    function FooterText() {
        _classCallCheck(this, FooterText);

        return _possibleConstructorReturn(this, (FooterText.__proto__ || Object.getPrototypeOf(FooterText)).apply(this, arguments));
    }

    _createClass(FooterText, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'footer' },
                _react2.default.createElement(
                    'div',
                    { className: 'container  align_h_center' },
                    _react2.default.createElement(
                        'nav',
                        { className: 'nav' },
                        _react2.default.createElement(
                            'ul',
                            { className: 'footer__nav', id: 'navigation' },
                            paginas.map(function (l) {
                                return _react2.default.createElement(
                                    'li',
                                    { className: 'footer__item', key: l.id + '-paginas--li' },
                                    _react2.default.createElement(
                                        _reactRouter.Link,
                                        {
                                            className: 'link first after',
                                            title: l.title,
                                            to: '/' + l.href,
                                            key: l.id + '-paginas--link' },
                                        l.title
                                    )
                                );
                            })
                        )
                    )
                ),
                _react2.default.createElement(FooterConteudo, null)
            );
        }
    }]);

    return FooterText;
}(_react2.default.Component);

;

var FooterConteudo = function (_React$Component7) {
    _inherits(FooterConteudo, _React$Component7);

    function FooterConteudo() {
        _classCallCheck(this, FooterConteudo);

        return _possibleConstructorReturn(this, (FooterConteudo.__proto__ || Object.getPrototypeOf(FooterConteudo)).apply(this, arguments));
    }

    _createClass(FooterConteudo, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'border space container' },
                _react2.default.createElement(
                    'div',
                    { className: 'o-col-xs-6 o-col-lg-12  align_h_left--responsive' },
                    _react2.default.createElement(
                        'div',
                        { className: 'text' },
                        'Desenvolvido por\xA0',
                        _react2.default.createElement(
                            'a',
                            { href: mainLink, className: 'link first after', title: name },
                            name
                        ),
                        '.'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'text' },
                        'Copyright \xA9 ',
                        ano,
                        name,
                        '.Todos os direitos reservados.'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'o-col-xs-6 o-col-lg-12  align_h_right--responsive' },
                    _react2.default.createElement(
                        'div',
                        { className: 'text' },
                        'Entre em contato:'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'text' },
                        _react2.default.createElement(
                            'a',
                            { href: "mailto:" + email, className: 'link first after', title: email },
                            email
                        )
                    )
                )
            );
        }
    }]);

    return FooterConteudo;
}(_react2.default.Component);

;

var NavRedesSociais = function (_React$Component8) {
    _inherits(NavRedesSociais, _React$Component8);

    function NavRedesSociais() {
        _classCallCheck(this, NavRedesSociais);

        return _possibleConstructorReturn(this, (NavRedesSociais.__proto__ || Object.getPrototypeOf(NavRedesSociais)).apply(this, arguments));
    }

    _createClass(NavRedesSociais, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'ul',
                { className: 'social_network' },
                redesSociais.map(function (l) {
                    return _react2.default.createElement(
                        'li',
                        { className: 'social_network__item', key: l.title + '-rs' },
                        _react2.default.createElement(
                            'a',
                            { className: 'social_network__link', title: l.title, href: l.href },
                            _react2.default.createElement(SVGSprite, { 'class': 'social_network__image', id: l.title })
                        )
                    );
                })
            );
        }
    }]);

    return NavRedesSociais;
}(_react2.default.Component);

;

var Footer = function (_React$Component9) {
    _inherits(Footer, _React$Component9);

    function Footer() {
        _classCallCheck(this, Footer);

        return _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).apply(this, arguments));
    }

    _createClass(Footer, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(FooterText, null);
        }
    }]);

    return Footer;
}(_react2.default.Component);

var mainLink = "http://otaviosanchez.com/";

var email = "dev@otaviosanchez.com";

var name = "Otávio Sanchez";

var ano = new Date().toLocaleString('en-US', { year: 'numeric' });

var redesSociais = [{
    title: 'linkedin',
    href: 'https://br.linkedin.com/in/ot%C3%A1vio-sanchez-88440294',
    name: 'linkedin'
}, {
    title: 'github',
    href: 'https://github.com/sanchezotavio',
    name: 'github'
}];

var paginas = [{
    title: 'Home',
    href: 'home',
    id: 1
}, {
    title: 'Quem Sou',
    href: 'quem_sou',
    id: 2
}, {
    title: 'Projetos',
    href: 'projetos',
    id: 3
}];

var Main = function (_Component) {
    _inherits(Main, _Component);

    function Main(props, context) {
        _classCallCheck(this, Main);

        var _this10 = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this, props));

        _this10.state = {
            loading: ''
        };
        return _this10;
    }

    _createClass(Main, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this11 = this;

            setTimeout(function () {
                return _this11.setState({ loading: 'loadComplete' });
            }, 500);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(Load, { loading: this.state.loading }),
                _react2.default.createElement(ScrollItem, null),
                _react2.default.createElement(Header, null),
                ' ',
                this.props.children,
                _react2.default.createElement(Footer, null)
            );
        }
    }]);

    return Main;
}(_react.Component);

exports.default = Main;

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(18);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = __webpack_require__(29);

var _nilsan = __webpack_require__(77);

var _nilsan2 = _interopRequireDefault(_nilsan);

var _igapira = __webpack_require__(75);

var _igapira2 = _interopRequireDefault(_igapira);

var _igapira3 = __webpack_require__(76);

var _igapira4 = _interopRequireDefault(_igapira3);

var _aba = __webpack_require__(142);

var _aba2 = _interopRequireDefault(_aba);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Projetos = function (_Component) {
    _inherits(Projetos, _Component);

    function Projetos() {
        _classCallCheck(this, Projetos);

        return _possibleConstructorReturn(this, (Projetos.__proto__ || Object.getPrototypeOf(Projetos)).apply(this, arguments));
    }

    _createClass(Projetos, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            window.scrollTo(0, 0);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(ProjetosSection, null);
        }
    }]);

    return Projetos;
}(_react.Component);

var ProjetosSection = function (_React$Component) {
    _inherits(ProjetosSection, _React$Component);

    function ProjetosSection() {
        _classCallCheck(this, ProjetosSection);

        return _possibleConstructorReturn(this, (ProjetosSection.__proto__ || Object.getPrototypeOf(ProjetosSection)).apply(this, arguments));
    }

    _createClass(ProjetosSection, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'section',
                { className: 'section projetos projetos--page border', id: 'projetos' },
                _react2.default.createElement(
                    'header',
                    { className: 'projetos__header' },
                    _react2.default.createElement(
                        'h1',
                        { className: 'projetos__title' },
                        'Projetos'
                    ),
                    _react2.default.createElement('span', { className: 'division' }),
                    _react2.default.createElement(
                        'h2',
                        { className: 'projetos__title--sub' },
                        'Conhe\xE7a meu portf\xF3lio e alguns de meus projetos pessoais.'
                    )
                ),
                _react2.default.createElement(
                    'article',
                    { className: 'container' },
                    projetos.map(function (l) {
                        return _react2.default.createElement(
                            'div',
                            { className: 'projetos__list  display-flex' },
                            _react2.default.createElement(
                                'div',
                                { className: 'o-col-xs-3 o-col-md-12' },
                                _react2.default.createElement('img', { src: l.img, className: 'projeto__img', alt: l.title })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'o-col-xs-9 o-col-md-12' },
                                _react2.default.createElement(
                                    'h2',
                                    { className: 'title' },
                                    l.title
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'projetos__text' },
                                    l.descricao
                                ),
                                _react2.default.createElement(
                                    'a',
                                    {
                                        className: 'button button-1',
                                        target: '_blank',
                                        href: l.link,
                                        title: "Acessar " + l.title },
                                    _react2.default.createElement(
                                        'svg',
                                        null,
                                        _react2.default.createElement('rect', { fill: 'none', height: '100%', width: '100%', x: '0', y: '0' })
                                    ),
                                    'Acessar Projeto'
                                )
                            )
                        );
                    })
                )
            );
        }
    }]);

    return ProjetosSection;
}(_react2.default.Component);

;

var projetos = [{
    title: 'Igapira Consultoria',
    href: 'http://igapiraconsultoria.com.br/',
    img: _igapira2.default,
    descricao: 'A Igapira Consultoria Turística, é uma empresa especializada na elaboração de es' + 'tudos e planejamento de turismo em nível nacional. Foi criada no ano de 2015, po' + 'r jovens empreendedores com formação superior em turismo, que resolveram por em ' + 'prática os conhecimentos adquiridos na universidade.',
    github: '',
    link: 'http://igapiraconsultoria.com.br/'
}, {
    title: 'Nilsan Ferramentaria',
    href: 'http://nilsan.com.br',
    img: _nilsan2.default,
    descricao: 'A Nilsan é uma empresa especializada no ramo de injeção de plásticos.',
    github: '',
    link: 'http://nilsan.com.br/'
}, {
    title: 'Associação Bianca Alves',
    href: 'http://associacaobiancaalves.ga/',
    img: _aba2.default,
    descricao: 'Associação sem fins lucrativos de caráter filantrópico, fundada em 2007. Atende ' + 'portadores de múltipla deficiência, disponibilizando seus voluntários em psicolo' + 'gia, fonoaudiologia e fisioterapia. Oferece todo o tratamento gratuito aos seus ' + 'pacientes.',
    github: '',
    link: 'http://associacaobiancaalves.ga/'
}];

exports.default = Projetos;

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(18);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _otavioSanchez = __webpack_require__(74);

var _otavioSanchez2 = _interopRequireDefault(_otavioSanchez);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SobreSection = function (_React$Component) {
    _inherits(SobreSection, _React$Component);

    function SobreSection() {
        _classCallCheck(this, SobreSection);

        return _possibleConstructorReturn(this, (SobreSection.__proto__ || Object.getPrototypeOf(SobreSection)).apply(this, arguments));
    }

    _createClass(SobreSection, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'section',
                { className: 'sobre sobre--page bg border', id: 'sobre' },
                _react2.default.createElement(
                    'header',
                    { className: 'sobre__header' },
                    _react2.default.createElement(
                        'h2',
                        { className: 'sobre__title' },
                        'Quem Sou'
                    ),
                    _react2.default.createElement('span', { className: 'division' })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'container' },
                    _react2.default.createElement(
                        'div',
                        { className: 'quem_sou display-flex' },
                        _react2.default.createElement(
                            'div',
                            { className: 'o-col-md-12 o-col-xs-3' },
                            _react2.default.createElement(
                                'figure',
                                { className: 'sobre__figure--alter' },
                                _react2.default.createElement('img', {
                                    src: _otavioSanchez2.default,
                                    className: 'sobre__image',
                                    alt: 'Ot\xE1vio Sanchez' })
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'o-col-md-12 o-col-xs-9' },
                            _react2.default.createElement(
                                'article',
                                { id: 'quemsou' },
                                _react2.default.createElement(
                                    'p',
                                    { className: 'paragraph' },
                                    'Ol\xE1, me chamo Ot\xE1vio Sanchez.Sou Desenvolvedor Web, entusiasta de tecnologia, autodidata e apaixonado por c\xF3digo.'
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'paragraph' },
                                    'Estudante do Bacharelado em Ci\xEAncia e Tecnologia pela Universidade Federal do ABC - curso multidisciplinar - que me permitiu abrir espa\xE7o para novas possibilidades atrav\xE9s da tecnologia da informa\xE7\xE3o em suas mais diferentes vertentes.'
                                )
                            ),
                            _react2.default.createElement(
                                'header',
                                { className: 'sobre__item' },
                                _react2.default.createElement(
                                    'h2',
                                    { className: 'item__title align_h_center' },
                                    'Skills'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'sobre__item' },
                                _react2.default.createElement(Skills, null)
                            ),
                            _react2.default.createElement('hr', { className: 'hr' }),
                            _react2.default.createElement(
                                'header',
                                { className: 'sobre__item' },
                                _react2.default.createElement(
                                    'h2',
                                    { className: 'item__title' },
                                    'Academico'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'sobre__item' },
                                _react2.default.createElement(Academico, null)
                            ),
                            _react2.default.createElement('hr', { className: 'hr' }),
                            _react2.default.createElement(
                                'header',
                                { className: 'sobre__item' },
                                _react2.default.createElement(
                                    'h2',
                                    { className: 'item__title' },
                                    'Experi\xEAncia Acad\xEAmica'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'sobre__item' },
                                _react2.default.createElement(Profissional, null)
                            ),
                            _react2.default.createElement('hr', { className: 'hr' }),
                            _react2.default.createElement(
                                'header',
                                { className: 'sobre__item' },
                                _react2.default.createElement(
                                    'h2',
                                    { className: 'item__title' },
                                    'Cursos'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'sobre__item' },
                                _react2.default.createElement(Cursos, null)
                            ),
                            _react2.default.createElement('hr', { className: 'hr' }),
                            _react2.default.createElement(
                                'header',
                                { className: 'sobre__item' },
                                _react2.default.createElement(
                                    'h2',
                                    { className: 'item__title' },
                                    'Certifica\xE7\xF5es'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'sobre__item' },
                                _react2.default.createElement(Certificacoes, null)
                            ),
                            _react2.default.createElement('hr', { className: 'hr' }),
                            _react2.default.createElement(
                                'header',
                                { className: 'sobre__item' },
                                _react2.default.createElement(
                                    'h2',
                                    { className: 'item__title' },
                                    'Outros Cursos'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'sobre__item' },
                                _react2.default.createElement(CursosAleatorios, null)
                            )
                        )
                    )
                )
            );
        }
    }]);

    return SobreSection;
}(_react2.default.Component);

var Academico = function (_React$Component2) {
    _inherits(Academico, _React$Component2);

    function Academico() {
        _classCallCheck(this, Academico);

        return _possibleConstructorReturn(this, (Academico.__proto__ || Object.getPrototypeOf(Academico)).apply(this, arguments));
    }

    _createClass(Academico, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'ul',
                { className: 'academico' },
                academico.map(function (l) {
                    return _react2.default.createElement(
                        'li',
                        { className: 'cursos__item' },
                        _react2.default.createElement(
                            'h1',
                            { className: 'title' },
                            l.instituicao
                        ),
                        _react2.default.createElement(
                            'h2',
                            { className: 'cursos__sub' },
                            l.nome
                        ),
                        _react2.default.createElement(
                            'p',
                            { className: 'text' },
                            l.descricao
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'data' },
                            l.data
                        )
                    );
                })
            );
        }
    }]);

    return Academico;
}(_react2.default.Component);

;

var Skills = function (_React$Component3) {
    _inherits(Skills, _React$Component3);

    function Skills() {
        _classCallCheck(this, Skills);

        return _possibleConstructorReturn(this, (Skills.__proto__ || Object.getPrototypeOf(Skills)).apply(this, arguments));
    }

    _createClass(Skills, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'skills' },
                skills.map(function (l) {
                    return _react2.default.createElement(
                        'div',
                        { className: 'skills__item' },
                        l.nome,
                        _react2.default.createElement(
                            'span',
                            { className: 'skills__nivel' },
                            l.nivel
                        )
                    );
                })
            );
        }
    }]);

    return Skills;
}(_react2.default.Component);

;

var Profissional = function (_React$Component4) {
    _inherits(Profissional, _React$Component4);

    function Profissional() {
        _classCallCheck(this, Profissional);

        return _possibleConstructorReturn(this, (Profissional.__proto__ || Object.getPrototypeOf(Profissional)).apply(this, arguments));
    }

    _createClass(Profissional, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'ul',
                { className: 'profissional' },
                profissional.map(function (l) {
                    return _react2.default.createElement(
                        'li',
                        { className: 'cursos__item' },
                        _react2.default.createElement(
                            'h1',
                            { className: 'title' },
                            l.empresa
                        ),
                        _react2.default.createElement(
                            'h2',
                            { className: 'cursos__sub' },
                            l.nome
                        ),
                        _react2.default.createElement(
                            'p',
                            { className: 'text' },
                            l.descricao
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'data' },
                            l.data
                        )
                    );
                })
            );
        }
    }]);

    return Profissional;
}(_react2.default.Component);

;

var Cursos = function (_React$Component5) {
    _inherits(Cursos, _React$Component5);

    function Cursos() {
        _classCallCheck(this, Cursos);

        return _possibleConstructorReturn(this, (Cursos.__proto__ || Object.getPrototypeOf(Cursos)).apply(this, arguments));
    }

    _createClass(Cursos, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'ul',
                { className: 'cursos' },
                cursos.map(function (l) {
                    return _react2.default.createElement(
                        'li',
                        { className: 'cursos__item' },
                        _react2.default.createElement(
                            'ul',
                            { className: 'cursos__list' },
                            _react2.default.createElement(
                                'li',
                                { className: 'cursos__sub title' },
                                l.instituicao
                            ),
                            _react2.default.createElement(
                                'li',
                                { className: 'cursos__sub' },
                                l.nome
                            ),
                            _react2.default.createElement(
                                'li',
                                { className: 'data' },
                                l.data
                            )
                        )
                    );
                })
            );
        }
    }]);

    return Cursos;
}(_react2.default.Component);

;

var Certificacoes = function (_React$Component6) {
    _inherits(Certificacoes, _React$Component6);

    function Certificacoes() {
        _classCallCheck(this, Certificacoes);

        return _possibleConstructorReturn(this, (Certificacoes.__proto__ || Object.getPrototypeOf(Certificacoes)).apply(this, arguments));
    }

    _createClass(Certificacoes, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'ul',
                { className: 'cursos' },
                certificacoes.map(function (l) {
                    return _react2.default.createElement(
                        'li',
                        { className: 'cursos__item' },
                        _react2.default.createElement(
                            'ul',
                            { className: 'cursos__list' },
                            _react2.default.createElement(
                                'li',
                                { className: 'cursos__sub title' },
                                l.instituicao
                            ),
                            _react2.default.createElement(
                                'li',
                                { className: 'cursos__sub' },
                                l.nome
                            ),
                            _react2.default.createElement(
                                'li',
                                { className: 'cursos__sub' },
                                _react2.default.createElement(
                                    'a',
                                    { href: l.link, target: '_blank', className: 'link' },
                                    'Acessar'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                { className: 'data' },
                                l.data
                            )
                        )
                    );
                })
            );
        }
    }]);

    return Certificacoes;
}(_react2.default.Component);

;

var CursosAleatorios = function (_React$Component7) {
    _inherits(CursosAleatorios, _React$Component7);

    function CursosAleatorios() {
        _classCallCheck(this, CursosAleatorios);

        return _possibleConstructorReturn(this, (CursosAleatorios.__proto__ || Object.getPrototypeOf(CursosAleatorios)).apply(this, arguments));
    }

    _createClass(CursosAleatorios, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'ul',
                { className: 'cursos' },
                cursosAleatorios.map(function (l) {
                    return _react2.default.createElement(
                        'li',
                        { className: 'cursos__item' },
                        _react2.default.createElement(
                            'ul',
                            { className: 'cursos__list' },
                            _react2.default.createElement(
                                'li',
                                { className: 'cursos__sub title' },
                                l.instituicao
                            ),
                            _react2.default.createElement(
                                'li',
                                { className: 'cursos__sub ' },
                                l.nome
                            ),
                            _react2.default.createElement(
                                'li',
                                { className: 'data' },
                                l.data
                            )
                        )
                    );
                })
            );
        }
    }]);

    return CursosAleatorios;
}(_react2.default.Component);

;

var Sobre = function (_Component) {
    _inherits(Sobre, _Component);

    function Sobre() {
        _classCallCheck(this, Sobre);

        return _possibleConstructorReturn(this, (Sobre.__proto__ || Object.getPrototypeOf(Sobre)).apply(this, arguments));
    }

    _createClass(Sobre, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            window.scrollTo(0, 0);
            document.title = "Quem Sou | Otávio Sanchez";
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(SobreSection, null);
        }
    }]);

    return Sobre;
}(_react.Component);

var cursos = [{
    nome: 'Curso Técnico de Informática para Internet',
    data: 'Junho de 2010 a Dezembro de 2011',
    instituicao: 'Centro Paula Souza - ETEC São Mateus'
}, {
    nome: 'Criação de Web Sites em HTML 5 e CSS 3.0',
    data: 'Julho de 2013 a Agosto de 2013',
    instituicao: 'SENAC'
}, {
    nome: ' Programando em C# com Visual Studio',
    data: 'Janeiro de 2014',
    instituicao: 'SENAC'
}];

var cursosAleatorios = [{
    nome: 'Arduino na UFABC',
    data: 'Janeiro de 2014',
    instituicao: 'Universidade Federal do ABC - UFABC'
}];

var academico = [{
    nome: 'Bacharel Ciência e Tecnologia',
    data: 'Julho de 2013 a Dezembro de 2017',
    instituicao: 'Universidade Federal do ABC - UFABC ',
    descricao: 'Dando ênfase para a formação em Ciências da Computação'
}];

var profissional = [{
    nome: 'Universidade Federal do ABC',
    data: 'Março de 2014 a Março de 2015 ',
    empresa: 'PIBID – Programa de iniciação à docência',
    descricao: 'Bolsista que atuava desenvolvendo projetos em sala de aula e auxiliando o trabal' + 'ho do professor. Além de atuar desenvolvendo sistemas digitais que contribuíssem' + ' para o ensino e aprendizado dos alunos. Área de atuação: Matemática'
}];

var skills = [{
    nome: 'HTML5',
    nivel: 9
}, {
    nome: 'CSS3',
    nivel: 8
}, {
    nome: 'SASS',
    nivel: 8
}, {
    nome: 'Javascript',
    nivel: 8
}, {
    nome: 'AngularJS',
    nivel: 7
}, {
    nome: 'NodeJS',
    nivel: 7
}, {
    nome: 'React',
    nivel: 8
}, {
    nome: 'C#',
    nivel: 6
}, {
    nome: '.NET',
    nivel: 6
}];

var certificacoes = [{
    nome: '70-480 - Programming in HTML5 with JavaScript and CSS3',
    data: '2/26/2016',
    instituicao: 'MCPS: Microsoft Certified Professional',
    link: 'http://www.mycertprofile.com/Profile/1599820672'
}];

exports.default = Sobre;

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(18);

var _reactDom2 = _interopRequireDefault(_reactDom);

__webpack_require__(119);

var _reactRouter = __webpack_require__(29);

var _routes = __webpack_require__(118);

var _routes2 = _interopRequireDefault(_routes);

__webpack_require__(117);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hashLinkScroll = function hashLinkScroll() {
    var hash = window.location.hash;

    if (hash !== '') {
        setTimeout(function () {
            var id = hash.replace('#', '');
            var element = document.getElementById(id);
            if (element) element.scrollIntoView();
        }, 0);
    }
};

_reactDom2.default.render(_react2.default.createElement(_reactRouter.Router, { history: _reactRouter.hashHistory, routes: _routes2.default, onUpdate: hashLinkScroll }), document.getElementById('container'));

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

var pSlice = Array.prototype.slice;
var objectKeys = __webpack_require__(127);
var isArguments = __webpack_require__(126);

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}


/***/ }),
/* 126 */
/***/ (function(module, exports) {

var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
};


/***/ }),
/* 127 */
/***/ (function(module, exports) {

exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}


/***/ }),
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "./images/aba.png";

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "./images/load.svg";

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "./images/scroll.svg";

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var _slice = Array.prototype.slice;
exports.loopAsync = loopAsync;

function loopAsync(turns, work, callback) {
  var currentTurn = 0,
      isDone = false;
  var sync = false,
      hasNext = false,
      doneArgs = undefined;

  function done() {
    isDone = true;
    if (sync) {
      // Iterate instead of recursing if possible.
      doneArgs = [].concat(_slice.call(arguments));
      return;
    }

    callback.apply(this, arguments);
  }

  function next() {
    if (isDone) {
      return;
    }

    hasNext = true;
    if (sync) {
      // Iterate instead of recursing if possible.
      return;
    }

    sync = true;

    while (!isDone && currentTurn < turns && hasNext) {
      hasNext = false;
      work.call(this, currentTurn++, next, done);
    }

    sync = false;

    if (isDone) {
      // This means the loop finished synchronously.
      callback.apply(this, doneArgs);
      return;
    }

    if (currentTurn >= turns && hasNext) {
      isDone = true;
      callback();
    }
  }

  next();
}

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _invariant = __webpack_require__(8);

var _invariant2 = _interopRequireDefault(_invariant);

var _Actions = __webpack_require__(24);

var _PathUtils = __webpack_require__(19);

var _ExecutionEnvironment = __webpack_require__(35);

var _DOMUtils = __webpack_require__(48);

var _DOMStateStorage = __webpack_require__(78);

var _createDOMHistory = __webpack_require__(79);

var _createDOMHistory2 = _interopRequireDefault(_createDOMHistory);

/**
 * Creates and returns a history object that uses HTML5's history API
 * (pushState, replaceState, and the popstate event) to manage history.
 * This is the recommended method of managing history in browsers because
 * it provides the cleanest URLs.
 *
 * Note: In browsers that do not support the HTML5 history API full
 * page reloads will be used to preserve URLs.
 */
function createBrowserHistory() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  !_ExecutionEnvironment.canUseDOM ? undefined !== 'production' ? _invariant2['default'](false, 'Browser history needs a DOM') : _invariant2['default'](false) : undefined;

  var forceRefresh = options.forceRefresh;

  var isSupported = _DOMUtils.supportsHistory();
  var useRefresh = !isSupported || forceRefresh;

  function getCurrentLocation(historyState) {
    try {
      historyState = historyState || window.history.state || {};
    } catch (e) {
      historyState = {};
    }

    var path = _DOMUtils.getWindowPath();
    var _historyState = historyState;
    var key = _historyState.key;

    var state = undefined;
    if (key) {
      state = _DOMStateStorage.readState(key);
    } else {
      state = null;
      key = history.createKey();

      if (isSupported) window.history.replaceState(_extends({}, historyState, { key: key }), null);
    }

    var location = _PathUtils.parsePath(path);

    return history.createLocation(_extends({}, location, { state: state }), undefined, key);
  }

  function startPopStateListener(_ref) {
    var transitionTo = _ref.transitionTo;

    function popStateListener(event) {
      if (event.state === undefined) return; // Ignore extraneous popstate events in WebKit.

      transitionTo(getCurrentLocation(event.state));
    }

    _DOMUtils.addEventListener(window, 'popstate', popStateListener);

    return function () {
      _DOMUtils.removeEventListener(window, 'popstate', popStateListener);
    };
  }

  function finishTransition(location) {
    var basename = location.basename;
    var pathname = location.pathname;
    var search = location.search;
    var hash = location.hash;
    var state = location.state;
    var action = location.action;
    var key = location.key;

    if (action === _Actions.POP) return; // Nothing to do.

    _DOMStateStorage.saveState(key, state);

    var path = (basename || '') + pathname + search + hash;
    var historyState = {
      key: key
    };

    if (action === _Actions.PUSH) {
      if (useRefresh) {
        window.location.href = path;
        return false; // Prevent location update.
      } else {
          window.history.pushState(historyState, null, path);
        }
    } else {
      // REPLACE
      if (useRefresh) {
        window.location.replace(path);
        return false; // Prevent location update.
      } else {
          window.history.replaceState(historyState, null, path);
        }
    }
  }

  var history = _createDOMHistory2['default'](_extends({}, options, {
    getCurrentLocation: getCurrentLocation,
    finishTransition: finishTransition,
    saveState: _DOMStateStorage.saveState
  }));

  var listenerCount = 0,
      stopPopStateListener = undefined;

  function listenBefore(listener) {
    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

    var unlisten = history.listenBefore(listener);

    return function () {
      unlisten();

      if (--listenerCount === 0) stopPopStateListener();
    };
  }

  function listen(listener) {
    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

    var unlisten = history.listen(listener);

    return function () {
      unlisten();

      if (--listenerCount === 0) stopPopStateListener();
    };
  }

  // deprecated
  function registerTransitionHook(hook) {
    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

    history.registerTransitionHook(hook);
  }

  // deprecated
  function unregisterTransitionHook(hook) {
    history.unregisterTransitionHook(hook);

    if (--listenerCount === 0) stopPopStateListener();
  }

  return _extends({}, history, {
    listenBefore: listenBefore,
    listen: listen,
    registerTransitionHook: registerTransitionHook,
    unregisterTransitionHook: unregisterTransitionHook
  });
}

exports['default'] = createBrowserHistory;
module.exports = exports['default'];

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = __webpack_require__(12);

var _warning2 = _interopRequireDefault(_warning);

var _Actions = __webpack_require__(24);

var _PathUtils = __webpack_require__(19);

function createLocation() {
  var location = arguments.length <= 0 || arguments[0] === undefined ? '/' : arguments[0];
  var action = arguments.length <= 1 || arguments[1] === undefined ? _Actions.POP : arguments[1];
  var key = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

  var _fourthArg = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

  if (typeof location === 'string') location = _PathUtils.parsePath(location);

  if (typeof action === 'object') {
    undefined !== 'production' ? _warning2['default'](false, 'The state (2nd) argument to createLocation is deprecated; use a ' + 'location descriptor instead') : undefined;

    location = _extends({}, location, { state: action });

    action = key || _Actions.POP;
    key = _fourthArg;
  }

  var pathname = location.pathname || '/';
  var search = location.search || '';
  var hash = location.hash || '';
  var state = location.state || null;

  return {
    pathname: pathname,
    search: search,
    hash: hash,
    state: state,
    action: action,
    key: key
  };
}

exports['default'] = createLocation;
module.exports = exports['default'];

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = __webpack_require__(12);

var _warning2 = _interopRequireDefault(_warning);

var _invariant = __webpack_require__(8);

var _invariant2 = _interopRequireDefault(_invariant);

var _PathUtils = __webpack_require__(19);

var _Actions = __webpack_require__(24);

var _createHistory = __webpack_require__(81);

var _createHistory2 = _interopRequireDefault(_createHistory);

function createStateStorage(entries) {
  return entries.filter(function (entry) {
    return entry.state;
  }).reduce(function (memo, entry) {
    memo[entry.key] = entry.state;
    return memo;
  }, {});
}

function createMemoryHistory() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  if (Array.isArray(options)) {
    options = { entries: options };
  } else if (typeof options === 'string') {
    options = { entries: [options] };
  }

  var history = _createHistory2['default'](_extends({}, options, {
    getCurrentLocation: getCurrentLocation,
    finishTransition: finishTransition,
    saveState: saveState,
    go: go
  }));

  var _options = options;
  var entries = _options.entries;
  var current = _options.current;

  if (typeof entries === 'string') {
    entries = [entries];
  } else if (!Array.isArray(entries)) {
    entries = ['/'];
  }

  entries = entries.map(function (entry) {
    var key = history.createKey();

    if (typeof entry === 'string') return { pathname: entry, key: key };

    if (typeof entry === 'object' && entry) return _extends({}, entry, { key: key });

     true ? undefined !== 'production' ? _invariant2['default'](false, 'Unable to create history entry from %s', entry) : _invariant2['default'](false) : undefined;
  });

  if (current == null) {
    current = entries.length - 1;
  } else {
    !(current >= 0 && current < entries.length) ? undefined !== 'production' ? _invariant2['default'](false, 'Current index must be >= 0 and < %s, was %s', entries.length, current) : _invariant2['default'](false) : undefined;
  }

  var storage = createStateStorage(entries);

  function saveState(key, state) {
    storage[key] = state;
  }

  function readState(key) {
    return storage[key];
  }

  function getCurrentLocation() {
    var entry = entries[current];
    var basename = entry.basename;
    var pathname = entry.pathname;
    var search = entry.search;

    var path = (basename || '') + pathname + (search || '');

    var key = undefined,
        state = undefined;
    if (entry.key) {
      key = entry.key;
      state = readState(key);
    } else {
      key = history.createKey();
      state = null;
      entry.key = key;
    }

    var location = _PathUtils.parsePath(path);

    return history.createLocation(_extends({}, location, { state: state }), undefined, key);
  }

  function canGo(n) {
    var index = current + n;
    return index >= 0 && index < entries.length;
  }

  function go(n) {
    if (n) {
      if (!canGo(n)) {
        undefined !== 'production' ? _warning2['default'](false, 'Cannot go(%s) there is not enough history', n) : undefined;
        return;
      }

      current += n;

      var currentLocation = getCurrentLocation();

      // change action to POP
      history.transitionTo(_extends({}, currentLocation, { action: _Actions.POP }));
    }
  }

  function finishTransition(location) {
    switch (location.action) {
      case _Actions.PUSH:
        current += 1;

        // if we are not on the top of stack
        // remove rest and push new
        if (current < entries.length) entries.splice(current);

        entries.push(location);
        saveState(location.key, location.state);
        break;
      case _Actions.REPLACE:
        entries[current] = location;
        saveState(location.key, location.state);
        break;
    }
  }

  return history;
}

exports['default'] = createMemoryHistory;
module.exports = exports['default'];

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strictUriEncode = __webpack_require__(258);

exports.extract = function (str) {
	return str.split('?')[1] || '';
};

exports.parse = function (str) {
	if (typeof str !== 'string') {
		return {};
	}

	str = str.trim().replace(/^(\?|#|&)/, '');

	if (!str) {
		return {};
	}

	return str.split('&').reduce(function (ret, param) {
		var parts = param.replace(/\+/g, ' ').split('=');
		// Firefox (pre 40) decodes `%3D` to `=`
		// https://github.com/sindresorhus/query-string/pull/37
		var key = parts.shift();
		var val = parts.length > 0 ? parts.join('=') : undefined;

		key = decodeURIComponent(key);

		// missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		val = val === undefined ? null : decodeURIComponent(val);

		if (!ret.hasOwnProperty(key)) {
			ret[key] = val;
		} else if (Array.isArray(ret[key])) {
			ret[key].push(val);
		} else {
			ret[key] = [ret[key], val];
		}

		return ret;
	}, {});
};

exports.stringify = function (obj) {
	return obj ? Object.keys(obj).sort().map(function (key) {
		var val = obj[key];

		if (val === undefined) {
			return '';
		}

		if (val === null) {
			return key;
		}

		if (Array.isArray(val)) {
			return val.slice().sort().map(function (val2) {
				return strictUriEncode(key) + '=' + strictUriEncode(val2);
			}).join('&');
		}

		return strictUriEncode(key) + '=' + strictUriEncode(val);
	}).filter(function (x) {
		return x.length > 0;
	}).join('&') : '';
};


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */


var REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    arguments: true,
    arity: true
};

var isGetOwnPropertySymbolsAvailable = typeof Object.getOwnPropertySymbols === 'function';

module.exports = function hoistNonReactStatics(targetComponent, sourceComponent, customStatics) {
    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components
        var keys = Object.getOwnPropertyNames(sourceComponent);

        /* istanbul ignore else */
        if (isGetOwnPropertySymbolsAvailable) {
            keys = keys.concat(Object.getOwnPropertySymbols(sourceComponent));
        }

        for (var i = 0; i < keys.length; ++i) {
            if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]] && (!customStatics || !customStatics[keys[i]])) {
                try {
                    targetComponent[keys[i]] = sourceComponent[keys[i]];
                } catch (error) {

                }
            }
        }
    }

    return targetComponent;
};


/***/ }),
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

!function(e, t) {
     true ? module.exports = t(__webpack_require__(3)) : "function" == typeof define && define.amd ? define([ "react" ], t) : "object" == typeof exports ? exports.Particles = t(require("react")) : e.Particles = t(e.React);
}(this, function(e) {
    return function(e) {
        function t(i) {
            if (a[i]) return a[i].exports;
            var r = a[i] = {
                exports: {},
                id: i,
                loaded: !1
            };
            return e[i].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports;
        }
        var a = {};
        return t.m = e, t.c = a, t.p = "", t(0);
    }([ function(e, t, a) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = a(3);
        t.Particles = i.default, t.default = i.default;
    }, function(e, t, a) {
        "use strict";
        function i(e) {
            for (var a in e) t.hasOwnProperty(a) || (t[a] = e[a]);
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), i(a(11)), i(a(9));
        var r = a(4);
        t.Interact = r.default;
        var s = a(5);
        t.Modes = s.default;
        var n = a(6);
        t.Particle = n.default;
        var o = a(7);
        t.ParticleManager = o.default;
        var c = a(8);
        t.ParticlesLibrary = c.default;
        var l = a(10);
        t.Vendors = l.default;
    }, function(t, a) {
        t.exports = e;
    }, function(e, t, a) {
        "use strict";
        function i(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }
        function r(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t;
        }
        function s(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
        }
        var n = function() {
            function e(e, t) {
                for (var a = 0; a < t.length; a++) {
                    var i = t[a];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
                    Object.defineProperty(e, i.key, i);
                }
            }
            return function(t, a, i) {
                return a && e(t.prototype, a), i && e(t, i), t;
            };
        }();
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = a(2), c = a(2), l = a(1), u = function(e) {
            function t(e) {
                i(this, t);
                var a = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
                return a.state = {
                    canvas: void 0,
                    library: void 0
                }, a.loadCanvas = a.loadCanvas.bind(a), a;
            }
            return s(t, e), n(t, [ {
                key: "destroy",
                value: function() {
                    this.state.library.destroy();
                }
            }, {
                key: "loadCanvas",
                value: function(e) {
                    var t = this;
                    e && this.setState({
                        canvas: e
                    }, function() {
                        t.state.library.loadCanvas(t.state.canvas), t.state.library.start();
                    });
                }
            }, {
                key: "componentWillMount",
                value: function() {
                    this.setState({
                        library: new l.ParticlesLibrary(this.props.params)
                    });
                }
            }, {
                key: "componentWillUnmount",
                value: function() {
                    this.state.library.destroy(), this.setState({
                        library: void 0
                    });
                }
            }, {
                key: "render",
                value: function() {
                    var e = this.props, t = e.width, a = e.height;
                    return o.createElement("div", null, o.createElement("canvas", {
                        ref: this.loadCanvas,
                        style: l.deepExtend(this.props.style, {
                            width: t,
                            height: a
                        })
                    }));
                }
            } ]), t;
        }(c.PureComponent);
        u.defaultProps = {
            width: "100%",
            height: "100%",
            params: {},
            style: {}
        }, t.default = u;
    }, function(e, t) {
        "use strict";
        function a(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }
        var i = function() {
            function e(e, t) {
                for (var a = 0; a < t.length; a++) {
                    var i = t[a];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
                    Object.defineProperty(e, i.key, i);
                }
            }
            return function(t, a, i) {
                return a && e(t.prototype, a), i && e(t, i), t;
            };
        }();
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = function() {
            function e(t, i) {
                a(this, e), this.params = t, this.library = i;
            }
            return i(e, [ {
                key: "linkParticles",
                value: function(e, t) {
                    var a = e.x - t.x, i = e.y - t.y, r = Math.sqrt(a * a + i * i), s = this.library.canvas, n = this.params.particles.line_linked;
                    if (r <= this.params.particles.line_linked.distance) {
                        var o = this.params.particles.line_linked.opacity - r / (1 / this.params.particles.line_linked.opacity) / this.params.particles.line_linked.distance;
                        if (o > 0) {
                            var c = this.params.particles.line_linked.color_rgb_line, l = c.r, u = c.g, p = c.b;
                            s.ctx.save(), s.ctx.strokeStyle = "rgba( " + l + ", " + u + ", " + p + ", " + o + " )", 
                            s.ctx.lineWidth = this.params.particles.line_linked.width, s.ctx.beginPath(), n.shadow.enable && (s.ctx.shadowBlur = n.shadow.blur, 
                            s.ctx.shadowColor = n.shadow.color), s.ctx.moveTo(e.x, e.y), s.ctx.lineTo(t.x, t.y), 
                            s.ctx.stroke(), s.ctx.closePath(), s.ctx.restore();
                        }
                    }
                }
            }, {
                key: "attractParticles",
                value: function(e, t) {
                    var a = e.x - t.x, i = e.y - t.y, r = Math.sqrt(a * a + i * i);
                    if (r <= this.params.particles.line_linked.distance) {
                        var s = a / (1e3 * this.params.particles.move.attract.rotateX), n = i / (1e3 * this.params.particles.move.attract.rotateY);
                        e.vx -= s, e.vy -= n, t.vx += s, t.vy += n;
                    }
                }
            }, {
                key: "bounceParticles",
                value: function(e, t) {
                    var a = e.x - t.x, i = e.y - t.y, r = Math.sqrt(a * a + i * i), s = e.radius + t.radius;
                    r <= s && (e.vx = -e.vx, e.vy = -e.vy, t.vx = -t.vx, t.vy = -t.vy);
                }
            } ]), e;
        }();
        t.default = r;
    }, function(e, t, a) {
        "use strict";
        function i(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }
        var r = function() {
            function e(e, t) {
                for (var a = 0; a < t.length; a++) {
                    var i = t[a];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
                    Object.defineProperty(e, i.key, i);
                }
            }
            return function(t, a, i) {
                return a && e(t.prototype, a), i && e(t, i), t;
            };
        }();
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var s = a(1), n = function() {
            function e(t, a) {
                i(this, e), this.params = t, this.library = a;
            }
            return r(e, [ {
                key: "pushParticles",
                value: function(e, t) {
                    var a = this.library, i = a.canvas, r = a.tmp, n = a.manager;
                    r.pushing = !0;
                    for (var o = 0; o < e; o++) this.params.particles.array.push(new s.Particle(this.params, this.library, this.params.particles.color, this.params.particles.opacity.value, {
                        x: t ? t.pos_x : Math.random() * i.width,
                        y: t ? t.pos_y : Math.random() * i.height
                    })), o == e - 1 && (this.params.particles.move.enable || n.particlesDraw(), r.pushing = !1);
                }
            }, {
                key: "removeParticles",
                value: function(e) {
                    var t = this.library.manager;
                    this.params.particles.array.splice(0, e), this.params.particles.move.enable || t.particlesDraw();
                }
            }, {
                key: "bubbleParticle",
                value: function(e) {
                    var t = this, a = this.library.tmp;
                    if (this.params.interactivity.events.onhover.enable && s.isInArray("bubble", this.params.interactivity.events.onhover.mode)) {
                        var i = e.x - this.params.interactivity.mouse.pos_x, r = e.y - this.params.interactivity.mouse.pos_y, n = Math.sqrt(i * i + r * r), o = 1 - n / this.params.interactivity.modes.bubble.distance, c = function() {
                            e.opacity_bubble = e.opacity, e.radius_bubble = e.radius;
                        };
                        if (n <= this.params.interactivity.modes.bubble.distance) {
                            if (o >= 0 && "mousemove" == this.params.interactivity.status) {
                                if (this.params.interactivity.modes.bubble.size != this.params.particles.size.value) if (this.params.interactivity.modes.bubble.size > this.params.particles.size.value) {
                                    var l = e.radius + this.params.interactivity.modes.bubble.size * o;
                                    l >= 0 && (e.radius_bubble = l);
                                } else {
                                    var u = e.radius - this.params.interactivity.modes.bubble.size, p = e.radius - u * o;
                                    p > 0 ? e.radius_bubble = p : e.radius_bubble = 0;
                                }
                                if (this.params.interactivity.modes.bubble.opacity != this.params.particles.opacity.value) if (this.params.interactivity.modes.bubble.opacity > this.params.particles.opacity.value) {
                                    var h = this.params.interactivity.modes.bubble.opacity * o;
                                    h > e.opacity && h <= this.params.interactivity.modes.bubble.opacity && (e.opacity_bubble = h);
                                } else {
                                    var m = e.opacity - (this.params.particles.opacity.value - this.params.interactivity.modes.bubble.opacity) * o;
                                    m < e.opacity && m >= this.params.interactivity.modes.bubble.opacity && (e.opacity_bubble = m);
                                }
                            }
                        } else c();
                        "mouseleave" == this.params.interactivity.status && c();
                    } else if (this.params.interactivity.events.onclick.enable && s.isInArray("bubble", this.params.interactivity.events.onclick.mode) && a.bubble_clicking) {
                        var v = e.x - this.params.interactivity.mouse.click_pos_x, d = e.y - this.params.interactivity.mouse.click_pos_y, y = Math.sqrt(v * v + d * d), b = (new Date().getTime() - this.params.interactivity.mouse.click_time) / 1e3;
                        b > this.params.interactivity.modes.bubble.duration && (a.bubble_duration_end = !0), 
                        b > 2 * this.params.interactivity.modes.bubble.duration && (a.bubble_clicking = !1, 
                        a.bubble_duration_end = !1);
                        var f = function(i, r, s, n, o) {
                            if (i != r) if (a.bubble_duration_end) {
                                if (void 0 != s) {
                                    var c = n - b * (n - i) / t.params.interactivity.modes.bubble.duration, l = i - c, u = i + l;
                                    "size" == o && (e.radius_bubble = u), "opacity" == o && (e.opacity_bubble = u);
                                }
                            } else if (y <= t.params.interactivity.modes.bubble.distance) {
                                var p = void 0;
                                if (p = void 0 != s ? s : n, p != i) {
                                    var h = n - b * (n - i) / t.params.interactivity.modes.bubble.duration;
                                    "size" == o && (e.radius_bubble = h), "opacity" == o && (e.opacity_bubble = h);
                                }
                            } else "size" == o && (e.radius_bubble = void 0), "opacity" == o && (e.opacity_bubble = void 0);
                        };
                        a.bubble_clicking && (f(this.params.interactivity.modes.bubble.size, this.params.particles.size.value, e.radius_bubble, e.radius, "size"), 
                        f(this.params.interactivity.modes.bubble.opacity, this.params.particles.opacity.value, e.opacity_bubble, e.opacity, "opacity"));
                    }
                }
            }, {
                key: "repulseParticle",
                value: function(e) {
                    var t = this, a = this.library, i = a.canvas, r = a.tmp;
                    if (this.params.interactivity.events.onhover.enable && s.isInArray("repulse", this.params.interactivity.events.onhover.mode) && "mousemove" == this.params.interactivity.status) {
                        var n = e.x - this.params.interactivity.mouse.pos_x, o = e.y - this.params.interactivity.mouse.pos_y, c = Math.sqrt(n * n + o * o), l = {
                            x: n / c,
                            y: o / c
                        }, u = this.params.interactivity.modes.repulse.distance, p = 100, h = s.clamp(1 / u * (-1 * Math.pow(c / u, 2) + 1) * u * p, 0, 50), m = {
                            x: e.x + l.x * h,
                            y: e.y + l.y * h
                        };
                        "bounce" == this.params.particles.move.out_mode ? (m.x - e.radius > 0 && m.x + e.radius < i.width && (e.x = m.x), 
                        m.y - e.radius > 0 && m.y + e.radius < i.height && (e.y = m.y)) : (e.x = m.x, e.y = m.y);
                    } else if (this.params.interactivity.events.onclick.enable && s.isInArray("repulse", this.params.interactivity.events.onclick.mode)) if (r.repulse_finish || (r.repulse_count++, 
                    r.repulse_count == this.params.particles.array.length && (r.repulse_finish = !0)), 
                    r.repulse_clicking) {
                        var v = Math.pow(this.params.interactivity.modes.repulse.distance / 6, 3), d = this.params.interactivity.mouse.click_pos_x - e.x, y = this.params.interactivity.mouse.click_pos_y - e.y, b = d * d + y * y, f = -v / b * 1, _ = function() {
                            var a = Math.atan2(y, d);
                            if (e.vx = f * Math.cos(a), e.vy = f * Math.sin(a), "bounce" == t.params.particles.move.out_mode) {
                                var r = {
                                    x: e.x + e.vx,
                                    y: e.y + e.vy
                                };
                                r.x + e.radius > i.width ? e.vx = -e.vx : r.x - e.radius < 0 && (e.vx = -e.vx), 
                                r.y + e.radius > i.height ? e.vy = -e.vy : r.y - e.radius < 0 && (e.vy = -e.vy);
                            }
                        };
                        b <= v && _();
                    } else 0 == r.repulse_clicking && (e.vx = e.vx_i, e.vy = e.vy_i);
                }
            }, {
                key: "grabParticle",
                value: function(e) {
                    var t = this.library.canvas, a = this.params, i = a.interactivity, r = a.particles;
                    if (i.events.onhover.enable && "mousemove" == i.status) {
                        var s = e.x - i.mouse.pos_x, n = e.y - i.mouse.pos_y, o = Math.sqrt(s * s + n * n);
                        if (o <= i.modes.grab.distance) {
                            var c = i.modes.grab, l = c.line_linked.opacity - o / (1 / c.line_linked.opacity) / c.distance;
                            if (l > 0) {
                                var u = r.line_linked.color_rgb_line, p = u.r, h = u.g, m = u.b;
                                t.ctx.strokeStyle = "rgba( " + p + ", " + h + ", " + m + ", " + l + " )", t.ctx.lineWidth = r.line_linked.width, 
                                t.ctx.beginPath(), t.ctx.moveTo(e.x, e.y), t.ctx.lineTo(i.mouse.pos_x, i.mouse.pos_y), 
                                t.ctx.stroke(), t.ctx.closePath();
                            }
                        }
                    }
                }
            } ]), e;
        }();
        t.default = n;
    }, function(e, t, a) {
        "use strict";
        function i(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e;
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        }, s = function() {
            function e(e, t) {
                for (var a = 0; a < t.length; a++) {
                    var i = t[a];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
                    Object.defineProperty(e, i.key, i);
                }
            }
            return function(t, a, i) {
                return a && e(t.prototype, a), i && e(t, i), t;
            };
        }();
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a(1), o = function() {
            function e(t, a, r, s, n) {
                i(this, e), this.params = t, this.library = a, this.setupSize(), this.setupPosition(n), 
                this.setupColor(r), this.setupOpacity(), this.setupAnimation();
            }
            return s(e, [ {
                key: "setupSize",
                value: function() {
                    this.radius = (this.params.particles.size.random ? Math.random() : 1) * this.params.particles.size.value, 
                    this.params.particles.size.anim.enable && (this.size_status = !1, this.vs = this.params.particles.size.anim.speed / 100, 
                    this.params.particles.size.anim.sync || (this.vs = this.vs * Math.random()));
                }
            }, {
                key: "setupPosition",
                value: function(e) {
                    var t = this.library, a = t.canvas, i = t.vendors;
                    this.x = e ? e.x : Math.random() * a.width, this.y = e ? e.y : Math.random() * a.height, 
                    this.x > a.width - 2 * this.radius ? this.x = this.x - this.radius : this.x < 2 * this.radius && (this.x = this.x + this.radius), 
                    this.y > a.height - 2 * this.radius ? this.y = this.y - this.radius : this.y < 2 * this.radius && (this.y = this.y + this.radius), 
                    this.params.particles.move.bounce && i.checkOverlap(this, e);
                }
            }, {
                key: "setupColor",
                value: function(e) {
                    this.color = n.getColor(e.value);
                }
            }, {
                key: "setupOpacity",
                value: function() {
                    this.opacity = (this.params.particles.opacity.random ? Math.random() : 1) * this.params.particles.opacity.value, 
                    this.params.particles.opacity.anim.enable && (this.opacity_status = !1, this.vo = this.params.particles.opacity.anim.speed / 100, 
                    this.params.particles.opacity.anim.sync || (this.vo = this.vo * Math.random()));
                }
            }, {
                key: "setupAnimation",
                value: function() {
                    var e = this.library, t = e.tmp, a = e.vendors, i = null;
                    switch (this.params.particles.move.direction) {
                      case "top":
                        i = {
                            x: 0,
                            y: -1
                        };
                        break;

                      case "top-right":
                        i = {
                            x: .5,
                            y: -.5
                        };
                        break;

                      case "right":
                        i = {
                            x: 1,
                            y: 0
                        };
                        break;

                      case "bottom-right":
                        i = {
                            x: .5,
                            y: .5
                        };
                        break;

                      case "bottom":
                        i = {
                            x: 0,
                            y: 1
                        };
                        break;

                      case "bottom-left":
                        i = {
                            x: -.5,
                            y: 1
                        };
                        break;

                      case "left":
                        i = {
                            x: -1,
                            y: 0
                        };
                        break;

                      case "top-left":
                        i = {
                            x: -.5,
                            y: -.5
                        };
                        break;

                      default:
                        i = {
                            x: 0,
                            y: 0
                        };
                    }
                    this.params.particles.move.straight ? (this.vx = i.x, this.vy = i.y, this.params.particles.move.random && (this.vx = this.vx * Math.random(), 
                    this.vy = this.vy * Math.random())) : (this.vx = i.x + Math.random() - .5, this.vy = i.y + Math.random() - .5), 
                    this.vx_i = this.vx, this.vy_i = this.vy;
                    var s = this.params.particles.shape.type;
                    if ("object" == ("undefined" == typeof s ? "undefined" : r(s))) {
                        if (s instanceof Array) {
                            var n = s[Math.floor(Math.random() * s.length)];
                            this.shape = n;
                        }
                    } else this.shape = s;
                    if ("image" == this.shape) {
                        var o = this.params.particles.shape;
                        this.img = {
                            src: o.image.src,
                            ratio: o.image.width / o.image.height
                        }, this.img.ratio || (this.img.ratio = 1), "svg" == t.img_type && void 0 != t.source_svg && (a.createSvgImg(this), 
                        t.pushing && (this.img.loaded = !1));
                    }
                }
            }, {
                key: "draw",
                value: function e() {
                    var t = this, a = this.library, i = a.canvas, r = a.tmp, s = a.vendors, n = (this.params.particles, 
                    void 0);
                    n = void 0 != this.radius_bubble ? this.radius_bubble : this.radius;
                    var o = void 0;
                    o = void 0 != this.opacity_bubble ? this.opacity_bubble : this.opacity;
                    var c = void 0;
                    if (this.color.rgb) {
                        var l = this.color.rgb, u = l.r, p = l.g, h = l.b;
                        c = "rgba( " + u + ", " + p + ", " + h + ", " + o + " )";
                    } else {
                        var m = this.color.hsl, v = m.h, d = m.s, y = m.l;
                        c = "hsla( " + v + ", " + d + ", " + y + ", " + o + " )";
                    }
                    switch (i.ctx.fillStyle = c, i.ctx.beginPath(), this.shape) {
                      case "circle":
                        i.ctx.arc(this.x, this.y, n, 0, 2 * Math.PI, !1);
                        break;

                      case "edge":
                        i.ctx.rect(this.x - n, this.y - n, 2 * n, 2 * n);
                        break;

                      case "triangle":
                        s.drawShape(i.ctx, this.x - n, this.y + n / 1.66, 2 * n, 3, 2);
                        break;

                      case "polygon":
                        s.drawShape(i.ctx, this.x - n / (this.params.particles.shape.polygon.nb_sides / 3.5), this.y - n / .76, 2.66 * n / (this.params.particles.shape.polygon.nb_sides / 3), this.params.particles.shape.polygon.nb_sides, 1);
                        break;

                      case "star":
                        s.drawShape(i.ctx, this.x - 2 * n / (this.params.particles.shape.polygon.nb_sides / 4), this.y - n / 1.52, 2 * n * 2.66 / (this.params.particles.shape.polygon.nb_sides / 3), this.params.particles.shape.polygon.nb_sides, 2);
                        break;

                      case "image":
                        var e = function(e) {
                            i.ctx.drawImage(e, t.x - n, t.y - n, 2 * n, 2 * n / t.img.ratio);
                        }, b = void 0;
                        b = "svg" == r.img_type ? this.img.obj : r.img_obj, b && e(b);
                    }
                    i.ctx.closePath(), this.params.particles.shape.stroke.width > 0 && (i.ctx.strokeStyle = this.params.particles.shape.stroke.color, 
                    i.ctx.lineWidth = this.params.particles.shape.stroke.width, i.ctx.stroke()), i.ctx.fill();
                }
            } ]), e;
        }();
        t.default = o;
    }, function(e, t, a) {
        "use strict";
        function i(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }
        var r = function() {
            function e(e, t) {
                for (var a = 0; a < t.length; a++) {
                    var i = t[a];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
                    Object.defineProperty(e, i.key, i);
                }
            }
            return function(t, a, i) {
                return a && e(t.prototype, a), i && e(t, i), t;
            };
        }();
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var s = a(1), n = function() {
            function e(t, a, r, s, n) {
                i(this, e), this.params = t, this.interact = a, this.modes = r, this.vendors = s, 
                this.library = n;
            }
            return r(e, [ {
                key: "particlesCreate",
                value: function() {
                    for (var e = this.params.particles, t = e.color, a = e.opacity, i = 0; i < this.params.particles.number.value; i++) this.params.particles.array.push(new s.Particle(this.params, this.library, t, a.value));
                }
            }, {
                key: "particlesUpdate",
                value: function() {
                    var e = this, t = this.library, a = t.canvas, i = t.interact, r = t.modes;
                    this.params.particles.array.forEach(function(t, n) {
                        if (e.params.particles.move.enable) {
                            var o = e.params.particles.move.speed / 2;
                            t.x += t.vx * o, t.y += t.vy * o;
                        }
                        e.params.particles.opacity.anim.enable && (1 == t.opacity_status ? (t.opacity >= e.params.particles.opacity.value && (t.opacity_status = !1), 
                        t.opacity += t.vo) : (t.opacity <= e.params.particles.opacity.anim.opacity_min && (t.opacity_status = !0), 
                        t.opacity -= t.vo), t.opacity < 0 && (t.opacity = 0)), e.params.particles.size.anim.enable && (1 == t.size_status ? (t.radius >= e.params.particles.size.value && (t.size_status = !1), 
                        t.radius += t.vs) : (t.radius <= e.params.particles.size.anim.size_min && (t.size_status = !0), 
                        t.radius -= t.vs), t.radius < 0 && (t.radius = 0));
                        var c = void 0;
                        switch (c = "bounce" == e.params.particles.move.out_mode ? {
                            x_left: t.radius,
                            x_right: a.width,
                            y_top: t.radius,
                            y_bottom: a.height
                        } : {
                            x_left: -t.radius,
                            x_right: a.width + t.radius,
                            y_top: -t.radius,
                            y_bottom: a.height + t.radius
                        }, t.x - t.radius > a.width ? (t.x = c.x_left, t.y = Math.random() * a.height) : t.x + t.radius < 0 && (t.x = c.x_right, 
                        t.y = Math.random() * a.height), t.y - t.radius > a.height ? (t.y = c.y_top, t.x = Math.random() * a.width) : t.y + t.radius < 0 && (t.y = c.y_bottom, 
                        t.x = Math.random() * a.width), e.params.particles.move.out_mode) {
                          case "bounce":
                            t.x + t.radius > a.width ? t.vx = -t.vx : t.x - t.radius < 0 && (t.vx = -t.vx), 
                            t.y + t.radius > a.height ? t.vy = -t.vy : t.y - t.radius < 0 && (t.vy = -t.vy);
                        }
                        if (s.isInArray("grab", e.params.interactivity.events.onhover.mode) && r.grabParticle(t), 
                        (s.isInArray("bubble", e.params.interactivity.events.onhover.mode) || s.isInArray("bubble", e.params.interactivity.events.onclick.mode)) && r.bubbleParticle(t), 
                        (s.isInArray("repulse", e.params.interactivity.events.onhover.mode) || s.isInArray("repulse", e.params.interactivity.events.onclick.mode)) && r.repulseParticle(t), 
                        e.params.particles.line_linked.enable || e.params.particles.move.attract.enable) for (var l = n + 1; l < e.params.particles.array.length; l++) {
                            var u = e.params.particles.array[l];
                            e.params.particles.line_linked.enable && i.linkParticles(t, u), e.params.particles.move.attract.enable && i.attractParticles(t, u), 
                            e.params.particles.move.bounce && i.bounceParticles(t, u);
                        }
                    });
                }
            }, {
                key: "particlesDraw",
                value: function() {
                    var e = this.library, t = e.canvas, a = e.manager;
                    t.ctx.clearRect(0, 0, t.width, t.height), a.particlesUpdate(), this.params.particles.array.forEach(function(e) {
                        e.draw();
                    });
                }
            }, {
                key: "particlesEmpty",
                value: function() {
                    this.params.particles.array = [];
                }
            }, {
                key: "particlesRefresh",
                value: function() {
                    var e = this.library, t = e.tmp;
                    e.vendors;
                    cancelAnimationFrame(t.checkAnimFrame), cancelAnimationFrame(t.drawAnimFrame), t.source_svg = void 0, 
                    t.img_obj = void 0, t.count_svg = 0, this.particlesEmpty(), this.library.canvasClear(), 
                    this.library.start();
                }
            } ]), e;
        }();
        t.default = n;
    }, function(e, t, a) {
        "use strict";
        function i(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }
        var r = function() {
            function e(e, t) {
                for (var a = 0; a < t.length; a++) {
                    var i = t[a];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
                    Object.defineProperty(e, i.key, i);
                }
            }
            return function(t, a, i) {
                return a && e(t.prototype, a), i && e(t, i), t;
            };
        }();
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var s = a(1), n = function() {
            function e(t) {
                i(this, e), this.tmp = {}, this.tmp = {}, this.loadParameters(t), this.extendParams(), 
                this.interact = new s.Interact(this.params, this), this.modes = new s.Modes(this.params, this), 
                this.vendors = new s.Vendors(this.params, this), this.manager = new s.ParticleManager(this.params, this.interact, this.modes, this.vendors, this);
            }
            return r(e, [ {
                key: "loadParameters",
                value: function(e) {
                    var t = s.getDefaultParams(), a = s.deepExtend(t, e);
                    this.params = a;
                }
            }, {
                key: "loadCanvas",
                value: function(e) {
                    this.canvas = {
                        element: e,
                        width: e.offsetWidth,
                        height: e.offsetHeight
                    };
                }
            }, {
                key: "start",
                value: function() {
                    var e = this.vendors;
                    e.eventsListeners(), e.start();
                }
            }, {
                key: "destroy",
                value: function() {
                    var e = this.tmp;
                    this.detachListeners(), this.vendors.detachListeners(), cancelAnimationFrame(e.drawAnimFrame), 
                    this.canvasClear();
                }
            }, {
                key: "detachListeners",
                value: function() {
                    window.removeEventListener("resize", this.onWindowResize);
                }
            }, {
                key: "extendParams",
                value: function() {
                    this.extendTmpDefinition(), this.onWindowResize = this.onWindowResize.bind(this);
                }
            }, {
                key: "extendTmpDefinition",
                value: function() {
                    var e = this.tmp;
                    e.obj = {
                        size_value: this.params.particles.size.value,
                        size_anim_speed: this.params.particles.size.anim.speed,
                        move_speed: this.params.particles.move.speed,
                        line_linked_distance: this.params.particles.line_linked.distance,
                        line_linked_width: this.params.particles.line_linked.width,
                        mode_grab_distance: this.params.interactivity.modes.grab.distance,
                        mode_bubble_distance: this.params.interactivity.modes.bubble.distance,
                        mode_bubble_size: this.params.interactivity.modes.bubble.size,
                        mode_repulse_distance: this.params.interactivity.modes.repulse.distance
                    };
                }
            }, {
                key: "retinaInit",
                value: function() {
                    var e = this.canvas, t = this.tmp;
                    this.params.retina_detect && window.devicePixelRatio > 1 ? (e.pxratio = window.devicePixelRatio, 
                    t.retina = !0, e.width = e.element.offsetWidth * e.pxratio, e.height = e.element.offsetHeight * e.pxratio, 
                    this.params.particles.size.value = t.obj.size_value * e.pxratio, this.params.particles.size.anim.speed = t.obj.size_anim_speed * e.pxratio, 
                    this.params.particles.move.speed = t.obj.move_speed * e.pxratio, this.params.particles.line_linked.distance = t.obj.line_linked_distance * e.pxratio, 
                    this.params.interactivity.modes.grab.distance = t.obj.mode_grab_distance * e.pxratio, 
                    this.params.interactivity.modes.bubble.distance = t.obj.mode_bubble_distance * e.pxratio, 
                    this.params.particles.line_linked.width = t.obj.line_linked_width * e.pxratio, this.params.interactivity.modes.bubble.size = t.obj.mode_bubble_size * e.pxratio, 
                    this.params.interactivity.modes.repulse.distance = t.obj.mode_repulse_distance * e.pxratio) : (e.pxratio = 1, 
                    t.retina = !1);
                }
            }, {
                key: "canvasInit",
                value: function() {
                    var e = this.canvas;
                    e.ctx = e.element.getContext("2d");
                }
            }, {
                key: "canvasSize",
                value: function() {
                    var e = this.canvas;
                    e.element.width = e.width, e.element.height = e.height, this.params && this.params.interactivity.events.resize && window.addEventListener("resize", this.onWindowResize);
                }
            }, {
                key: "canvasPaint",
                value: function() {
                    var e = this.canvas;
                    e.ctx.fillRect(0, 0, e.width, e.height);
                }
            }, {
                key: "canvasClear",
                value: function() {
                    var e = this.canvas;
                    e.ctx.clearRect(0, 0, e.width, e.height);
                }
            }, {
                key: "onWindowResize",
                value: function() {
                    var e = this.canvas, t = this.manager, a = this.tmp, i = this.vendors;
                    e.width = e.element.offsetWidth, e.height = e.element.offsetHeight, a.retina && (e.width *= e.pxratio, 
                    e.height *= e.pxratio), e.element.width = e.width, e.element.height = e.height, 
                    this.params.particles.move.enable || (t.particlesEmpty(), t.particlesCreate(), t.particlesDraw(), 
                    i.densityAutoParticles()), i.densityAutoParticles();
                }
            } ]), e;
        }();
        t.default = n;
    }, function(e, t) {
        "use strict";
        var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e;
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.hexToRgb = function(e) {
            var t = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            e = e.replace(t, function(e, t, a, i) {
                return t + t + a + a + i + i;
            });
            var a = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
            return a ? {
                r: parseInt(a[1], 16),
                g: parseInt(a[2], 16),
                b: parseInt(a[3], 16)
            } : null;
        }, t.clamp = function(e, t, a) {
            return Math.min(Math.max(e, t), a);
        }, t.isInArray = function(e, t) {
            return t.indexOf(e) > -1;
        }, t.deepExtend = function(e, a) {
            for (var i in a) a[i] && a[i].constructor && a[i].constructor === Object ? (e[i] = e[i] || {}, 
            t.deepExtend(e[i], a[i])) : e[i] = a[i];
            return e;
        }, t.getColor = function(e) {
            var i = {};
            if ("object" == ("undefined" == typeof e ? "undefined" : a(e))) if (e instanceof Array) {
                var r = e[Math.floor(Math.random() * e.length)];
                i.rgb = t.hexToRgb(r);
            } else {
                var s = e.r, n = e.g, o = e.b;
                if (void 0 !== s && void 0 !== n && void 0 !== o) i.rgb = {
                    r: s,
                    g: n,
                    b: o
                }; else {
                    var c = e.h, l = e.s, u = e.l;
                    void 0 !== c && void 0 !== n && void 0 !== o && (i.hsl = {
                        h: c,
                        s: l,
                        l: u
                    });
                }
            } else "random" == e ? i.rgb = {
                r: Math.floor(255 * Math.random()) + 1,
                g: Math.floor(255 * Math.random()) + 1,
                b: Math.floor(255 * Math.random()) + 1
            } : "string" == typeof e && (i.rgb = t.hexToRgb(e));
            return i;
        };
    }, function(e, t, a) {
        "use strict";
        function i(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }
        var r = function() {
            function e(e, t) {
                for (var a = 0; a < t.length; a++) {
                    var i = t[a];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
                    Object.defineProperty(e, i.key, i);
                }
            }
            return function(t, a, i) {
                return a && e(t.prototype, a), i && e(t, i), t;
            };
        }();
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var s = a(1), n = function() {
            function e(t, a) {
                i(this, e), this.params = t, this.library = a, this.onMouseMove = this.onMouseMove.bind(this), 
                this.onMouseLeave = this.onMouseLeave.bind(this), this.onClick = this.onClick.bind(this);
            }
            return r(e, [ {
                key: "eventsListeners",
                value: function() {
                    var e = this.params.interactivity, t = this.library.canvas;
                    "window" == e.detect_on ? e.el = window : e.el = t.element, (e.events.onhover.enable || e.events.onclick.enable) && (e.el.addEventListener("mousemove", this.onMouseMove), 
                    e.el.addEventListener("mouseleave", this.onMouseLeave)), e.events.onclick.enable && e.el.addEventListener("click", this.onClick);
                }
            }, {
                key: "detachListeners",
                value: function() {
                    var e = this.params.interactivity, t = this.library.tmp;
                    e.el && ((e.events.onhover.enable || e.events.onclick.enable) && (e.el.removeEventListener("mousemove", this.onMouseMove), 
                    e.el.addEventListener("mouseleave", this.onMouseLeave)), e.events.onclick.enable && e.el.addEventListener("click", this.onClick)), 
                    window.cancelAnimationFrame(t.drawAnimFrame);
                }
            }, {
                key: "onMouseMove",
                value: function(e) {
                    var t = this.library, a = t.canvas, i = t.tmp, r = this.params.interactivity, s = void 0;
                    s = r.el == window ? {
                        x: e.clientX,
                        y: e.clientY
                    } : {
                        x: e.offsetX || e.clientX,
                        y: e.offsetY || e.clientY
                    }, r.mouse.pos_x = s.x, r.mouse.pos_y = s.y, i.retina && (r.mouse.pos_x *= a.pxratio, 
                    r.mouse.pos_y *= a.pxratio), r.status = "mousemove";
                }
            }, {
                key: "onMouseLeave",
                value: function(e) {
                    var t = this.params.interactivity;
                    t.mouse.pos_x = null, t.mouse.pos_y = null, t.status = "mouseleave";
                }
            }, {
                key: "onClick",
                value: function() {
                    var e = this.library, t = e.modes, a = e.tmp, i = this.params, r = i.interactivity, s = i.particles;
                    if (r.mouse.click_pos_x = r.mouse.pos_x, r.mouse.click_pos_y = r.mouse.pos_y, r.mouse.click_time = new Date().getTime(), 
                    r.events.onclick.enable) switch (r.events.onclick.mode) {
                      case "push":
                        s.move.enable ? t.pushParticles(r.modes.push.particles_nb, r.mouse) : 1 == r.modes.push.particles_nb ? t.pushParticles(r.modes.push.particles_nb, r.mouse) : r.modes.push.particles_nb > 1 && t.pushParticles(r.modes.push.particles_nb);
                        break;

                      case "remove":
                        t.removeParticles(r.modes.remove.particles_nb);
                        break;

                      case "bubble":
                        a.bubble_clicking = !0;
                        break;

                      case "repulse":
                        a.repulse_clicking = !0, a.repulse_count = 0, a.repulse_finish = !1, setTimeout(function() {
                            a.repulse_clicking = !1;
                        }, 1e3 * r.modes.repulse.duration);
                    }
                }
            }, {
                key: "densityAutoParticles",
                value: function() {
                    var e = this.library, t = e.canvas, a = e.modes, i = e.tmp, r = this.params.particles;
                    if (r.number.density.enable) {
                        var s = t.element.width * t.element.height / 1e3;
                        i.retina && (s = s / t.pxratio * 2);
                        var n = s * r.number.value / r.number.density.value_area, o = r.array.length - n;
                        o < 0 ? a.pushParticles(Math.abs(o)) : a.removeParticles(o);
                    }
                }
            }, {
                key: "checkOverlap",
                value: function(e, t) {
                    var a = this.library, i = a.canvas, r = a.vendors, s = this.params.particles;
                    s.array.forEach(function(a) {
                        var s = a, n = e.x - s.x, o = e.y - s.y, c = Math.sqrt(n * n + o * o);
                        c <= e.radius + s.radius && (e.x = t ? t.x : Math.random() * i.width, e.y = t ? t.y : Math.random() * i.height, 
                        r.checkOverlap(e));
                    });
                }
            }, {
                key: "createSvgImg",
                value: function(e) {
                    var t = this.library.tmp, a = t.source_svg, i = /#([0-9A-F]{3,6})/gi, r = a.replace(i, function(t, a, i, r) {
                        var s = void 0;
                        if (e.color.rgb) {
                            var n = e.color.rgb, o = n.r, c = n.g, l = n.b;
                            s = "rgba( " + o + ", " + c + ", " + l + ", " + e.opacity + " )";
                        } else {
                            var u = e.color.hsl, p = u.h, h = u.s, m = u.l;
                            s = "rgba( " + p + ", " + h + ", " + m + ", " + e.opacity + " )";
                        }
                        return s;
                    }), s = new Blob([ r ], {
                        type: "image/svg+xml;charset=utf-8"
                    }), n = window.URL || window, o = n.createObjectURL(s), c = new Image();
                    c.addEventListener("load", function() {
                        e.img.obj = c, e.img.loaded = !0, n.revokeObjectURL(o), t.count_svg++;
                    }), c.src = o;
                }
            }, {
                key: "destroy",
                value: function() {
                    var e = this.library, t = e.canvas, a = e.tmp;
                    cancelAnimationFrame(a.drawAnimFrame), t.element.remove();
                }
            }, {
                key: "drawShape",
                value: function(e, t, a, i, r, s) {
                    var n = r * s, o = r / s, c = 180 * (o - 2) / o, l = Math.PI - Math.PI * c / 180;
                    e.save(), e.beginPath(), e.translate(t, a), e.moveTo(0, 0);
                    for (var u = 0; u < n; u++) e.lineTo(i, 0), e.translate(i, 0), e.rotate(l);
                    e.fill(), e.restore();
                }
            }, {
                key: "exportImg",
                value: function() {
                    var e = this.library.canvas;
                    window.open(e.element.toDataURL("image/png"), "_blank");
                }
            }, {
                key: "loadImg",
                value: function(e) {
                    var t = this.library, a = t.tmp, i = t.vendors, r = this.params.particles;
                    if (a.img_error = void 0, "" != r.shape.image.src) if ("svg" == e) {
                        var s = new XMLHttpRequest();
                        s.open("GET", r.shape.image.src), s.onreadystatechange = function(e) {
                            4 == s.readyState && (200 == s.status ? (a.source_svg = e.currentTarget.response, 
                            i.checkBeforeDraw()) : (console.log("Error react-particles-js - image not found"), 
                            a.img_error = !0));
                        }, s.send();
                    } else {
                        var n = new Image();
                        n.addEventListener("load", function() {
                            a.img_obj = n, i.checkBeforeDraw();
                        }), n.src = r.shape.image.src;
                    } else console.log("Error react-particles-js - no image.src"), a.img_error = !0;
                }
            }, {
                key: "draw",
                value: function() {
                    var e = this.library, t = e.tmp, a = e.manager, i = e.vendors, r = this.params.particles;
                    "image" == r.shape.type ? "svg" == t.img_type ? t.count_svg >= r.number.value ? (a.particlesDraw(), 
                    r.move.enable ? t.drawAnimFrame = requestAnimationFrame(i.draw.bind(i)) : cancelAnimationFrame(t.drawAnimFrame)) : t.img_error || (t.drawAnimFrame = requestAnimationFrame(i.draw.bind(i))) : void 0 != t.img_obj ? (a.particlesDraw(), 
                    r.move.enable ? t.drawAnimFrame = requestAnimationFrame(i.draw.bind(i)) : cancelAnimationFrame(t.drawAnimFrame)) : t.img_error || (t.drawAnimFrame = requestAnimationFrame(i.draw.bind(i))) : (a.particlesDraw(), 
                    r.move.enable ? t.drawAnimFrame = requestAnimationFrame(i.draw.bind(i)) : cancelAnimationFrame(t.drawAnimFrame));
                }
            }, {
                key: "checkBeforeDraw",
                value: function() {
                    var e = this.library, t = e.tmp, a = e.vendors, i = this.params.particles;
                    if ("image" == i.shape.type) if ("svg" == t.img_type && void 0 == t.source_svg) {
                        var r = void 0;
                        t.checkAnimFrame = requestAnimationFrame(r);
                    } else cancelAnimationFrame(t.checkAnimFrame), t.img_error || (a.init(), a.draw()); else a.init(), 
                    a.draw();
                }
            }, {
                key: "init",
                value: function() {
                    var e = this.library, t = e.manager, a = e.vendors, i = this.params.particles;
                    e.retinaInit(), e.canvasInit(), e.canvasSize(), t.particlesCreate(), a.densityAutoParticles(), 
                    i.line_linked.color_rgb_line = s.hexToRgb(i.line_linked.color);
                }
            }, {
                key: "start",
                value: function() {
                    var e = this.library, t = e.tmp, a = e.vendors, i = this.params.particles;
                    s.isInArray("image", i.shape.type) ? (t.img_type = i.shape.image.src.substr(i.shape.image.src.length - 3), 
                    a.loadImg(t.img_type)) : a.checkBeforeDraw();
                }
            } ]), e;
        }();
        t.default = n;
    }, function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.getDefaultParams = function() {
            return {
                particles: {
                    number: {
                        value: 40,
                        density: {
                            enable: !1,
                            value_area: 1200
                        }
                    },
                    color: {
                        value: "#FFF"
                    },
                    shape: {
                        type: "circle",
                        stroke: {
                            width: 0,
                            color: "#000000"
                        },
                        polygon: {
                            nb_sides: 5
                        },
                        image: {
                            src: "",
                            width: 100,
                            height: 100
                        }
                    },
                    opacity: {
                        value: .5,
                        random: !1,
                        anim: {
                            enable: !0,
                            speed: 1,
                            opacity_min: .1,
                            sync: !1
                        }
                    },
                    size: {
                        value: 1,
                        random: !1,
                        anim: {
                            enable: !1,
                            speed: 40,
                            size_min: 0,
                            sync: !1
                        }
                    },
                    line_linked: {
                        enable: !0,
                        distance: 150,
                        color: "#FFF",
                        opacity: .6,
                        width: 1,
                        shadow: {
                            enable: !1,
                            blur: 5,
                            color: "lime"
                        }
                    },
                    move: {
                        enable: !0,
                        speed: 3,
                        direction: "none",
                        random: !1,
                        straight: !1,
                        out_mode: "bounce",
                        bounce: !0,
                        attract: {
                            enable: !1,
                            rotateX: 3e3,
                            rotateY: 3e3
                        }
                    },
                    array: []
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: {
                            enable: !1,
                            mode: "grab"
                        },
                        onclick: {
                            enable: !1,
                            mode: "repulse"
                        },
                        resize: !0
                    },
                    modes: {
                        grab: {
                            distance: 180,
                            line_linked: {
                                opacity: .35
                            }
                        },
                        bubble: {
                            distance: 200,
                            size: 80,
                            duration: .4
                        },
                        repulse: {
                            distance: 100,
                            duration: 5
                        },
                        push: {
                            particles_nb: 4
                        },
                        remove: {
                            particles_nb: 2
                        }
                    },
                    mouse: {}
                },
                retina_detect: !0
            };
        };
    } ]);
});

/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _routerWarning = __webpack_require__(7);

var _routerWarning2 = _interopRequireDefault(_routerWarning);

var _InternalPropTypes = __webpack_require__(21);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A mixin that adds the "history" instance variable to components.
 */
var History = {

  contextTypes: {
    history: _InternalPropTypes.history
  },

  componentWillMount: function componentWillMount() {
    undefined !== 'production' ? (0, _routerWarning2.default)(false, 'the `History` mixin is deprecated, please access `context.router` with your own `contextTypes`. http://tiny.cc/router-historymixin') : void 0;
    this.history = this.context.history;
  }
};

exports.default = History;
module.exports = exports['default'];

/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _Link = __webpack_require__(106);

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * An <IndexLink> is used to link to an <IndexRoute>.
 */
var IndexLink = _react2.default.createClass({
  displayName: 'IndexLink',
  render: function render() {
    return _react2.default.createElement(_Link2.default, _extends({}, this.props, { onlyActiveOnIndex: true }));
  }
});

exports.default = IndexLink;
module.exports = exports['default'];

/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _routerWarning = __webpack_require__(7);

var _routerWarning2 = _interopRequireDefault(_routerWarning);

var _invariant = __webpack_require__(8);

var _invariant2 = _interopRequireDefault(_invariant);

var _Redirect = __webpack_require__(107);

var _Redirect2 = _interopRequireDefault(_Redirect);

var _InternalPropTypes = __webpack_require__(21);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _React$PropTypes = _react2.default.PropTypes;
var string = _React$PropTypes.string;
var object = _React$PropTypes.object;

/**
 * An <IndexRedirect> is used to redirect from an indexRoute.
 */

var IndexRedirect = _react2.default.createClass({
  displayName: 'IndexRedirect',


  statics: {
    createRouteFromReactElement: function createRouteFromReactElement(element, parentRoute) {
      /* istanbul ignore else: sanity check */
      if (parentRoute) {
        parentRoute.indexRoute = _Redirect2.default.createRouteFromReactElement(element);
      } else {
        undefined !== 'production' ? (0, _routerWarning2.default)(false, 'An <IndexRedirect> does not make sense at the root of your route config') : void 0;
      }
    }
  },

  propTypes: {
    to: string.isRequired,
    query: object,
    state: object,
    onEnter: _InternalPropTypes.falsy,
    children: _InternalPropTypes.falsy
  },

  /* istanbul ignore next: sanity check */
  render: function render() {
     true ? undefined !== 'production' ? (0, _invariant2.default)(false, '<IndexRedirect> elements are for router configuration only and should not be rendered') : (0, _invariant2.default)(false) : void 0;
  }
});

exports.default = IndexRedirect;
module.exports = exports['default'];

/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _routerWarning = __webpack_require__(7);

var _routerWarning2 = _interopRequireDefault(_routerWarning);

var _invariant = __webpack_require__(8);

var _invariant2 = _interopRequireDefault(_invariant);

var _RouteUtils = __webpack_require__(17);

var _InternalPropTypes = __webpack_require__(21);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var func = _react2.default.PropTypes.func;

/**
 * An <IndexRoute> is used to specify its parent's <Route indexRoute> in
 * a JSX route config.
 */

var IndexRoute = _react2.default.createClass({
  displayName: 'IndexRoute',


  statics: {
    createRouteFromReactElement: function createRouteFromReactElement(element, parentRoute) {
      /* istanbul ignore else: sanity check */
      if (parentRoute) {
        parentRoute.indexRoute = (0, _RouteUtils.createRouteFromReactElement)(element);
      } else {
        undefined !== 'production' ? (0, _routerWarning2.default)(false, 'An <IndexRoute> does not make sense at the root of your route config') : void 0;
      }
    }
  },

  propTypes: {
    path: _InternalPropTypes.falsy,
    component: _InternalPropTypes.component,
    components: _InternalPropTypes.components,
    getComponent: func,
    getComponents: func
  },

  /* istanbul ignore next: sanity check */
  render: function render() {
     true ? undefined !== 'production' ? (0, _invariant2.default)(false, '<IndexRoute> elements are for router configuration only and should not be rendered') : (0, _invariant2.default)(false) : void 0;
  }
});

exports.default = IndexRoute;
module.exports = exports['default'];

/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _routerWarning = __webpack_require__(7);

var _routerWarning2 = _interopRequireDefault(_routerWarning);

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _invariant = __webpack_require__(8);

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var object = _react2.default.PropTypes.object;

/**
 * The Lifecycle mixin adds the routerWillLeave lifecycle method to a
 * component that may be used to cancel a transition or prompt the user
 * for confirmation.
 *
 * On standard transitions, routerWillLeave receives a single argument: the
 * location we're transitioning to. To cancel the transition, return false.
 * To prompt the user for confirmation, return a prompt message (string).
 *
 * During the beforeunload event (assuming you're using the useBeforeUnload
 * history enhancer), routerWillLeave does not receive a location object
 * because it isn't possible for us to know the location we're transitioning
 * to. In this case routerWillLeave must return a prompt message to prevent
 * the user from closing the window/tab.
 */

var Lifecycle = {

  contextTypes: {
    history: object.isRequired,
    // Nested children receive the route as context, either
    // set by the route component using the RouteContext mixin
    // or by some other ancestor.
    route: object
  },

  propTypes: {
    // Route components receive the route object as a prop.
    route: object
  },

  componentDidMount: function componentDidMount() {
    undefined !== 'production' ? (0, _routerWarning2.default)(false, 'the `Lifecycle` mixin is deprecated, please use `context.router.setRouteLeaveHook(route, hook)`. http://tiny.cc/router-lifecyclemixin') : void 0;
    !this.routerWillLeave ? undefined !== 'production' ? (0, _invariant2.default)(false, 'The Lifecycle mixin requires you to define a routerWillLeave method') : (0, _invariant2.default)(false) : void 0;

    var route = this.props.route || this.context.route;

    !route ? undefined !== 'production' ? (0, _invariant2.default)(false, 'The Lifecycle mixin must be used on either a) a <Route component> or ' + 'b) a descendant of a <Route component> that uses the RouteContext mixin') : (0, _invariant2.default)(false) : void 0;

    this._unlistenBeforeLeavingRoute = this.context.history.listenBeforeLeavingRoute(route, this.routerWillLeave);
  },
  componentWillUnmount: function componentWillUnmount() {
    if (this._unlistenBeforeLeavingRoute) this._unlistenBeforeLeavingRoute();
  }
};

exports.default = Lifecycle;
module.exports = exports['default'];

/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _invariant = __webpack_require__(8);

var _invariant2 = _interopRequireDefault(_invariant);

var _RouteUtils = __webpack_require__(17);

var _InternalPropTypes = __webpack_require__(21);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _React$PropTypes = _react2.default.PropTypes;
var string = _React$PropTypes.string;
var func = _React$PropTypes.func;

/**
 * A <Route> is used to declare which components are rendered to the
 * page when the URL matches a given pattern.
 *
 * Routes are arranged in a nested tree structure. When a new URL is
 * requested, the tree is searched depth-first to find a route whose
 * path matches the URL.  When one is found, all routes in the tree
 * that lead to it are considered "active" and their components are
 * rendered into the DOM, nested in the same order as in the tree.
 */

var Route = _react2.default.createClass({
  displayName: 'Route',


  statics: {
    createRouteFromReactElement: _RouteUtils.createRouteFromReactElement
  },

  propTypes: {
    path: string,
    component: _InternalPropTypes.component,
    components: _InternalPropTypes.components,
    getComponent: func,
    getComponents: func
  },

  /* istanbul ignore next: sanity check */
  render: function render() {
     true ? undefined !== 'production' ? (0, _invariant2.default)(false, '<Route> elements are for router configuration only and should not be rendered') : (0, _invariant2.default)(false) : void 0;
  }
});

exports.default = Route;
module.exports = exports['default'];

/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _routerWarning = __webpack_require__(7);

var _routerWarning2 = _interopRequireDefault(_routerWarning);

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var object = _react2.default.PropTypes.object;

/**
 * The RouteContext mixin provides a convenient way for route
 * components to set the route in context. This is needed for
 * routes that render elements that want to use the Lifecycle
 * mixin to prevent transitions.
 */

var RouteContext = {

  propTypes: {
    route: object.isRequired
  },

  childContextTypes: {
    route: object.isRequired
  },

  getChildContext: function getChildContext() {
    return {
      route: this.props.route
    };
  },
  componentWillMount: function componentWillMount() {
    undefined !== 'production' ? (0, _routerWarning2.default)(false, 'The `RouteContext` mixin is deprecated. You can provide `this.props.route` on context with your own `contextTypes`. http://tiny.cc/router-routecontextmixin') : void 0;
  }
};

exports.default = RouteContext;
module.exports = exports['default'];

/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createHashHistory = __webpack_require__(80);

var _createHashHistory2 = _interopRequireDefault(_createHashHistory);

var _useQueries = __webpack_require__(36);

var _useQueries2 = _interopRequireDefault(_useQueries);

var _invariant = __webpack_require__(8);

var _invariant2 = _interopRequireDefault(_invariant);

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _createTransitionManager = __webpack_require__(68);

var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);

var _InternalPropTypes = __webpack_require__(21);

var _RouterContext = __webpack_require__(43);

var _RouterContext2 = _interopRequireDefault(_RouterContext);

var _RouteUtils = __webpack_require__(17);

var _RouterUtils = __webpack_require__(108);

var _routerWarning = __webpack_require__(7);

var _routerWarning2 = _interopRequireDefault(_routerWarning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function isDeprecatedHistory(history) {
  return !history || !history.__v2_compatible__;
}

/* istanbul ignore next: sanity check */
function isUnsupportedHistory(history) {
  // v3 histories expose getCurrentLocation, but aren't currently supported.
  return history && history.getCurrentLocation;
}

var _React$PropTypes = _react2.default.PropTypes;
var func = _React$PropTypes.func;
var object = _React$PropTypes.object;

/**
 * A <Router> is a high-level API for automatically setting up
 * a router that renders a <RouterContext> with all the props
 * it needs each time the URL changes.
 */

var Router = _react2.default.createClass({
  displayName: 'Router',


  propTypes: {
    history: object,
    children: _InternalPropTypes.routes,
    routes: _InternalPropTypes.routes, // alias for children
    render: func,
    createElement: func,
    onError: func,
    onUpdate: func,

    // Deprecated:
    parseQueryString: func,
    stringifyQuery: func,

    // PRIVATE: For client-side rehydration of server match.
    matchContext: object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      render: function render(props) {
        return _react2.default.createElement(_RouterContext2.default, props);
      }
    };
  },
  getInitialState: function getInitialState() {
    return {
      location: null,
      routes: null,
      params: null,
      components: null
    };
  },
  handleError: function handleError(error) {
    if (this.props.onError) {
      this.props.onError.call(this, error);
    } else {
      // Throw errors by default so we don't silently swallow them!
      throw error; // This error probably occurred in getChildRoutes or getComponents.
    }
  },
  componentWillMount: function componentWillMount() {
    var _this = this;

    var _props = this.props;
    var parseQueryString = _props.parseQueryString;
    var stringifyQuery = _props.stringifyQuery;

    undefined !== 'production' ? (0, _routerWarning2.default)(!(parseQueryString || stringifyQuery), '`parseQueryString` and `stringifyQuery` are deprecated. Please create a custom history. http://tiny.cc/router-customquerystring') : void 0;

    var _createRouterObjects = this.createRouterObjects();

    var history = _createRouterObjects.history;
    var transitionManager = _createRouterObjects.transitionManager;
    var router = _createRouterObjects.router;


    this._unlisten = transitionManager.listen(function (error, state) {
      if (error) {
        _this.handleError(error);
      } else {
        _this.setState(state, _this.props.onUpdate);
      }
    });

    this.history = history;
    this.router = router;
  },
  createRouterObjects: function createRouterObjects() {
    var matchContext = this.props.matchContext;

    if (matchContext) {
      return matchContext;
    }

    var history = this.props.history;
    var _props2 = this.props;
    var routes = _props2.routes;
    var children = _props2.children;


    !!isUnsupportedHistory(history) ? undefined !== 'production' ? (0, _invariant2.default)(false, 'You have provided a history object created with history v3.x. ' + 'This version of React Router is not compatible with v3 history ' + 'objects. Please use history v2.x instead.') : (0, _invariant2.default)(false) : void 0;

    if (isDeprecatedHistory(history)) {
      history = this.wrapDeprecatedHistory(history);
    }

    var transitionManager = (0, _createTransitionManager2.default)(history, (0, _RouteUtils.createRoutes)(routes || children));
    var router = (0, _RouterUtils.createRouterObject)(history, transitionManager);
    var routingHistory = (0, _RouterUtils.createRoutingHistory)(history, transitionManager);

    return { history: routingHistory, transitionManager: transitionManager, router: router };
  },
  wrapDeprecatedHistory: function wrapDeprecatedHistory(history) {
    var _props3 = this.props;
    var parseQueryString = _props3.parseQueryString;
    var stringifyQuery = _props3.stringifyQuery;


    var createHistory = void 0;
    if (history) {
      undefined !== 'production' ? (0, _routerWarning2.default)(false, 'It appears you have provided a deprecated history object to `<Router/>`, please use a history provided by ' + 'React Router with `import { browserHistory } from \'react-router\'` or `import { hashHistory } from \'react-router\'`. ' + 'If you are using a custom history please create it with `useRouterHistory`, see http://tiny.cc/router-usinghistory for details.') : void 0;
      createHistory = function createHistory() {
        return history;
      };
    } else {
      undefined !== 'production' ? (0, _routerWarning2.default)(false, '`Router` no longer defaults the history prop to hash history. Please use the `hashHistory` singleton instead. http://tiny.cc/router-defaulthistory') : void 0;
      createHistory = _createHashHistory2.default;
    }

    return (0, _useQueries2.default)(createHistory)({ parseQueryString: parseQueryString, stringifyQuery: stringifyQuery });
  },


  /* istanbul ignore next: sanity check */
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    undefined !== 'production' ? (0, _routerWarning2.default)(nextProps.history === this.props.history, 'You cannot change <Router history>; it will be ignored') : void 0;

    undefined !== 'production' ? (0, _routerWarning2.default)((nextProps.routes || nextProps.children) === (this.props.routes || this.props.children), 'You cannot change <Router routes>; it will be ignored') : void 0;
  },
  componentWillUnmount: function componentWillUnmount() {
    if (this._unlisten) this._unlisten();
  },
  render: function render() {
    var _state = this.state;
    var location = _state.location;
    var routes = _state.routes;
    var params = _state.params;
    var components = _state.components;
    var _props4 = this.props;
    var createElement = _props4.createElement;
    var render = _props4.render;

    var props = _objectWithoutProperties(_props4, ['createElement', 'render']);

    if (location == null) return null; // Async match

    // Only forward non-Router-specific props to routing context, as those are
    // the only ones that might be custom routing context props.
    Object.keys(Router.propTypes).forEach(function (propType) {
      return delete props[propType];
    });

    return render(_extends({}, props, {
      history: this.history,
      router: this.router,
      location: location,
      routes: routes,
      params: params,
      components: components,
      createElement: createElement
    }));
  }
});

exports.default = Router;
module.exports = exports['default'];

/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _RouterContext = __webpack_require__(43);

var _RouterContext2 = _interopRequireDefault(_RouterContext);

var _routerWarning = __webpack_require__(7);

var _routerWarning2 = _interopRequireDefault(_routerWarning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RoutingContext = _react2.default.createClass({
  displayName: 'RoutingContext',
  componentWillMount: function componentWillMount() {
    undefined !== 'production' ? (0, _routerWarning2.default)(false, '`RoutingContext` has been renamed to `RouterContext`. Please use `import { RouterContext } from \'react-router\'`. http://tiny.cc/router-routercontext') : void 0;
  },
  render: function render() {
    return _react2.default.createElement(_RouterContext2.default, this.props);
  }
});

exports.default = RoutingContext;
module.exports = exports['default'];

/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.runEnterHooks = runEnterHooks;
exports.runChangeHooks = runChangeHooks;
exports.runLeaveHooks = runLeaveHooks;

var _AsyncUtils = __webpack_require__(66);

var _routerWarning = __webpack_require__(7);

var _routerWarning2 = _interopRequireDefault(_routerWarning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createTransitionHook(hook, route, asyncArity) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    hook.apply(route, args);

    if (hook.length < asyncArity) {
      var callback = args[args.length - 1];
      // Assume hook executes synchronously and
      // automatically call the callback.
      callback();
    }
  };
}

function getEnterHooks(routes) {
  return routes.reduce(function (hooks, route) {
    if (route.onEnter) hooks.push(createTransitionHook(route.onEnter, route, 3));

    return hooks;
  }, []);
}

function getChangeHooks(routes) {
  return routes.reduce(function (hooks, route) {
    if (route.onChange) hooks.push(createTransitionHook(route.onChange, route, 4));
    return hooks;
  }, []);
}

function runTransitionHooks(length, iter, callback) {
  if (!length) {
    callback();
    return;
  }

  var redirectInfo = void 0;
  function replace(location, deprecatedPathname, deprecatedQuery) {
    if (deprecatedPathname) {
      undefined !== 'production' ? (0, _routerWarning2.default)(false, '`replaceState(state, pathname, query) is deprecated; use `replace(location)` with a location descriptor instead. http://tiny.cc/router-isActivedeprecated') : void 0;
      redirectInfo = {
        pathname: deprecatedPathname,
        query: deprecatedQuery,
        state: location
      };

      return;
    }

    redirectInfo = location;
  }

  (0, _AsyncUtils.loopAsync)(length, function (index, next, done) {
    iter(index, replace, function (error) {
      if (error || redirectInfo) {
        done(error, redirectInfo); // No need to continue.
      } else {
        next();
      }
    });
  }, callback);
}

/**
 * Runs all onEnter hooks in the given array of routes in order
 * with onEnter(nextState, replace, callback) and calls
 * callback(error, redirectInfo) when finished. The first hook
 * to use replace short-circuits the loop.
 *
 * If a hook needs to run asynchronously, it may use the callback
 * function. However, doing so will cause the transition to pause,
 * which could lead to a non-responsive UI if the hook is slow.
 */
function runEnterHooks(routes, nextState, callback) {
  var hooks = getEnterHooks(routes);
  return runTransitionHooks(hooks.length, function (index, replace, next) {
    hooks[index](nextState, replace, next);
  }, callback);
}

/**
 * Runs all onChange hooks in the given array of routes in order
 * with onChange(prevState, nextState, replace, callback) and calls
 * callback(error, redirectInfo) when finished. The first hook
 * to use replace short-circuits the loop.
 *
 * If a hook needs to run asynchronously, it may use the callback
 * function. However, doing so will cause the transition to pause,
 * which could lead to a non-responsive UI if the hook is slow.
 */
function runChangeHooks(routes, state, nextState, callback) {
  var hooks = getChangeHooks(routes);
  return runTransitionHooks(hooks.length, function (index, replace, next) {
    hooks[index](state, nextState, replace, next);
  }, callback);
}

/**
 * Runs all onLeave hooks in the given array of routes in order.
 */
function runLeaveHooks(routes, prevState) {
  for (var i = 0, len = routes.length; i < len; ++i) {
    if (routes[i].onLeave) routes[i].onLeave.call(routes[i], prevState);
  }
}

/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _RouterContext = __webpack_require__(43);

var _RouterContext2 = _interopRequireDefault(_RouterContext);

var _routerWarning = __webpack_require__(7);

var _routerWarning2 = _interopRequireDefault(_routerWarning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  if (undefined !== 'production') {
    middlewares.forEach(function (middleware, index) {
      undefined !== 'production' ? (0, _routerWarning2.default)(middleware.renderRouterContext || middleware.renderRouteComponent, 'The middleware specified at index ' + index + ' does not appear to be ' + 'a valid React Router middleware.') : void 0;
    });
  }

  var withContext = middlewares.map(function (middleware) {
    return middleware.renderRouterContext;
  }).filter(Boolean);
  var withComponent = middlewares.map(function (middleware) {
    return middleware.renderRouteComponent;
  }).filter(Boolean);

  var makeCreateElement = function makeCreateElement() {
    var baseCreateElement = arguments.length <= 0 || arguments[0] === undefined ? _react.createElement : arguments[0];
    return function (Component, props) {
      return withComponent.reduceRight(function (previous, renderRouteComponent) {
        return renderRouteComponent(previous, props);
      }, baseCreateElement(Component, props));
    };
  };

  return function (renderProps) {
    return withContext.reduceRight(function (previous, renderRouterContext) {
      return renderRouterContext(previous, renderProps);
    }, _react2.default.createElement(_RouterContext2.default, _extends({}, renderProps, {
      createElement: makeCreateElement(renderProps.createElement)
    })));
  };
};

module.exports = exports['default'];

/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _createBrowserHistory = __webpack_require__(146);

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _createRouterHistory = __webpack_require__(110);

var _createRouterHistory2 = _interopRequireDefault(_createRouterHistory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _createRouterHistory2.default)(_createBrowserHistory2.default);
module.exports = exports['default'];

/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _PatternUtils = __webpack_require__(27);

function routeParamsChanged(route, prevState, nextState) {
  if (!route.path) return false;

  var paramNames = (0, _PatternUtils.getParamNames)(route.path);

  return paramNames.some(function (paramName) {
    return prevState.params[paramName] !== nextState.params[paramName];
  });
}

/**
 * Returns an object of { leaveRoutes, changeRoutes, enterRoutes } determined by
 * the change from prevState to nextState. We leave routes if either
 * 1) they are not in the next state or 2) they are in the next state
 * but their params have changed (i.e. /users/123 => /users/456).
 *
 * leaveRoutes are ordered starting at the leaf route of the tree
 * we're leaving up to the common parent route. enterRoutes are ordered
 * from the top of the tree we're entering down to the leaf route.
 *
 * changeRoutes are any routes that didn't leave or enter during
 * the transition.
 */
function computeChangedRoutes(prevState, nextState) {
  var prevRoutes = prevState && prevState.routes;
  var nextRoutes = nextState.routes;

  var leaveRoutes = void 0,
      changeRoutes = void 0,
      enterRoutes = void 0;
  if (prevRoutes) {
    (function () {
      var parentIsLeaving = false;
      leaveRoutes = prevRoutes.filter(function (route) {
        if (parentIsLeaving) {
          return true;
        } else {
          var isLeaving = nextRoutes.indexOf(route) === -1 || routeParamsChanged(route, prevState, nextState);
          if (isLeaving) parentIsLeaving = true;
          return isLeaving;
        }
      });

      // onLeave hooks start at the leaf route.
      leaveRoutes.reverse();

      enterRoutes = [];
      changeRoutes = [];

      nextRoutes.forEach(function (route) {
        var isNew = prevRoutes.indexOf(route) === -1;
        var paramsChanged = leaveRoutes.indexOf(route) !== -1;

        if (isNew || paramsChanged) enterRoutes.push(route);else changeRoutes.push(route);
      });
    })();
  } else {
    leaveRoutes = [];
    changeRoutes = [];
    enterRoutes = nextRoutes;
  }

  return {
    leaveRoutes: leaveRoutes,
    changeRoutes: changeRoutes,
    enterRoutes: enterRoutes
  };
}

exports.default = computeChangedRoutes;
module.exports = exports['default'];

/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _AsyncUtils = __webpack_require__(66);

var _makeStateWithLocation = __webpack_require__(111);

var _makeStateWithLocation2 = _interopRequireDefault(_makeStateWithLocation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getComponentsForRoute(nextState, route, callback) {
  if (route.component || route.components) {
    callback(null, route.component || route.components);
    return;
  }

  var getComponent = route.getComponent || route.getComponents;
  if (!getComponent) {
    callback();
    return;
  }

  var location = nextState.location;

  var nextStateWithLocation = (0, _makeStateWithLocation2.default)(nextState, location);

  getComponent.call(route, nextStateWithLocation, callback);
}

/**
 * Asynchronously fetches all components needed for the given router
 * state and calls callback(error, components) when finished.
 *
 * Note: This operation may finish synchronously if no routes have an
 * asynchronous getComponents method.
 */
function getComponents(nextState, callback) {
  (0, _AsyncUtils.mapAsync)(nextState.routes, function (route, index, callback) {
    getComponentsForRoute(nextState, route, callback);
  }, callback);
}

exports.default = getComponents;
module.exports = exports['default'];

/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _PatternUtils = __webpack_require__(27);

/**
 * Extracts an object of params the given route cares about from
 * the given params object.
 */
function getRouteParams(route, params) {
  var routeParams = {};

  if (!route.path) return routeParams;

  (0, _PatternUtils.getParamNames)(route.path).forEach(function (p) {
    if (Object.prototype.hasOwnProperty.call(params, p)) {
      routeParams[p] = params[p];
    }
  });

  return routeParams;
}

exports.default = getRouteParams;
module.exports = exports['default'];

/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _createHashHistory = __webpack_require__(80);

var _createHashHistory2 = _interopRequireDefault(_createHashHistory);

var _createRouterHistory = __webpack_require__(110);

var _createRouterHistory2 = _interopRequireDefault(_createRouterHistory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _createRouterHistory2.default)(_createHashHistory2.default);
module.exports = exports['default'];

/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = isActive;

var _PatternUtils = __webpack_require__(27);

function deepEqual(a, b) {
  if (a == b) return true;

  if (a == null || b == null) return false;

  if (Array.isArray(a)) {
    return Array.isArray(b) && a.length === b.length && a.every(function (item, index) {
      return deepEqual(item, b[index]);
    });
  }

  if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object') {
    for (var p in a) {
      if (!Object.prototype.hasOwnProperty.call(a, p)) {
        continue;
      }

      if (a[p] === undefined) {
        if (b[p] !== undefined) {
          return false;
        }
      } else if (!Object.prototype.hasOwnProperty.call(b, p)) {
        return false;
      } else if (!deepEqual(a[p], b[p])) {
        return false;
      }
    }

    return true;
  }

  return String(a) === String(b);
}

/**
 * Returns true if the current pathname matches the supplied one, net of
 * leading and trailing slash normalization. This is sufficient for an
 * indexOnly route match.
 */
function pathIsActive(pathname, currentPathname) {
  // Normalize leading slash for consistency. Leading slash on pathname has
  // already been normalized in isActive. See caveat there.
  if (currentPathname.charAt(0) !== '/') {
    currentPathname = '/' + currentPathname;
  }

  // Normalize the end of both path names too. Maybe `/foo/` shouldn't show
  // `/foo` as active, but in this case, we would already have failed the
  // match.
  if (pathname.charAt(pathname.length - 1) !== '/') {
    pathname += '/';
  }
  if (currentPathname.charAt(currentPathname.length - 1) !== '/') {
    currentPathname += '/';
  }

  return currentPathname === pathname;
}

/**
 * Returns true if the given pathname matches the active routes and params.
 */
function routeIsActive(pathname, routes, params) {
  var remainingPathname = pathname,
      paramNames = [],
      paramValues = [];

  // for...of would work here but it's probably slower post-transpilation.
  for (var i = 0, len = routes.length; i < len; ++i) {
    var route = routes[i];
    var pattern = route.path || '';

    if (pattern.charAt(0) === '/') {
      remainingPathname = pathname;
      paramNames = [];
      paramValues = [];
    }

    if (remainingPathname !== null && pattern) {
      var matched = (0, _PatternUtils.matchPattern)(pattern, remainingPathname);
      if (matched) {
        remainingPathname = matched.remainingPathname;
        paramNames = [].concat(paramNames, matched.paramNames);
        paramValues = [].concat(paramValues, matched.paramValues);
      } else {
        remainingPathname = null;
      }

      if (remainingPathname === '') {
        // We have an exact match on the route. Just check that all the params
        // match.
        // FIXME: This doesn't work on repeated params.
        return paramNames.every(function (paramName, index) {
          return String(paramValues[index]) === String(params[paramName]);
        });
      }
    }
  }

  return false;
}

/**
 * Returns true if all key/value pairs in the given query are
 * currently active.
 */
function queryIsActive(query, activeQuery) {
  if (activeQuery == null) return query == null;

  if (query == null) return true;

  return deepEqual(query, activeQuery);
}

/**
 * Returns true if a <Link> to the given pathname/query combination is
 * currently active.
 */
function isActive(_ref, indexOnly, currentLocation, routes, params) {
  var pathname = _ref.pathname;
  var query = _ref.query;

  if (currentLocation == null) return false;

  // TODO: This is a bit ugly. It keeps around support for treating pathnames
  // without preceding slashes as absolute paths, but possibly also works
  // around the same quirks with basenames as in matchRoutes.
  if (pathname.charAt(0) !== '/') {
    pathname = '/' + pathname;
  }

  if (!pathIsActive(pathname, currentLocation.pathname)) {
    // The path check is necessary and sufficient for indexOnly, but otherwise
    // we still need to check the routes.
    if (indexOnly || !routeIsActive(pathname, routes, params)) {
      return false;
    }
  }

  return queryIsActive(query, currentLocation.query);
}
module.exports = exports['default'];

/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Actions = __webpack_require__(24);

var _invariant = __webpack_require__(8);

var _invariant2 = _interopRequireDefault(_invariant);

var _createMemoryHistory = __webpack_require__(109);

var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

var _createTransitionManager = __webpack_require__(68);

var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);

var _RouteUtils = __webpack_require__(17);

var _RouterUtils = __webpack_require__(108);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * A high-level API to be used for server-side rendering.
 *
 * This function matches a location to a set of routes and calls
 * callback(error, redirectLocation, renderProps) when finished.
 *
 * Note: You probably don't want to use this in a browser unless you're using
 * server-side rendering with async routes.
 */
function match(_ref, callback) {
  var history = _ref.history;
  var routes = _ref.routes;
  var location = _ref.location;

  var options = _objectWithoutProperties(_ref, ['history', 'routes', 'location']);

  !(history || location) ? undefined !== 'production' ? (0, _invariant2.default)(false, 'match needs a history or a location') : (0, _invariant2.default)(false) : void 0;

  history = history ? history : (0, _createMemoryHistory2.default)(options);
  var transitionManager = (0, _createTransitionManager2.default)(history, (0, _RouteUtils.createRoutes)(routes));

  var unlisten = void 0;

  if (location) {
    // Allow match({ location: '/the/path', ... })
    location = history.createLocation(location);
  } else {
    // Pick up the location from the history via synchronous history.listen
    // call if needed.
    unlisten = history.listen(function (historyLocation) {
      location = historyLocation;
    });
  }

  var router = (0, _RouterUtils.createRouterObject)(history, transitionManager);
  history = (0, _RouterUtils.createRoutingHistory)(history, transitionManager);

  transitionManager.match(location, function (error, redirectLocation, nextState) {
    callback(error, redirectLocation && router.createLocation(redirectLocation, _Actions.REPLACE), nextState && _extends({}, nextState, {
      history: history,
      router: router,
      matchContext: { history: history, transitionManager: transitionManager, router: router }
    }));

    // Defer removing the listener to here to prevent DOM histories from having
    // to unwind DOM event listeners unnecessarily, in case callback renders a
    // <Router> and attaches another history listener.
    if (unlisten) {
      unlisten();
    }
  });
}

exports.default = match;
module.exports = exports['default'];

/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = matchRoutes;

var _AsyncUtils = __webpack_require__(66);

var _makeStateWithLocation = __webpack_require__(111);

var _makeStateWithLocation2 = _interopRequireDefault(_makeStateWithLocation);

var _PatternUtils = __webpack_require__(27);

var _routerWarning = __webpack_require__(7);

var _routerWarning2 = _interopRequireDefault(_routerWarning);

var _RouteUtils = __webpack_require__(17);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getChildRoutes(route, location, paramNames, paramValues, callback) {
  if (route.childRoutes) {
    return [null, route.childRoutes];
  }
  if (!route.getChildRoutes) {
    return [];
  }

  var sync = true,
      result = void 0;

  var partialNextState = {
    location: location,
    params: createParams(paramNames, paramValues)
  };

  var partialNextStateWithLocation = (0, _makeStateWithLocation2.default)(partialNextState, location);

  route.getChildRoutes(partialNextStateWithLocation, function (error, childRoutes) {
    childRoutes = !error && (0, _RouteUtils.createRoutes)(childRoutes);
    if (sync) {
      result = [error, childRoutes];
      return;
    }

    callback(error, childRoutes);
  });

  sync = false;
  return result; // Might be undefined.
}

function getIndexRoute(route, location, paramNames, paramValues, callback) {
  if (route.indexRoute) {
    callback(null, route.indexRoute);
  } else if (route.getIndexRoute) {
    var partialNextState = {
      location: location,
      params: createParams(paramNames, paramValues)
    };

    var partialNextStateWithLocation = (0, _makeStateWithLocation2.default)(partialNextState, location);

    route.getIndexRoute(partialNextStateWithLocation, function (error, indexRoute) {
      callback(error, !error && (0, _RouteUtils.createRoutes)(indexRoute)[0]);
    });
  } else if (route.childRoutes) {
    (function () {
      var pathless = route.childRoutes.filter(function (childRoute) {
        return !childRoute.path;
      });

      (0, _AsyncUtils.loopAsync)(pathless.length, function (index, next, done) {
        getIndexRoute(pathless[index], location, paramNames, paramValues, function (error, indexRoute) {
          if (error || indexRoute) {
            var routes = [pathless[index]].concat(Array.isArray(indexRoute) ? indexRoute : [indexRoute]);
            done(error, routes);
          } else {
            next();
          }
        });
      }, function (err, routes) {
        callback(null, routes);
      });
    })();
  } else {
    callback();
  }
}

function assignParams(params, paramNames, paramValues) {
  return paramNames.reduce(function (params, paramName, index) {
    var paramValue = paramValues && paramValues[index];

    if (Array.isArray(params[paramName])) {
      params[paramName].push(paramValue);
    } else if (paramName in params) {
      params[paramName] = [params[paramName], paramValue];
    } else {
      params[paramName] = paramValue;
    }

    return params;
  }, params);
}

function createParams(paramNames, paramValues) {
  return assignParams({}, paramNames, paramValues);
}

function matchRouteDeep(route, location, remainingPathname, paramNames, paramValues, callback) {
  var pattern = route.path || '';

  if (pattern.charAt(0) === '/') {
    remainingPathname = location.pathname;
    paramNames = [];
    paramValues = [];
  }

  // Only try to match the path if the route actually has a pattern, and if
  // we're not just searching for potential nested absolute paths.
  if (remainingPathname !== null && pattern) {
    try {
      var matched = (0, _PatternUtils.matchPattern)(pattern, remainingPathname);
      if (matched) {
        remainingPathname = matched.remainingPathname;
        paramNames = [].concat(paramNames, matched.paramNames);
        paramValues = [].concat(paramValues, matched.paramValues);
      } else {
        remainingPathname = null;
      }
    } catch (error) {
      callback(error);
    }

    // By assumption, pattern is non-empty here, which is the prerequisite for
    // actually terminating a match.
    if (remainingPathname === '') {
      var _ret2 = function () {
        var match = {
          routes: [route],
          params: createParams(paramNames, paramValues)
        };

        getIndexRoute(route, location, paramNames, paramValues, function (error, indexRoute) {
          if (error) {
            callback(error);
          } else {
            if (Array.isArray(indexRoute)) {
              var _match$routes;

              undefined !== 'production' ? (0, _routerWarning2.default)(indexRoute.every(function (route) {
                return !route.path;
              }), 'Index routes should not have paths') : void 0;
              (_match$routes = match.routes).push.apply(_match$routes, indexRoute);
            } else if (indexRoute) {
              undefined !== 'production' ? (0, _routerWarning2.default)(!indexRoute.path, 'Index routes should not have paths') : void 0;
              match.routes.push(indexRoute);
            }

            callback(null, match);
          }
        });

        return {
          v: void 0
        };
      }();

      if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
    }
  }

  if (remainingPathname != null || route.childRoutes) {
    // Either a) this route matched at least some of the path or b)
    // we don't have to load this route's children asynchronously. In
    // either case continue checking for matches in the subtree.
    var onChildRoutes = function onChildRoutes(error, childRoutes) {
      if (error) {
        callback(error);
      } else if (childRoutes) {
        // Check the child routes to see if any of them match.
        matchRoutes(childRoutes, location, function (error, match) {
          if (error) {
            callback(error);
          } else if (match) {
            // A child route matched! Augment the match and pass it up the stack.
            match.routes.unshift(route);
            callback(null, match);
          } else {
            callback();
          }
        }, remainingPathname, paramNames, paramValues);
      } else {
        callback();
      }
    };

    var result = getChildRoutes(route, location, paramNames, paramValues, onChildRoutes);
    if (result) {
      onChildRoutes.apply(undefined, result);
    }
  } else {
    callback();
  }
}

/**
 * Asynchronously matches the given location to a set of routes and calls
 * callback(error, state) when finished. The state object will have the
 * following properties:
 *
 * - routes       An array of routes that matched, in hierarchical order
 * - params       An object of URL parameters
 *
 * Note: This operation may finish synchronously if no routes have an
 * asynchronous getChildRoutes method.
 */
function matchRoutes(routes, location, callback, remainingPathname) {
  var paramNames = arguments.length <= 4 || arguments[4] === undefined ? [] : arguments[4];
  var paramValues = arguments.length <= 5 || arguments[5] === undefined ? [] : arguments[5];

  if (remainingPathname === undefined) {
    // TODO: This is a little bit ugly, but it works around a quirk in history
    // that strips the leading slash from pathnames when using basenames with
    // trailing slashes.
    if (location.pathname.charAt(0) !== '/') {
      location = _extends({}, location, {
        pathname: '/' + location.pathname
      });
    }
    remainingPathname = location.pathname;
  }

  (0, _AsyncUtils.loopAsync)(routes.length, function (index, next, done) {
    matchRouteDeep(routes[index], location, remainingPathname, paramNames, paramValues, function (error, match) {
      if (error || match) {
        done(error, match);
      } else {
        next();
      }
    });
  }, callback);
}
module.exports = exports['default'];

/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _useQueries = __webpack_require__(36);

var _useQueries2 = _interopRequireDefault(_useQueries);

var _createTransitionManager = __webpack_require__(68);

var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);

var _routerWarning = __webpack_require__(7);

var _routerWarning2 = _interopRequireDefault(_routerWarning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * Returns a new createHistory function that may be used to create
 * history objects that know about routing.
 *
 * Enhances history objects with the following methods:
 *
 * - listen((error, nextState) => {})
 * - listenBeforeLeavingRoute(route, (nextLocation) => {})
 * - match(location, (error, redirectLocation, nextState) => {})
 * - isActive(pathname, query, indexOnly=false)
 */
function useRoutes(createHistory) {
  undefined !== 'production' ? (0, _routerWarning2.default)(false, '`useRoutes` is deprecated. Please use `createTransitionManager` instead.') : void 0;

  return function () {
    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var routes = _ref.routes;

    var options = _objectWithoutProperties(_ref, ['routes']);

    var history = (0, _useQueries2.default)(createHistory)(options);
    var transitionManager = (0, _createTransitionManager2.default)(history, routes);
    return _extends({}, history, transitionManager);
  };
}

exports.default = useRoutes;
module.exports = exports['default'];

/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = withRouter;

var _invariant = __webpack_require__(8);

var _invariant2 = _interopRequireDefault(_invariant);

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _hoistNonReactStatics = __webpack_require__(150);

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _PropTypes = __webpack_require__(67);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function withRouter(WrappedComponent, options) {
  var withRef = options && options.withRef;

  var WithRouter = _react2.default.createClass({
    displayName: 'WithRouter',

    contextTypes: { router: _PropTypes.routerShape },
    propTypes: { router: _PropTypes.routerShape },

    getWrappedInstance: function getWrappedInstance() {
      !withRef ? undefined !== 'production' ? (0, _invariant2.default)(false, 'To access the wrapped instance, you need to specify ' + '`{ withRef: true }` as the second argument of the withRouter() call.') : (0, _invariant2.default)(false) : void 0;

      return this.wrappedInstance;
    },
    render: function render() {
      var _this = this;

      var router = this.props.router || this.context.router;
      var props = _extends({}, this.props, { router: router });

      if (withRef) {
        props.ref = function (c) {
          _this.wrappedInstance = c;
        };
      }

      return _react2.default.createElement(WrappedComponent, props);
    }
  });

  WithRouter.displayName = 'withRouter(' + getDisplayName(WrappedComponent) + ')';
  WithRouter.WrappedComponent = WrappedComponent;

  return (0, _hoistNonReactStatics2.default)(WithRouter, WrappedComponent);
}
module.exports = exports['default'];

/***/ }),
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (str) {
	return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
		return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	});
};


/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = function() {};

if (undefined !== 'production') {
  warning = function(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
        '`warning(condition, format, ...args)` requires a warning ' +
        'message argument'
      );
    }

    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
      throw new Error(
        'The warning format should be able to uniquely identify this ' +
        'warning. Please, use a more descriptive format than: ' + format
      );
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' +
        format.replace(/%s/g, function() {
          return args[argIndex++];
        });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch(x) {}
    }
  };
}

module.exports = warning;


/***/ })
],[124]);