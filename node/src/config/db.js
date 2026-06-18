const mysql = require('mysql2');
require('dotenv').config();

console.log('HOST:', process.env.DB_HOST);
console.log('USER:', process.env.DB_USER);
console.log('DB:', process.env.DB_NAME);

const conexao = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
})

module.exports = conexao.promise();