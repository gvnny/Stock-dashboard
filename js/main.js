
const openModal = (idModal) => {
    const divModal = document.querySelector(idModal) // pesquisa um elemento do html
    divModal.style.display = "flex" // substitui o estilo do display no css
}

const closeModal = (idModal) => {
    const divModal = document.querySelector(idModal)
    divModal.style.display = "none"
}

const handleModalClose = (event) => {
    if(event.target.className === "modal"){
        event.target.style.display = "none"
    }
}

const handleAddTicker = async(event) => {
    event.preventDefault();
    const ticker = event.target.ticker.value;

    try{
        const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=XXXXXXX`);
        const data = await response.json();
        if(data["Global Quote"]["05. price"]) {
            const newTicker = 
                                `<div class="ticker">
                                    <h2>${ticker}</h2>
                                    <p>${price}</p>
                                </div>`;

            const tickerList = document.querySelector("#tickers-list");
            tickerList.innerHTML += newTicker;
            closeModal('#add-stock');
        } else {
            alert(`Ticker ${ticker} não encontrado`);
        }
    } catch {
        alert(error)
    }
    
    


}

const modal = document.querySelector(".modal")
modal.addEventListener("click", handleModalClose) // adiciona um evendo a classe modal
