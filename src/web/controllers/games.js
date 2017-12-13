import { Router } from 'express';
import games from '../../models/games';

export default ({ config, db }) => {
  const router = Router();

  router.get('/', (req, res) => {
    games.find({}, ( err, result) => {
      res.render('games/index', { title: 'Games', games: result});
    })
  });

  router.get('/:name', (req, res) => {
    games.findOne({name: req.params.name}).exec()
      .then( game => {
        res.render('games/view', { title: game.longName, game, })
      })
      .catch( e => res.redirect('/'));
  })

  return router;
}
