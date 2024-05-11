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
    'axie-infinity': 'axie-infinity.png'
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