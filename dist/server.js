/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _bodyParser = __webpack_require__(2);

	var _bodyParser2 = _interopRequireDefault(_bodyParser);

	var _client = __webpack_require__(3);

	var _client2 = _interopRequireDefault(_client);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var server = (0, _express2.default)();
	server.use(_bodyParser2.default.urlencoded({ extended: true }));
	server.use(_bodyParser2.default.json());

	// public assets
	var assets = _express2.default.static('dist/public');
	server.use('/', assets);

	// api routes
	server.use('/api/settings', __webpack_require__(36).default);
	server.use('/api/crm', __webpack_require__(38).default);

	// client routes
	server.get('/[^api]*', _client2.default);

	// bind server
	server.listen(3000);

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _client = __webpack_require__(4);

	var _client2 = _interopRequireDefault(_client);

	var _reactRouter = __webpack_require__(6);

	var _path = __webpack_require__(35);

	var _path2 = _interopRequireDefault(_path);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var client = function client(req, res) {
	  (0, _reactRouter.match)({ routes: _client2.default, location: req.url }, function (error, redirectLocation, renderProps) {
	    if (error) {
	      res.status(500).send(error.message);
	    } else if (redirectLocation) {
	      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
	    } else if (renderProps) {
	      res.sendFile(_path2.default.resolve('./src/public/index.html'));
	    } else {
	      res.status(404).send('Not found');
	    }
	  });
	};

	exports.default = client;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(6);

	var _reactRedux = __webpack_require__(7);

	var _store = __webpack_require__(8);

	var _store2 = _interopRequireDefault(_store);

	var _reducer = __webpack_require__(12);

	var _reducer2 = _interopRequireDefault(_reducer);

	var _chrome = __webpack_require__(15);

	var _chrome2 = _interopRequireDefault(_chrome);

	var _dashboard = __webpack_require__(23);

	var _dashboard2 = _interopRequireDefault(_dashboard);

	var _client = __webpack_require__(24);

	var _client2 = _interopRequireDefault(_client);

	var _client3 = __webpack_require__(28);

	var _client4 = _interopRequireDefault(_client3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Platform = function (_React$Component) {
	  _inherits(Platform, _React$Component);

	  function Platform() {
	    _classCallCheck(this, Platform);

	    return _possibleConstructorReturn(this, (Platform.__proto__ || Object.getPrototypeOf(Platform)).apply(this, arguments));
	  }

	  _createClass(Platform, [{
	    key: 'render',
	    value: function render() {
	      var store = (0, _store2.default)(_reducer2.default);
	      return _react2.default.createElement(
	        _reactRedux.Provider,
	        { store: store },
	        _react2.default.createElement(
	          _chrome2.default,
	          this.props,
	          this.props.children
	        )
	      );
	    }
	  }]);

	  return Platform;
	}(_react2.default.Component);

	exports.default = _react2.default.createElement(
	  _reactRouter.Route,
	  { path: '/', component: Platform },
	  _react2.default.createElement(_reactRouter.IndexRoute, { component: _dashboard2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: 'dashboard', component: _dashboard2.default }),
	  _client2.default,
	  _client4.default
	);

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("react-redux");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(9);

	var _reduxThunk = __webpack_require__(10);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _reduxLogger = __webpack_require__(11);

	var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var CreateStore = function CreateStore(reducer) {

	  var loggerMiddleware = (0, _reduxLogger2.default)();

	  var createStoreWithMiddleware = (0, _redux.applyMiddleware)(_reduxThunk2.default, loggerMiddleware)(_redux.createStore);

	  return createStoreWithMiddleware(reducer);
	};

	exports.default = CreateStore;

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("redux");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("redux-thunk");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("redux-logger");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _reducer = __webpack_require__(13);

	var _reducer2 = _interopRequireDefault(_reducer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var Reducer = function Reducer(state, action) {

	  var reducers = {
	    chrome: _reducer2.default
	  };

	  var namespace = action.type.split('/')[0];

	  if (reducers[namespace]) {

	    return _extends({}, state, _defineProperty({}, namespace, reducers[namespace](state[namespace], action)));
	  } else if (state === undefined) {
	    return {
	      chrome: (0, _reducer2.default)(undefined, action)
	    };
	  } else {

	    return state;
	  }
	};

	exports.default = Reducer;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _action_types = __webpack_require__(14);

	var actionTypes = _interopRequireWildcard(_action_types);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var INITIAL_STATE = {
	  expanded: false,
	  active: null,
	  apps: [{ name: 'Contacts', icon: 'user', route: '/crm/contacts' }, { name: 'Settings', icon: 'setting', route: '/settings/apps' }],
	  notifications: [
	    // { story: { text: 'This is what happened' } },
	    // { story: { text: 'This is what happened next' } }
	  ],
	  search: {
	    query: '',
	    active: false,
	    results: [],
	    choice: null
	  },
	  user: {
	    name: 'Greg Kops',
	    email: 'gmk8@cornell.edu',
	    photo: '/images/greg.jpg'
	  }
	};

	exports.default = function () {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
	  var action = arguments[1];


	  switch (action.type) {

	    case actionTypes.TOGGLE_DRAWER:
	      return _extends({}, state, {
	        expanded: !state.expanded
	      });

	    case actionTypes.CHANGE_APP:
	      return _extends({}, state, {
	        active: action.index,
	        expanded: false
	      });

	    case actionTypes.BEGIN_SEARCH:
	      return _extends({}, state, {
	        search: _extends({}, state.search, {
	          active: true
	        })
	      });

	    case actionTypes.ABORT_SEARCH:
	      return _extends({}, state, {
	        search: _extends({}, state.search, {
	          active: false
	        })
	      });

	    case actionTypes.COMPLETE_SEARCH:
	      return _extends({}, state, {
	        search: _extends({}, state.search, {
	          query: '',
	          active: false,
	          results: [],
	          choice: state.search.results[action.index]
	        })
	      });

	    case actionTypes.LOOKUP:
	      return _extends({}, state, {
	        search: _extends({}, state.search, {
	          query: action.query,
	          results: action.query.length > 0 ? [{ name: 'Ken Schlather', email: 'ks47@cornell.edu', photo: '/images/ken.jpg', route: '/crm/contacts/1' }, { name: 'Sandy Repp', email: 'sjr37@cornell.edu', photo: '/images/sandy.jpg', route: '/crm/contacts/2' }, { name: 'Sharon Anderson', email: 'ska2@cornell.edu', photo: '/images/sharon.jpg', route: '/crm/contacts/3' }, { name: 'Greg Kops', email: 'gmk8@cornell.edu', photo: '/images/greg.jpg', route: '/crm/contacts/4' }, { name: 'Ken Schlather', email: 'ks47@cornell.edu', photo: '/images/ken.jpg', route: '/crm/contacts/1' }, { name: 'Sandy Repp', email: 'sjr37@cornell.edu', photo: '/images/sandy.jpg', route: '/crm/contacts/2' }, { name: 'Sharon Anderson', email: 'ska2@cornell.edu', photo: '/images/sharon.jpg', route: '/crm/contacts/3' }, { name: 'Greg Kops', email: 'gmk8@cornell.edu', photo: '/images/greg.jpg', route: '/crm/contacts/4' }] : []
	        })
	      });

	    default:
	      return state;
	  }
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var TOGGLE_DRAWER = exports.TOGGLE_DRAWER = 'chrome/TOGGLE_DRAWER';
	var CHANGE_APP = exports.CHANGE_APP = 'chrome/CHANGE_APP';
	var PUSH_NOTIFICATION = exports.PUSH_NOTIFICATION = 'chrome/PUSH_NOTIFICATION';
	var READ_NOTIFICATION = exports.READ_NOTIFICATION = 'chrome/READ_NOTIFICATION';
	var BEGIN_SEARCH = exports.BEGIN_SEARCH = 'chrome/BEGIN_SEARCH';
	var ABORT_SEARCH = exports.ABORT_SEARCH = 'chrome/ABORT_SEARCH';
	var COMPLETE_SEARCH = exports.COMPLETE_SEARCH = 'chrome/COMPLETE_SEARCH';
	var LOOKUP = exports.LOOKUP = 'chrome/LOOKUP';

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _chrome = __webpack_require__(16);

	var _chrome2 = _interopRequireDefault(_chrome);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Index = function (_React$Component) {
	  _inherits(Index, _React$Component);

	  function Index() {
	    _classCallCheck(this, Index);

	    return _possibleConstructorReturn(this, (Index.__proto__ || Object.getPrototypeOf(Index)).apply(this, arguments));
	  }

	  _createClass(Index, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        _chrome2.default,
	        null,
	        this.props.children
	      );
	    }
	  }]);

	  return Index;
	}(_react2.default.Component);

	exports.default = Index;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Chrome = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(7);

	var _drawer = __webpack_require__(17);

	var _drawer2 = _interopRequireDefault(_drawer);

	var _topbar = __webpack_require__(20);

	var _topbar2 = _interopRequireDefault(_topbar);

	var _notifications = __webpack_require__(22);

	var _notifications2 = _interopRequireDefault(_notifications);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Chrome = exports.Chrome = function (_React$Component) {
	  _inherits(Chrome, _React$Component);

	  function Chrome() {
	    _classCallCheck(this, Chrome);

	    return _possibleConstructorReturn(this, (Chrome.__proto__ || Object.getPrototypeOf(Chrome)).apply(this, arguments));
	  }

	  _createClass(Chrome, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'chrome' },
	        _react2.default.createElement(_drawer2.default, null),
	        _react2.default.createElement(
	          'div',
	          { className: 'chrome-canvas' },
	          _react2.default.createElement(_topbar2.default, null),
	          _react2.default.createElement(
	            'div',
	            { className: 'chrome-header' },
	            _react2.default.createElement(
	              'div',
	              { className: 'ui breadcrumb' },
	              _react2.default.createElement(
	                'a',
	                { className: 'section' },
	                'Dashboard'
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'divider' },
	                ' / '
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'active section' },
	                'Contacts'
	              )
	            )
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'chrome-body' },
	            this.props.children
	          ),
	          _react2.default.createElement(_notifications2.default, null)
	        )
	      );
	    }
	  }]);

	  return Chrome;
	}(_react2.default.Component);

	var mapStateToProps = function mapStateToProps(state) {
	  return {
	    apps: state.chrome.apps,
	    active: state.chrome.active
	  };
	};

	var mapDispatchToProps = {};

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Chrome);

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Drawer = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _reactAddonsCssTransitionGroup = __webpack_require__(18);

	var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

	var _reactRedux = __webpack_require__(7);

	var _actions = __webpack_require__(19);

	var actions = _interopRequireWildcard(_actions);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Drawer = exports.Drawer = function (_React$Component) {
	  _inherits(Drawer, _React$Component);

	  function Drawer() {
	    _classCallCheck(this, Drawer);

	    return _possibleConstructorReturn(this, (Drawer.__proto__ || Object.getPrototypeOf(Drawer)).apply(this, arguments));
	  }

	  _createClass(Drawer, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var _props = this.props;
	      var active = _props.active;
	      var apps = _props.apps;
	      var expanded = _props.expanded;
	      var user = _props.user;

	      return _react2.default.createElement(
	        _reactAddonsCssTransitionGroup2.default,
	        { transitionName: 'expanded', transitionAppear: true, transitionEnterTimeout: 250, transitionLeaveTimeout: 250, transitionAppearTimeout: 250 },
	        expanded && _react2.default.createElement('div', { key: 'chrome-drawer-overlay', className: 'chrome-drawer-overlay', onClick: this._handleToggleDrawer.bind(this) }),
	        expanded && _react2.default.createElement(
	          'div',
	          { key: 'chrome-drawer', className: 'chrome-drawer' },
	          _react2.default.createElement(
	            'div',
	            { className: 'chrome-presence' },
	            _react2.default.createElement('img', { src: user.photo, className: 'ui image circular' }),
	            _react2.default.createElement(
	              'div',
	              { className: 'chrome-user' },
	              _react2.default.createElement(
	                'h2',
	                null,
	                user.name
	              ),
	              _react2.default.createElement(
	                'p',
	                null,
	                user.email
	              )
	            )
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'chrome-apps' },
	            apps.map(function (app, index) {
	              var classes = index === active ? 'chrome-app active' : 'chrome-app';
	              return _react2.default.createElement(
	                'div',
	                { key: 'app_' + index, className: classes, onClick: _this2._handleChangeApp.bind(_this2, index) },
	                _react2.default.createElement('i', { className: app.icon + ' icon' }),
	                app.name
	              );
	            })
	          )
	        )
	      );
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(prevProps) {
	      var _props2 = this.props;
	      var active = _props2.active;
	      var apps = _props2.apps;

	      var app = apps[active];
	      if (prevProps.active != active) {
	        this.context.history.push(app.route);
	        document.title = 'Platform | ' + app.name;
	      }
	    }
	  }, {
	    key: '_handleToggleDrawer',
	    value: function _handleToggleDrawer() {
	      this.props.onToggleDrawer();
	    }
	  }, {
	    key: '_handleChangeApp',
	    value: function _handleChangeApp(index) {
	      this.props.onChangeApp(index);
	    }
	  }]);

	  return Drawer;
	}(_react2.default.Component);

	Drawer.contextTypes = {
	  history: _react2.default.PropTypes.object
	};


	var mapStateToProps = function mapStateToProps(state) {
	  return {
	    active: state.chrome.active,
	    apps: state.chrome.apps,
	    expanded: state.chrome.expanded,
	    user: state.chrome.user
	  };
	};

	var mapDispatchToProps = {
	  onChangeApp: actions.changeApp,
	  onToggleDrawer: actions.toggleDrawer
	};

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Drawer);

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("react-addons-css-transition-group");

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.toggleDrawer = toggleDrawer;
	exports.changeApp = changeApp;
	exports.pushNotification = pushNotification;
	exports.readNotification = readNotification;
	exports.beginSearch = beginSearch;
	exports.abortSearch = abortSearch;
	exports.completeSearch = completeSearch;
	exports.lookup = lookup;

	var _action_types = __webpack_require__(14);

	var actionTypes = _interopRequireWildcard(_action_types);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function toggleDrawer() {
	  return {
	    type: actionTypes.TOGGLE_DRAWER
	  };
	}

	function changeApp(index) {
	  return {
	    type: actionTypes.CHANGE_APP,
	    index: index
	  };
	}

	function pushNotification(notification) {
	  return {
	    type: actionTypes.PUSH_NOTIFICATION, notification: notification
	  };
	}

	function readNotification(id) {
	  return {
	    type: actionTypes.READ_NOTIFICATION,
	    id: id
	  };
	}

	function beginSearch() {
	  return {
	    type: actionTypes.BEGIN_SEARCH
	  };
	}

	function abortSearch() {
	  return {
	    type: actionTypes.ABORT_SEARCH
	  };
	}

	function completeSearch(index) {
	  return {
	    type: actionTypes.COMPLETE_SEARCH,
	    index: index
	  };
	}

	function lookup(query) {
	  return {
	    type: actionTypes.LOOKUP,
	    query: query
	  };
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Topbar = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(7);

	var _actions = __webpack_require__(19);

	var actions = _interopRequireWildcard(_actions);

	var _search = __webpack_require__(21);

	var _search2 = _interopRequireDefault(_search);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Topbar = exports.Topbar = function (_React$Component) {
	  _inherits(Topbar, _React$Component);

	  function Topbar() {
	    _classCallCheck(this, Topbar);

	    return _possibleConstructorReturn(this, (Topbar.__proto__ || Object.getPrototypeOf(Topbar)).apply(this, arguments));
	  }

	  _createClass(Topbar, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'chrome-topbar' },
	        _react2.default.createElement(
	          'div',
	          { className: 'chrome-toggle', onClick: this._handleToggleDrawer.bind(this) },
	          _react2.default.createElement('i', { className: 'sidebar icon' })
	        ),
	        _react2.default.createElement(_search2.default, null)
	      );
	    }
	  }, {
	    key: '_handleToggleDrawer',
	    value: function _handleToggleDrawer() {
	      this.props.onToggleDrawer();
	    }
	  }]);

	  return Topbar;
	}(_react2.default.Component);

	var mapStateToProps = function mapStateToProps(state) {
	  return {};
	};

	var mapDispatchToProps = {
	  onToggleDrawer: actions.toggleDrawer
	};

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Topbar);

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Search = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(7);

	var _actions = __webpack_require__(19);

	var actions = _interopRequireWildcard(_actions);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Search = exports.Search = function (_React$Component) {
	  _inherits(Search, _React$Component);

	  function Search() {
	    _classCallCheck(this, Search);

	    return _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).apply(this, arguments));
	  }

	  _createClass(Search, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var _props = this.props;
	      var active = _props.active;
	      var results = _props.results;
	      var query = _props.query;

	      return _react2.default.createElement(
	        'div',
	        { className: 'chrome-search' },
	        _react2.default.createElement('i', { className: 'search icon' }),
	        _react2.default.createElement(
	          'div',
	          { className: 'ui input' },
	          _react2.default.createElement('input', { type: 'text', placeholder: 'Search', ref: 'query', onFocus: this._handleBeginSearch.bind(this), onChange: this._handleLookup.bind(this), value: query })
	        ),
	        active && _react2.default.createElement('div', { key: 'chrome-search-overlay', className: 'chrome-search-overlay', onClick: this._handleAbortSearch.bind(this) }),
	        active && _react2.default.createElement(
	          'div',
	          { className: 'chrome-search-results' },
	          results.map(function (result, index) {
	            return _react2.default.createElement(
	              'div',
	              { key: 'result_' + index, className: 'chrome-search-result', onClick: _this2._handleCompleteSearch.bind(_this2, index) },
	              _react2.default.createElement('img', { src: result.photo }),
	              _react2.default.createElement(
	                'p',
	                null,
	                _react2.default.createElement(
	                  'strong',
	                  null,
	                  result.name
	                ),
	                _react2.default.createElement('br', null),
	                result.email
	              )
	            );
	          })
	        )
	      );
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(prevProps) {
	      var choice = this.props.choice;

	      if (prevProps.choice != choice) {
	        this.context.history.push(choice.route);
	      }
	    }
	  }, {
	    key: '_handleBeginSearch',
	    value: function _handleBeginSearch() {
	      this.props.onBeginSearch();
	    }
	  }, {
	    key: '_handleAbortSearch',
	    value: function _handleAbortSearch() {
	      this.props.onAbortSearch();
	    }
	  }, {
	    key: '_handleCompleteSearch',
	    value: function _handleCompleteSearch(index) {
	      this.props.onCompleteSearch(index);
	    }
	  }, {
	    key: '_handleLookup',
	    value: function _handleLookup(event) {
	      this.props.onLookup(event.target.value);
	    }
	  }]);

	  return Search;
	}(_react2.default.Component);

	Search.contextTypes = {
	  history: _react2.default.PropTypes.object
	};


	var mapStateToProps = function mapStateToProps(state) {
	  return {
	    active: state.chrome.search.active,
	    query: state.chrome.search.query,
	    results: state.chrome.search.results,
	    choice: state.chrome.search.choice
	  };
	};

	var mapDispatchToProps = {
	  onBeginSearch: actions.beginSearch,
	  onAbortSearch: actions.abortSearch,
	  onCompleteSearch: actions.completeSearch,
	  onLookup: actions.lookup
	};

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Search);

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Notifications = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(7);

	var _actions = __webpack_require__(19);

	var actions = _interopRequireWildcard(_actions);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Notifications = exports.Notifications = function (_React$Component) {
	  _inherits(Notifications, _React$Component);

	  function Notifications() {
	    _classCallCheck(this, Notifications);

	    return _possibleConstructorReturn(this, (Notifications.__proto__ || Object.getPrototypeOf(Notifications)).apply(this, arguments));
	  }

	  _createClass(Notifications, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var notifications = this.props.notifications;

	      return _react2.default.createElement(
	        'div',
	        { className: 'chrome-notifications' },
	        notifications.length > 0 && _react2.default.createElement(
	          'div',
	          { className: 'ui raised segments' },
	          notifications.map(function (notification, index) {
	            return _react2.default.createElement(
	              'div',
	              { key: 'notification_' + index, className: 'ui segment' },
	              _react2.default.createElement('i', { className: 'fa fa-times', onClick: _this2.readNotification.bind(_this2, notification.id) }),
	              notification.story.text
	            );
	          })
	        )
	      );
	    }

	    // componentDidMount() {
	    //   Socket.subscribe(`/users/${this.context.session.user.id}/notifications`, this.pushNotification.bind(this))
	    // }

	    // componentWillUnmount() {
	    //   Socket.unsubscribe(`/users/${this.context.session.user.id}/notifications`, this.pushNotification.bind(this))
	    // }

	  }, {
	    key: 'readNotification',
	    value: function readNotification(id) {
	      this.props.onReadNotification(id);
	    }
	  }, {
	    key: 'pushNotification',
	    value: function pushNotification(payload) {
	      this.props.onPushNotification(payload.message);
	    }
	  }]);

	  return Notifications;
	}(_react2.default.Component);

	Notifications.contextTypes = {
	  session: _react2.default.PropTypes.object
	};


	var mapStateToProps = function mapStateToProps(state) {
	  return {
	    notifications: state.chrome.notifications
	  };
	};

	var mapDispatchToProps = {
	  onReadNotification: actions.readNotification,
	  onPushNotification: actions.pushNotification
	};

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Notifications);

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Dashboard = function (_React$Component) {
	  _inherits(Dashboard, _React$Component);

	  function Dashboard() {
	    _classCallCheck(this, Dashboard);

	    return _possibleConstructorReturn(this, (Dashboard.__proto__ || Object.getPrototypeOf(Dashboard)).apply(this, arguments));
	  }

	  _createClass(Dashboard, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'p',
	        null,
	        'Dashboard'
	      );
	    }
	  }]);

	  return Dashboard;
	}(_react2.default.Component);

	exports.default = Dashboard;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(6);

	var _contacts = __webpack_require__(25);

	var _contacts2 = _interopRequireDefault(_contacts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var routes = _react2.default.createElement(
	  _reactRouter.Route,
	  { path: 'crm' },
	  _contacts2.default
	);

	exports.default = routes;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(6);

	var _list = __webpack_require__(26);

	var _list2 = _interopRequireDefault(_list);

	var _show = __webpack_require__(27);

	var _show2 = _interopRequireDefault(_show);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var routes = _react2.default.createElement(
	  _reactRouter.Route,
	  { path: 'contacts' },
	  _react2.default.createElement(_reactRouter.IndexRoute, { component: _list2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: ':id', component: _show2.default })
	);

	exports.default = routes;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var List = function (_React$Component) {
	  _inherits(List, _React$Component);

	  function List() {
	    _classCallCheck(this, List);

	    return _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).apply(this, arguments));
	  }

	  _createClass(List, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'p',
	        null,
	        'Conatcts List'
	      );
	    }
	  }]);

	  return List;
	}(_react2.default.Component);

	exports.default = List;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Show = function (_React$Component) {
	  _inherits(Show, _React$Component);

	  function Show() {
	    _classCallCheck(this, Show);

	    return _possibleConstructorReturn(this, (Show.__proto__ || Object.getPrototypeOf(Show)).apply(this, arguments));
	  }

	  _createClass(Show, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'p',
	        null,
	        'Conatcts Show'
	      );
	    }
	  }]);

	  return Show;
	}(_react2.default.Component);

	exports.default = Show;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(6);

	var _apps = __webpack_require__(29);

	var _apps2 = _interopRequireDefault(_apps);

	var _emails = __webpack_require__(31);

	var _emails2 = _interopRequireDefault(_emails);

	var _users = __webpack_require__(33);

	var _users2 = _interopRequireDefault(_users);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createElement(
	  _reactRouter.Route,
	  { path: 'settings' },
	  _apps2.default,
	  _emails2.default,
	  _users2.default
	);

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(6);

	var _list = __webpack_require__(30);

	var _list2 = _interopRequireDefault(_list);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var routes = _react2.default.createElement(
	  _reactRouter.Route,
	  { path: 'apps' },
	  _react2.default.createElement(_reactRouter.IndexRoute, { component: _list2.default })
	);

	exports.default = routes;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var List = function (_React$Component) {
	  _inherits(List, _React$Component);

	  function List() {
	    _classCallCheck(this, List);

	    return _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).apply(this, arguments));
	  }

	  _createClass(List, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'p',
	        null,
	        'App List'
	      );
	    }
	  }]);

	  return List;
	}(_react2.default.Component);

	exports.default = List;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(6);

	var _list = __webpack_require__(32);

	var _list2 = _interopRequireDefault(_list);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var routes = _react2.default.createElement(
	  _reactRouter.Route,
	  { path: 'emails' },
	  _react2.default.createElement(_reactRouter.IndexRoute, { component: _list2.default })
	);

	exports.default = routes;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var List = function (_React$Component) {
	  _inherits(List, _React$Component);

	  function List() {
	    _classCallCheck(this, List);

	    return _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).apply(this, arguments));
	  }

	  _createClass(List, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'p',
	        null,
	        'Email List'
	      );
	    }
	  }]);

	  return List;
	}(_react2.default.Component);

	exports.default = List;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(6);

	var _list = __webpack_require__(34);

	var _list2 = _interopRequireDefault(_list);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var routes = _react2.default.createElement(
	  _reactRouter.Route,
	  { path: 'users' },
	  _react2.default.createElement(_reactRouter.IndexRoute, { component: _list2.default })
	);

	exports.default = routes;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var List = function (_React$Component) {
	  _inherits(List, _React$Component);

	  function List() {
	    _classCallCheck(this, List);

	    return _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).apply(this, arguments));
	  }

	  _createClass(List, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'p',
	        null,
	        'User List'
	      );
	    }
	  }]);

	  return List;
	}(_react2.default.Component);

	exports.default = List;

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(1);

	var _users = __webpack_require__(37);

	var _users2 = _interopRequireDefault(_users);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var routes = (0, _express.Router)();
	routes.get('/users', _users2.default.index);
	routes.get('/users/:id', _users2.default.show);
	routes.post('/users', _users2.default.create);
	routes.put('/users/:id', _users2.default.update);
	routes.delete('/users/:id', _users2.default.destroy);

	exports.default = routes;

