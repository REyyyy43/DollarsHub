const form = document.querySelector("#coin-form");
const coin = document.querySelector("#coin");
const crypto = document.querySelector("#crypto");
const amount = document.querySelector("#amount");
const coinInfo = document.querySelector("#coin-info");

form.addEventListener('submit', async e => {
    e.preventDefault();
    const coinSelected = [...coin.children].find(option => option.selected).value;
    const cryptoSelected = [...crypto.children].find(option => option.selected).value;
    const amountValue = amount.value;

    try {
        const response = await (await fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoSelected}&tsyms=${coinSelected}`)).json();
        const price = response.DISPLAY[cryptoSelected][coinSelected].PRICE;
        const priceHigh = response.DISPLAY[cryptoSelected][coinSelected].HIGH24HOUR;
        const priceLow = response.DISPLAY[cryptoSelected][coinSelected].LOW24HOUR;
        const variation = response.DISPLAY[cryptoSelected][coinSelected].CHANGEPCT24HOUR;

        if (amountValue != '') {

        const result = Number(amountValue) / response.RAW[cryptoSelected][coinSelected].PRICE
        coinInfo.innerHTML = `
       
        <img class="w-36 text-amber-500 absolute top-1/2 left-1/2 opacity-30 transform -translate-x-1/2 -translate-y-1/2 z-0" src="cryptocurrency.png" alt="1">
        <p class="info">El precio es: <span class="price font-bold">${price}</span></p>
        <p class="info">El precio mas alto: <span class="price font-bold">${priceHigh}</span></p>
        <p class="info">El precio mas bajo: <span class="price font-bold">${priceLow}</span></p>
        <p class="info">Variacion 24H: <span class="price font-bold">${variation}%</span></p>
        <p class="info">Puede comprar: <span class="price font-bold">${result.toFixed(4)} ${cryptoSelected}</span></p>
        `;
        } else {
            coinInfo.innerHTML = `
            <img class="w-36 text-amber-500 absolute top-1/2 left-1/2 opacity-30 transform -translate-x-1/2 -translate-y-1/2 z-0" src="cryptocurrency.png" alt="1">
            <p class="info">El precio es: <span class="price font-bold">${price}</span></p>
            <p class="info">El precio mas alto: <span class="price font-bold">${priceHigh}</span></p>
            <p class="info">El precio mas bajo: <span class="price font-bold">${priceLow}</span></p>
            <p class="info">Variacion 24H: <span class="price font-bold">${variation}%</span></p>
            `;
        }

       

    } catch (error) {
        console.log(error);
    }
});

const cryptoFct = document.querySelector('#cryptoFact');

// Función para obtener y mostrar el precio de una criptomoneda con su imagen
function displayCryptoInfo(symbol, price, imageUrl) {
    // Crear un elemento div para contener la información de la criptomoneda
    const divElement = document.createElement('div');
    
    // Agregar el contenido HTML al div
    divElement.innerHTML = `
    <div class="flex w-[45%] items-center">
    <img class="w-10 h-10 p-1" src="${imageUrl}" alt="${symbol.toUpperCase()}">
    <p class="flex font-serif text-sm opacity-45 w-[45%] items-center">${symbol.toUpperCase()}</p> <!-- Separación horizontal -->
    <p class="flex w-[45%]  items-center ml-10">$${price}</p> <!-- Agrega un margen a la izquierda -->
</div>
    `;
    
    // Agregar el div al contenedor principal
    cryptoFct.appendChild(divElement);
}

// Definir las URL de las imágenes para cada criptomoneda
const imageUrls = {
    bitcoin: 'bitcoin.png',
    ethereum: 'ethereum.png',
    binancecoin: 'binance.png',
    'axie-infinity': 'axie-infinity.png',
    cardano:'cardano.png',
    chainlink:'chainlink.png',
    dogecoin:'dogecoin.png',
    litecoin:'litecoin.png',
    polkadot:'polkadot.png',
    ripple:'ripple.png',
    solana:'solana.png',
    stellar:'stellar.png'
};

// Llamada a la ruta del servidor backend para obtener los datos de las criptomonedas
axios.get('/api/coin')
    .then(response => {
        const data = response.data;
        Object.entries(data).forEach(([symbol, dataObj]) => {
            const price = dataObj.usd;
            const imageUrl = imageUrls[symbol.toLowerCase()]; // Obtener la URL de la imagen correspondiente al símbolo de la criptomoneda
            displayCryptoInfo(symbol, price, imageUrl);
        });

        // Datos para el gráfico (obtenidos del servidor backend)
        const labels = Object.keys(data);
        const prices = Object.values(data).map(dataObj => dataObj.usd); // Obtén una matriz de precios

        const ctx = document.getElementById('cryptoChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Precio en USD',
                    data: prices,
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
    })
    .catch(error => console.error(error));
