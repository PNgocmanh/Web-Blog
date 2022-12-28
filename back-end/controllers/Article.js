const Article = require('../models/Article');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const slugUtils = require('../utils/createSlug');
const Comment = require('../models/Comment');

const articleController = {
    // create
    createArticle: async (req, res) => {
        try {
            const authorizationHeader = req.headers.token;
            // Beaer [token]            
            const token = authorizationHeader.split(' ')[1];      
            const datajwt = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);           
            const user = await User.findOne({email: datajwt.email});

            // new article
            const newArticle = await new Article({
                title: req.body.title,
                description: req.body.description,
                body: req.body.body,
            });

            newArticle.author = user;

            const tag = req.body.tagList;

            if(tag) newArticle.tagList = tag.split(",");
           
            newArticle.slug = slugUtils.createSlug(req.body.title);

            const article = await newArticle.save();
            res.status(200).json(article);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    pushFavorite: async (req, res) => {
        
        try {
            const authorizationHeader = req.headers.token;
            // Beaer [token]            
            const token = authorizationHeader.split(' ')[1];      
            const datajwt = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);           
            const user = await User.findOne({email: datajwt.email});

            if(!user) { return res.sendStatus(401); }
                
            const article = await Article.findOne({ slug: req.params.slug }).populate('author');
            user.favorite(article._id);
           
            article.favoritesCount += 1;
            await article.save();

            return res.status(200).json({article: article.toJSONFor(user)});
        } catch (error) {
            res.status(500).json(error);
        }
    },
    unfavorite: async(req, res) => {
        try {
            const authorizationHeader = req.headers.token;
            // Beaer [token]            
            const token = authorizationHeader.split(' ')[1];      
            const datajwt = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);           
            const user = await User.findOne({email: datajwt.email});

            if(!user) { return res.sendStatus(401); }
                
            const article = await Article.findOne({ slug: req.params.slug }).populate('author');
            user.unfavorite(article._id);
            //await user.save();
            if(article.favoritesCount > 0) article.favoritesCount -= 1;
            await article.save();

            return res.status(200).json({article: article.toJSONFor(user)});
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getFeed: async (req, res) => {
        try {
            const authorizationHeader = req.headers.token ;
            // Beaer [token]
            const token = authorizationHeader.split(' ')[1];
            
            const datajwt = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);           
            const user = await User.findOne({email: datajwt.email});
            const articleLength = await Article.count({
                group: null,
                author: {
                    "$in": user.followers
                }
            });
            const article = await Article.find({
                group: null,
                author: {
                    "$in": user.followers
                }
            }).sort({ createdAt: 'desc' })
                .limit(req.query.limit)
                .skip(req.query.offset * req.query.limit)
                .populate('author');

            res.status(200).json({
                articles: article.map(data=>{
                    return data.toJSONFor(user)
                }),
                totalList: articleLength
            });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getTags: async(req, res) => {
        try {
            const top10Tags = await Article.aggregate([
                { $unwind: '$tagList' },
                { $group: { _id: '$tagList', count: { $sum: 1 } } },
                { $project: { tagList: '$_id', count: 1 } },
                { $sort: { count: -1 } },
                { $limit: 10 },
              ]);
              const tags = top10Tags.map((tagInfo) => tagInfo.tagList);
              res.status(200).json({ tags });
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getArticleSlug: async (req, res) =>{
        var user = null;
        try {
            const authorizationHeader = req.headers.token ;
            // Beaer [token]
            const token = authorizationHeader.split(' ')[1];
            
            if(token !== 'null'){
                const datajwt = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);           
                user = await User.findOne({email: datajwt.email});
            }
            const article = await Article.findOne({
                slug: req.params.slug
            }).populate('author');
            const result = article.toJSONFor(user);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getArticleList: async (req, res) =>{
        var user = null;
        try {
            const authorizationHeader = req.headers.token ;
            // Beaer [token]
            const token = authorizationHeader.split(' ')[1];
            if(token !== 'null'){
                const datajwt = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);           
                user = await User.findOne({email: datajwt.email});
            }
            if(req.query.author){
                const author = await User.findOne({username: req.query.author});
                const articleLength = await Article.count({author: author._id});

                const article = await Article.find({
                    author: author._id
                }).sort({ createdAt: 'desc' })
                .limit(req.query.limit).skip(req.query.offset * req.query.limit)    
                .populate('author');

                return res.status(200).json({
                    articles: article.map(data=>{
                        return data.toJSONFor(user)
                    }),
                    totalList: articleLength
                }); 
            } else if(req.query.tags){
                const articleLength = await Article.count({
                    tagList: req.query.tags
                });
                //const article = await data.filter(data => data.tagList.includes(req.query.tags));
                
                const article = await Article.find({
                    tagList: req.query.tags
                }).sort({ createdAt: 'desc' })
                    .limit(req.query.limit).skip(req.query.limit * req.query.offset)
                    .populate('author');
                
                res.status(200).json({
                    articles: article.map(data=>{
                        return data.toJSONFor(user)
                    }),
                    totalList: articleLength
                }); 
            } else if(req.query.favorited){
                const user = await User.findOne({
                    username: req.query.favorited,
                });
                const articleLength = await Article.count({
                    _id: {
                        "$in": user.favoriteArticle
                    }
                });

                const article = await Article.find({
                    _id: {
                        "$in": user.favoriteArticle
                    }
                }).sort({ createdAt: 'desc'})
                .limit(req.query.limit).skip(req.query.limit * req.query.offset)
                .populate('author');

                res.status(200).json({
                    articles: article.map(data=>{
                        return data.toJSONFor(user)
                    }),
                    totalList: articleLength
                });
            } else if(req.query.limit && req.query.offset){
                const PAGE_SIZE = req.query.limit;
                const page = req.query.offset;
                const articleLength = await Article.count({});
                const article = await Article.find({})
                    .sort({createdAt: 'desc'})
                    .limit(PAGE_SIZE)
                    .skip(PAGE_SIZE * page)
                    .populate('author');
                res.status(200).json({
                    articles: article.map(data=>{
                        return data.toJSONFor(user)
                    }),
                    totalList: articleLength
                });
            } else { 
                const article = await Article.find({})
                            .sort({ createdAt: 'desc' })
                            .populate('author');
                res.status(200).json({
                    articles: article.map(data=>{
                        return data.toJSONFor(user)
                    })
                });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    updateArticle: async (req, res) => {
        try {
            const filter = {
                slug: req.params.slug
            }
            const dataArticle = await Article.findOne({
                slug: req.params.slug
            });
            if(!dataArticle){
                res.status(404).json({
                    msg: "Article has been deleted"
                })
            } else{
                const updateArticle = await Article.findOneAndUpdate(filter, {
                    title: req.body.title,
                    description: req.body.description,
                    body: req.body.body,
                    tagList: req.body.tagList,
                });
                
                if(dataArticle.title != req.body.title)
                    updateArticle.slug = slugUtils.createSlug(req.body.title);
    
                const article = await updateArticle.save();
                res.status(200).json(article);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    deleteArticle: async (req, res) => {
        try {
            const article = await Article.findOne({ slug: req.params.slug });
            const filter = {
                slug: req.params.slug
            }
            await Comment.deleteMany({slug: article._id});
            await Article.findOneAndDelete(filter);
            res.status(200).json("Deleted");
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = articleController;