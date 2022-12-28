const mongoose = require('mongoose');
var User = mongoose.model('User');
var Article = mongoose.model('Article');

const schema = new mongoose.Schema({
    slug:{
        type: mongoose.Schema.Types.ObjectId,
        ref: Article
    },
    body:{
        type: String,
        required: true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: User
    }
},  { 
        timestamps: true,
    }
);

schema.methods.toJSONFor = function(user){
    return {
        id: this._id,
        body: this.body,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        author: this.author.toProfileJSONFor(user)
    };
  };

module.exports = mongoose.model('Comment', schema);