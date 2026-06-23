const db = require('../config/db');
const { z } = require('zod');
const {getGuildaDataBase, myGuildaDataBase} = require('../models/guildaModel')



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

