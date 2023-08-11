const { request } = require("express");
const Post = require("../models/posts.model");
const Comment = require("../models/comments.model");
const User = require("../models/users.model");

function checkAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
    if(!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/posts');
}

function checkPostOwnership (req, res, next) {
    if(req.isAuthenticated) {
        Post.findById(req.params.id)
        .then((post) => {
            if(!post) {
                req.flash('error', '포스트가 없습니다.');
                req.redirect('back');
            }  
            else {
                if(post.author.id.equals(req.user._id)) {
                    req.post = post;
                    return next();
                }
                else {
                    req.flash('error','권한이 없습니다.');
                    req.redirect('back');
                }
            }
        })
        .catch((err) => {
            if(err) {
                req.flash('error', '포스트를 찾는 과정에서 에러가 발생했습니다.');
                req.redirect('back');
            }
        })
    }
    else {
        req.flash('error', '로그인을 먼저 해주세요.');
        req.redirect('/login');
    }
}

function checkCommentOwnership (req, res, next) {
    if(req.isAuthenticated) {
        Comment.findById(req.params.commentId)
            .then((comment) => {
                if(!comment) {
                    req.flash('error', '댓글을 찾는 과정에서 에러가 발생했습니다.');
                    res.redirect('back');
                }
                else {
                    if(comment.author.id.equals(req.user._id)) {
                        req.comment = comment;
                        return next();
                    }
                    else {
                        req.flash('error', '권한이 없습니다.');
                        res.redirect('back');
                    }
                }
            })
            .catch((err) => {
                req.flash('error', '댓글을 찾는 과정에서 에러가 발생했습니다.');
                res.redirect('back');
            });
    }
    else {
        req.flash('error', '로그인을 먼저 해주세요.');
        req.redirect('/login');
    }
}

function checkIsMe(req, res, next) {
    if(req.isAuthenticated) {
        User.findById(req.params.id)
        .then((user) => {
            if(!user) {
                req.flash('error', '유저를 찾는데 에러가 발생했습니다.');
                res.redirect('/profile/' + req.params.id);
            } else {
                if(user._id.equals(req.user._id)) {
                    next()
                    return;
                }
                else {
                    req.flash('error', '권한이 없습니다.');
                    res.redirect('/profile/' + req.params.id);
                }
            }
        })
        .catch((error) => {
            req.flash('error', '유저를 찾는데 에러가 발생했습니다.');
            res.redirect('/profile/' + req.params.id);
        });
    }
    else {
        req.flash('error', '로그인을 먼저 해주세요.');
        res.redirect('/login');
    }
}

module.exports = {
    checkAuthenticated,
    checkNotAuthenticated,
    checkPostOwnership,
    checkCommentOwnership,
    checkIsMe
}