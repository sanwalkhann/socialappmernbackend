var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: "207027428382-887pv5bglp9aeqd57ptp4kgrf97be52r.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3500/auth/google/callback",
    passReqToCallback   : true
  },
  function(accessToken, refreshToken, profile, cb, err) {
    return cb(err, user);
  }
));


passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, user);
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });
