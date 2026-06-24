
const db = require('../config/db')
const bcrypt = require('bcrypt')

async function setUser(name, email, password) {
    const hash = await bcrypt.hash(password, 10);
    const [result] = await db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hash]);
    return result;
}

async function getUser(email, password) {
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = users[0];
    if (!user) return null;

    const senhaCorreta = await bcrypt.compare(password, user.password);
    if (!senhaCorreta) return null;

    return user;
}

async function getUserById(userId) {
    const [result] = await db.query("SELECT id, name, email, password FROM users WHERE id = ?", [userId]);
    return result[0];
}

async function updateUserDataBase(userId, fields) {
    const { name, email, password } = fields;
    await db.query("UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?", [name, email, password, userId]);
}

module.exports = {setUser, getUser, getUserById, updateUserDataBase}