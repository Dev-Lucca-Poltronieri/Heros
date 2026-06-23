const db = require('../config/db');
const { z } = require('zod');
const {getGuildaDataBase, myGuildaDataBase, newGuilda} = require('../models/guildaModel')



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

