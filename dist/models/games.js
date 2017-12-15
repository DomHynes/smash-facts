'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var games = new _mongoose2.default.Schema({
  name: String,
  longName: String,
  characters: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Character' }]
});
exports.default = _mongoose2.default.model('Game', games);
//# sourceMappingURL=games.js.map