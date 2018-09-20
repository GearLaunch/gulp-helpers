'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _vinylPaths = require('vinyl-paths');

var _vinylPaths2 = _interopRequireDefault(_vinylPaths);

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

var _isUndefined2 = require('lodash/isUndefined');

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CleanTask = function () {
	function CleanTask() {
		_classCallCheck(this, CleanTask);
	}

	_createClass(CleanTask, [{
		key: 'setOptions',
		value: function setOptions(options) {
			this.options = options;

			if ((0, _isUndefined3.default)(this.options.src)) {
				throw new Error('CleanTask: src is missing from configuration!');
			}

			return this;
		}
	}, {
		key: 'defineTask',
		value: function defineTask(gulp) {
			var options = this.options;
			gulp.task(options.taskName, options.taskDeps, function () {
				if (!(0, _isArray3.default)(options.src)) {
					options.src = [options.src];
				}
				return gulp.src(options.src).pipe((0, _vinylPaths2.default)(_del2.default));
			});
		}
	}]);

	return CleanTask;
}();

module.exports = CleanTask;