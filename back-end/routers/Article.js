const articleController = require('../controllers/Article');
const authArticle = require('../middellWare/authRequired');
const validateArticle = require('../middellWare/validateArticle');
const middleware = require('../middellWare/auth');

const router = require('express').Router();

router.post('/articles', middleware.verifyToken, authArticle.createArticle, validateArticle.validateArticle, articleController.createArticle);

router.post('/articles/:slug/favorite',middleware.verifyToken, articleController.pushFavorite);

router.get('/articles/feed', middleware.verifyToken, articleController.getFeed);

router.get('/articles/:slug', articleController.getArticleSlug);

router.get('/articles', articleController.getArticleList);

router.get('/tags', articleController.getTags);

router.put('/articles/:slug', middleware.verifyToken, authArticle.createArticle, validateArticle.validateArticle, articleController.updateArticle);

router.delete('/articles/:slug',middleware.verifyToken, articleController.deleteArticle);

router.delete('/articles/:slug/favorite',middleware.verifyToken, articleController.unfavorite);

module.exports = router;