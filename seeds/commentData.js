const { Comment } = require('../models');
  
 const commentdata = [
  {
    comment_text : "Great Post! 5 stars!",
    user_id : 2,
    post_id : 2
  },
  {
    comment_text: "I disagree.",
    user_id : 1,
    post_id : 1
  }
];

const seedComment = () => Comment.bulkCreate(commentdata)

module.exports = seedComment
