const express = require('express');

const router = express.Router();

const guildaControll = require("../controllers/guildaControll");
const authMiddleWare = require('../middleWares/authMiddleWare')

router.get('/getGuilda', guildaControll.getGuilda)




module.exports = router;