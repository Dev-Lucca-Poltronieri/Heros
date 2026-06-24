const express = require('express');
const upload = require('../middleWares/upload');

const router = express.Router();

const missaoControll = require("../controllers/missoesControll");
const authMiddleWare = require('../middleWares/authMiddleWare')

router.get('/getMissoes', authMiddleWare, missaoControll.getMissoes)
router.get('/getMissoesCompletas', authMiddleWare, missaoControll.getMissoesCompletas)
router.patch('/ativarMissao', authMiddleWare, missaoControll.ativarMissao)
router.patch('/skipMissao/:id', authMiddleWare, missaoControll.skipMissao)
router.get('/getProgresso', authMiddleWare, missaoControll.getProgresso)
router.post('/verificarMissoes', authMiddleWare, missaoControll.verificarMissoes)
router.get('/getCoins', authMiddleWare, missaoControll.getCoins)
router.post('/verificarMissoes', authMiddleWare, missaoControll.verificarMissoes)



module.exports = router;