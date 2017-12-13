import User from '../models/user';

export function twitterCallback(accessToken, refreshToken, profile, cb) {
  User.findOne({ oauthID: `twitter_${profile.id}` }).exec()
    .then( (result) => {
      if (result) {
        return result
      }
        return new User({
          oauthID: `twitter_${profile.id}`,
          name: profile.username
        }).save()
    }
    )
    .then( user => {
      cb(null, user);
    })
    .catch( cb );
}

export function serializeUser(user, cb){
  cb(null, user.id);
}
export function deserializeUser (id, cb) {
  User.findById(id, (err = null, user) =>  cb(err, user))
}

export function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}