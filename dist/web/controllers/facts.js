'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _facts = require('../../models/facts');

var _facts2 = _interopRequireDefault(_facts);

var _games = require('../../models/games');

var _games2 = _interopRequireDefault(_games);

var _characters = require('../../models/characters');

var _characters2 = _interopRequireDefault(_characters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var router = (0, _express.Router)();

  router.get('/', function (req, res) {
    _facts2.default.find({}, function (err, result) {
      res.render('games/index', { title: 'Facts', games: result });
    });
  });

  router.get('/new', function (req, res) {
    Promise.all([_games2.default.find({}).exec(), _characters2.default.find({}).exec()]).then(function (values) {
      res.render('facts/new', { title: 'new Fact', games: values[0], chars: values[1] });
    });
  });

  router.post('/new', function (req, res) {
    res.json({ req: req.body });
  });

  return router;
};
//# sourceMappingURL=facts.js.map