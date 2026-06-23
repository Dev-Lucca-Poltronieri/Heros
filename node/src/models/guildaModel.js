
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


module.exports = {getGuildaDataBase, myGuildaDataBase, newGuilda}