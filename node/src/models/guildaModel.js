
const db = require('../config/db');


async function getGuildaDataBase(){
    const [rows] =   await db.query("SELECT * FROM guilda") 
    console.log("resultado:", rows); 
    return rows;
}



module.exports = {getGuildaDataBase}