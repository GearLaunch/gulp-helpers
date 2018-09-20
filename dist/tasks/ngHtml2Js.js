'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _gulpPlumber = require('gulp-plumber');

var _gulpPlumber2 = _interopRequireDefault(_gulpPlumber);

var _gulpCached = require('gulp-cached');

var _gulpCached2 = _interopRequireDefault(_gulpCached);

var _gulpChanged = require('gulp-changed');

var _gulpChanged2 = _interopRequireDefault(_gulpChanged);

var _gulpBabel = require('gulp-babel');

var _gulpBabel2 = _interopRequireDefault(_gulpBabel);

var _gulpUglify = require('gulp-uglify');

var _gulpUglify2 = _interopRequireDefault(_gulpUglify);

var _gulpHtmlmin = require('gulp-htmlmin');

var _gulpHtmlmin2 = _interopRequireDefault(_gulpHtmlmin);

var _gulpNgHtml2js = require('gulp-ng-html2js');

var _gulpNgHtml2js2 = _interopRequireDefault(_gulpNgHtml2js);

var _gulpInsert = require('gulp-insert');

var _gulpInsert2 = _interopRequireDefault(_gulpInsert);

var _gulpChmod = require('gulp-chmod');

var _gulpChmod2 = _interopRequireDefault(_gulpChmod);

var _isUndefined2 = require('lodash/isUndefined');

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

var _merge2 = require('lodash/merge');

var _merge3 = _interopRequireDefault(_merge2);

var _forEach2 = require('lodash/forEach');

var _forEach3 = _interopRequireDefault(_forEach2);

var _babel = require('./babel');

var _babel2 = _interopRequireDefault(_babel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultUglifyOptions = {
	mangle: true
};

var NgHtml2JsTask = function () {
	function NgHtml2JsTask() {
		_classCallCheck(this, NgHtml2JsTask);
	}

	_createClass(NgHtml2JsTask, [{
		key: 'setOptions',
		value: function setOptions(options) {
			this.options = options;

			if ((0, _isUndefined3.default)(this.options.src)) {
				throw new Error('NgHtml2JsTask: src is missing from configuration!');
			}

			if ((0, _isUndefined3.default)(this.options.dest)) {
				throw new Error('NgHtml2JsTask: dest is missing from configuration!');
			}

			if ((0, _isUndefined3.default)(this.options.prepend)) {
				this.options.prepend = "import angular from 'angular';\n";
			}

			this.options.ngHtml2Js = (0, _merge3.default)({}, { export: 'system' }, this.options.ngHtml2Js);
			this.options.compilerOptions = (0, _merge3.default)({}, _babel2.default.compilerOptions, this.options.compilerOptions);
			this.options.uglifyOptions = (0, _merge3.default)({}, defaultUglifyOptions, this.options.uglifyOptions);

			this.options.minimize = (0, _merge3.default)({
				keepClosingSlash: true
			}, this.options.minimize);

			return this;
		}
	}, {
		key: 'defineTask',
		value: function defineTask(gulp) {
			var _this = this;

			var options = this.options;
			gulp.task(options.taskName, options.taskDeps, function () {
				var chain = void 0;

				if (_this.options.ngHtml2Js && _this.options.ngHtml2Js.extension === '.ts') {
					chain = gulp.src(options.src).pipe((0, _gulpCached2.default)(options.taskName)).pipe((0, _gulpPlumber2.default)()).pipe((0, _gulpHtmlmin2.default)(options.minimize)).pipe((0, _gulpNgHtml2js2.default)(options.ngHtml2Js)).pipe(_gulpInsert2.default.prepend(options.prepend));
				} else {
					chain = gulp.src(options.src).pipe((0, _gulpCached2.default)(options.taskName)).pipe((0, _gulpPlumber2.default)()).pipe((0, _gulpChanged2.default)(options.dest, { extension: '.html' })).pipe((0, _gulpHtmlmin2.default)(options.minimize)).pipe((0, _gulpNgHtml2js2.default)(options.ngHtml2Js)).pipe(_gulpInsert2.default.prepend(options.prepend)).pipe((0, _gulpBabel2.default)(options.compilerOptions));
				}

				if (chain) {
					if (options.uglify) {
						chain = chain.pipe((0, _gulpUglify2.default)(options.uglifyOptions));
					}

					if (!(0, _isUndefined3.default)(options.chmod)) {
						chain = chain.pipe((0, _gulpChmod2.default)(options.chmod));
					}

					chain = chain.pipe(gulp.dest(options.dest));

					(0, _forEach3.default)(options.globalBrowserSyncs, function (bs) {
						chain = chain.pipe(bs.stream());
					});
				}

				return chain;
			});
		}
	}]);

	return NgHtml2JsTask;
}();

module.exports = NgHtml2JsTask;