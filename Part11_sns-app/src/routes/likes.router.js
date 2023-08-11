const express = require('express');
const router = express.Router();
const Post = require('../models/posts.model');
const { checkAuthenticated, checkNotAuthenticated } = require('../middleware/auth');

router.put('/posts/:id/like', checkAuthenticated, function (req, res) {
    Post.findById(req.params.id)
        .then((post) => {
            if(!post) {
                req.flash('error', '포스트를 찾지 못했습니디.');
                res.redirect('back');
            }
            else {
                if(post.likes.find(like => like === req.user._id.toString())) {
                    const updatedLikes = post.likes.filter(like => like!== req.user._id.toString());
                    Post.findByIdAndUpdate(post._id, {
                        likes: updatedLikes
                    }, {new: false})
                    .then((post) => {
                        // new: true -> updated post
                        req.flash('success', '좋아요를 해제했습니다.');
                        res.redirect('back');
                    })
                    .catch((err) => {
                        req.flash('error', '좋아요를 업데이트 하는 과정에서 에러가 발생했습니다.');
                        res.redirect('back');
                    });
                }
                else {
                    Post.findByIdAndUpdate(post._id, {
                        likes: post.likes.concat([req.user._id])
                    })
                    .then((post) => {
                        req.flash('success', '좋아요를 눌렀습니다.');
                        res.redirect('back');
                    })
                    .catch((err) => {
                        req.flash('error', '좋아요를 업데이트 하는 과정에서 에러가 발생했습니다.');
                        res.redirect('back');
                    });
                }
            }
        })
        .catch((err) => {
            req.flash('error', '포스트를 찾는 과정에서 에러가 발생했습니다.');
            res.redirect('back');
        })
});

module.exports = router;