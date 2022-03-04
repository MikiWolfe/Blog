const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

// User has many posts
User.hasMany(Post, {
  foreignKey: "user_id",
});

// Post belongs to user (Post.user_id)
Post.belongsTo(User, {
  foreignKey: "user_id",
});

// User have many comments
User.hasMany(Comment, {
  foreignKey: "user_id",
});

// Comments belongTo User (comment.user_id)
Comment.belongsTo(User, {
  foreignKey: "user_id",
});

// Post have many Comments
Post.hasMany(Comment, {
  foreignKey: "post_id",
});

// Comment belongTo Post (Comment.post_id)
Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

module.exports = { User, Post, Comment };
