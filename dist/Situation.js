'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Situation = function () {
	function Situation() {
		_classCallCheck(this, Situation);

		this.sit = process.env.SITUATION || 'development';
		_gulpUtil2.default.log(_gulpUtil2.default.colors.blue('Running as: ' + this.sit));
	}

	_createClass(Situation, [{
		key: 'isProduction',
		value: function isProduction() {
			return this.sit === 'production';
		}
	}, {
		key: 'isDevelopment',
		value: function isDevelopment() {
			return this.sit === 'development';
		}
	}, {
		key: 'isSandbox',
		value: function isSandbox() {
			return this.sit === 'sandbox';
		}
	}, {
		key: 'isDemo',
		value: function isDemo() {
			return this.sit === 'demo';
		}
	}, {
		key: 'value',
		value: function value() {
			return this.sit;
		}
	}]);

	return Situation;
}();

exports.default = Situation;