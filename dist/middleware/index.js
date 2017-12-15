'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

exports.default = function () {
  var routes = (0, _express.Router)();

  routes.use(function (req, res, next) {
    if (req.isAuthenticated()) {
      res.locals.user = req.user;
    } else {
      res.locals.user = null;
    }
    next();
  });

  return routes;
};
//# sourceMappingURL=index.js.map