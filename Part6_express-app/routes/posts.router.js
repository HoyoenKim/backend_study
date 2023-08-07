const express = require('express');
const postController = require('../controllers/posts.controller');

const postRotuer = express.Router();
postRotuer.get('/', postController.getPost);
postRotuer.get('/image', postController.getImage)
module.exports = postRotuer;