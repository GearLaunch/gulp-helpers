'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var _gulpPlumber = require('gulp-plumber');

var _gulpPlumber2 = _interopRequireDefault(_gulpPlumber);

var _gulpCached = require('gulp-cached');

var _gulpCached2 = _interopRequireDefault(_gulpCached);

var _gulpChanged = require('gulp-changed');

var _gulpChanged2 = _interopRequireDefault(_gulpChanged);

var _gulpSourcemaps = require('gulp-sourcemaps');

var _gulpSourcemaps2 = _interopRequireDefault(_gulpSourcemaps);

var _gulpCoffee = require('gulp-coffee');

var _gulpCoffee2 = _interopRequireDefault(_gulpCoffee);

var _gulpBabel = require('gulp-babel');

var _gulpBabel2 = _interopRequireDefault(_gulpBabel);

var _gulpUglify = require('gulp-uglify');

var _gulpUglify2 = _interopRequireDefault(_gulpUglify);

var _gulpNgAnnotate = require('gulp-ng-annotate');

var _gulpNgAnnotate2 = _interopRequireDefault(_gulpNgAnnotate);

var _gulpRename = require('gulp-rename');

var _gulpRename2 = _interopRequireDefault(_gulpRename);

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

var defaultCompilerOptions = {
	comments: false,
	compact: false,
	presets: ['es2015']
};

var defaultUglifyOptions = {
	mangle: true
};

var BabelTask = function () {
	function BabelTask() {
		_classCallCheck(this, BabelTask);
	}

	_createClass(BabelTask, [{
		key: 'setOptions',
		value: function setOptions(options) {
			this.options = options;

			if ((0, _isUndefined3.default)(this.options.src)) {
				throw new Error('BabelTask: src is missing from configuration!');
			}

			if ((0, _isUndefined3.default)(this.options.dest)) {
				throw new Error('BabelTask: dest is missing from configuration!');
			}

			if (this.options.notify) {
				this.options.plumberOptions = this.options.defaultErrorHandler;
			}

			// Handle defaults
			this.options.compilerOptions = (0, _merge3.default)({}, defaultCompilerOptions, this.options.compilerOptions);
			this.options.coffeeOptions = (0, _merge3.default)({ bare: true }, this.options.coffeeOptions);
			this.options.ngAnnotateOptions = (0, _merge3.default)({ sourceMap: true }, this.options.ngAnnotateOptions);
			this.options.plumberOptions = (0, _merge3.default)({}, this.options.plumberOptions);
			this.options.uglifyOptions = (0, _merge3.default)({}, defaultUglifyOptions, this.options.uglifyOptions);

			return this;
		}
	}, {
		key: 'defineTask',
		value: function defineTask(gulp) {
			var options = this.options;

			gulp.task(options.taskName, options.taskDeps, function () {
				var chain = gulp.src(options.src);

				chain = chain.pipe((0, _gulpCached2.default)(options.taskName)).pipe((0, _gulpPlumber2.default)(options.plumberOptions)).pipe((0, _gulpChanged2.default)(options.dest, { extension: '.js' })).pipe((0, _gulpRename2.default)(function (path) {
					if (path.extname === '.jsx') {
						path.extname = '.js';
					}
				})).pipe(_gulpSourcemaps2.default.init());

				if (options.coffee) {
					chain = chain.pipe((0, _gulpCoffee2.default)(options.coffeeOptions).on('error', _gulpUtil2.default.log));
				}

				chain = chain.pipe((0, _gulpBabel2.default)(options.compilerOptions));

				if (options.ngAnnotate) {
					chain = chain.pipe((0, _gulpNgAnnotate2.default)(options.ngAnnotateOptions));
				}

				if (options.uglify) {
					chain = chain.pipe((0, _gulpUglify2.default)(options.uglifyOptions));
				}

				if (!(0, _isUndefined3.default)(options.chmod)) {
					chain = chain.pipe((0, _gulpChmod2.default)(options.chmod));
				}

				chain = chain.pipe(_gulpSourcemaps2.default.write('.')).pipe(gulp.dest(options.dest));

				(0, _forEach3.default)(options.globalBrowserSyncs, function (bs) {
					chain = chain.pipe(bs.stream({ match: '**/*.js' }));
				});

				return chain;
			});
		}
	}]);

	return BabelTask;
}();

module.exports = BabelTask;
module.exports.compilerOptions = defaultCompilerOptions;