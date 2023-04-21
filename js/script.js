axios.defaults.headers.common['Authorization'] = 'nCM6PO5gWtHryDCaDluDWakn';

// busca todos os quizzes na API e aciona função showAllQuizzes(quizzes)
function fetchAllQuizzes() {
    const url = 'https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes';

    axios.get(url)
    .then((res) => {
        const quizzes = res.data;
        showAllQuizzes(quizzes);
        console.log("atualizou");
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
    let cont = 0;
    questions.forEach( question => {
        options = question.answers;
        options.sort(comparador);
        let texto = '';
        options.forEach( option => {
                    texto += `
                    <div class="option ${option.isCorrectAnswer}" onclick="checkAnswer(this, ${cont})">
                        <img src="${option.image}">
                        <div>${option.text}</div>
                    </div>
                    `
                })
        questionsScreen.innerHTML += `
        <div>
            <div id="${cont}" class="ask" style="background-color: ${question.color}";>
                <p>${question.title}</p>
            </div>
            <div  class="options ${cont}">
            ${texto}       
            </div>
        </div>
        `;
        cont++;
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

//Funçao para validar a escolha e contar os acertos, e add o css necessário.
let acertou = 0;
let nPlay = 0;
function checkAnswer(option, id){

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
        const questions = quizzCurrent.data.questions.length;
        finishedQuizz(quizzCurrent.data.levels, acertou, questions);
    }

    let next = document.getElementById(`${id + 1}`);
    
    setTimeout( () => {next.scrollIntoView({ behavior: "smooth" }) }, 2000);

}


// INÍCIO - CRIAÇÃO DE QUIZZ DO USUÁRIO
// inicializar variáveis de quizz do usuário
let cstmTitle = '';
let cstmImage = '';
let cstmQuestionCt = -1;
let cstmLevels = -1;

const screen_1 = document.querySelector('.tela-1');
const screen_3 = document.querySelector('.tela-3');
const screen_3_1 = document.querySelector('.tela-3-1');
const screen_3_2 = document.querySelector('.tela-3-2');
const screen_3_3 = document.querySelector('.tela-3-3');

const questionForm = ``

function buttonInitializeUserQuizz() {
    // get values from user input
    cstmTitle = document.getElementById('cstm-title').value;
    cstmImage = document.getElementById('cstm-quizzImage').value;
    cstmQuestionCt = document.getElementById('cstm-questionCount').value;
    cstmLevels = document.getElementById('cstm-levelCount').value;
    
    // if user input valid goto next part of quizz creation, else alert user
    if(customQuizzCheckUserInputPart01(cstmTitle,cstmImage,cstmQuestionCt,cstmLevels)) {
        createQuizShowSecondScreen();
    }

    console.log(cstmTitle,cstmImage,cstmQuestionCt,cstmLevels);
    
    
}

function buttonDefineQuizzLevels() {
    // if user input valid goto next part of quizz creation, else alert user
    createQuizShowThirdScreen();
}

function buttonFinalizeQuizz() {

}

function customQuizzCheckUserInputPart01(title, img, questionCt, levelCt) {
    if(title.length > 20) {
        alert("Título deve ter menos de 20 caractéres")
        return false
    }

    else if (!(isUrl(img))) {
        alert("Imagem deve ser uma URL válida")
        return false
    }

    else if (questionCt < 3) {
        alert("Quizz deve conter mínimo de três perguntas");
        return false
    }

    else if (levelCt < 2) {
        alert("Quizz deve conter mínimo de dois níveis");
        return false
    }

    return true
}

function customQuizzCheckUserInputPart02(text, bgColor, img, answers) {

}

function customQuizzCheckUserInputPart02(title, percentage, img, levelDescription, levelPercentage) {

}

function renderQuestionFormHTML(questionNum) {

}

function renderLevelFormHTML(levelNum) {

}

function axiosUploadQuizz() {

}

function isUrl(str) {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-zA-Z\\d]([a-zA-Z\\d-]{0,61}[a-zA-Z\\d])?)\\.)+[a-zA-Z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-zA-Z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
  }

// apenas faz a logica de troca de tela para a tela de criação de quizz;
function buttonCreateQuizz() {
    screen_1.style.display = 'none';
    screen_3.style.display = 'flex';
    screen_3_1.style.display = 'flex';
}

function createQuizShowSecondScreen() {
    screen_1.style.display = 'none';
    screen_3.style.display = 'flex';
    screen_3_1.style.display = 'none';
    screen_3_2.style.display = 'flex';
}

function createQuizShowThirdScreen() {
    screen_1.style.display = 'none';
    screen_3.style.display = 'flex';
    screen_3_1.style.display = 'none';
    screen_3_2.style.display = 'none';
    screen_3_3.style.display = 'flex';
}

// FIM - CRIAÇÃO DE QUIZZ DO USUÁRIO

function finishedQuizz(levels, right, questions) {
    const result_session = document.querySelector('.result');

    const hitPercentage = Math.round((100 * right) / questions);
    
    let greater = 0;

    for(i=(levels.length-1); i > 0; i--) {
        if(greater < levels[i].minValue) {
            greater = levels[i].minValue;
        }
    }

    const level = levels.find(level => {
        if(greater == level.minValue) {
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

// Função para reiniciar o quizz
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

    fetchAllQuizzes();

}

fetchAllQuizzes();