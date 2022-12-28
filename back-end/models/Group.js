const mongoose = require('mongoose');
var User = mongoose.model('User');

const schema = new mongoose.Schema({
    groupName:{
        type: String,
        unique: true
    },
    description:{
        type: String,
    },
    groupImage:{
        type: String,
        default: 'https://www.kindpng.com/picc/m/419-4196045_group-head-avatar-icon-group-png-transparent-png.png'
    },
    rules:{
        type: String,
        default: ''
    },
    join:{
        type: Boolean,
        default: false
    },
    member:{
        type: [{type: mongoose.Schema.Types.ObjectId, ref: User,}],
        default: []
    },
    listArticle:{
        type: Array,
        default: []
    },
    admin:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: User,
    }
},  { 
        timestamps: true,
    }
);

schema.methods.toGroupJSONFor = function(user){
    return {
        groupName: this.groupName,
        description: this.description,
        groupImage: this.groupImage || 'https://www.kindpng.com/picc/m/419-4196045_group-head-avatar-icon-group-png-transparent-png.png',
        rules: this.rules,
        join: user ? user.isJoinGroup(this._id) : false,
        member: this.member,
        listArticle: this.listArticle,
        admin: this.admin.toProfileJSONFor(user),
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

module.exports = mongoose.model('Group', schema);