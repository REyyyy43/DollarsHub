const express = require('express');
const axios = require('axios');
const coinRouter = express.Router();

const NEWS_API_KEY = process.env.API_KEY; // Reemplaza con tu clave de API de NewsAPI

coinRouter.get('/', async (req, res) => {
    const priceUrl = process.env.COINGECKO_API_UR;
    const newsUrl = process.env.NEWS_API_KEY;

    try {
        const [priceResponse, newsResponse] = await Promise.all([axios.get(priceUrl), axios.get(newsUrl)]);
        
        const prices = priceResponse.data;
        const news = newsResponse.data.articles.map(article => ({
            title: article.title,
            description: article.description,
        }));
        
        res.json({ prices, news });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

module.exports = coinRouter;