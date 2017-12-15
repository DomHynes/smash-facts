import { Router } from 'express';
import games from './controllers/games';
import facts from './controllers/facts';
import auth from './controllers/auth';

export default () => {
  const router = Router();

  router.get('/', function (req, res) {
    res.render('index', { title: 'Home' });
  });

  router.use('/login', auth({ router }));

  router.use('/games', games({ router }));

  router.use('/facts', facts({ router }));

  router.use( ( req, res ) => {
    res.redirect('/');
  });

return router;
}
