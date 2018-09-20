'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var _browserSync = require('browser-sync');

var _browserSync2 = _interopRequireDefault(_browserSync);

var _merge2 = require('lodash/merge');

var _merge3 = _interopRequireDefault(_merge2);

var _gulpNotify = require('gulp-notify');

var _gulpNotify2 = _interopRequireDefault(_gulpNotify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TaskMaker = function () {
	function TaskMaker(gulp) {
		_classCallCheck(this, TaskMaker);

		this.gulp = gulp;
		this.globalBrowserSyncs = {};
	}

	_createClass(TaskMaker, [{
		key: 'createBrowserSync',
		value: function createBrowserSync(name) {
			if (this.globalBrowserSyncs[name]) {
				return this.globalBrowserSyncs[name];
			} else {
				var bs = _browserSync2.default.create(name);
				this.globalBrowserSyncs[name] = bs;
				return bs;
			}
		}
	}, {
		key: 'defineTask',
		value: function defineTask(name) {
			var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			name = this._resolveAliases(name);

			if (!options.taskMaker) {
				options.taskMaker = this;
			}
			if (!options.taskName) {
				options.taskName = name;
			}
			if (!options.taskDeps) {
				options.taskDeps = [];
			}
			if (!options.globalBrowserSyncs) {
				options.globalBrowserSyncs = this.globalBrowserSyncs;
			}
			if (!options.defaultErrorHandler) {
				options.defaultErrorHandler = {
					errorHandler: _gulpNotify2.default.onError('<%= error.message %>')
				};
			}

			try {
				var taskClass = require('./tasks/' + name + '.js');
				new taskClass().setOptions(options).defineTask(this.gulp);

				if (options.watchTask && options.src) {
					var newOptions = (0, _merge3.default)({ tasks: [options.taskName] }, options);
					newOptions.taskName = 'watch-' + options.taskName;
					var watchTask = require('./tasks/watch.js');
					new watchTask().setOptions(newOptions).defineTask(this.gulp);
					_gulpUtil2.default.log('Created watch task: ' + newOptions.taskName);
				}
			} catch (e) {
				_gulpUtil2.default.log(_gulpUtil2.default.colors.red(e));
				throw e;
			}
		}

		/**
   * The author was stupid and made a bad naming decision.
   *
   * @private
   */

	}, {
		key: '_resolveAliases',
		value: function _resolveAliases(name) {
			if (name === 'es6') {
				_gulpUtil2.default.log(_gulpUtil2.default.colors.magenta('Please rename the es6 task to babel'));
				return 'babel';
			}
			return name;
		}
	}]);

	return TaskMaker;
}();

exports.default = TaskMaker;