const express = require('express');
const router = express.Router({
    mergeParams: true
});
const { checkAuthenticated, checkNotAuthenticated, checkCommentOwnership } = require('../middleware/auth');
const Post = require('../models/posts.model');
const Comment = require('../models/comments.model');
router.post('/', checkAuthenticated, (req, res, next) => {
    //console.log(req.params.id);
    Post.findById(req.params.id)
        .then((post) => {
            if(!post) {
                req.flash('error', '댓글 작성 중 포스트를 찾지 못했습니다.');
                res.redirect('back');
            }
            else {
                Comment.create(req.body)
                    .then((comment) => {
                        // comment save
                        comment.author.id = req.user._id;
                        comment.author.username = req.user.username;
                        comment.save();

                        // comment save at post
                        post.comments.push(comment._id);
                        post.save();

                        req.flash('success', '댓글이 잘 생성되었습니다.');
                        res.redirect('back');
                    })
                    .catch((error) => {
                         req.flash('error', '댓글 작성 중 에러가 발생했습니다.');
                         res.redirect('back');
                    });
            }
        })
        .catch((error) => {
            req.flash('error', '댓글 작성 중 에러가 발생했습니다.');
            res.redirect('back');
        });
});

router.delete('/:commentId', checkCommentOwnership, (req, res, next) => {
    Comment.findByIdAndRemove(req.params.commentId)
        .then((comment) => {
            req.flash('success', '댓글을 삭제했습니다.');
            res.redirect('back');
        })
        .catch((error) => {
            req.flash('error', '댓글 삭제 중 에러가 발생했습니다.');
            res.redirect('back');
        });
});

router.get('/:commentId/edit', checkCommentOwnership, (req, res, next) => {
    Post.findById(req.params.id)
        .then((post) => {
            if(!post) {
                req.flash('error', '댓글 수정 중 포스트를 찾지 못했습니다.');
                res.redirect('back')
            };
            res.render('comments/edit', {
                post: post,
                comment: req.comment
            });
        })
        .catch((error) => {
            req.flash('error', '포스트를 찾는 중 에러가 발생했습니다.');
            res.redirect('back');
        });
});

router.put('/:commentId/', checkCommentOwnership, (req, res, next) => {
    Comment.findByIdAndUpdate(req.params.commentId, req.body)
        .then((comment) => {
            req.flash('success', '댓글을 수정했습니다.');
            res.redirect('/posts');
        })
        .catch((error) => {
            req.flash('error', '댓글 수정 중 에러가 발생했습니다.');
            res.redirect('back');
        });
})

module.exports = router;