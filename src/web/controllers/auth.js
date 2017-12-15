import { Router } from 'express';
import passport from 'passport';

export default () => {
  const router = Router();

  router.get('/twitter', passport.authenticate('twitter'));

  router.get('/twitter/callback',
    passport.authenticate(
      'twitter', { failureRedirect: '/' }),
      (req, res) => res.redirect('/')
    )

  return router;
}

