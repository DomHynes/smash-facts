import { Router } from 'express';

import * as auth from './controllers/auth';

export default ({ config, db }) => {
  const router = Router();

  router.get('/', function (req, res) {
    res.render('index', { title: 'Home' });
  });

  router.get( '/login', auth.login );


return router;
}
