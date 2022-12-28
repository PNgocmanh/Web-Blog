const userModel = require('../models/User');
var md5 = require('md5');
const jwt = require('jsonwebtoken');
const { body } = require('express-validator');

module.exports.loginUser = [
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid Email')
        .custom(value => {
            return userModel.findOne({
                email: value
            }).then(user => {
                if(!user){
                    return Promise.reject('Email was wrong')
                }
            });
        }),
    body('password')
        .notEmpty().withMessage('Password is required')
        .custom((value, { req }) => {
            return userModel.findOne({
                email: req.body.email,
                password: md5(value)
            }).then(user => {
                if(!user){
                    return Promise.reject('Password was wrong')
                }
            });
        }),
]

module.exports.registerUser = [
    body('username').trim()
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 3, max: 50 }).withMessage('Username must be at least 3 and maximun 50 chars long')       
        .custom(value => {
            return userModel.findOne({ username: value }).then(user => {
                if(user){
                    return Promise.reject('Username has already been taken')
                }
            });
        }),
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid Email')
        .custom(value => {
            return userModel.findOne({ email: value }).then(user => {
                if(user){
                    return Promise.reject('Email has already been taken')
                }
            });
        }),
    body('password').trim()
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 chars long'),
]
    
module.exports.updateUser = [
    body('username').trim()
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 chars long')           
        .custom((value, { req }) => {
            const authorizationHeader = req.headers.token;
            // Beaer [token]  
            const token = authorizationHeader.split(' ')[1];
            const dataUser =  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);           
            if(value !== dataUser.username){
                return userModel.findOne({ username: value }).then(user => {
                    if(user){
                        return Promise.reject('Username has already been taken')
                    }
                });
            } else return true;
        }),
    body('email')
        .isEmail().withMessage('Invalid Email')
        .notEmpty().withMessage('Email is required')
        .custom((value, { req }) => {
            const authorizationHeader = req.headers.token;
            // Beaer [token]  
            const token = authorizationHeader.split(' ')[1];
            const dataUser =  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);  
            if(value !== dataUser.email){
                return userModel.findOne({ email: value }).then(user => {
                    if(user){
                        return Promise.reject('Email has already been taken')
                    }
                });
            } else return true;
        }),
    body('bio').trim()
        .isLength({ max: 100 }).withMessage('Bio maximum length is 100 characters'),
]

module.exports.changePassword = [
    body('currentPassword').trim()
        .notEmpty().withMessage('Please enter your current password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 chars long')
        .custom( value => {
            return userModel.findOne({ password: md5(value) }).then(user => {
                if(!user){
                    return Promise.reject('Password was wrong')
                }
            });
        }),
    body('newPassword').trim()
        .notEmpty().withMessage('Please enter your new password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 chars long')
        .custom((value, {req})=>{
            if(value === req.body.currentPassword){
                return Promise.reject('New password is the same current password')
            } else return true;
        }),
    body('confirmPassword').trim()
        .notEmpty().withMessage('Please enter your current password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 chars long')
        .custom((value, { req })=>{
            if(value !== req.body.newPassword){
                return Promise.reject('Does not match the new password')
            } else return true;
        }),
]

// token
module.exports.verifyToken = async (req, res, next) => {
    const authorizationHeader = req.headers.Authorization || req.headers.token;
    // Beaer [token]
    if(!authorizationHeader) res.status(401).json('You are not authorization');
    else{
        const token = authorizationHeader.split(' ')[1];
        try {
            const data = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            if(data) next();
        } catch (err) {
            return res.status(401).json({
                message:"Token is not valid"
            });
        }
    }
}