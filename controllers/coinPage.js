const express = require('express');
const axios = require('axios');
const coinPageRouter = express.Router();

coinPageRouter.get('/', async (req, res) => {
    const priceUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,axie-infinity,litecoin,ripple,cardano,polkadot,solana,chainlink,stellar,dogecoin&vs_currencies=usd';
    const newsUrl = 'https://cryptonews-api.com/api/v1/category?section=general&items=10&token=YOUR_API_KEY'; // Reemplaza YOUR_API_KEY con tu clave API

    try {
        const [priceResponse, newsResponse] = await Promise.all([
            axios.get(priceUrl),
            axios.get(newsUrl)
        ]);

        const prices = priceResponse.data;
        const news = newsResponse.data;

        res.json({ prices, news });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

module.exports = coinPageRouter;