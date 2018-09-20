'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _gulpPlumber = require('gulp-plumber');

var _gulpPlumber2 = _interopRequireDefault(_gulpPlumber);

var _gulpSass = require('gulp-sass');

var _gulpSass2 = _interopRequireDefault(_gulpSass);

var _gulpSourcemaps = require('gulp-sourcemaps');

var _gulpSourcemaps2 = _interopRequireDefault(_gulpSourcemaps);

var _gulpChmod = require('gulp-chmod');

var _gulpChmod2 = _interopRequireDefault(_gulpChmod);

var _isUndefined2 = require('lodash/isUndefined');

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

var _merge2 = require('lodash/merge');

var _merge3 = _interopRequireDefault(_merge2);

var _forEach2 = require('lodash/forEach');

var _forEach3 = _interopRequireDefault(_forEach2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SassTask = function () {
	function SassTask() {
		_classCallCheck(this, SassTask);
	}

	_createClass(SassTask, [{
		key: 'setOptions',
		value: function setOptions(options) {
			this.options = options;

			if ((0, _isUndefined3.default)(this.options.src)) {
				throw new Error('SassTask: src is missing from configuration!');
			}

			if ((0, _isUndefined3.default)(this.options.dest)) {
				throw new Error('SassTask: dest is missing from configuration!');
			}

			if (this.options.notify) {
				this.options.plumberOptions = this.options.defaultErrorHandler;
			}

			this.options.plumberOptions = (0, _merge3.default)({}, this.options.plumberOptions);

			return this;
		}
	}, {
		key: 'defineTask',
		value: function defineTask(gulp) {
			var options = this.options;
			gulp.task(options.taskName, options.taskDeps, function () {
				var chain = gulp.src(options.src).pipe((0, _gulpPlumber2.default)(options.plumberOptions)).pipe(_gulpSourcemaps2.default.init()).pipe((0, _gulpSass2.default)(options.config)).pipe(_gulpSourcemaps2.default.write('.'));
				if (!(0, _isUndefined3.default)(options.chmod)) {
					chain = chain.pipe((0, _gulpChmod2.default)(options.chmod));
				}
				chain = chain.pipe(gulp.dest(options.dest));

				(0, _forEach3.default)(options.globalBrowserSyncs, function (bs) {
					chain = chain.pipe(bs.stream({ match: '**/*.css' }));
				});

				return chain;
			});
		}
	}]);

	return SassTask;
}();

module.exports = SassTask;