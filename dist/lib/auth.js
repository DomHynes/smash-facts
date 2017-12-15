'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.twitterCallback = twitterCallback;
exports.serializeUser = serializeUser;
exports.deserializeUser = deserializeUser;
exports.isLoggedIn = isLoggedIn;

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _approvedUsers = require('./approvedUsers.json');

var _approvedUsers2 = _interopRequireDefault(_approvedUsers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function twitterCallback(accessToken, refreshToken, profile, cb) {
  _user2.default.findOne({ oauthID: 'twitter_' + profile.id }).exec().then(function (result) {
    if (result) {
      return;
    } else if (_approvedUsers2.default.indexOf(profile.username.toLowerCase()) === -1) {
      console.log('registration denied from unapproved user: ' + profile.username);
      return;
    }
    console.log('registration allowed from approved user: ' + profile.username);
    return new _user2.default({
      oauthID: 'twitter_' + profile.id,
      name: profile.username
    }).save();
  }).then(function (user) {
    cb(null, user);
  }).catch(cb);
}

function serializeUser(user, cb) {
  cb(null, user.id);
}
function deserializeUser(id, cb) {
  _user2.default.findById(id, function () {
    var err = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var user = arguments[1];
    return cb(err, user);
  });
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}
//# sourceMappingURL=auth.js.map