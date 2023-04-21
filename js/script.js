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
    console.log(quizz.data);

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
    
    setTimeout( () => {
        next.scrollIntoView({ behavior: "smooth" });
        window.scrollBy(0, -100);
    }, 2000);

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

let questionText = '';
let questionColor = '';
let correctAnswerText = '';
let correctAnswerImg = '';
let wrongAnswer01Text = '';
let wrongAnswer01Img = '';
let wrongAnswer02Text = '';
let wrongAnswer02Img = '';
let wrongAnswer03Text = '';
let wrongAnswer03Img = '';



function buttonInitializeUserQuizz() {
    // get values from user input
    cstmTitle = document.getElementById('cstm-title').value;
    cstmImage = document.getElementById('cstm-quizzImage').value;
    cstmQuestionCt = document.getElementById('cstm-questionCount').value;
    cstmLevels = document.getElementById('cstm-levelCount').value;
    
    // if user input valid goto next part of quizz creation, else alert user
    if(customQuizzCheckUserInputQuizzInit(cstmTitle,cstmImage,cstmQuestionCt,cstmLevels)) {
        createQuizQuestions(cstmQuestionCt);
    }    
}

function createQuizQuestions(questionCount) {
    createQuizShowSecondScreen();

    for (let i = 0; i < questionCount; i++) {
        screen_3_2.innerHTML += `<div class="input-box questions placeholder">
        <div>
            <h1>Pergunta ${i+1}</h1>
            <input id="question-${i+1}-text" type="text" placeholder="Texto da pergunta">
            <input id="question-${i+1}-bgColor" type="text" placeholder="Cor de fundo da pergunta" >
        </div>
        <div>
            <h1>Resposta correta</h1>
            <input id="question-${i+1}-correctAnswer-text" type="text" placeholder="Resposta correta" >
            <input id="question-${i+1}-correctAnswer-img" type="text" placeholder="URL da imagem" >
        </div>
        <div>
            <h1>Resposta incorretas</h1>
            <div>
                <input id="question-${i+1}-wrongAnswer01-text" type="text" placeholder="Resposta incorreta 1" >
                <input id="question-${i+1}-wrongAnswer01-img" type="text" placeholder="URL da imagem 1" >
            </div>
            <div>
                <input id="question-${i+1}-wrongAnswer02-text" type="text" placeholder="Resposta incorreta 2" >
                <input id="question-${i+1}-wrongAnswer02-img" type="text" placeholder="URL da imagem 2" >
            </div>
            <div>
                <input id="question-${i+1}-wrongAnswer03-text" type="text" placeholder="Resposta incorreta 3" >
                <input id="question-${i+1}-wrongAnswer03-img" type="text" placeholder="URL da imagem 3" >
            </div>
        </div>
        </div>`
    }

    screen_3_2.innerHTML += `<button onclick="buttonDefineQuizzLevels()">Prosseguir pra criar níveis</button>`
}

// abrir/fechar div de pergunta, como no layout do figma
function toggleQuestionFormVisibility() {

}

function buttonDefineQuizzLevels() {
    // if user input valid goto next part of quizz creation, else alert user
    let userInputIsValid = true;

    for(let i = 0; i < cstmQuestionCt; i++) {
        if(!customQuizzCheckUserInputQuestion(i+1)) {
            userInputIsValid = false;
            break;
        }
    }

    if(userInputIsValid) {
        createQuizShowThirdScreen();
    }
}

