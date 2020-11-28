const mysql = require('mysql')
const dotenv = require('dotenv')

dotenv.config({ path: './config' })

const conn = mysql.createConnection({
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD
});
module.exports = conn;