const { Post } = require('../models');

const postdata = [
  {
    title: "A little bit about me:",
    text: "My favourite front end lanuage is CSS and my favourite back end lanuage is Node."
  },
  {
    title: "First Post",
    text: "Welcome to my very first post! I am very glad to meet you! Thank you for checking out my page."
  }
];

const seedPost = () => Post.bulkCreate(postdata)

module.exports = seedPost; 
