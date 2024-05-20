const express = require('express');
const axios = require('axios');
const coinRouter = express.Router();

const NEWS_API_KEY = process.env.API_KEY; // Reemplaza con tu clave de API de NewsAPI
const apiKey = process.env.CRYPTOCOMPARE_API_KEY

coinRouter.get('/', async (req, res) => {
    const priceUrl = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,BNB,AXS,LTC,XRP,ADA,DOT,SOL,LINK,XLM,DOGE&tsyms=USD&api_key=${apiKey}`;
     const newsUrl = `https://newsapi.org/v2/everything?q=cryptocurrency&apiKey=${NEWS_API_KEY}`;

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