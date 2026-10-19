let navbar = document.querySelector('#navbar');
let links = document.querySelectorAll('.nav-link');
let logoNavbar = document.querySelector('#logoNavbar');


window.addEventListener('scroll', () => {
    let scrolled = window.scrollY;
    if (scrolled > 0) {
        navbar.classList.remove('bg-black');
        navbar.classList.add('bg-yellow');
        navbar.style.height = '70px';
        links.forEach((link) => {
            link.style.color = 'var(--black)';
        });
        logoNavbar.src = 'http://127.0.0.1:5500/media/logo-b.png';
        
    } else {
        navbar.classList.remove('bg-yellow');
        navbar.classList.add('bg-black');
        navbar.style.height = '140px';
        links.forEach((link) => {
            link.style.color = 'var(--yellow)';
            
        });
        
        logoNavbar.src = 'http://127.0.0.1:5500/media/logo.png';
    }
});













// Chiamate Asincrone: 
// 1. setInterval(): crea un ciclo infinito. A differenza del ciclo for, setInterval() esegue il codice a intervalli di tempo specificati da noi. Può essere salvato in una variabile. E' una funzione che vuole due parametri. Il primo è una call back. Il secondo è l'intervallo di tempo che deve passare tra un interazione e l'altra. Il valore si esprime in millisecondi: 1000=1 secondo.
// 2. clearInterval(): interrompe l'esecuzione di un setInterval precedentemente creato. Richiede come parametro la variabile che contiene l'intervallo da cancellare.
// 3. setTimeout(): esegue una funzione una sola volta dopo un intervallo di tempo specificato. Richiede due parametri: la funzione da eseguire e il tempo in millisecondi da attendere prima dell'esecuzione.

let firstNumber = document.querySelector('#firstNumber');
let secondNumber = document.querySelector('#secondNumber');
let thirdNumber = document.querySelector('#thirdNumber');

let confirm = true;

function createInterval(n, element, time) {
    let counter = 0;
    
    let interval = setInterval(() => {
        if (counter < n) {
            counter++;
            element.innerHTML = counter;
        } else {
            clearInterval(interval);
        }
    }, time);
    
    setTimeout(() => {
        confirm = true;
    }, 8000);
}



// Intersection Observer: è una Classe del browser che si occupa doi far scattare una funzione nel momento in cui sul browser è visibile l'elemento html che noi gli indichiamo. le Classi si richiamano attraverso la keyword "new". Mi permette di generare un'oggetto partendo da una classe.

let observer = new IntersectionObserver( (entries) => {
    
    entries.forEach((entry) => {
        if (entry.isIntersecting && confirm) {
            createInterval(100, firstNumber, 100);
            createInterval(200, secondNumber, 50);
            createInterval(300, thirdNumber, 20);
            confirm = false;
        }
    });
} ); 

observer.observe(firstNumber);


let reviews = [
    {user: 'Matteo', description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna.`, rank: 5},
    {user: 'Jessica', description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna.`, rank: 2},
    {user: 'Stefano', description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna.`, rank: 4},
    {user: 'Aurora', description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna.`, rank: 3}
]

let swiperWrapper = document.querySelector('.swiper-wrapper');

reviews.forEach( (recensione) =>{
    let div = document.createElement('div');
    div.classList.add('swiper-slide');
    div.innerHTML = `
          <div class="swiper-slide">
                            <div class="card-review">
                                <p class="lead text-center my-3">${recensione.description}</p>
                                <p class="h4 text-center">${recensione.user}</p>
                                <div class="d-flex justify-content-center star">
                                   
                                </div>
                            </div>
                        </div>`;
    swiperWrapper.appendChild(div);
});

let stars = document.querySelectorAll('.star');
stars.forEach((star, index) => {
    
    for (let i = 1; i <= reviews[index].rank; i++) {
        let icon = document.createElement('i');
        icon.classList.add('fa-solid', 'fa-star');
        star.appendChild(icon);
    }
    
    let different = 5 - reviews[index].rank;
    for (let i = 1; i <= different; i++) {
        let icon = document.createElement('i');
        icon.classList.add('fa-regular', 'fa-star');
        star.appendChild(icon);
    }
});



// Swiper initialization
const swiper = new Swiper('.swiper', {
    // Optional parameters
    effect: 'coverflow',
    grabCursor: true,
    direction: 'horizontal',
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});