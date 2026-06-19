const express = require('express');

const router = express.Router();

const heroControll = require("../controllers/heroControll");
const authMiddleWare = require('../middleWares/authMiddleWare')

router.post('/register', authMiddleWare, heroControll.heroRegister)
router.patch('/delete/:id', heroControll.deleteHero)
router.patch('/update/:id', heroControll.updateHero)
router.get('/getHero/', authMiddleWare, heroControll.getHero)



module.exports = router;