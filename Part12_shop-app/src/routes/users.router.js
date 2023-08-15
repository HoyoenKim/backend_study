const express = require('express');
const passport = require('passport');
const usersRouter = express.Router();
const User = require('../models/users.model');
const sendMail = require('../mail/mail');

usersRouter.post('/login', (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.json({ msg: info });
        req.logIn(user, function (err) {
            if (err) return next(err);
            res.redirect('/products');
        })
    })(req, res, next)
})

usersRouter.post('/signup', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        sendMail('cabinkhy2@gmail.com', 'HoyeonKim', "welcome");
        res.redirect('/login');
    }
    catch(err) {
        console.log(err);
    }
});

usersRouter.post('/logout', (req, res, next) => {
    req.logOut((err) => {
        if(err) return next(err);
        res.redirect('/login');
    });
});

usersRouter.get('/google', passport.authenticate('google'));

usersRouter.get('/google/callback', passport.authenticate('google', {
    successReturnToOrRedirect: '/products',
    failureRedirect: '/login',
}));

usersRouter.get('/kakao', passport.authenticate('kakao'));

usersRouter.get('/kakao/callback', passport.authenticate('kakao', {
    successReturnToOrRedirect: '/products',
    failureRedirect: '/login',
}));

module.exports = usersRouter;