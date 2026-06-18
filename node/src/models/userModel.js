
const db = require('../config/db')

async function setUser(name, email, password) {

    const [result] = await db.query("INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)", [ name, email, password,]) // trocar de acordo com o banco
    return result;    
     
}

async function getUser(email, password){
    const [users] = await db.query(
            'SELECT * FROM users where email = ? and senha = ?', // trocar de acordo com o banco
            [email, password]
        )

        return users
}

module.exports = {setUser, getUser}