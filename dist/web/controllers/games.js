'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _games = require('../../models/games');

var _games2 = _interopRequireDefault(_games);

var _facts = require('../../models/facts');

var _facts2 = _interopRequireDefault(_facts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var router = (0, _express.Router)();

  router.get('/', function (req, res) {
    _games2.default.find({}, function (err, result) {
      res.render('games/index', { title: 'Games', games: result });
    });
  });

  router.get('/:name', function (req, res) {
    var payload = {};
    _games2.default.findOne({ name: req.params.name }).populate('characters').exec().then(function (game) {
      payload.game = game;
      return _facts2.default.find({ games: game._id }).populate('characters').populate('games').populate('submitted_by').exec();
    }).then(function (facts) {
      payload.facts = facts;
      payload.facts.forEach(function (fact) {
        fact.characterNameList = fact.characters.map(function (char) {
          return char.name;
        }).join(', ');
      });
      res.render('games/view', {
        title: payload.game.longName,
        game: payload.game,
        facts: payload.facts
      });
    }).catch(function (e) {
      console.log(e);res.redirect('/');
    });
  });

  return router;
};
//# sourceMappingURL=games.js.map