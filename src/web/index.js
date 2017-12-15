import { Router } from 'express';
import games from './controllers/games';
import facts from './controllers/facts';
import auth from './controllers/auth';
import { isLoggedIn } from '../lib/auth.js';

export default ({ config, db }) => {
  const router = Router();

  router.get('/', function (req, res) {
    res.render('index', { title: 'Home' });
  });

  router.get('/test', isLoggedIn, function (req, res) {
    res.render('auth/login', { title: 'test' });
  });

  router.use('/login', auth({ router }));

  router.use('/games', games({ router }));

  router.use('/facts', facts({ router }));

  router.use( ( req, res ) => {
    res.redirect('/');
  })

return router;
}
