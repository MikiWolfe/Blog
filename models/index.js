const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// User has many posts
User.hasMany(Post, {
    foreignKey: 'id'
});

// Post belongs to user (Post.user_id)
Post.belongsTo(Post.user_id);

// User have many comments
User.hasMany(Comment, {
    foreignKey : 'id'
})

// Comments belongTo User (comment.user_id)
Comment.belongsTo(User, comment.user_id)

// Post have many Comments
Post.hasMany(Comment,{
    foreignKey: 'id'
})

// Comment belongTo Post (Comment.post_id)
Comment.belongsTo(Comment.post_id)

module.exports = {User, Post, Comment}
