const express = require('express');

const router = express.Router();

const userControll = require("../controllers/userControll");
const authMiddleWare = require('../middleWares/authMiddleWare')

router.post('/saveUser', userControll.saveUser)
router.post('/validateUser', userControll.validateUser)



module.exports = router;