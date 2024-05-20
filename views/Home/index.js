const cryptoFct = document.querySelector('#cryptoFact');
const newsTitle = document.querySelector('#newsTitle');
const news1 = document.querySelector('#news1');
const news2 = document.querySelector('#news2');

// Función para obtener y mostrar el precio de una criptomoneda con su imagen
function displayCryptoInfo(symbol, price, imageUrl) {
    const divElement = document.createElement('div');
    divElement.innerHTML = `
        <div class="flex w-[45%] items-center">
            <img class="w-10 h-10 p-1" src="${imageUrl}" alt="${symbol.toUpperCase()}">
            <p class="flex font-serif text-xs md:text-sm opacity-45 w-[45%] items-center">${symbol.toUpperCase()}</p>
            <p class="flex w-[45%] text-xs md:text-sm items-center ml-10">$${price}</p>
        </div>
    `;
    cryptoFct.appendChild(divElement);
}

// Función para mostrar las noticias de criptomonedas
function displayNews(newsArray) {
    newsTitle.textContent = "Latest Crypto News";
    if (newsArray.length > 0) {
        news1.innerHTML = `
            <h3>${newsArray[0].title}</h3>
            <p>${newsArray[0].description}</p>
        `;
    }
    if (newsArray.length > 1) {
        news2.innerHTML = `
            <h3>${newsArray[1].title}</h3>
            <p>${newsArray[1].description}</p>
        `;
    }
}

const imageUrls = {
    btc: 'bitcoin.png',
    eth: 'ethereum.png',
    bnb: 'binance.png',
    axs: 'axie-infinity.png',
};

const apiKey = '9443728d14581ab9419f5cb56ab3af73540c6e3f34b664e5345dc2e0997f09b2'; // Coloca aquí tu clave de API de CryptoCompare

async function fetchAndDisplayCryptoInfo() {
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,BNB,AXS&tsyms=USD&api_key=${apiKey}`;
    try {
        // Realiza la solicitud GET a la API de CryptoCompare
        const response = await fetch(url);
        const data = await response.json();

        // Procesar los datos de precios de criptomonedas
        Object.entries(data.DISPLAY).forEach(([symbol, dataObj]) => {
            const price = dataObj.USD.PRICE;
            const imageUrl = imageUrls[symbol.toLowerCase()]; // Obtener la URL de la imagen correspondiente al símbolo de la criptomoneda
            displayCryptoInfo(symbol, price, imageUrl);
        });

        // Llamar a la función para mostrar el gráfico
        displayCryptoChart(data.DISPLAY);
    } catch (error) {
        console.error('Error fetching crypto data:', error);
    }
}

function displayCryptoChart(data) {
    const labels = Object.keys(data).map(symbol => symbol.toUpperCase());
    const prices = Object.values(data).map(dataObj => parseFloat(dataObj.USD.PRICE.replace(/[^0-9.-]+/g, ""))); // Obtén una matriz de precios

    const ctx = document.getElementById('cryptoChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Price in USD',
                data: prices,
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

async function fetchCryptoNews() {
    const newsUrl = `https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=${apiKey}`;

    try {
        // Realiza la solicitud GET a la API de CryptoCompare para obtener las noticias
        const response = await fetch(newsUrl);
        const newsData = await response.json();

        // Procesar y mostrar las noticias de criptomonedas
        displayNews(newsData.Data);
    } catch (error) {
        console.error('Error fetching crypto news:', error);
    }
}

// Llama a las funciones para obtener y mostrar la información de las criptomonedas y las noticias
fetchAndDisplayCryptoInfo();
fetchCryptoNews();
