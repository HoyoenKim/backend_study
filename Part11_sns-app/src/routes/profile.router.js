const express = require('express');
const router = express.Router({
    mergeParams: true
});
const { checkAuthenticated, checkNotAuthenticated, checkIsMe } = require('../middleware/auth');
const Post = require('../models/posts.model');
const User = require('../models/users.model');

router.get('/', checkAuthenticated, (req, res) => {
    Post.find({ "author.id": req.params.id })
        .populate('comments')
        .sort({ createdAt: -1 })
        .exec()
        .then((posts) => {
            User.findById(req.params.id)
            .then((user) => {
                if(!user) {
                    req.flash('error', '유저를 찾지 못했습니다.');
                    res.redirect('back');
                }
                else {
                    res.render('profile', { 
                        posts, posts ,
                        user: user,
                    });
                }
            })
            .catch((err) => {
                req.flash('error', '유저를 찾지 못했습니다.');
                res.redirect('back');
            });
        })
        .catch((err) => {
            req.flash('error', '게시물을 가져오는데 실패했습니다.');
            res.redirect('back');
        });
})

router.get('/edit', checkIsMe, (req, res) => {
    res.render('profile/edit', {
        user: req.user
    });
});

router.put('/', checkIsMe, (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
    .then((user) => {
        if(!user) {
            req.flash('error', '유저를 찾지 못했습니다.');
            res.redirect('/profile/' + req.params.id);
        }
        else {
            req.flash('success', '유저 정보를 수정했습니다.');
            res.redirect('/profile/' + req.params.id);
        }
    })
    .catch((err) => {
        req.flash('error', '유저를 수정하는데 에러가 발생했습니다.');
        res.redirect('/profile/' + req.params.id);
    });
});

module.exports = router;