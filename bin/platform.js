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

	var _platform = __webpack_require__(1);

	var _platform2 = _interopRequireDefault(_platform);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var platform = new _platform2.default();
	var command = process.argv[2];

	if (command == 'migrate:latest') {
	  platform.migrateLatest().then(function () {
	    return process.exit(1);
	  });
	} else if (command == 'migrate:rollback') {
	  platform.migrateRollback().then(function () {
	    return process.exit(1);
	  });
	} else if (command == 'seeds:load') {
	  platform.seedsLoad().then(function () {
	    return process.exit(1);
	  });
	} else if (command == 'fixtures:load') {
	  platform.fixturesLoad().then(function () {
	    return process.exit(1);
	  });
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _lodash = __webpack_require__(2);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _fs = __webpack_require__(3);

	var _fs2 = _interopRequireDefault(_fs);

	var _path = __webpack_require__(4);

	var _path2 = _interopRequireDefault(_path);

	var _knex = __webpack_require__(5);

	var _knex2 = _interopRequireDefault(_knex);

	var _migrate = __webpack_require__(8);

	var _migrate2 = _interopRequireDefault(_migrate);

	var _seed = __webpack_require__(9);

	var _seed2 = _interopRequireDefault(_seed);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Platform = function () {
	  function Platform() {
	    _classCallCheck(this, Platform);

	    this._getMigrations = function (completed, direction) {
	      var timestamps = [];
	      var migrations = {};
	      _fs2.default.readdirSync(_path2.default.join(__dirname, '../platform/db/migrations')).filter(function (migration) {
	        var fullpath = _path2.default.resolve(__dirname, '../platform/db/migrations', migration);
	        var is_completed = _lodash2.default.includes(completed, fullpath);
	        if (direction == 'up' && !is_completed || direction == 'down' && is_completed) {
	          var timestamp = migration.split('_')[0];
	          timestamps.push(timestamp);
	          migrations[timestamp] = fullpath;
	        }
	      });
	      _fs2.default.readdirSync(_path2.default.join(__dirname, '../apps')).filter(function (app) {
	        if (_fs2.default.statSync(_path2.default.join(__dirname, '../apps', app)).isDirectory()) {
	          _fs2.default.readdirSync(_path2.default.join(__dirname, '../apps', app, 'db/migrations')).filter(function (migration) {
	            var fullpath = _path2.default.resolve(__dirname, '../apps', app, 'db/migrations', migration);
	            var is_completed = _lodash2.default.includes(completed, fullpath);
	            if (direction == 'up' && !is_completed || direction == 'down' && is_completed) {
	              var timestamp = migration.split('_')[0];
	              timestamps.push(timestamp);
	              migrations[timestamp] = fullpath;
	            }
	          });
	        }
	      });
	      return timestamps.sort().map(function (timestamp) {
	        return migrations[timestamp];
	      });
	    };

	    this._getSeeds = function (filename) {
	      var seeds = [];
	      seeds.push(_path2.default.resolve(__dirname, '../platform/db', filename + '.js'));
	      _fs2.default.readdirSync(_path2.default.join(__dirname, '../apps')).filter(function (app) {
	        if (_fs2.default.statSync(_path2.default.join(__dirname, '../apps', app)).isDirectory()) {
	          seeds.push(_path2.default.resolve(__dirname, '../apps', app, 'db', filename + '.js'));
	        }
	      });
	      return seeds;
	    };

	    this.migrator = new _migrate2.default(_knex2.default);
	    this.seeder = new _seed2.default(_knex2.default);
	  }

	  _createClass(Platform, [{
	    key: 'migrateLatest',
	    value: function migrateLatest() {
	      var _this = this;

	      return this.migrator._migrationData().spread(function (all, completed) {
	        var migrations = _this._getMigrations(completed, 'up');
	        return _this.migrator._runBatch(migrations, 'up');
	      });
	    }
	  }, {
	    key: 'migrateRollback',
	    value: function migrateRollback() {
	      var _this2 = this;

	      return this.migrator._migrationData().spread(function (all, completed) {
	        var migrations = _this2._getMigrations(completed, 'down');
	        return _this2.migrator._runBatch(migrations.reverse(), 'down');
	      });
	    }
	  }, {
	    key: 'seedsLoad',
	    value: function seedsLoad() {
	      var _this3 = this;

	      return this.seeder._seedData().spread(function (all) {
	        var seeds = _this3._getSeeds('seeds');
	        return _this3.seeder._runSeeds(seeds);
	      });
	    }
	  }, {
	    key: 'fixturesLoad',
	    value: function fixturesLoad() {
	      var _this4 = this;

	      return this.seeder._seedData().spread(function (all) {
	        var fixtures = _this4._getSeeds('fixtures');
	        return _this4.seeder._runSeeds(fixtures);
	      });
	    }
	  }, {
	    key: 'setupTest',
	    value: function setupTest() {
	      var _this5 = this;

	      return this.migrateRollback().then(function () {
	        return _this5.migrateLatest().then(function () {
	          return _this5.fixturesLoad();
	        });
	      });
	    }
	  }]);

	  return Platform;
	}();

	exports.default = Platform;
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("lodash");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _knex = __webpack_require__(6);

	var _knex2 = _interopRequireDefault(_knex);

	var _platform = __webpack_require__(7);

	var _platform2 = _interopRequireDefault(_platform);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var defaults = {
	  pool: {
	    min: 2,
	    max: 10
	  },
	  migrations: {
	    tableName: 'schema_migrations',
	    directory: '/'
	  },
	  seeds: {
	    directory: '/'
	  }
	};

	exports.default = (0, _knex2.default)(_extends({}, defaults, _platform2.default[process.env.NODE_ENV].database));

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("knex");

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	  test: {
	    secret: 'foo',
	    database: {
	      pool: {
	        min: 1,
	        max: 1
	      },
	      migrations: {
	        tableName: 'schema_migrations',
	        directory: '/'
	      },
	      seeds: {
	        directory: '/'
	      },
	      useNullAsDefault: true,
	      client: 'sqlite3',
	      connection: {
	        filename: './db.sqlite3'
	      }
	    }
	  },
	  development: {
	    secret: 'foo',
	    database: {
	      pool: {
	        min: 2,
	        max: 10
	      },
	      migrations: {
	        tableName: 'schema_migrations',
	        directory: '/'
	      },
	      seeds: {
	        directory: '/'
	      },
	      client: 'postgresql',
	      connection: {
	        database: 'platform',
	        user: 'postgres',
	        password: ''
	      }
	    }
	  }
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("knex/lib/migrate");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("knex/lib/seed");

/***/ }
/******/ ]);