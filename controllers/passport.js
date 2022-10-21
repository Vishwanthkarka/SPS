const passport = require('passport')
const User = require("../models/user")
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

passport.use(new GoogleStrategy({
    clientID:"912981237832-0f6rk5nqiqc5dmoin070gonfprp60kob.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:4000/google/callback"
},
(request, accessToken, refreshToken, profile, next)=> {
console.log("My PROFILE", profile._json.email);
User.findOne({email:profile._json.email})
.then(
    user=> {
        if(user){
            console.log("User already exit in DB",user)
            next()
        } else{
            User.create({
                name:profile.displayName,
                googleId:profile.id,
                email: profile._json.email,
                isLoginWithGoogle:true,
                isVerifed:true,
            }).then(user => {
                console.log("New User", user)
                next(null,user)
            })
            .catch(err => console.log(err))
        }
       
    }
)
next()
}
))