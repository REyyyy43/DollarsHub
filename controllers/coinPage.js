const express = require('express');
const axios = require('axios');
const coinPageRouter = express.Router();

// Configura tu API Key de CryptoCompare

const apiKey = process.env.CRYPTOCOMPARE_API_KEY

coinPageRouter.get('/', async (req, res) => {
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,BNB,AXS,LTC,XRP,ADA,DOT,SOL,LINK,XLM,DOGE&tsyms=USD&api_key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const data = response.data.DISPLAY;
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

module.exports = coinPageRouter;