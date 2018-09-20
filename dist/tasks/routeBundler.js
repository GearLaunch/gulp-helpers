'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _systemjsRouteBundler = require('systemjs-route-bundler');

var _systemjsRouteBundler2 = _interopRequireDefault(_systemjsRouteBundler);

var _isUndefined2 = require('lodash/isUndefined');

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RouteBundlerTask = function () {
	function RouteBundlerTask() {
		_classCallCheck(this, RouteBundlerTask);
	}

	_createClass(RouteBundlerTask, [{
		key: 'setOptions',
		value: function setOptions(options) {
			this.options = options;

			if ((0, _isUndefined3.default)(this.options.config)) {
				throw new Error('RouteBundlerTask: Config is missing from configuration!');
			}

			return this;
		}
	}, {
		key: 'defineTask',
		value: function defineTask(gulp) {
			var options = this.options;
			gulp.task(options.taskName, options.taskDeps, function () {
				return _systemjsRouteBundler2.default.build(options.config);
			});
		}
	}]);

	return RouteBundlerTask;
}();

module.exports = RouteBundlerTask;