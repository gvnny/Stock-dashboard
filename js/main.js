
const openModal = (idModal) => {
    const divModal = document.querySelector(idModal) // pesquisa um elemento do html
    divModal.style.display = "flex" // substitui o estilo do display no css
}

const closeModal = (idModal) => {
    const divModal = document.querySelector(idModal)
    divModal.style.display = "none";
}

const handleModalClose = (event) => {
    if(event.target.className === "modal"){
        event.target.style.display = "none";
    }
}

const arrayListObjectTicker = [];

console.log('Array na inicialização: '+arrayListObjectTicker);

const handleAddTicker = async (event) => {
    event.preventDefault();
    const ticker = event.target.ticker.value;

    const verificaArray = () => {

        if(arrayListObjectTicker.length == 0) {
            return 0;
        } else if (arrayListObjectTicker.length != 0) {
    
            for(i=0; i <= arrayListObjectTicker.length; i++){
                if (ticker === arrayListObjectTicker[i].ticker) {
                    console.log(ticker);
                    return 1;
                    //
                } else {
                    console.log(ticker);
                    return 2
                }
            }
        }
    
        // 0 -> Vetor Vazio
        // 1 -> Ticker já existente no vetor
        // 2 -> Ticker não existente no vetor
        
    } 

    if (verificaArray() == 0 || verificaArray() == 2) {
        console.log('Resultado do verifica valor: '+verificaArray());
        try{
            const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=XXXXXXXXXX`);
            //P736UCPWLNYXPCH5
            const data = await response.json();
            const price = data["Global Quote"]["05. price"];
            const priviousClosePrice = data["Global Quote"]["08. previous close"];
    
            if(price && priviousClosePrice) {
    
                const priceFormatted = parseFloat(price).toFixed(2);
                const priviousClosePriceFormatted = parseFloat(priviousClosePrice).toFixed(2);
                let priceChange = '';
                let symbol = '';
    
                if(priceFormatted !== priviousClosePriceFormatted) {
    
                    if(priceFormatted > priviousClosePriceFormatted) {
                        priceChange = 'increase';
                        symbol = '+';
                    } else {
                        priceChange = 'decrease';
                        symbol = '-';
                    }
    
                }
    
                const newTicker = 
                                    `<div class="ticker">
                                    <button class="btn-close" onclick="removeTicker(event)">x</button>
                                        <h2>${ticker}</h2>
                                        <p class="${priceChange}">${symbol} $${priceFormatted}</p>
                                    </div>`;
    
                const tickerList = document.querySelector("#tickers-list");
                tickerList.innerHTML = newTicker + tickerList.innerHTML;
                addTickersCloseEvent();
                closeModal('#add-stock');
    
                const objectTicker = {
                    ticker,
                    priceFormatted,
                    symbol,
                    priceChange
                }
    
                console.log(objectTicker);
    
                arrayListObjectTicker.push(objectTicker);
    
                console.log(arrayListObjectTicker);
    
            } else {
                alert(`Ticker ${ticker} não encontrado`);
            }
        } catch (error) {
            alert(error);
        }
    } else {
        alert(`O tiker ${ticker} já foi adicionado anterirmente`);
    }

}

const refreshTicker = async (event) => {
    const divticker = event.target.closest('ticker');
    const ticker = divticker.querySelector('h2').textContent
    const pPrice = divticker.querySelector('p').textContent
    const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=XXXXXXXXXX`);
            //P736UCPWLNYXPCH5
            const data = await response.json();
            const price = data["Global Quote"]["05. price"];
            const priviousClosePrice = data["Global Quote"]["08. previous close"];
    
            if(price && priviousClosePrice) {
    
                const priceFormatted = parseFloat(price).toFixed(2);
                const priviousClosePriceFormatted = parseFloat(priviousClosePrice).toFixed(2);
                let priceChange = '';
                let symbol = '';
    
                if(priceFormatted !== priviousClosePriceFormatted) {
    
                    if(priceFormatted > priviousClosePriceFormatted) {
                        priceChange = 'increase';
                        symbol = '+';
                    } else {
                        priceChange = 'decrease';
                        symbol = '-';
                    }
    
                }
                pPrice.innerHTML = `${symbol} ${priceFormatted}`;
                pPrice.className = priceChange;
            }else {
                alert(`Ticker ${ticker} não encontrado`);
            }
}

const handleTickerMouseEnter = (event) => {

    const ticker = event.target
    const btnClose = ticker.querySelector(".btn-close");
    btnClose.style.display = "block";
    btnRefresh.style.display = "block";
}


const addTickersCloseEvent = () => {
    const ticker = document.querySelectorAll(".ticker");
    ticker.forEach ((ticker) =>  {
    ticker.addEventListener("mouseenter", handleTickerMouseEnter);
    ticker.addEventListener("mouseleave", handleTickerMouseLeave);
})
}

const handleTickerMouseLeave = (event) => {
    const ticker = event.target
    const btnClose = ticker.querySelector(".btn-close");
    const btnRefresh = ticker.querySelector(".btn-refresh");
    btnClose.style.display = "none";
    btnRefresh.style.display = "none";
}

const removeTicker = (event) => {
    const btnClose = event.target // target mostra elemento foi clicado ou a ação expecifica;
    const ticker = btnClose.closest(".ticker");
    ticker.remove();
}

const modal = document.querySelector(".modal");
modal.addEventListener("click", handleModalClose); // adiciona um evendo a classe modal

addTickersCloseEvent();

