import { Router } from 'express';
import games from './controllers/games';
import facts from './controllers/facts';
import auth from './controllers/auth';

export default () => {
  const router = Router();

  router.get('/', function (req, res) {
    res.render('index', { title: 'Home' });
  });

  router.use('/login', auth());

  router.use('/games', games());

  router.use('/facts', facts());

  router.use( ( req, res ) => {
    res.redirect('/');
  });

return router;
}