/***/ },
/* 37 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var users = {};

	users.index = function (req, res) {
	  res.json({ message: 'users index' });
	};

	users.show = function (req, res) {
	  res.json({ message: 'users show' });
	};

	users.create = function (req, res) {
	  res.json({ message: 'users create' });
	};

	users.update = function (req, res) {
	  res.json({ message: 'users update' });
	};

	users.destroy = function (req, res) {
	  res.json({ message: 'users destroy' });
	};

	exports.default = users;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(1);

	var _contacts = __webpack_require__(39);

	var _contacts2 = _interopRequireDefault(_contacts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var routes = (0, _express.Router)();
	routes.get('/contacts', _contacts2.default.index);
	routes.get('/contacts/:id', _contacts2.default.show);
	routes.post('/contacts', _contacts2.default.create);
	routes.put('/contacts/:id', _contacts2.default.update);
	routes.delete('/contacts/:id', _contacts2.default.destroy);

	exports.default = routes;

/***/ },
/* 39 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var contacts = {};

	contacts.index = function (req, res) {
	  res.json({ message: 'contacts index' });
	};

	contacts.show = function (req, res) {
	  res.json({ message: 'contacts show' });
	};

	contacts.create = function (req, res) {
	  res.json({ message: 'contacts create' });
	};

	contacts.update = function (req, res) {
	  res.json({ message: 'contacts update' });
	};

	contacts.destroy = function (req, res) {
	  res.json({ message: 'contacts destroy' });
	};

	exports.default = contacts;

/***/ }
/******/ ]);