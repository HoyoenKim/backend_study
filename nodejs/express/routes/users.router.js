const express = require('express');
const userController = require('../controllers/users.controller');

const usersRouter = express.Router();
usersRouter.get('/', userController.getAllUsers);
usersRouter.get('/:id/', userController.getUserById);
usersRouter.post('/', userController.postUser);

module.exports = usersRouter;