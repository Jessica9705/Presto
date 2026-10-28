let opener = document.querySelector('.opener');
let circle = document.querySelector('.circle');
let teachers = [
    {name: 'Matteo', description: 'Docente Frontend di Hackademy 69', url:'./media/teacher.jpg'},
    {name: 'Marco', description: 'Docente Frontend e responsabile Hackademy', url:'./media/teacher2.jpg'},
    {name: 'Nicola', description: 'Docente Frontend e noto sex-symbol', url:'./media/teacher3.jpg'},
    {name: 'Alessia', description: 'Docente Backend e giocatrice di ruolo', url:'./media/teacher4.jpg'},
]

teachers.forEach((docente) => {
    let div = document.createElement('div');
    div.classList.add('moved');
    div.style.backgroundImage = `url(${docente.url})`;
    circle.appendChild(div);
});

let movedDivs = document.querySelectorAll('.moved');
let check = false;



opener.addEventListener('click', ()=>{
  if (check == false) {
      opener.style.transform = 'rotate(45deg)';
    movedDivs.forEach((moved, i) => {
        let angle = (360 * i) / movedDivs.length;
        moved.style.transform = `rotate(${angle}deg) translate(150px) rotate(${-angle}deg)`;
    });
    check = true;
    }else{
    check = false;
    opener.style.transform = '';
    movedDivs.forEach((moved, i) => {
        moved.style.transform = ``;
    });
    flipCard.classList.add('d-none');

    }

});

let innerFace = document.querySelector('.inner-face');
let teacherName = document.querySelector('#teacherName');
let teacherDescription = document.querySelector('#teacherDescription');
let flipCard = document.querySelector('.flip-card');

movedDivs.forEach((moved, i) => {
    moved.addEventListener('click', () => {
        flipCard.classList.remove('d-none');
        let docente = teachers[i];

        innerFace.style.backgroundImage = `url(${docente.url})`;
        teacherName.innerHTML = docente.name;
        teacherDescription.innerHTML = docente.description;
    });
});