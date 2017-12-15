'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = new _mongoose2.default.Schema({
  oauthID: String,
  name: String
}, { timestamps: true });

exports.default = _mongoose2.default.model('User', User);
//# sourceMappingURL=user.js.map