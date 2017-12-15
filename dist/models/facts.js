'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var facts = new _mongoose2.default.Schema({
  fact: String,
  characters: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Character' }],
  games: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Game' }],
  submitted_by: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

facts.index({ 'games.id': 1 });

exports.default = _mongoose2.default.model('Fact', facts);
//# sourceMappingURL=facts.js.map