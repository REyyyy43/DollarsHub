const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

app.get('/crypto', async (req, res) => {
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,axie-infinity&vs_currencies=usd';

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
