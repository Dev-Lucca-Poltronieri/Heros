const express = require('express');

const router = express.Router();

const guildaControll = require("../controllers/guildaControll");
const authMiddleWare = require('../middleWares/authMiddleWare')

router.get('/getGuilda', guildaControll.getGuilda)
router.get('/myGuilda', authMiddleWare, guildaControll.myGuilda )
router.post('/createGuilda', authMiddleWare, guildaControll.createGuilda)
router.post('/insertIntoGuilda', authMiddleWare, guildaControll.insertIntoGuilda)
router.get('/myHeroes', authMiddleWare, guildaControll.myHeroes)





module.exports = router;