const mysql = require('mysql2');

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    port: '3310',
    database: 'hero'
})

module.exports = conexao.promise();