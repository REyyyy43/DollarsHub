require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const usersRouter = require('./Backend/controllers/users');
const loginRouter = require('./Backend/controllers/login');
const coinRouter = require('./Backend/controllers/coin');
const coinPageRouter = require('./Backend/controllers/coinPage');

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
app.use('/', express.static(path.resolve('Frontend', 'views', 'Home')));
app.use('/signup', express.static(path.resolve('Frontend', 'views', 'signup')));
app.use('/login', express.static(path.resolve('Frontend', 'views', 'login')));
app.use('/Page', express.static(path.resolve('Frontend', 'views', 'Page')));
app.use('/verify/:id/:token', express.static(path.resolve('Frontend', 'views', 'verify')));

// Rutas backend
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/coin', coinRouter);
app.use('/api/coinPage', coinPageRouter);

module.exports = app;