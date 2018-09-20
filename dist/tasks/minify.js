'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _gulpSourcemaps = require('gulp-sourcemaps');

var _gulpSourcemaps2 = _interopRequireDefault(_gulpSourcemaps);

var _gulpUglify = require('gulp-uglify');

var _gulpUglify2 = _interopRequireDefault(_gulpUglify);

var _gulpPlumber = require('gulp-plumber');

var _gulpPlumber2 = _interopRequireDefault(_gulpPlumber);

var _gulpChmod = require('gulp-chmod');

var _gulpChmod2 = _interopRequireDefault(_gulpChmod);

var _isUndefined2 = require('lodash/isUndefined');

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

var _merge2 = require('lodash/merge');

var _merge3 = _interopRequireDefault(_merge2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultUglifyOptions = {
	mangle: true
};

var MinifyTask = function () {
	function MinifyTask() {
		_classCallCheck(this, MinifyTask);
	}

	_createClass(MinifyTask, [{
		key: 'setOptions',
		value: function setOptions(options) {
			this.options = options;

			if ((0, _isUndefined3.default)(this.options.src)) {
				throw new Error('MinifyTask: src is missing from configuration!');
			}

			if ((0, _isUndefined3.default)(this.options.dest)) {
				throw new Error('MinifyTask: dest is missing from configuration!');
			}

			this.options.uglifyOptions = (0, _merge3.default)({}, defaultUglifyOptions, this.options.uglifyOptions);

			return this;
		}
	}, {
		key: 'defineTask',
		value: function defineTask(gulp) {
			var options = this.options;
			gulp.task(options.taskName, options.taskDeps, function () {
				var chain = gulp.src(options.src).pipe((0, _gulpPlumber2.default)()).pipe(_gulpSourcemaps2.default.init({ loadMaps: true })).pipe((0, _gulpUglify2.default)(options.uglifyOptions)).pipe(_gulpSourcemaps2.default.write('.'));
				if (!(0, _isUndefined3.default)(options.chmod)) {
					chain = chain.pipe((0, _gulpChmod2.default)(options.chmod));
				}

				chain = chain.pipe(gulp.dest(options.dest));

				return chain;
			});
		}
	}]);

	return MinifyTask;
}();

module.exports = MinifyTask;