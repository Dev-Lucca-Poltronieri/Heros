const db = require('../config/db');
const { z } = require('zod');
const {getGuildaDataBase} = require('../models/guildaModel')



exports.getGuilda = async (req, res) => {
 

    try {
        const guildas = await getGuildaDataBase(); 
        return res.status(201).json(guildas);

    } catch (error) {
        console.error("Couldn't find any Guilda", error);
        return res.status(500).json({ error: "Seerver Error" });
    }
};

