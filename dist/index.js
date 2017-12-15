'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _lessMiddleware = require('less-middleware');

var _lessMiddleware2 = _interopRequireDefault(_lessMiddleware);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportTwitter = require('passport-twitter');

var _passportTwitter2 = _interopRequireDefault(_passportTwitter);

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _web = require('./web');

var _web2 = _interopRequireDefault(_web);

var _express3 = require('./config/express.json');

var _express4 = _interopRequireDefault(_express3);

var _auth = require('./lib/auth');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var app = (0, _express2.default)();
app.server = _http2.default.createServer(app);

// logger
app.use((0, _morgan2.default)('dev'));

// 3rd party middleware
app.use((0, _cors2.default)({ exposedHeaders: _express4.default.corsHeaders }));

app.use(_bodyParser2.default.json({ limit: _express4.default.bodyLimit }));
app.use(_bodyParser2.default.urlencoded({ extended: true }));

_passport2.default.use(new _passportTwitter2.default({
	consumerKey: process.env.TWITTER_KEY,
	consumerSecret: process.env.TWITTER_SECRET,
	callbackURL: process.env.NODE_ENV === 'development' ? 'http://localhost:8080' + process.env.TWITTER_CALLBACK : 'http://smashfacts.domhyn.es' + process.env.TWITTER_CALLBACK
}, _auth.twitterCallback));

_passport2.default.serializeUser(_auth.serializeUser);
_passport2.default.deserializeUser(_auth.deserializeUser);
app.use((0, _expressSession2.default)({
	secret: 'fox is broken',
	resave: true,
	saveUninitialized: true
}));
app.use(_passport2.default.initialize());
app.use(_passport2.default.session());

app.use((0, _lessMiddleware2.default)(__dirname + 'public/style/less', { dest: __dirname + 'public/style/css' }, {}, { compress: 'auto' }));
app.use(_express2.default.static(__dirname + '/public'));

app.set('views', _path2.default.join(__dirname, 'web/views'));
app.set('view engine', 'pug');

// connect to db
(0, _db2.default)(function (db) {

	// internal middleware
	app.use((0, _middleware2.default)({ config: _express4.default, db: db }));

	// api router
	app.use('/api', (0, _api2.default)({ config: _express4.default, db: db }));
	app.use('/', (0, _web2.default)({ config: _express4.default, db: db }));

	app.server.listen(process.env.PORT || _express4.default.port, function () {
		console.log('Started on port ' + app.server.address().port);
	});
});

exports.default = app;
//# sourceMappingURL=index.js.map