import User from '../models/user';

export function twitterCallback(accessToken, refreshToken, profile, cb) {
  User.findOne({ oauthID: profile.id }).exec()
    .then( (result) =>  {
      result && cb(new Error('user already exists'));
      new User({
        oauthID: profile.id,
        name: profile.displayName
      }).save()
    })
    .then( user => {
      console.log(user);
      cb(null, user);
    })
    .catch( cb );
}

export function serializeUser(user, cb){
  cb(null, user.id);
}
export function deserializeUser (id, cb) {
  User.findById(id, function(err,user) {
    if(err) {return cb, err}
    return cb(null, user);
  })
}