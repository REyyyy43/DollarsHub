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
const logoutRouter = require('./controllers/logout');
const { userExtractor } = require('./middleware/auth');
const { MONGO_URI } = require('./config');

(async () => {
    try {
        await mongoose.connect(MONGO_URI);
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
app.use('/styles', express.static(path.resolve('views', 'styles')));
app.use('/login', express.static(path.resolve('views', 'login')));
app.use('/Page', express.static(path.resolve('views', 'Page')));
app.use('/verify/:id/:token', express.static(path.resolve('views', 'verify')));
app.use('/Components', express.static(path.resolve('views', 'Components')));

// Rutas backend
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/coin', coinRouter);
app.use('/api/coinPage', userExtractor, coinPageRouter);

module.exports = app;