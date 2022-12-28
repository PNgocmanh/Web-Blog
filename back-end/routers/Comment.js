const commentController = require('../controllers/Comment');
const authArticle = require('../middellWare/authRequired');
const validateArticle = require('../middellWare/validateArticle');

const router = require('express').Router();

router.post('/articles/:slug/comments', authArticle.createComment, validateArticle.validateArticle, commentController.addComment);

router.get('/articles/:slug/comments', commentController.getComment);

router.delete('/articles/:slug/comments/:id', commentController.deleteComment);

module.exports = router;