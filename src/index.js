import http from 'http';
import express from 'express';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import less from 'less-middleware';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import Strategy from 'passport-twitter';
import initializeDb from './db';
import middleware from './middleware';
import api from './api';
import web from './web';
import config from './config/express.json';
import { serializeUser, deserializeUser, twitterCallback } from './lib/auth';
import dotenv from 'dotenv';
dotenv.config();

let app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use( cors( { exposedHeaders: config.corsHeaders } ) );

app.use(bodyParser.json( { limit : config.bodyLimit } ) );

passport.use(new Strategy({
  consumerKey: process.env.TWITTER_KEY,
  consumerSecret: process.env.TWITTER_SECRET,
  callbackURL: process.env.TWITTER_CALLBACK
}, twitterCallback));
passport.serializeUser( serializeUser );
passport.deserializeUser( deserializeUser );
app.use(session({
	secret: 'fox is broken',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(less(__dirname + 'public/style/less',
	{ dest: __dirname + 'public/style/css' }, {},
	{ compress: 'auto'}
));
app.use(express.static(__dirname + '/public'));

app.set('views', path.join(__dirname, 'web/views'));
app.set('view engine', 'pug')

// connect to db
initializeDb( db => {

	// internal middleware
	app.use(middleware({ config, db }));

	// api router
	app.use('/api', api({ config, db }));
	app.use('/', web({ config, db }));

	app.server.listen(process.env.PORT || config.port, () => {
		console.log(`Started on port ${app.server.address().port}`);
	});
});

export default app;
