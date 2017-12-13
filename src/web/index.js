import { Router } from 'express';
import passport from 'passport';
import games from './controllers/games';
import facts from './controllers/facts';
import { isLoggedIn } from '../lib/auth.js';

export default ({ config, db }) => {
  const router = Router();

  router.get('/', function (req, res) {
    res.render('index', { title: 'Home' });
  });

  router.get('/test', isLoggedIn, function (req, res) {
    res.render('auth/login', { title: 'test' });
  });

  router.get( '/login/twitter', passport.authenticate('twitter'));

  router.get( '/auth/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: '/' }),
    (req, res) => {res.redirect('/')}
  );

  router.use('/games', games({ router }));

  router.use('/facts', facts({ router }))

  router.use( ( req, res ) => {
    res.redirect('/');
  })

return router;
}
