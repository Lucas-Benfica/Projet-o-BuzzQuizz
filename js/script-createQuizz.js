// inicializar variáveis de quizz do usuário
let cstmTitle = '';
let cstmImage = '';
let cstmQuestionCt = -1;
let cstmLevelCt = -1;

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

let levelTitle = '';
let levelPercentage = '';
let levelImg = '';
let levelDescription = '';

const screen_1 = document.querySelector('.tela-1');
const screen_3 = document.querySelector('.tela-3');
const screen_3_1 = document.querySelector('.tela-3-1');
const screen_3_2 = document.querySelector('.tela-3-2');
const screen_3_3 = document.querySelector('.tela-3-3');

function buttonInitializeUserQuizz() {
    // get values from user input
    cstmTitle = document.getElementById('cstm-title').value;
    cstmImage = document.getElementById('cstm-quizzImage').value;
    cstmQuestionCt = document.getElementById('cstm-questionCount').value;
    cstmLevelCt = document.getElementById('cstm-levelCount').value;
    
    // if user input valid goto next part of quizz creation, else alert user
    if(customQuizzCheckUserInputQuizzInit(cstmTitle,cstmImage,cstmQuestionCt,cstmLevelCt)) {
        createQuizQuestions(cstmQuestionCt);
    }    
}

// renderizar HTML de criação das perguntas do quizz
function createQuizQuestions(questionCount) {
    createQuizShowSecondScreen();
    
    for (let i = 0; i < questionCount; i++) {
        screen_3_2.innerHTML += `
        <div id="${i+1}" class="next-question boxPergunta${i+1}" onclick="toggleQuestionFormVisibility(this.id)">
            <h1>Pergunta ${i+1}</h1>
            <ion-icon name="create-outline"></ion-icon>
        </div>

        <div class="input-box questions placeholder pergunta${i+1} displayNone">
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

    let question = document.querySelector(".pergunta1");
    question.classList.add("displayActive");
    question.classList.remove("displayNone");

    let boxQuestion = document.querySelector(`.boxPergunta1`);
    boxQuestion.classList.add("displayBoxNone");

    screen_3_2.innerHTML += `<button onclick="buttonDefineQuizzLevels()">Prosseguir pra criar níveis</button>`
}

function createQuizzLevels (levelCount) {
    createQuizShowThirdScreen();

    for (let i = 0; i < levelCount; i++) {
        screen_3_3.innerHTML += `<div class="input-box questions levels">
        <h1>Nível ${i+1}</h1>
        <input id="level-${i+1}-title" type="text" placeholder="Título do nível">
        <input id="level-${i+1}-percentage" type="text" placeholder="% de acerto mínima">
        <input id="level-${i+1}-img" type="text" placeholder="URL da imagem do nível">
        <input id="level-${i+1}-description" type="text" placeholder="Descrição do nível">
    </div>`

    
    }

    screen_3_3.innerHTML += `<button onclick="buttonFinalizeQuizz()">Finalizar Quizz</button>`
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
        createQuizzLevels(cstmLevelCt);
    }
}

// validar input de primeira tela de criação de quizz do usuário
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

// validar input de segunda tela de criação de quizz do usuário (perguntas)
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

    // ultimos dois else-if testam antes se texto está null, pois pode ter apenas uma ou duas respostas erradas. ou seja: se não tiver segunda/terceira resposta incorreta, está válido.

    else if (!wrongAnswer02Text === null) {
        if(wrongAnswer02Text.length < 10) {
            alert(`Texto da segunda resposta errada da pergunta ${questionNum} deve ter mínimo de 10 caractéres`)
            return false
        } 
    
        else if(!isUrl(wrongAnswer02Img) || wrongAnswer02Img === null) {
            alert(`Imagem da segunda resposta errada da pergunta ${questionNum} deve ser uma URL válida`)
            return false
        }
    }

    
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

// validar input de terceira tela de criação de quizz do usuário (níveis)
function customQuizzCheckUserInputPart03(levelNum) {
    levelTitle = document.getElementById(`level-${levelNum}-title`).value;
    levelPercentage = document.getElementById(`level-${levelNum}-percentage`).value;
    levelImg = document.getElementById(`level-${levelNum}-img`).value;
    levelDescription = document.getElementById(`level-${levelNum}-description`).value;

    if (levelTitle.length < 10 || levelTitle === null) {
        alert(`Título do nível ${levelNum} deve ter mínimo de 10 caractéres`);
        return false
    }

    else if (!(0 < levelPercentage) || !(levelPercentage < 100) ) {
        alert(`Porcentagem do nível ${levelNum} deve ter valor entre 0 e 100`);
        return false
    }

    else if(!isUrl(levelImg)) {
        alert(`Imagem do nível ${levelNum} deve ser uma URL válida`);
        return false
    }

    else if(levelDescription.length < 30) {
        alert(`Descrição do nível ${levelNum} deve ter no mínimo 30 caractéres`);
        return false
    }

    else {return true}
}

// abrir/fechar div de pergunta, como no layout do figma
function toggleQuestionFormVisibility(id) {
    let questionCurrent = document.querySelector(".displayActive");
    questionCurrent.classList.remove("displayActive");
    questionCurrent.classList.add("displayNone");

    let boxQuestionCurrent = document.querySelector(".displayBoxNone");
    boxQuestionCurrent.classList.remove("displayBoxNone");

    let newQuestion = document.querySelector(`.pergunta${id}`);
    newQuestion.classList.add("displayActive");
    newQuestion.classList.remove("displayNone");

    let newBoxQuestion = document.querySelector(`.boxPergunta${id}`);
    newBoxQuestion.classList.add("displayBoxNone");
}

function buttonFinalizeQuizz() {
    let userInputIsValid = true;

    for(let i = 0; i < cstmQuestionCt; i++) {
        if(!customQuizzCheckUserInputPart03(i+1)) {
            userInputIsValid = false;
            break;
        }
    }

    if(userInputIsValid) {
        axiosUploadQuizz();
    }
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

// também peguei essa validação de valor hexadecimal do Mr Gepeto...

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
