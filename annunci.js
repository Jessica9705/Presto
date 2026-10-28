// .json: JavaScript Object Notification: 
// Serve per contenere dati complessi. E' un formato di interscambio di dati in maniera facilmente leggibile.
// API: chiavi che ci permettono di raggiungere un .json online.

// Si utilizza tramite chiamate asincrone.

//  fetch(): permette di collegarci ad un JSON. E' una chiamata asincrona alla quale noi passiamo un link al file JSON che vogliamo leggere.
//  La funzione restituisce una Promise che, una volta risolta, ci permette di accedere a dato del JSON.
//  .then(): permette di convertine la Promise nel dato strutturale e di poterlo utilizzare come tale su JS.

// fetch(): mi collego al json e ne ottengo un promise
// .then(): converto la promise in un dato strutturale JS.
// .then(): utilizzare il dato ottenuto



fetch('./annunci.json').then((response)=> response.json()).then((data)=> {
    
    data.sort((a, b) => a.price - b.price);
    
    let radioWrapper = document.querySelector('#radioWrapper');
    let cardWrapper = document.querySelector('#cardWrapper');
    
    
    
    function radioCreate(){
        let categories = data.map((annuncio) => annuncio.category); 
        
        
        
        // let uniqueCategories = [];
        
        // categories.forEach((category) => {
            //     if(!uniqueCategories.includes(category)){
        
        
        //         uniqueCategories.push(category); 
        //     }
        // });
        
        
        
        
        // Set(): Classe che mi restituisce partendo da un array un nuovo oggetto di tipo set() il quale contiene solo valori univoci che non si possono replicare
        // Array.from(): mi permette di convertire un array like in un array
        
        let uniqueCategories = Array.from(new Set(categories));
        
        uniqueCategories.forEach((category) => {
            let div = document.createElement('div');
            div.classList.add('form-check');
            div.innerHTML = ` <input class="form-check-input" type="radio" name="categories" id="${category}">
                                    <label class="form-check-label" for="${category}">
                                        ${category}
                                    </label>`;
            radioWrapper.appendChild(div);
        });
        
        
    }
    
    
    
    radioCreate();
    
    function truncateWord(string){
        
        if(string.length > 15){
            return string.split(' ') [0] + '...';
        } else{
            return string;
        }
    }
    
    function showCards(array){
        cardWrapper.innerHTML = '';
        array.forEach((annuncio, i) => {
            let div = document.createElement('div');
            div.classList.add('card-custom');
            div.innerHTML = `  
                    <img src="https://picsum.photos/${300 + i}" alt="immagine" class="img-fluid img-card">
                    <p class="h2" title="${annuncio.name}">${truncateWord(annuncio.name)}</p>
                    <p class="h4">${annuncio.category}</p>
                    <p class="lead">${annuncio.price} € </p>`;
            cardWrapper.appendChild(div);
            
            
        });
        
    }
    
    showCards(data);
    
    
    let radioButtons = document.querySelectorAll('.form-check-input');
    function filterByCategory(array){

        let arrayFromNodelist = Array.from(radioButtons);
        let button = arrayFromNodelist.find((bottone) => bottone.checked);
        let categoria = button.id;
        
        // let categoria = Array.from(radioButtons).find((bottone) => bottone.checked).id;
        
        if(categoria!= 'All'){
            let filtered = array.filter((annuncio) => annuncio.category == categoria);
            return filtered;
        } else {
            return array;
        }
        
    }
    
    
    let priceValue = document.querySelector('#priceValue');
    
    radioButtons.forEach((radio) => {
        
        radio.addEventListener('click', () => {
            setPriceInput();
            globalFilter();
        });
    });
    
    
    let priceInput = document.querySelector('#priceInput');
    function setPriceInput(){
        let prices = filterByCategory(data).map((annuncio) => +annuncio.price);
        prices.sort((a, b) => a - b);
        let maxPrice = Math.ceil(prices.pop());
        priceInput.max = maxPrice;
        priceInput.value = maxPrice;
        priceValue.innerHTML = maxPrice;
        
        
        
    }
    
    setPriceInput();
    
    function filterByPrice(array){
        let filtered = array.filter((annuncio) => +annuncio.price <= +priceInput.value);
        return filtered;
    }
    
    priceInput.addEventListener('input', () => {
        priceValue.innerHTML = priceInput.value;
        globalFilter();
        
        
    });
    
    let wordInput = document.querySelector('#wordInput');
    
    function filterByWord(array){
        let filtered = array.filter((annuncio) => annuncio.name.toLowerCase().includes(wordInput.value.toLowerCase()));
        return filtered;
    }
    
    wordInput.addEventListener('input', () => {
        globalFilter();
    });
    
    // Abbiamo bisogno che ad ogni evento scattino tutte e tre le fuonzioni concatenate.
    
    function globalFilter(){
        let filteredByCategory = filterByCategory(data);
        let filteredByPrice = filterByPrice(filteredByCategory);
        let filteredByWord = filterByWord(filteredByPrice);

        showCards(filteredByWord);
    }
    
});




