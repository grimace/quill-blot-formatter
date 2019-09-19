'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BlotSpec2 = require('./BlotSpec');

var _BlotSpec3 = _interopRequireDefault(_BlotSpec2);

var _BlotFormatter = require('../BlotFormatter');

var _BlotFormatter2 = _interopRequireDefault(_BlotFormatter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VideoSpec = function (_BlotSpec) {
  _inherits(VideoSpec, _BlotSpec);

  function VideoSpec(formatter) {
    _classCallCheck(this, VideoSpec);

    var _this = _possibleConstructorReturn(this, (VideoSpec.__proto__ || Object.getPrototypeOf(VideoSpec)).call(this, formatter));

    _this.onClick = function (event) {
      var el = event.target;
      if (!(el instanceof HTMLElement) || el.tagName !== 'VIDEO') {
        return;
      }

      _this.video = el;
      _this.formatter.show(_this);
    };

    _this.video = null;
    return _this;
  }

  _createClass(VideoSpec, [{
    key: 'init',
    value: function init() {
      this.formatter.quill.root.addEventListener('click', this.onClick);
    }
  }, {
    key: 'getTargetElement',
    value: function getTargetElement() {
      return this.video;
    }
  }, {
    key: 'onHide',
    value: function onHide() {
      this.video = null;
    }
  }, {
    key: 'getName',
    value: function getName() {
      return this.name;
    }
  }]);

  return VideoSpec;
}(_BlotSpec3.default);

exports.default = VideoSpec;