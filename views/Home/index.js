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
            <p class="flex font-serif text-sm opacity-45 w-[45%] items-center">${symbol.toUpperCase()}</p>
            <p class="flex w-[45%] items-center ml-10">$${price}</p>
        </div>
    `;
    cryptoFct.appendChild(divElement);
}

// Función para obtener y mostrar las noticias de criptomonedas
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

// Definir las URL de las imágenes para cada criptomoneda
const imageUrls = {
    bitcoin: 'bitcoin.png',
    ethereum: 'ethereum.png',
    binancecoin: 'binance.png',
    'axie-infinity': 'axie-infinity.png'
};

// Llamada a la ruta del servidor backend para obtener los datos de las criptomonedas y las noticias
axios.get('/api/coin')
    .then(response => {
        const { prices, news } = response.data;

        // Verificar si 'prices' está definido
        if (prices) {
            // Mostrar la información de las criptomonedas
            Object.entries(prices).forEach(([symbol, dataObj]) => {
                const price = dataObj.usd;
                const imageUrl = imageUrls[symbol.toLowerCase()];
                displayCryptoInfo(symbol, price, imageUrl);
            });

            // Datos para el gráfico (obtenidos del servidor backend)
            const labels = Object.keys(prices);
            const cryptoPrices = Object.values(prices).map(dataObj => dataObj.usd);

            const ctx = document.getElementById('cryptoChart').getContext('2d');
            const myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Precio en USD',
                        data: cryptoPrices,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
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
        } else {
            console.error('Prices data is undefined');
        }

        // Verificar si 'news' está definido y mostrar las noticias de criptomonedas
        if (news) {
            displayNews(news);
        } else {
            console.error('News data is undefined');
        }
    })
    .catch(error => console.error(error));
