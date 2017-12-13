import passport from 'passport';

export function login (req, res) {
  return passport.authenticate('twitter');
}
