const express = require('express');
const cors = require('cors');

const db = require('./controllers/heroControll')

const app = express();
app.use(cors());
app.use(express.json())

app.post('/register', db.heroRegister)
app.delete('/delete/:id', db.deleteHero)
app.patch('/update/:id', db.updateHero)
app.get('/getHero', db.getHero)

app.listen(5000, () => console.log('🚀 Servidor rodando na porta 5000'));

