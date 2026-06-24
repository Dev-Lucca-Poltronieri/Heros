const db = require('../config/db');

async function getChallanges(userId) {

    const [result] = await db.query(`
        SELECT c.id, c.name, c.description, c.goal, uc.render, uc.status
        FROM challanges c
        INNER JOIN user_challanges uc ON c.id = uc.fk_challange_id
        WHERE uc.fk_userId = ? AND uc.render = 1 AND uc.status = 0
    `, [userId]);
    return result;
}
async function getMissoesCompletasDataBase(userId) {
    const [result] = await db.query(`
        SELECT c.id, c.name, c.description, c.goal, uc.render, uc.status
        FROM challanges c
        INNER JOIN user_challanges uc ON c.id = uc.fk_challange_id
        WHERE uc.fk_userId = ? AND uc.status = 1
    `, [userId]);
    return result;
}

async function ativarMissaoDataBase(userId, challange_id) {
    await db.query(`
        INSERT INTO user_challanges (fk_userId, fk_challange_id, render, status)
        VALUES (?, ?, 1, 0)
    `, [userId, challange_id]);
}

async function skipMissaoDataBase(userId, challange_id) {
    await db.query(`
        UPDATE user_challanges SET render = 0
        WHERE fk_userId = ? AND fk_challange_id = ?
    `, [userId, challange_id]);
}

async function contarHerosDataBase(userId) {
    const [result] = await db.query(
        "SELECT COUNT(*) as total FROM heros WHERE fk_userId = ?", [userId]
    );
    return result[0].total;
}

async function verificarMissoesDataBase(userId) {
    const total = await contarHerosDataBase(userId);
    await db.query(`
        UPDATE user_challanges uc
        INNER JOIN challanges c ON c.id = uc.fk_challange_id
        SET uc.status = 1, uc.render = 0
        WHERE uc.fk_userId = ? AND uc.render = 1 AND uc.status = 0 AND c.goal <= ?
    `, [userId, total]);
}

async function getProximaMissaoDataBase(userId) {
    const [result] = await db.query(`
        SELECT c.id FROM challanges c
        WHERE c.id NOT IN (
            SELECT fk_challange_id FROM user_challanges WHERE fk_userId = ?
        )
        LIMIT 1
    `, [userId]);
    return result[0];
}

async function getProgressoDataBase(userId) {
    const [missoes] = await db.query(`
        SELECT c.id, c.goal FROM challanges c
        INNER JOIN user_challanges uc ON c.id = uc.fk_challange_id
        WHERE uc.fk_userId = ? AND uc.render = 1 AND uc.status = 0
    `, [userId]);

    const total = await contarHerosDataBase(userId);

    const progresso = missoes.map(m => ({
        id: m.id,
        total,
        goal: m.goal,
        porcentagem: Math.min(Math.round((total / m.goal) * 100), 100)
    }));

    return progresso;
}

async function verificarEConcluirDataBase(userId) {
    const total = await contarHerosDataBase(userId);
    const [result] = await db.query(`
        UPDATE user_challanges uc
        INNER JOIN challanges c ON c.id = uc.fk_challange_id
        SET uc.status = 1, uc.render = 0
        WHERE uc.fk_userId = ? AND uc.render = 1 AND uc.status = 0 AND c.goal <= ?
    `, [userId, total]);
    return result.affectedRows;
}

async function adicionarCoinsDataBase(userId, quantidade) {
    await db.query("UPDATE users SET coins = coins + ? WHERE id = ?", [quantidade, userId]);
}

async function getCoinsDataBase(userId) {
    const [result] = await db.query("SELECT coins FROM users WHERE id = ?", [userId]);
    return result[0].coins;
}


module.exports = {
    getChallanges, getMissoesCompletasDataBase, ativarMissaoDataBase,
    skipMissaoDataBase, getProximaMissaoDataBase, getProgressoDataBase,
    contarHerosDataBase, verificarMissoesDataBase, verificarEConcluirDataBase, adicionarCoinsDataBase, getCoinsDataBase
}