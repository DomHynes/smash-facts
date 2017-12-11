import { Router } from 'express';

export default ({ config, db }) => {
  let router = Router();

  router.get('/', function (req, res) {
    res.render('index', { title: 'Home' });
  })

  return router;
}
