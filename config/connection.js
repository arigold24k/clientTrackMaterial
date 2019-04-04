const mysql = require('mysql');
require('dotenv').config();


let connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:process.env.DBKEY,
    database:'testDB',
});

connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

module.exports = connection;


// const Sequelize = require('sequelize');
//
// // Option 1: Passing parameters separately
// const sequelize = new Sequelize('', 'username', 'password', {
//     host: 'localhost',
//     dialect: 'mysql'
// });