'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _UnclickableBlotSpec2 = require('./UnclickableBlotSpec');

var _UnclickableBlotSpec3 = _interopRequireDefault(_UnclickableBlotSpec2);

var _BlotFormatter = require('../BlotFormatter');

var _BlotFormatter2 = _interopRequireDefault(_BlotFormatter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VideoSpec = function (_UnclickableBlotSpec) {
  _inherits(VideoSpec, _UnclickableBlotSpec);

  function VideoSpec(formatter) {
    _classCallCheck(this, VideoSpec);

    var _this = _possibleConstructorReturn(this, (VideoSpec.__proto__ || Object.getPrototypeOf(VideoSpec)).call(this, formatter, 'nothing.ql-video'));

    console.log('VideoSpec constructor...');
    return _this;
  }

  _createClass(VideoSpec, [{
    key: 'getName',
    value: function getName() {
      return this.name;
    }
  }]);

  return VideoSpec;
}(_UnclickableBlotSpec3.default);

exports.default = VideoSpec;