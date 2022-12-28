const mongoose = require('mongoose');
var User = mongoose.model('User');
var Group = require('./Group')

const schema = new mongoose.Schema({
    slug:{
        type: String,
        default: null,
        unique: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    tagList:{
        type: [String],
        default: []
    },
    favorited:{
        type: Boolean,
        default: false
    },
    favoritesCount:{
        type: Number,
        default: 0
    },
    group:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: Group,
        default: null,
    },
    groupName:{
        type: String,
        default: null,
    },
    author:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: User,
    }
}, { timestamps: true }
);

schema.methods.toJSONFor = function(user){
    return {
        slug: this.slug,
        title: this.title,
        description: this.description,
        body: this.body,
        tagList: this.tagList,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        favorited: user ? user.isFavorite(this._id) : false,
        userFavorited: this.userFavorited,
        favoritesCount: this.favoritesCount,
        group: this.group,
        groupName: this.groupName,
        author: this.author.toProfileJSONFor(user)
    };
};

module.exports = mongoose.model('Article', schema);