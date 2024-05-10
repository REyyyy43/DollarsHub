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

