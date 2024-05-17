require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const coinRouter = require('./controllers/coin');
const coinPageRouter = require('./controllers/coinPage');
const { userExtractor } = require('./middleware/auth');


(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI_TEST);
        console.log('Conectado a MongoDB');
    } catch (error) {
        console.log(error);
    }
})();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan('tiny')); // Mantenemos el logger de Morgan

// Rutas frontend
app.use('/', express.static(path.resolve('views', 'Home')));
app.use('/signup', express.static(path.resolve('views', 'signup')));
app.use('/login', express.static(path.resolve('views', 'login')));
app.use('/Page', express.static(path.resolve('views', 'Page')));
app.use('/verify/:id/:token', express.static(path.resolve('views', 'verify')));
app.use('/Components', express.static(path.resolve('views', 'Components')));

// Rutas backend
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/coin', coinRouter);
app.use('/api/coinPage', userExtractor, coinPageRouter);

module.exports = app;