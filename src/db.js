require('dotenv').config();
const mysql = require('mysql');

const db = mysql.createPool({
	host: process.env.HOST,
	password: process.env.PASSWORD,
	database: process.env.DATABASE,
	user: process.env.USER,
});

module.exports = db;
