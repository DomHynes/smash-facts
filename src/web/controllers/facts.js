import { Router } from 'express';
import Fact from '../../models/facts';
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

    Promise.all([
      Promise.all(
        ([].concat(req.body.characters)).map( name => characters.find({ name }).exec() )
      ),
      Promise.all(
        ([].concat(req.body.games)).map( name => games.find({ name }).exec() )
      )
    ])
      .then( data => new Fact({
          fact: req.body.fact,
          characters: data[0].map( char => char[0].id ),
          games: data[1].map( game => game[0].id ),
          submitted_by: req.user._id
        }).save() )
      .then( fact => {
        res.json({ fact })
      })
      .catch( e => {
        res.json({ e })
      });

  });

  return router;
}
