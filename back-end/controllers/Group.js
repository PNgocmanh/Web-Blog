const Group = require('../models/Group');
const User = require('../models/User');
const Article = require('../models/Article');
const Comment = require('../models/Comment');
const jwt = require('jsonwebtoken');
const slugUtils = require('../utils/createSlug')

const groupController = {
    // create
    createGroup: async (req, res) => {
        try {
            const authorizationHeader = req.headers.token;
            // Beaer [token]            
            const token = authorizationHeader.split(' ')[1];      
            const datajwt = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);           
            const user = await User.findOne({email: datajwt.email});

            const newGroup = await new Group({
                groupName: req.body.groupName,
                description: req.body.description,
                groupImage: req.body.groupImage,
                rules: req.body.rules
            });

            newGroup.admin = user;
            newGroup.member.push(user._id);
            const data = await newGroup.save();

            user.group.push(newGroup._id);   
            await user.save();

            res.status(200).json(data);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    joinGroup: async (req, res) => {
        try {
            const authorizationHeader = req.headers.token;
            // Beaer [token]            
            const token = authorizationHeader.split(' ')[1];      
            const datajwt = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);           
            const user = await User.findOne({email: datajwt.email});

            const group = await Group.findOne({
                groupName: req.params.groupName
            });

            user.joinGroup(group._id);

            group.member.push(user._id);

            await group.save();
            
            res.status(200).json(group);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    leaveGroup: async (req, res) => {
        try {
            const authorizationHeader = req.headers.token;
            // Beaer [token]            
            const token = authorizationHeader.split(' ')[1];      
            const datajwt = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);           
            const user = await User.findOne({email: datajwt.email});

            const group = await Group.findOne({
                groupName: req.params.groupName
            });

            user.leaveGroup(group._id);

            group.member.remove(user._id);
            await group.save();
            
            res.status(200).json({
                "group": group
            });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getMember: async (req, res) => {
        try {
            const group = await Group.findOne({ groupName: req.params.groupName });
            const member = await User.find({
                _id:{
                    "$in": group.member,
                }
            });

            res.status(200).json({
                members: member.map(user=>{
                    return user.toProfileJSONFor();
                })
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getGroup: async (req, res) => {
        var user = null;
        try {
            const authorizationHeader = req.headers.token;
            // Beaer [token]            
            const token = authorizationHeader.split(' ')[1];      
            if(token !== 'null'){
                const datajwt = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);           
                user = await User.findOne({email: datajwt.email});
            }

            const data = await Group.findOne({
                groupName: req.params.groupName
            }).populate('admin');

            const result = data.toGroupJSONFor(user);
            
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json(err);
        }
    },  
    getAllGroup: async (req, res) => {
        var user = null;
        try {
            const authorizationHeader = req.headers.token;
            // Beaer [token]            
            const token = authorizationHeader.split(' ')[1];     
            if(token !== 'null'){
                const datajwt = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);           
                user = await User.findOne({email: datajwt.email});
            } 

            const data = await Group.find()
                                    .sort({createdAt: 'desc'})
                                    .populate('admin');
            res.status(200).json({
                group: data.map(group=>{
                    return group.toGroupJSONFor(user);
                })
            });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    updateGroup: async (req, res) => {
        try {
            const group = await Group.findOneAndUpdate({
                groupName: req.params.groupName
            },{
                groupName: req.body.groupName,
                description: req.body.description,
                groupImage: req.body.groupImage,
                rules: req.body.rules
            });

            

            await group.save();
            
            res.status(200).json(group);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteGroup: async (req, res) => {
        try {
            const group = await Group.findOne({groupName: req.params.groupName});
            //const article = await Article.find({ group: group._id });

            await Article.deleteMany({ group: group._id });

            await Group.findOneAndDelete({
                groupName: req.params.groupName
            });
            
            res.status(200).json("Delete Successfully");
        } catch (err) {
            res.status(500).json(err);
        }
    },
    postArticle: async (req, res) => {
        try {
            const authorizationHeader = req.headers.token;
            // Beaer [token]            
            const token = authorizationHeader.split(' ')[1];      
            const datajwt = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);           
            const user = await User.findOne({email: datajwt.email});

            const newArticle = await new Article({
                title: req.body.title,
                description: req.body.description,
                body: req.body.body
            });

            newArticle.author = user;

            const tag = req.body.tagList;
            if(tag) newArticle.tagList = tag.split(",");
           
            newArticle.slug = slugUtils.createSlug(req.body.title);

            const group = await Group.findOne({groupName: req.params.groupName});
            
            newArticle.group = group._id;
            newArticle.groupName = group.groupName;

            const article = await newArticle.save();

            group.listArticle.push(article._id);
            await group.save();

            res.status(200).json(group);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getArticleGroup: async (req, res) => {
        var user = null;
        try {
            const authorizationHeader = req.headers.token;
            // Beaer [token]            
            const token = authorizationHeader.split(' ')[1];      
            if(token !== 'null'){
                const datajwt = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);           
                user = await User.findOne({email: datajwt.email});
            } 

            const group = await Group.findOne({ groupName: req.params.groupName })

            const articles = await Article.find({group: group._id})
                                        .sort({createdAt: 'desc'}).populate('author');
            
            return res.status(200).json({
                articles: articles.map(article => {
                    return article.toJSONFor(user);
                }) 
            });
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    deleteArticleGroup: async (req, res) => {
        try {
            const group = await Group.findOne({groupName: req.params.groupName});
            const article = await Article.findOne({ slug: req.params.slug });
            
            const filter = {
                slug: req.params.slug
            }

            const idx = group.listArticle.indexOf(article._id);
            if(idx != -1) group.listArticle.splice(idx, 1);

             
            var array = group.listArticle;

            await Group.findOneAndUpdate({
                groupName: req.params.groupName,
            },{
                listArticle: array
            });

            await Comment.deleteMany({slug: article._id});
            await Article.findOneAndDelete(filter);
            

            res.status(200).json("Deleted");
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = groupController;