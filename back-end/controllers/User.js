const User = require('../models/User');
var md5 = require('md5');
const jwt = require('jsonwebtoken');

const userController = {
    // register
    registerUser: async(req, res) => {
        try {
            // create new user
            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                password: md5(req.body.password),
                bio: req.body.bio,
                image: req.body.image,
            });

            newUser.favoriteArticle = new Array();

            // Create token
            const accessToken = jwt.sign({
                "email": req.body.email,
                "username": req.body.username
                }, process.env.ACCESS_TOKEN_SECRET
            );
            // save user token
            newUser.token = accessToken;
            // save data user
            const user = await newUser.save();
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    checkFollow: async(req, res) => {
        try {
            const data = await User.findOne({
                username: req.params.username
            });
            
            const check = data.followers.includes(req.params.userfollow);

            const updateArticle = await User.findOneAndUpdate({
                username: req.params.username
            }, {
                following : check
            });
            const dataUser = await updateArticle.save();
            res.status(200).json(dataUser);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    followUser: async(req, res) => {
        try {
            const authorizationHeader = req.headers.token;
            // Beaer [token]
            const token = authorizationHeader.split(' ')[1];
            const datajwt = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);           
            const user = await User.findOne({email: datajwt.email});
            const userfollow = await User.findOne({username: req.params.username});
            user.follow(userfollow._id);

            res.status(200).json({
                user: userfollow.toProfileJSONFor(user)
            });          
        } catch (error) {
            res.status(500).json(error);
        }
    },
    unfollowUser: async(req, res) => {
        try {
            const authorizationHeader = req.headers.token;
            // Beaer [token]
            const token = authorizationHeader.split(' ')[1];      
            const datajwt = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);           
            const user = await User.findOne({email: datajwt.email});
            
            const userfollow = await User.findOne({username: req.params.username});
            user.unfollow(userfollow._id);

            res.status(200).json({
                user: userfollow.toProfileJSONFor(user)
            });                 
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // get profile
    getProfile: async(req, res) => {
        var user = null;
        try {
            const authorizationHeader = req.headers.token;
            // Beaer [token]
            const token = authorizationHeader.split(' ')[1];
            if(token !== 'null'){
                const datajwt = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);           
                user = await User.findOne({email: datajwt.email});
            } 

            const profile = await User.findOne({ 
                username: req.params.username
            });

            res.status(200).json({
                profile: profile.toProfileJSONFor(user)
            });
        } catch (error) {
            res.status(500).json(error);
        }  
    },
    // get user
    getUser: async (req, res) => {
        try {
            const authorizationHeader = req.headers.token;
            // Beaer [token]
            const token = authorizationHeader.split(' ')[1];
            const data = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);           
            const user = await User.findOne({email: data.email});

            res.status(200).json(user);  
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // đăng nhập
    loginUser: async(req, res) => {
        try {
            const data = await User.findOne({email:req.body.email})
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // update user
    updateUser: async(req, res) => {
        try {
            const authorizationHeader = req.headers.token;
            // Beaer [token]  
            const token = authorizationHeader.split(' ')[1];
            const dataUser = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);           
            const filter = {
                email: dataUser.email
            }

            let data = "";

            if(req.body.username === dataUser.username && req.body.email === dataUser.email){
                data = await User.findOneAndUpdate(filter, {
                    username: dataUser.username,
                    email: dataUser.email,
                    bio: req.body.bio,
                    image: req.body.image, 
                });
            } else if(req.body.username === dataUser.username && req.body.email !== dataUser.email){
                data = await User.findOneAndUpdate(filter, {
                    username: dataUser.username,
                    email: req.body.email,
                    bio: req.body.bio,
                    image: req.body.image, 
                    token: null,
                });
                // update token
                const accessToken = jwt.sign({
                    "email": req.body.email,
                    "username": dataUser.username
                }, process.env.ACCESS_TOKEN_SECRET
                );
                data.token = accessToken;
            } else if(req.body.username !== dataUser.username && req.body.email === dataUser.email){
                data = await User.findOneAndUpdate(filter, {
                    username: req.body.username,
                    email: dataUser.email,
                    bio: req.body.bio,
                    image: req.body.image, 
                    token: null,
                });
                // update token
                const accessToken = jwt.sign({
                    "email": dataUser.email,
                    "username": req.body.username
                }, process.env.ACCESS_TOKEN_SECRET
                );
                data.token = accessToken;
            } else if(req.body.username !== dataUser.username && req.body.email !== dataUser.email){
                data = await User.findOneAndUpdate(filter, {
                    username: req.body.username,
                    email: req.body.email,
                    bio: req.body.bio,
                    image: req.body.image, 
                    token: null,
                });
                // update token
                const accessToken = jwt.sign({
                    "email": req.body.email,
                    "username": req.body.username
                }, process.env.ACCESS_TOKEN_SECRET
                );
                data.token = accessToken;
            } 

            data.save();
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    changePassword: async(req, res) => {
        try {
            const authorizationHeader = req.headers.token;
            // Beaer [token]
            const token = authorizationHeader.split(' ')[1];
            const dataUser = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);           
            const user = await User.findOne({email: dataUser.email});
            const filter = {
                password: user.password
            }

            const data = await User.findOneAndUpdate(filter, {
                password: md5(req.body.newPassword)
            });

            await data.save();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = userController;