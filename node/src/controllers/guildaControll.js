const db = require('../config/db');
const {getGuildaDataBase, myGuildaDataBase, newGuilda, getGuildaTipo, insertHeroIntoGuilda, getMyHeroes, heroJaEmGuilda} = require('../models/guildaModel')



exports.getGuilda = async (req, res) => {
 

    try {
        const guildas = await getGuildaDataBase(); 
        return res.status(201).json(guildas);

    } catch (error) {
        console.error("Couldn't find any Guilda", error);
        return res.status(500).json({ error: "Seerver Error" });
    }
};

exports.myGuilda = async (req, res) => {
    const userId = req.user.id;
    try {
        const guildas = await myGuildaDataBase(userId); 
        return res.status(201).json(guildas);

    } catch (error) {
        console.error("Couldn't find any Guilda", error);
        return res.status(500).json({ error: "Seerver Error" });
    }
}

exports.createGuilda = async (req, res) => {
    const {name, description, tipo } = req.body;
    const userId = req.user.id;
    try {
        const guildas = await newGuilda(name, description, userId,  tipo,); 
        return res.status(201).json(guildas);

    } catch (error) {
        console.error("Couldn't create Guilda", error);
        return res.status(500).json({ error: "Seerver Error" });
    }
}

exports.insertIntoGuilda = async (req, res) => {
    const { guildaId, heroIds } = req.body;

    try {
        const guilda = await getGuildaTipo(guildaId);

        for (const heroId of heroIds) {
            const jaEstaNaGuilda = await heroJaEmGuilda(heroId);
            if (jaEstaNaGuilda) {
                return res.status(400).json({ error: `Herói ${heroId} já está em uma guilda!` });
            }
            await insertHeroIntoGuilda(guildaId, heroId);
        }

        return res.status(201).json({ message: "Heróis inseridos com sucesso" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server Error" });
    }
}

exports.myHeroes = async (req, res) => {
    const userId = req.user.id;
     console.log("userId recebido:", userId);
    try {
        const herois = await getMyHeroes(userId);
             console.log("herois encontrados:", herois)
        return res.status(200).json(herois);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server Error" });
    }
}