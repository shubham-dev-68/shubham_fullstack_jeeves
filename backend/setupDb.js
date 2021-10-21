require("dotenv").config();

// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.ROOT_DB_USER,
    password: process.env.ROOT_DB_PASS
});

// connect 
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    // create database
    connection.query("CREATE DATABASE "+process.env.DB_NAME, function(err, result) {
        if (err) throw err;
        console.log("Database created");
    });
});