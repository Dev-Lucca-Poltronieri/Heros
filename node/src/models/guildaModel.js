
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



module.exports = {getGuildaDataBase, myGuildaDataBase}