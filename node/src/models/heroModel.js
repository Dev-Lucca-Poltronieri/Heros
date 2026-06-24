
const db = require('../config/db');


async function setHero(nome, classe, status, imagem, userId){
    const [result] =   await db.query("INSERT INTO heros (name, `class`, status, img, fk_userId) VALUES (?, ?, ?, ?, ?)", [nome, classe, status, imagem, userId]) //verificar de acordo com o banco
    return result;
}

async function deleteHero(id){
    const [result] = await db.query(
            "UPDATE heros SET render = ? WHERE id = ?",
            [false, id]
        );
    return result;
}


async function updateHero(id, status){
    const [result] =   await db.query("UPDATE heros SET status = (?) WHERE id = (?) ", [status, id])
    return result;
}



module.exports = {setHero, deleteHero, updateHero}