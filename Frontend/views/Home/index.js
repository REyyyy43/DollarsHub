const cryptoFct = document.querySelector('#cryptoFact');

// Función para obtener y mostrar el precio de una criptomoneda
function displayCryptoPrice(symbol, price) {
    const pElement = document.createElement('p');
    pElement.textContent = `${symbol.toUpperCase()} - Precio: $${price}`;
    cryptoFct.appendChild(pElement);
}

// Llamada a la ruta del servidor backend para obtener los precios de las criptomonedas
fetch('http://localhost:3003/crypto-prices')
    .then(response => response.json())
    .then(data => {
        Object.entries(data).forEach(([symbol, price]) => {
            displayCryptoPrice(symbol, price);
        });

        // Datos para el gráfico (obtenidos del servidor backend)
        const labels = Object.keys(data);
        const prices = Object.values(data);

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
    .catch(error => console.error('Error fetching data:', error));