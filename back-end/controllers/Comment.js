const Comment = require('../models/Comment');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Article = require('../models/Article');

const commentController = {
    // create
    addComment: async (req, res) => {
        try {
            const authorizationHeader = req.headers.token;
            // Beaer [token]            
            const token = authorizationHeader.split(' ')[1];      
            const datajwt = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);           
            const user = await User.findOne({email: datajwt.email});

            // new article
            const newComment = await new Comment({
                "body": req.body.body,
            });

            newComment.author = user._id
            const article = await Article.findOne({ slug: req.params.slug });
            newComment.slug = article._id;

            const data = await newComment.save();
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getComment: async (req, res) => {
        try {
            const article = await Article.findOne({ slug: req.params.slug });
            const comment = await Comment.find({slug: article._id})
                                        .sort({createdAt: 'desc'}).populate('author');
           res.status(200).json(comment);
        } catch (err) {
            res.status(500).json(err);
        }
    },  
    deleteComment: async (req, res) => {
        try {
            const article = await Article.findOne({ slug: req.params.slug });
            const filter = {
                slug: article._id,
                _id: req.params.id 
            }

            const comment = await Comment.findOne(filter);
            if(!comment){
                return res.status(404).json({
                    msg: "Comment has been deleted"
                })
            } else{
                await Comment.findOneAndDelete(filter);
            
                res.status(200).json("Deleted");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = commentController;