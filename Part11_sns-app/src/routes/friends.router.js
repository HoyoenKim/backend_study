const express = require('express');
const router = express.Router();
const { checkAuthenticated, checkNotAuthenticated } = require('../middleware/auth');
const User = require('../models/users.model');

router.get('/', checkAuthenticated, (req, res) => {
    User.find({})
    .then((users) =>{
        res.render('friends', {
            users: users
        });
    })
    .catch((err) => {
        req.flash('error', '유저를 가져오는데 에러가 발생했습니다.');
        res.redirect("/friends");
    });
});

router.put('/:id/add-friend', checkAuthenticated, (req, res) => {
    User.findById(req.params.id)
    .then((user) => {
        if(!user) {
            req.flash('error', '유저를 가져오는데 에러가 발생했습니다.');
            res.redirect("/friends");
        } else {
            User.findByIdAndUpdate(
                user._id, { 
                    friendsRequests: user.friendsRequests.concat([req.user._id])
                })
                .then((user) => {
                    req.flash('success', '친구 추가 요청을 보냈습니다.');
                    res.redirect("/friends");
                })
                .catch((error) => {
                    req.flash('error', '친구 추가를 요청 하는 동안 에러가 발생했습니다.');
                    res.redirect("/friends");
                });
        }
    })
    .catch((err) => {
        req.flash('error', '유저를 가져오는데 에러가 발생했습니다.');
        res.redirect("/friends");
    });
});

router.put('/:friendId/remove-friend-request/:userId', checkAuthenticated, (req, res) => {
    User.findById(req.params.friendId)
    .then((friend) => {
        if(!friend) {
            req.flash('error', '유저를 가져오는데 에러가 발생했습니다.');
            res.redirect("/friends");
        } else {
            const filteredFriendsRequests = friend.friendsRequests.filter(friendId => friendId!== req.params.userId);
            User.findByIdAndUpdate(req.params.friendId, { friendsRequests: filteredFriendsRequests })
                .then((friend) => {
                    req.flash('success', '친구 추가 요청을 취소했습니다.');
                    res.redirect("/friends");
                })
                .catch((err) => {
                    req.flash('error', '친구 추가 요청을 취소 하는 동안 에러가 발생했습니다.');
                    res.redirect("/friends");

                });
        }
    })
    .catch((err) => {
        req.flash('error', '유저를 가져오는데 에러가 발생했습니다.');
        res.redirect("/friends");
    });
});

router.put('/:friendId/accept-friend-request', checkAuthenticated, (req, res) => {
    // accpet 을 누른 사람은 나임
    // 나의 reqfriend에 친구의 아이디가 있음
    User.findById(req.params.friendId)
    .then((friend) => {
        if(!friend) {
            req.flash('error', '유저를 가져오는데 에러가 발생했습니다.');
            res.redirect("/friends");
        }
        else {
            User.findByIdAndUpdate(req.params.friendId, { 
                friends: friend.friends.concat([req.user._id]), 
            })
            .then((friend) => {
                User.findByIdAndUpdate(req.user._id, { 
                    friends: req.user.friends.concat([req.params.friendId]), 
                    friendsRequests: req.user.friendsRequests.filter(friendId => friendId!== req.params.friendId),
                })
                .then((me) => {
                    req.flash('success', '친구 추가를 했습니다.');
                    res.redirect("/friends");
                })
                .catch((err) => {
                    req.flash('error', '유저를 가져오는데 에러가 발생했습니다.');
                    res.redirect("/friends");
                });
            })
            .catch((error) => {
                req.flash('error', '유저를 가져오는데 에러가 발생했습니다.');
                res.redirect("/friends");
            });
        }
    })
    .catch((err) => {
        req.flash('error', '유저를 가져오는데 에러가 발생했습니다.');
        res.redirect("/friends");
    });
});

router.put('/:friendId/remove-friend', checkAuthenticated, (req, res) => {
    User.findById(req.params.friendId)
    .then((friend) => {
        if(!friend) {
            req.flash('error', '유저를 가져오는데 에러가 발생했습니다.');
            res.redirect("/friends");
        }
        else {
            User.findByIdAndUpdate(req.params.friendId, { 
                friends: friend.friends.filter(friendId => friendId !== req.user._id.toString()), 
            })
           .then((friend) => {
                User.findByIdAndUpdate(req.user._id, {
                    friends: req.user.friends.filter(friendId => friendId !== req.params.friendId.toString()),
                })
                .then((me) => {
                    req.flash('success', '친구를 삭제했습니다.');
                    res.redirect("/friends");
                })
                .catch((err) => {
                    req.flash('error', '유저를 가져오는데 에러가 발생했습니다.');
                    res.redirect("/friends");
                })
     
           })
           .catch((error) => {
                req.flash('error', '유저를 가져오는데 에러가 발생했습니다.');
                res.redirect("/friends");
            });
        }
    })
    .catch((err) => {
        req.flash('error', '유저를 가져오는데 에러가 발생했습니다.');
        res.redirect("/friends");
    });
})

module.exports = router;