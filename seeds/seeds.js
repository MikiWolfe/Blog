const sequelize = require('../config/connection');
const seedPost = require('./postData');
const seedComment = require('./commentData');
const seedUsers = require('./userData');

const seedAll = async () => {
    await sequelize.sync({ force : true });

    await seedUsers();
    
    await seedPost();

    await seedComment();

    process.exit(0);
};

seedAll();
