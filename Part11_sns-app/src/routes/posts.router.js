const express = require('express');
const router = express.Router();
const multer = require('multer');
const { checkAuthenticated, checkNotAuthenticated, checkPostOwnership } = require('../middleware/auth');
const Post = require('../models/posts.model');
const Comment = require('../models/comments.model');
const path = require('path');

const storageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/assets/images'));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storageEngine }).single('image');

router.post('/', checkAuthenticated, upload, async (req, res, next) => {
    let desc = req.body.desc;
    let image = req.file ? req.file.filename : "";

    Post.create({
        image: image,
        description: desc,
        author: {
            id: req.user._id,
            username: req.user.username
        }
    })
    .then((post) => {
        req.flash('success', '포스트 생성 성공');
        res.redirect('back');
        // res.redirect('/posts');
    })
    .catch((err) => {
        req.flash('error', '포스트 생성 실패');
        res.redirect('back');
    });
});

router.get('/', checkAuthenticated, async (req, res) => {
    await Post.find()
        .populate('comments')
        .sort({ createdAt: -1})
        .exec()
        .then((posts) => {
            //console.log(req.user, posts)
            res.render('posts/index', {
                posts: posts,
            });
        })
        .catch((err) => {
            console.log(err);
        });
});

router.get('/:id/edit', checkPostOwnership, (req, res) => {
    res.render('posts/edit', {
        post: req.post
    });
});

router.put('/:id', checkPostOwnership, (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body)
    .then((post) => {
        req.flash('success', '게시물 수정을 완료했습니다.');
        res.redirect('/posts');
    })
    .catch((err) => {
        req.flash('error', '게시물을 수정하는데 오류가 발생했습니다.');
        res.redirect('/posts');
    })
});

router.delete('/:id', checkPostOwnership, (req, res) => {
    Post.findByIdAndRemove(req.params.id)
    .then((post) => {
        req.flash('success', '게시물을 삭제하였습니다.');
        res.redirect('/posts');
    })
    .catch((err) => {
        req.flash('error', '게시물 삭제에 실패하였습니다.');
        res.redirect('/posts');
    });
});

module.exports = router;