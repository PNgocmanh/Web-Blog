const userController = require('../controllers/User');
const middleware = require('../middellWare/auth');
const validateArticle = require('../middellWare/validateArticle');

const router = require('express').Router();

router.put('/profiles/:username/checkfollow/:userfollow', userController.checkFollow);

router.post('/users', middleware.registerUser, validateArticle.validateArticle, userController.registerUser);

router.get('/user', middleware.verifyToken, userController.getUser);

router.post('/users/login', middleware.loginUser, validateArticle.validateArticle, userController.loginUser);

router.put('/user', middleware.verifyToken, middleware.updateUser, validateArticle.validateArticle, userController.updateUser);

router.put('/user/change/password', middleware.verifyToken, middleware.changePassword, validateArticle.validateArticle, userController.changePassword);

router.get('/profiles/:username', userController.getProfile);

router.post('/profiles/:username/follow', middleware.verifyToken, userController.followUser);

router.delete('/profiles/:username/follow', middleware.verifyToken, userController.unfollowUser);

module.exports = router;