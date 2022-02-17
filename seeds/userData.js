// const sequelize = require('../config/connection');
const { User } = require('../models');

const userdata = [
    {
        username : "Din Djarin",
        password : "OberynMartell"
    },
    {
        username : "The Mandalorian",
        password: "ThisIsTheWay"
    },

    {
        username : "Ahsoka",
        password : "AnakinSux"
    },
    {
        username : "Luke Skywalker",
        password : "TheBestSkywalker"
    },
    {
        username : "Boba Fett",
        password : "Slave1"
    },
    {
        username : "Grogu",
        password : "YodaWho"
    },
    {
        username : "Fennec Shand",
        password : "CantTellImPartRobot"
    }
]



const seedUsers = () => User.bulkCreate(userdata, {individualHooks : true})


module.exports = seedUsers
