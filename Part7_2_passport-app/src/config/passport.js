const passport = require('passport');
const User = require('../models/users.model');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const kakaoStrategy = require('passport-kakao').Strategy;

const localStrategyConfig = new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' }, 
    (email, password, done) => {
        User.findOne({ email: email.toLocaleLowerCase()})
            .then((user) => {
                if (!user) return done(null, false, { msg: `Incorrect email. ${email}` });
                user.comparePassword(password, (err, isMatch) => { 
                    if(err) return done(err); 
                    if(isMatch) return done(null, user); 
                    return done(null, false, { msg: `Incorrect password or email.` });
                });
            })
            .catch((err) => {
              return done(err);
            });
    }
)

passport.use("local", localStrategyConfig);

// req.login(user)
passport.serializeUser((user, done) => {
    done(null, user.id);
})

// client => session => request 
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
})

const googleClientID = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_SECRET;

const googleStrategyConfig = new GoogleStrategy({
    clientID: googleClientID,
    clientSecret: googleClientSecret,
    callbackURL: '/auth/google/callback',
    scope: ['email', 'profile']
}, (accessToken, refreshToken, profile, done) => {
    //console.log(profile);
    User.findOne({ googleId: profile.id })
        .then((user) => {
            if(user) {
                return done(null, user);
            }
            const newUser = new User();
            newUser.email = profile.emails[0].value;
            newUser.googleId = profile.id;
            newUser.save()
                .then((user) => {
                    return done(null, user);
                })
                .catch((err) => {
                    console.log(err);
                    return done(err);
                });
        })
        .catch((err) => {
            return done(err);
        });
});

const kakaoClientID = process.env.KAKAO_REST_APP_KEY;

const kakaoStrategyConfig = new kakaoStrategy({
    clientID: kakaoClientID,
    callbackURL: '/auth/kakao/callback',
}, (accessToken, refreshToken, profile, done) => {
    //console.log(profile);
    User.findOne({ kakaoId: profile.id })
        .then((user) => {
            if(user) {
                return done(null, user);
            }
            const newUser = new User();
            newUser.email = profile._json.kakao_account.email;
            newUser.kakaoId = profile.id;
            newUser.save()
                .then((user) => {
                    return done(null, user);
                })
                .catch((err) => {
                    console.log(err);
                    return done(err);
                });
        })
        .catch((err) => {
            return done(err);
        });

});

passport.use('google', googleStrategyConfig);
passport.use('kakao', kakaoStrategyConfig);