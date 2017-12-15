'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var router = (0, _express.Router)();

  router.get('/twitter', _passport2.default.authenticate('twitter'));

  router.get('/twitter/callback', _passport2.default.authenticate('twitter', { failureRedirect: '/' }), function (req, res) {
    return res.redirect('/');
  });

  return router;
};
//# sourceMappingURL=auth.js.map