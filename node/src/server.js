const express = require('express');
const cors = require('cors');

const heroRoutes = require('./routes/heroRoutes');
const userRoutes = require('./routes/userRoutes');
const guildaRoutes = require('./routes/guildaRoutes')

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // ✅ adiciona aqui

app.use(heroRoutes);
app.use(userRoutes);
app.use(guildaRoutes);

app.listen(5000, () => console.log('🚀 Server working on port 5000'));