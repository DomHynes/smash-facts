import User from '../models/user';
import approvedUsers from './approvedUsers.json';

export function twitterCallback(accessToken, refreshToken, profile, cb) {
  User.findOne({ oauthID: `twitter_${profile.id}` }).exec()
    .then( (result) => {
      if (result) { return result }
      else if ( approvedUsers.indexOf(profile.username.toLowerCase()) === -1 ) {
        console.log('registration denied from unapproved user: ' + profile.username )
         return ( new Error('user not authorized'), false )
      }
      console.log('registration allowed from approved user: ' + profile.username );
       return new User({
        oauthID: `twitter_${profile.id}`,
        name: profile.username
      }).save()
    })
    .then( user => {
       return cb(null, user);
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