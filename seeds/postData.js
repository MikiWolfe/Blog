const { Post } = require('../models');

const postdata = [
  {
    title: "A little bit about me:",
    post_text: "My favourite front end lanuage is CSS and my favourite back end lanuage is Node.",
    user_id:3
  },
  {
    title: "First Post",
    post_text: "Welcome to my very first post! I am very glad to meet you!",
    user_id: 4
  }
];

const seedPost = () => Post.bulkCreate(postdata)

module.exports = seedPost; 
