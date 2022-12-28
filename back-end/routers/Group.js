const groupController = require('../controllers/Group');
const authen = require('../middellWare/authRequired');
const validateArticle = require('../middellWare/validateArticle');
const middleware = require('../middellWare/auth');

const router = require('express').Router();

router.post('/groups', authen.createGroup, validateArticle.validateArticle, groupController.createGroup);

router.post('/groups/:username/join/:groupName', middleware.verifyToken, groupController.joinGroup);

router.post('/groups/:username/leave/:groupName', middleware.verifyToken, groupController.leaveGroup);

router.get('/groups', groupController.getAllGroup);

router.get('/groups/:groupName/member', groupController.getMember);

router.get('/groups/:groupName', groupController.getGroup);

router.put('/groups/:groupName', authen.createGroup, validateArticle.validateArticle, groupController.updateGroup);

router.get('/groups/:groupName/articles', groupController.getArticleGroup);

router.post('/groups/:groupName/articles', authen.createArticle, validateArticle.validateArticle, groupController.postArticle);

router.delete('/groups/:groupName/articles/:slug', middleware.verifyToken, groupController.deleteArticleGroup);

router.delete('/groups/:groupName', middleware.verifyToken, groupController.deleteGroup);

module.exports = router;