function customQuizzCheckUserInputQuizzInit(title, img, questionCt, levelCt) {
    if(title.length < 20 || title.length > 65) {
        alert("Título deve ter entre 20 e 65 caractéres")
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

function customQuizzCheckUserInputQuestion(questionNum) {
    // check if valid: text, bgColor, img, answers
    questionText = document.getElementById(`question-${questionNum}-text`).value;
    questionColor = document.getElementById(`question-${questionNum}-bgColor`).value;
    correctAnswerText = document.getElementById(`question-${questionNum}-correctAnswer-text`).value;
    correctAnswerImg = document.getElementById(`question-${questionNum}-correctAnswer-img`).value;
    wrongAnswer01Text = document.getElementById(`question-${questionNum}-wrongAnswer01-text`).value;
    wrongAnswer01Img = document.getElementById(`question-${questionNum}-wrongAnswer01-img`).value;
    wrongAnswer02Text = document.getElementById(`question-${questionNum}-wrongAnswer02-text`).value;
    wrongAnswer02Img = document.getElementById(`question-${questionNum}-wrongAnswer02-img`).value;
    wrongAnswer03Text = document.getElementById(`question-${questionNum}-wrongAnswer03-text`).value;
    wrongAnswer03Img = document.getElementById(`question-${questionNum}-wrongAnswer03-img`).value;
    
    // bem vindo ao inferninho de ifs. talvez um switch case teria sido mais elegante... mas já estava quase no fim quando pensei sobre...

    if(questionText.length < 20 || questionText === null) {
        alert(`Texto da pergunta ${questionNum} deve ter mínimo de 20 caractéres`)
        return false
    } 
    
    else if(!isValidHexColor(questionColor) || questionColor === null) {
        alert(`Cor da pergunta ${questionNum} deve ser um valor hexadecimal válido`)
        return false
    }

    else if(correctAnswerText.length < 10 || correctAnswerText === null) {
        alert(`Texto da resposta correta da pergunta ${questionNum} deve ter mínimo de 10 caractéres`)
        return false
    } 

    else if(!isUrl(correctAnswerImg) || correctAnswerImg === null) {
        alert(`Imagem da resposta correta da pergunta ${questionNum} deve ser uma URL válida`)
        return false
    }

    else if(!isUrl(correctAnswerImg) || correctAnswerImg === null) {
        alert(`Imagem da resposta correta da pergunta ${questionNum} deve ser uma URL válida`)
        return false
    }

    else if(wrongAnswer01Text.length < 10 || wrongAnswer01Text === null) {
        alert(`Texto da primeira resposta errada da pergunta ${questionNum} deve ter mínimo de 10 caractéres`)
        return false
    } 

    else if(!isUrl(wrongAnswer01Img) || wrongAnswer01Img === null) {
        alert(`Imagem da primeira resposta errada da pergunta ${questionNum} deve ser uma URL válida`)
        return false
    }

    else if(wrongAnswer02Text.length < 10 || wrongAnswer02Text === null) {
        alert(`Texto da segunda resposta errada da pergunta ${questionNum} deve ter mínimo de 10 caractéres`)
        return false
    } 

    else if(!isUrl(wrongAnswer02Img) || wrongAnswer02Img === null) {
        alert(`Imagem da segunda resposta errada da pergunta ${questionNum} deve ser uma URL válida`)
        return false
    }

    // ultimo else-if testa antes se texto está null, pois pode ter apenas duas respostas erradas. ou seja, se não tiver terceira resposta incorreta, está válido.
    else if (!wrongAnswer03Text === null) {
        if(wrongAnswer03Text.length < 10) {
            alert(`Texto da tercecira resposta errada da pergunta ${questionNum} deve ter mínimo de 10 caractéres`)
            return false
        } 
    
        else if(!isUrl(wrongAnswer03Img) || wrongAnswer03Img === null) {
            alert(`Imagem da terceira resposta errada da pergunta ${questionNum} deve ser uma URL válida`)
            return false
        }
    }
    
    else {return true}
}

function customQuizzCheckUserInputPart03(title, percentage, img, levelDescription, levelPercentage) {

}

function buttonFinalizeQuizz() {

}

function renderQuestionFormHTML(questionNum) {
    screen_3_2.innerHTML += questionForm;
}

function renderLevelFormHTML(levelNum) {

}

function axiosUploadQuizz() {

}

// peguei essa função pra checar se uma string é URL válida do Mr Gepeto... se alguém tiver uma solução mais "normal"... é nois! RegEx.... complicado...

function isUrl(str) {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-zA-Z\\d]([a-zA-Z\\d-]{0,61}[a-zA-Z\\d])?)\\.)+[a-zA-Z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-zA-Z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
  }

// também peguei essa do Mr Gepeto...

function isValidHexColor(input) {
  // Check if input starts with #
  if (input.charAt(0) !== "#") {
    return false;
  }

  // Check if input has the correct length
  if (input.length !== 4 && input.length !== 7) {
    return false;
  }

  // Check if input contains only valid hexadecimal characters
  for (let i = 1; i < input.length; i++) {
    const charCode = input.charCodeAt(i);
    if (
      (charCode < 48 || charCode > 57) && // 0-9
      (charCode < 65 || charCode > 70) && // A-F
      (charCode < 97 || charCode > 102) // a-f
    ) {
      return false;
    }
  }

  // If all checks pass, input is a valid hexadecimal color
  return true;
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