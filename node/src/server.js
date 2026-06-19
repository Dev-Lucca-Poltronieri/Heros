const express = require('express');
const cors = require('cors');



const heroRoutes = require('./routes/heroRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json())


app.use(heroRoutes);
app.use(userRoutes);


app.listen(5000, () => console.log('🚀 Server working on port 5000'));

