'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _gulpEslint = require('gulp-eslint');

var _gulpEslint2 = _interopRequireDefault(_gulpEslint);

var _isUndefined2 = require('lodash/isUndefined');

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EslintTask = function () {
	function EslintTask() {
		_classCallCheck(this, EslintTask);
	}

	_createClass(EslintTask, [{
		key: 'setOptions',
		value: function setOptions(options) {
			this.options = options;

			if (this.options.failOnError && this.options.failAfterError) {
				throw new Error('EslintTask: Please choose either failOnError or failAfterError option!');
			}

			if ((0, _isUndefined3.default)(this.options.src)) {
				throw new Error('EslintTask: src is missing from configuration!');
			}

			return this;
		}
	}, {
		key: 'defineTask',
		value: function defineTask(gulp) {
			var options = this.options;
			gulp.task(options.taskName, options.taskDeps, function () {

				var chain = gulp.src(options.src).pipe((0, _gulpEslint2.default)());

				if (options.quiet) {
					chain = chain.pipe(_gulpEslint2.default.format(function (reports) {
						reports.forEach(function (report) {
							report.messages = report.messages.filter(function (message) {
								return message.fatal || message.severity > 1;
							});
						});
						return '( *** Eslint runs in quite mode *** )';
					}));
				}

				chain = chain.pipe(_gulpEslint2.default.format());

				if (options.failOnError) {
					chain = chain.pipe(_gulpEslint2.default.failOnError());
				} else if (options.failAfterError) {
					chain = chain.pipe(_gulpEslint2.default.failAfterError());
				}

				return chain;
			});
		}
	}]);

	return EslintTask;
}();

module.exports = EslintTask;