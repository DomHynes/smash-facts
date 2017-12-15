'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (callback) {
  //mongoose.Promise = blackbird();

  _mongoose2.default.connect(process.env.MONGO_URL, { useMongoClient: true }).then(function () {
    return callback();
  }).catch(function (e) {
    console.log('unable to connect to database, error: ' + e);
    throw e;
  });
};
//# sourceMappingURL=db.js.map