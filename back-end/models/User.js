const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 50,
        unique: true
    },
    token: {
        type: String,
        default: null
    },
    username: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 20
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    bio:{
        type: String,
        default: ''
    },
    image:{
        type: String,
        default: 'https://images.squarespace-cdn.com/content/v1/54b7b93ce4b0a3e130d5d232/1519987020970-8IQ7F6Z61LLBCX85A65S/icon.png?format=750w'
    },
    following:{
        type: Boolean,
        default: false
    },
    followers:{
        type: Array,
        default: []
    },
    favoriteArticle: {
        type: Array,
        default: []
    },
    group:{
        type: Array,
        default: []
    }

},{timestamps: true});

userSchema.methods.isFollow = function (id){
    return this.followers.some((followID) => followID.toString() === id.toString());
}

userSchema.methods.isFavorite = function(id){
    return this.favoriteArticle.some(favoriteID => favoriteID.toString()===id.toString());
}

userSchema.methods.isJoinGroup = function(id){
  return this.group.some(groupID => groupID.toString() === id.toString());
}

userSchema.methods.unfollow = function(id){
    this.followers.remove(id);
    return this.save();
  };

userSchema.methods.follow = function(id){
    if(this.followers.indexOf(id) === -1){
      this.followers.push(id);
    }
    return this.save();
};

userSchema.methods.favorite = function(id){
    if(this.favoriteArticle.indexOf(id) === -1){
      this.favoriteArticle.push(id);
    }
    return this.save();
};
  
userSchema.methods.unfavorite = function(id){
    this.favoriteArticle.remove(id);
    return this.save();
};

userSchema.methods.joinGroup = function(id){
    if(this.group.indexOf(id) === -1){
      this.group.push(id);
    }
    return this.save();
};
  
userSchema.methods.leaveGroup = function(id){
    this.group.remove(id);
    return this.save();
};

userSchema.methods.toProfileJSONFor = function(user){
    return {
      username: this.username,
      bio: this.bio,
      image: this.image || 'https://static.productionready.io/images/smiley-cyrus.jpg',
      following: user ? user.isFollow(this._id) : false
    };
};

userSchema.methods.toUserJSON = function(user){
    return {
        email: this.email,
        token: this.token,
        username: this.username,
        password: this.password,
        bio: this.bio,
        image: this.image,
        following: user ? user.isFollow(this._id) : false,
        followers: this.followers,
        favoriteArticle: this.favoriteArticle,
        group: this.group
    };
};

module.exports = mongoose.model('User', userSchema);


