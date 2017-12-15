'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _games = require('./controllers/games');

var _games2 = _interopRequireDefault(_games);

var _facts = require('./controllers/facts');

var _facts2 = _interopRequireDefault(_facts);

var _auth = require('./controllers/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var router = (0, _express.Router)();

  router.get('/', function (req, res) {
    res.render('index', { title: 'Home' });
  });

  router.use('/login', (0, _auth2.default)({ router: router }));

  router.use('/games', (0, _games2.default)({ router: router }));

  router.use('/facts', (0, _facts2.default)({ router: router }));

  router.use(function (req, res) {
    res.redirect('/');
  });

  return router;
};
//# sourceMappingURL=index.js.map