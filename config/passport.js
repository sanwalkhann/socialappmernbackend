const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../Model/users");
const { secret } = require("../utils");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
        console.log("Decoded JWT payload:", jwt_payload);
    try {
      const user = await User.findById(jwt_payload.id);

      if (user) {
        return done(null, user);
      } else {
        return done(null, false, { message: "User not found" });
      }
    } catch (err) {
      console.error(err);
      return done(err, false, { message: "Error while authenticating user" });
    }
  })
);


var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: "207027428382-887pv5bglp9aeqd57ptp4kgrf97be52r.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3500/auth/google/callback",
    passReqToCallback   : true
  },
  async (request, accessToken, refreshToken, profile, done) => {
    // try {
    //   const existingUser = await User.findOne({ email: profile.emails[0].value });
    //   console.log("Google Auth Callback - Profile:", profile);
    //   if (existingUser) {
    //     console.log("Existing user:", existingUser);
        
    //     return done(null, existingUser);
    //   } else {
        // const newUser = new User({
        //   name: profile.name,
        //   email: profile.emails[0].value,
        // });
  
    //     await newUser.save();

            const newUser = {
          name: profile.name,
          email: profile.emails[0].value,
        };
        console.log(newUser);
    //     console.log("New user created:", newUser);
        return done(null, newUser);
    //   }
    // } catch (error) {
    //   console.error("Error during Google authentication:", error);
    //   return done(error, false);
    // }
  }));



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


module.exports = passport;
