'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _isUndefined2 = require('lodash/isUndefined');

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

var _Situation = require('./Situation');

var _Situation2 = _interopRequireDefault(_Situation);

var _TaskMaker = require('./TaskMaker');

var _TaskMaker2 = _interopRequireDefault(_TaskMaker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GulpHelpers = function () {
	function GulpHelpers() {
		_classCallCheck(this, GulpHelpers);
	}

	_createClass(GulpHelpers, [{
		key: 'taskMaker',
		value: function taskMaker(gulp) {
			if (!this.tm) {
				this.tm = new _TaskMaker2.default(gulp);
			}
			return this.tm;
		}
	}, {
		key: 'situation',
		value: function situation() {
			if ((0, _isUndefined3.default)(this.sit)) {
				this.sit = new _Situation2.default();
			}
			return this.sit;
		}
	}, {
		key: 'framework',
		value: function framework(name) {
			if ((0, _isUndefined3.default)(this.frameworks)) {
				this.frameworks = {};
			}

			if ((0, _isUndefined3.default)(this.frameworks[name])) {
				if (name === 'lodash' || name === '_') {
					this.frameworks[name] = require('lodash');
				} else if (name === 'run-sequence') {
					this.frameworks[name] = require('run-sequence');
				}
			}
			return this.frameworks[name];
		}
	}]);

	return GulpHelpers;
}();

exports.default = new GulpHelpers();