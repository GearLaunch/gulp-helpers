'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _gulpPlumber = require('gulp-plumber');

var _gulpPlumber2 = _interopRequireDefault(_gulpPlumber);

var _gulpCached = require('gulp-cached');

var _gulpCached2 = _interopRequireDefault(_gulpCached);

var _gulpChanged = require('gulp-changed');

var _gulpChanged2 = _interopRequireDefault(_gulpChanged);

var _gulpRename = require('gulp-rename');

var _gulpRename2 = _interopRequireDefault(_gulpRename);

var _gulpReplaceTask = require('gulp-replace-task');

var _gulpReplaceTask2 = _interopRequireDefault(_gulpReplaceTask);

var _gulpChmod = require('gulp-chmod');

var _gulpChmod2 = _interopRequireDefault(_gulpChmod);

var _isUndefined2 = require('lodash/isUndefined');

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

var _forEach2 = require('lodash/forEach');

var _forEach3 = _interopRequireDefault(_forEach2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CopyTask = function () {
	function CopyTask() {
		_classCallCheck(this, CopyTask);
	}

	_createClass(CopyTask, [{
		key: 'setOptions',
		value: function setOptions(options) {
			this.options = options;

			if ((0, _isUndefined3.default)(this.options.src)) {
				throw new Error('CopyTask: src is missing from configuration!');
			}

			if ((0, _isUndefined3.default)(this.options.dest)) {
				throw new Error('CopyTask: dest is missing from configuration!');
			}

			return this;
		}
	}, {
		key: 'defineTask',
		value: function defineTask(gulp) {
			var options = this.options;
			gulp.task(options.taskName, options.taskDeps, function () {
				var chain = gulp.src(options.src).pipe((0, _gulpCached2.default)(options.taskName)).pipe((0, _gulpPlumber2.default)());

				if (options.changed) {
					chain = chain.pipe((0, _gulpChanged2.default)(options.dest, options.changed));
				}

				if (options.replace) {
					chain = chain.pipe((0, _gulpReplaceTask2.default)(options.replace));
				}

				if (options.rename) {
					chain = chain.pipe((0, _gulpRename2.default)(options.rename));
				}

				if (!(0, _isUndefined3.default)(options.chmod)) {
					chain = chain.pipe((0, _gulpChmod2.default)(options.chmod));
				}

				chain = chain.pipe(gulp.dest(options.dest));

				(0, _forEach3.default)(options.globalBrowserSyncs, function (bs) {
					chain = chain.pipe(bs.stream());
				});

				return chain;
			});
		}
	}]);

	return CopyTask;
}();

module.exports = CopyTask;