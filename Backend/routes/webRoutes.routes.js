const express = require('express');
const userController = require("../controller/user_profile.controller");
const user_route = express();

user_route.set('view engine', 'ejs');
user_route.set('views', './view/');
user_route.use(express.static('public'))

user_route.get('/mail_verification', userController.verifyMail);
user_route.get('/reset-password', userController.resetPasswordLoad);
user_route.post('/reset-password', userController.resetPassword);

module.exports = user_route;