const { body, check } = require('express-validator');
const articleModel = require('../models/Article');

module.exports.createArticle = [
    //body('title', 'Title is required').exists(),
    check('title').trim()
        .notEmpty().withMessage('Title is required')
        .isLength({ max: 255 }).withMessage('Title maximum length is 255 characters'),
    body('description').trim('&nbsp;').notEmpty().withMessage('Description is required'),
    body('body').trim().notEmpty().withMessage('Body is required'),
    body('tagList').trim()
        .custom(value => {
            if((value.split(',').length - 1) > 4){ 
                return Promise.reject('Maximum 5 tags');
            } else return true;
        })
]

module.exports.createComment = [
    body('body').trim()
        .notEmpty().withMessage('Please enter something')
        .isLength({ max: 500 }).withMessage('Comment maximum length is 500 characters')
        .custom((value, { req }) => {
            return articleModel.findOne({
                slug: req.params.slug
            }).then(res =>{
                if(!res){
                    return Promise.reject('Article was deleted')
                }
            })
        }),
]

module.exports.createGroup = [
    check('groupName').trim()
        .notEmpty().withMessage('Group name is required')
        .isLength({ max: 200 }).withMessage('Group Name maximum length is 200 characters'),
    body('description').trim().notEmpty().withMessage('Description is required'),
]