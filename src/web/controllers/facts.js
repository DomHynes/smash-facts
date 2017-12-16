import { Router } from 'express';
import facts from '../../models/facts';
import games from '../../models/games';
import characters from '../../models/characters';
import { isLoggedIn } from "../../lib/auth"

export default () => {
  const router = Router();

  router.get('/new', isLoggedIn, ( req, res ) => {
    Promise.all([
      games.find({}).exec(),
      characters.find({}).exec()
    ])
      .then( values => {
        res.render('facts/new', {title: 'new Fact', games: values[0], chars: values[1] })
      })
  });

  router.post('/new', isLoggedIn, ( req, res ) => {
    res.json({req: req.body })
  });

  return router;
}
