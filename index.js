require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('./config/logger');

const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
    }
);

app.use('/api/usuarios', userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});