const { getChallanges,adicionarCoinsDataBase, getCoinsDataBase, verificarEConcluirDataBase, getMissoesCompletasDataBase, ativarMissaoDataBase, skipMissaoDataBase, getProximaMissaoDataBase, contarHerosDataBase, verificarMissoesDataBase, getProgressoDataBase} = require('../models/missoesModel')

exports.getMissoes = async (req, res) => {
    const userId = req.user.id;
    try {
        const rows = await getChallanges(userId);
        return res.status(200).json(rows);
    } catch (error) {
        return res.status(500).json({ error: "Server Error" });
    }
}

exports.getMissoesCompletas = async (req, res) => {
    const userId = req.user.id; // ✅ adicionado
    try {
        const rows = await getMissoesCompletasDataBase(userId);
        return res.status(200).json(rows);
    } catch (error) {
        return res.status(500).json({ error: "Server Error" });
    }
}

exports.ativarMissao = async (req, res) => {
    const userId = req.user.id; // ✅ adicionado
    try {
        const proxima = await getProximaMissaoDataBase(userId); // ✅ passa userId

        if (!proxima) {
            return res.status(400).json({ error: "Nenhuma missão disponível para ativar" });
        }

        await ativarMissaoDataBase(userId, proxima.id); // ✅ passa userId e id da missão
        return res.status(200).json({ message: "Missão ativada ✅" });
    } catch (error) {
        return res.status(500).json({ error: "Server Error" });
    }
}

exports.skipMissao = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id; // ✅ adicionado
    try {
        await skipMissaoDataBase(userId, id); // ✅ passa userId e id da missão
        return res.status(200).json({ message: "Missão ignorada" });
    } catch (error) {
        return res.status(500).json({ error: "Server Error" });
    }
}

exports.getProgresso = async (req, res) => {
    const userId = req.user.id;
    try {
       
        const progresso = await getProgressoDataBase(userId);
         console.log("Progresso:", progresso);
        return res.status(200).json(progresso);
    } catch (error) {
        return res.status(500).json({ error: "Server Error" });
    }
}

exports.verificarMissoes = async (req, res) => {
    const userId = req.user.id;
    try {
        await adicionarCoinsDataBase(userId, 10); // ✅ sempre adiciona 10
        await verificarEConcluirDataBase(userId);  // conclui a missão no banco
        const coins = await getCoinsDataBase(userId);
        return res.status(200).json({ coins });
    } catch (error) {
        return res.status(500).json({ error: "Server Error" });
    }
}

exports.getCoins = async (req, res) => {
    const userId = req.user.id;
    try {
        const coins = await getCoinsDataBase(userId);
        return res.status(200).json({ coins });
    } catch (error) {
        return res.status(500).json({ error: "Server Error" });
    }
}