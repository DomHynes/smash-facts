'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _resourceRouterMiddleware = require('resource-router-middleware');

var _resourceRouterMiddleware2 = _interopRequireDefault(_resourceRouterMiddleware);

var _facts = require('../models/facts');

var _facts2 = _interopRequireDefault(_facts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
	return (0, _resourceRouterMiddleware2.default)({

		/** Property name to store preloaded entity on `request`. */
		id: 'fact',

		/** For requests with an `id`, you can auto-load the entity.
   *  Errors terminate the request, success sets `req[id] = data`.
   */
		index: function index(req, res) {
			_facts2.default.find({}, { _id: 0 }).populate('submitted_by', { name: 1, _id: 0 }).populate('games', { _id: 0, characters: 0 }).populate('characters', { _id: 0 }).exec().then(function (facts) {
				res.json({ facts: facts });
			});
		}
	});
};
//# sourceMappingURL=facts.js.map