const express = require('express');
const axios = require('axios');
const coinPageRouter = express.Router();

coinPageRouter.get('/', async (req, res) => {
    const url = process.env.COINGECKO_API_UR;

    try {
        const response = await axios.get(url); // Utilizar axios.get para hacer la solicitud HTTP
        const data = response.data; // axios devuelve directamente los datos, no es necesario llamar a .json()
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

module.exports = coinPageRouter;