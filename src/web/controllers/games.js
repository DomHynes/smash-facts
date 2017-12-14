import { Router } from 'express';
import games from '../../models/games';
import facts from '../../models/facts';

export default ({ config, db }) => {
  const router = Router();

  router.get('/', (req, res) => {
    games.find({}, ( err, result) => {
      res.render('games/index', { title: 'Games', games: result});
    })
  });

  router.get('/:name', (req, res) => {
    let payload = {};
    games.findOne({name: req.params.name}).populate('characters').exec()
      .then( game => {
        payload.game = game;
        return facts.find({games: game._id })
        .populate('characters')
        .populate('games')
        .populate('submitted_by').exec()
      })
      .then( facts => {
        payload.facts = facts;
        payload.facts.forEach( fact => {
          fact.characterNameList = fact.characters.map(char => char.name).join(', ');
        });
        res.render('games/view', {
          title: payload.game.longName,
          game: payload.game,
          facts: payload.facts
        });
      })
      .catch( e => { console.log(e); res.redirect('/');});
  })

  return router;
}
