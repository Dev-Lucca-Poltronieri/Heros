const express = require('express');
const cors = require('cors');

const heroControll = require('./controllers/heroControll');
const userControll = require('./controllers/userControll');

const app = express();
app.use(cors());
app.use(express.json())

app.post('/register', heroControll.heroRegister)
app.patch('/delete/:id', heroControll.deleteHero)
app.patch('/update/:id', heroControll.updateHero)
app.get('/getHero', heroControll.getHero)

app.post('/saveUser', userControll.saveUser)

app.listen(5000, () => console.log('🚀 Servidor rodando na porta 5000'));

