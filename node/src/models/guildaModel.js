
const db = require('../config/db');


async function getGuildaDataBase(){
    const [rows] =   await db.query("SELECT * FROM guilda") 
    console.log("resultado:", rows); 
    return rows;
}

async function myGuildaDataBase(userId){
    const [rows] =   await db.query("SELECT * FROM guilda WHERE fk_userId = ?", [userId]); 
    console.log("resultado:", rows); 
    return rows;
}

async function newGuilda(name, description,  userId,  tipo,){
    const [rows] =   await db.query("INSERT INTO guilda(name, description, fk_userId,  tipo) VALUES(?,?,?,?)", [name, description, userId,tipo]); 
    console.log("resultado:", rows); 
    return rows;
}

async function getGuildaTipo(guildaId) {
    const [[result]] = await db.query("SELECT tipo FROM guilda WHERE id = ?", [guildaId]);
    return result;
}

async function insertHeroIntoGuilda(guildaId, heroId) {
    const [result] = await db.query(
        "INSERT INTO guilda_heros (fk_guildaId, fk_heroId) VALUES (?, ?)",
        [guildaId, heroId]
    );
    return result;
}

async function getMyHeroes(userId) {
    const [result] = await db.query(
        `SELECT id, name, class, status FROM heros 
             WHERE render = 1 
             AND fk_userId = ? 
             AND id NOT IN (SELECT fk_heroId FROM guilda_heros)`,
            [userId]
    );
    return result;
}

async function heroJaEmGuilda(heroId) {
    const [[result]] = await db.query(
        "SELECT id FROM guilda_heros WHERE fk_heroId = ?",
        [heroId]
    );
    return !!result;
}




module.exports = {getGuildaDataBase, myGuildaDataBase, newGuilda,getGuildaTipo, insertHeroIntoGuilda, getMyHeroes, heroJaEmGuilda}