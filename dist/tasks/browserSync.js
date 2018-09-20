'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

var _isString2 = require('lodash/isString');

var _isString3 = _interopRequireDefault(_isString2);

var _isUndefined2 = require('lodash/isUndefined');

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

var _isBoolean2 = require('lodash/isBoolean');

var _isBoolean3 = _interopRequireDefault(_isBoolean2);

var _merge2 = require('lodash/merge');

var _merge3 = _interopRequireDefault(_merge2);

var _expressHistoryApiFallback = require('express-history-api-fallback');

var _expressHistoryApiFallback2 = _interopRequireDefault(_expressHistoryApiFallback);

var _connectHistoryApiFallback = require('connect-history-api-fallback');

var _connectHistoryApiFallback2 = _interopRequireDefault(_connectHistoryApiFallback);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BrowserSyncTask = function () {
	function BrowserSyncTask() {
		_classCallCheck(this, BrowserSyncTask);
	}

	_createClass(BrowserSyncTask, [{
		key: 'setOptions',
		value: function setOptions(options) {
			this.options = options;

			if ((0, _isUndefined3.default)(this.options.config)) {
				throw new Error('BrowserSyncTask: config is missing from configuration!');
			}

			if (!(0, _isUndefined3.default)(this.options.historyApiFallback) && this.options.historyApiFallback !== false) {
				this.options.config.server = (0, _merge3.default)({}, this.options.config.server);
				this.options.config.server.middleware = (0, _merge3.default)([], this.options.config.server.middleware);

				var historyApiFallbackConfig = void 0;
				var useExpress = false;
				if ((0, _isArray3.default)(this.options.historyApiFallback)) {
					historyApiFallbackConfig = this.options.historyApiFallback;
					useExpress = true;
				} else if ((0, _isString3.default)(this.options.historyApiFallback)) {
					historyApiFallbackConfig = [this.options.historyApiFallback];
					useExpress = true;
				} else if ((0, _isBoolean3.default)(this.options.historyApiFallback)) {
					historyApiFallbackConfig = (0, _merge3.default)({}, this.options.historyApiFallback);
				} else {
					throw new Error('BrowserSyncTask: historyApiFallback must be an absolute file path string or an Express Response.sendFile arguments array');
				}
				if (useExpress) {
					this.options.config.server.middleware.push(_expressHistoryApiFallback2.default.apply(undefined, _toConsumableArray(historyApiFallbackConfig)));
				} else {
					this.options.config.server.middleware.push((0, _connectHistoryApiFallback2.default)(historyApiFallbackConfig));
				}
			}

			return this;
		}
	}, {
		key: 'defineTask',
		value: function defineTask(gulp) {
			var options = this.options;
			gulp.task(options.taskName, options.taskDeps, function () {
				return new Promise(function (resolve) {
					var bs = options.taskMaker.createBrowserSync(options.taskName);
					return bs.init(options.config, resolve);
				});
			});
		}
	}]);

	return BrowserSyncTask;
}();

module.exports = BrowserSyncTask;