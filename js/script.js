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
    // funçãoCriadaPeloLucas(id);
    let url = `https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes/${id}`;
    const promise = axios.get(url);
    promise.then( playQuizz );
    promise.catch(erro => {console.log('Erro ao acessar as mensagens');atualizarMensagens()});
    
}
// exibe o quiz na tela 2 para voce jogar

function playQuizz(quizz){
    const title = document.querySelector('.quizz-name');

    title.innerHTML = '';
    title.innerHTML += `
        <div><p>${quizz.data.title}</p></div>
        <img src=${quizz.data.image} alt="">
    `;

    const questionsScreen = document.querySelector('.quizz-questions');
    
    let questions = quizz.data.questions;
    let options = [];
    
    questions.forEach( question => {
        options = question.answers;
        options.sort(comparador);
        
        let texto = '';
        options.forEach( option => {
                    texto += `
                    <div class="option" onclick="checkAnswer(${option.isCorrectAnswer})">
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
}


// apenas faz a logica de troca de tela para a tela de criação de quizz;
function buttonCreateQuiz() {
    let screen_1 = document.querySelector('.tela-1');
    screen_1.style.display = 'none';

    let screen_3 = document.querySelector('.tela-3');
    screen_3.style.display = 'flex';

    let screen_3_1 = document.querySelector('.tela-3-1');
    screen_3_1.style.display = 'flex';
}
function comparador(){
    return Math.random() - 0.5;
}
fetchAllQuizzes();