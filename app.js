require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
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

app.use(express.json());

// Rutas frontend
app.use('/', express.static(path.resolve('Frontend', 'views', 'Home')));
app.use('/signup', express.static(path.resolve('Frontend', 'views', 'signup')));
app.use('/login', express.static(path.resolve('Frontend', 'views', 'login')));
app.use('/Page', express.static(path.resolve('Frontend', 'views', 'Page')));
app.use('/images', express.static(path.resolve('img')));
app.use('/verify/:id/:token', express.static(path.resolve('Frontend', 'views', 'verify')));

// Rutas backend
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/coin', coinRouter);
app.use('/api/coinPage', coinPageRouter);

module.exports = app;