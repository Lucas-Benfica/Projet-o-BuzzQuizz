axios.defaults.headers.common['Authorization'] = 'nCM6PO5gWtHryDCaDluDWakn';

// busca todos os quizzes na API e aciona função showAllQuizzes(quizzes)
function fetchAllQuizzes() {
    const url = 'https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes';

    axios.get(url)
    .then((res) => {
        const quizzes = res.data;
        showAllQuizzes(quizzes);
    })
    .catch((err) => {
        console.log(err);
        return err;
    })
}

// recebe array de todos os quizzes e faz a exibição
function showAllQuizzes(quizzes) {
    const el = document.querySelector('.quizz-dashboard');
    el.innerHTML = '';

    quizzes.forEach(quizz => {
        el.innerHTML += `
            <div class="quizz-card" id="${quizz.id}" onclick="openQuizz(this.id)"> 
                <div></div> 
                <img src="${quizz.image}" alt="${quizz.title}">
                <p>${quizz.title}</p>
            </div>
        `
    });
}

// recebe e envia id do quizz para a pagina 2 e faz logica de troca de telas
function openQuizz(id) {
    let screen_1 = document.querySelector('.tela-1');
    screen_1.style.display = 'none';

    let screen_2 = document.querySelector('.tela-2');
    screen_2.style.display = 'flex';

    let url = `https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes/${id}`;
    const promise = axios.get(url);
    promise.then( playQuizz );
    promise.catch(erro => {console.log('Erro ao acessar o quizz');});
}

// exibe o quiz na tela 2 para voce jogar
let quizzCurrent = undefined;
function playQuizz(quizz){
    quizzCurrent = quizz;
    console.log(quizz.data)

    const title = document.querySelector('.quizz-name');
    title.innerHTML = '';
    title.innerHTML += `
        <div><p>${quizz.data.title}</p></div>
        <img src=${quizz.data.image} alt="">
    `;

    const questionsScreen = document.querySelector('.quizz-questions');
    questionsScreen.innerHTML = '';
    let questions = quizz.data.questions;
    let options = [];
    
    questions.forEach( question => {
        options = question.answers;
        options.sort(comparador);
        let texto = '';
        options.forEach( option => {
                    texto += `
                    <div class="option ${option.isCorrectAnswer}" onclick="checkAnswer(this)">
                        <img src="${option.image}">
                        <div>${option.text}</div>
                    </div>
                    `
                })
        questionsScreen.innerHTML += `
        <div>
            <div class="ask" style="background-color: ${question.color}";>
                <p>${question.title}</p>
            </div>
            <div class="options">
            ${texto}
        
            </div>
        </div>
        `;
    });

    const result = document.querySelector('.result');
    result.innerHTML = '';
    result.style.display = 'none';

    const buttons = document.querySelector('.buttons');
    buttons.innerHTML = '';
    buttons.innerHTML += `
        <div class="restart" onclick="restart()">Reiniciar Quiz</div>
        <div class="back" onclick="back()">Voltar para home</div>
    `;
    
}

//Funçao para validar a escolha e contar os acertor, e add o css necessário.
let acertou = 0;
let nPlay = 0;
function checkAnswer(option){
    option.classList.add("selected");
    nPlay++;
    //Pegar o elemento pai
    let options = option.parentNode;
    //pegar uma lista das opçoes
    let optionsList = options.querySelectorAll(".option");
    //verifica se acertou
    if(option.classList.contains('true')){
        acertou++;
    }
    //add o css
    for(let i=0; i < optionsList.length; i++){
        if(optionsList[i].classList.contains('selected')){
            
        }else{
            optionsList[i].classList.add('ofuscado');
        }
        if(optionsList[i].classList.contains('true')){
            optionsList[i].classList.add('right');
        }else if(optionsList[i].classList.contains('false')){
            optionsList[i].classList.add('wrong');
        }

        //temporário, isso desabilita o onclick, mas vamos pensar na melhor maneira para fazer isso
        optionsList[i].onclick = null;
    }
    
    if(nPlay == quizzCurrent.data.questions.length){
        finishedQuizz(quizzCurrent.data.levels, acertou);
    }
}

// apenas faz a logica de troca de tela para a tela de criação de quizz;
function buttonCreateQuizz() {
    let screen_1 = document.querySelector('.tela-1');
    screen_1.style.display = 'none';

    let screen_3 = document.querySelector('.tela-3');
    screen_3.style.display = 'flex';

    let screen_3_1 = document.querySelector('.tela-3-1');
    screen_3_1.style.display = 'flex';
}

function finishedQuizz(levels, right) {
    const result_session = document.querySelector('.result');

    const hitPercentage = Math.round((100 * right) / 3);
    
    const level = levels.find(level => {
        if(level.minValue > hitPercentage) {
            return true;
        }
    })

    setTimeout(() => {    
        result_session.innerHTML += `
            <div class="nota">
                ${hitPercentage}% de acerto: ${level.title}
            </div>
            <div class="final">
                <img src="${level.image}">
                <div>${level.text}</div>
            </div>
        `;    

        /*lucas - add pois estava ficando um espaço em branco no quiz antes dos botões*/
        result_session.style.display = 'flex';
        
        result_session.scrollIntoView();
    }, 2000);
}

// função de embaralhamento
function comparador(){
    return Math.random() - 0.5;
}

// Funcção para reiniciar o quizz
function restart(){
    acertou = 0;
    nPlay = 0;
    window.scrollTo(0,0);
    playQuizz(quizzCurrent);
}
function back(){
    let screen_2 = document.querySelector('.tela-2');
    screen_2.style.display = 'none';
    
    let screen_1 = document.querySelector('.tela-1');
    screen_1.style.display = 'flex';

    window.scrollTo(0,0);

}
fetchAllQuizzes();