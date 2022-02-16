const { Comment } = require('../models');
  
 const commentdata = [
  {
    text: "Great Post! 5 stars!"
  },
  {
    text: "I disagree."
  }
];

const seedComment = () => Comment.bulkCreate(commentdata)

module.exports = seedComment
