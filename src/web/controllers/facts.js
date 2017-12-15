import { Router } from 'express';
import facts from '../../models/facts';
import games from '../../models/games';
import characters from '../../models/characters';

export default () => {
  const router = Router();

  router.get('/', ( req, res ) => {
    facts.find({}, ( err, result) => {
      res.render('games/index', { title: 'Facts', games: result});
    })
  });

  router.get('/new', ( req,res ) => {
    Promise.all([
      games.find({}).exec(),
      characters.find({}).exec()
    ])
      .then( values => {
        res.render('facts/new', {title: 'new Fact', games: values[0], chars: values[1] })
      })
  });

  router.post('/new', ( req, res ) => {
    res.json({req: req.body })
  });

  return router;
}
