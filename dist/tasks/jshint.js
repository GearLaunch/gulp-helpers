'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _gulpJshint = require('gulp-jshint');

var _gulpJshint2 = _interopRequireDefault(_gulpJshint);

var _jshintStylish = require('jshint-stylish');

var _jshintStylish2 = _interopRequireDefault(_jshintStylish);

var _isUndefined2 = require('lodash/isUndefined');

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JshintTask = function () {
	function JshintTask() {
		_classCallCheck(this, JshintTask);
	}

	_createClass(JshintTask, [{
		key: 'setOptions',
		value: function setOptions(options) {
			this.options = options;

			if ((0, _isUndefined3.default)(this.options.src)) {
				throw new Error('JshintTask: src is missing from configuration!');
			}

			return this;
		}
	}, {
		key: 'defineTask',
		value: function defineTask(gulp) {
			var options = this.options;
			gulp.task(options.taskName, options.taskDeps, function () {
				return gulp.src(options.src).pipe((0, _gulpJshint2.default)(options.jsHintOptions)).pipe(_gulpJshint2.default.reporter(_jshintStylish2.default));
			});
		}
	}]);

	return JshintTask;
}();

module.exports = JshintTask;