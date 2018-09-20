'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var _isUndefined2 = require('lodash/isUndefined');

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WatchTask = function () {
	function WatchTask() {
		_classCallCheck(this, WatchTask);
	}

	_createClass(WatchTask, [{
		key: 'setOptions',
		value: function setOptions(options) {
			this.options = options;

			if ((0, _isUndefined3.default)(this.options.src)) {
				throw new Error('WatchTask: src is missing from configuration!');
			}

			if ((0, _isUndefined3.default)(this.options.tasks)) {
				throw new Error('WatchTask: Tasks is missing from configuration!');
			}

			return this;
		}
	}, {
		key: 'defineTask',
		value: function defineTask(gulp) {
			var options = this.options;
			var that = this;
			gulp.task(options.taskName, options.taskDeps, function () {
				that.watch(gulp);
			});
		}
	}, {
		key: 'watch',
		value: function watch(gulp) {
			var options = this.options;
			var watcher = gulp.watch(options.src, options.tasks);
			watcher.on('change', function (event) {
				_gulpUtil2.default.log(_gulpUtil2.default.colors.magenta('File ' + event.path + ' was ' + event.type + ', running tasks: ' + options.tasks));

				// https://github.com/gulpjs/gulp/blob/master/docs/recipes/handling-the-delete-event-on-watch.md
				if (event.type === 'deleted' && !(0, _isUndefined3.default)(options.dest)) {
					var filePathFromSrc = _path2.default.relative(_path2.default.resolve(options.src), event.path);
					var destFilePath = _path2.default.resolve(options.dest, filePathFromSrc);
					_del2.default.sync(destFilePath);
				}
			});
		}
	}]);

	return WatchTask;
}();

module.exports = WatchTask;