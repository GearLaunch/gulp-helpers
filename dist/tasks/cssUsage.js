'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _gulpPlumber = require('gulp-plumber');

var _gulpPlumber2 = _interopRequireDefault(_gulpPlumber);

var _gulpCssUsage = require('gulp-css-usage');

var _gulpCssUsage2 = _interopRequireDefault(_gulpCssUsage);

var _isUndefined2 = require('lodash/isUndefined');

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CssUsageTask = function () {
	function CssUsageTask() {
		_classCallCheck(this, CssUsageTask);
	}

	_createClass(CssUsageTask, [{
		key: 'setOptions',
		value: function setOptions(options) {
			this.options = options;

			if ((0, _isUndefined3.default)(this.options.src)) {
				throw new Error('CssUsageTask: src is missing from configuration!');
			}

			if ((0, _isUndefined3.default)(this.options.css)) {
				throw new Error('CssUsageTask: css is missing from configuration!');
			}

			return this;
		}
	}, {
		key: 'defineTask',
		value: function defineTask(gulp) {
			var _options = this.options,
			    taskName = _options.taskName,
			    taskDeps = _options.taskDeps,
			    src = _options.src,
			    css = _options.css,
			    babylon = _options.babylon;

			gulp.task(taskName, taskDeps, function () {
				return gulp.src(src).pipe((0, _gulpPlumber2.default)()).pipe((0, _gulpCssUsage2.default)({ css: css, babylon: babylon }));
			});
		}
	}]);

	return CssUsageTask;
}();

module.exports = CssUsageTask;