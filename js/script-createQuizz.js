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
let arrayQuestios = [];

let levelTitle = '';
let levelPercentage = '';
let levelImg = '';
let levelDescription = '';
let arrayLevels = [];

const screen_1 = document.querySelector('.tela-1');
const screen_3 = document.querySelector('.tela-3');
const screen_3_1 = document.querySelector('.tela-3-1');
const screen_3_2 = document.querySelector('.tela-3-2');
const screen_3_3 = document.querySelector('.tela-3-3');
const screen_3_4 = document.querySelector('.tela-3-4');

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
        <div data-test="question-ctn" id="${i+1}" class="next-question boxPergunta${i+1}" >
            <h1>Pergunta ${i+1}</h1>
            <button data-test="toggle" onclick="toggleQuestionFormVisibility(this.parentElement.id)"><ion-icon name="create-outline" ></ion-icon></button>
        </div>

        <div class="input-box questions placeholder pergunta${i+1} displayNone">
            <div>
                <h1>Pergunta ${i+1}</h1>
                <input data-test="question-input" id="question-${i+1}-text" type="text" placeholder="Texto da pergunta">
                <input data-test="question-color-input" id="question-${i+1}-bgColor" type="text" placeholder="Cor de fundo da pergunta" >
            </div>
            <div>
                <h1>Resposta correta</h1>
                <input data-test="correct-answer-input" id="question-${i+1}-correctAnswer-text" type="text" placeholder="Resposta correta" >
                <input data-test="correct-img-input" id="question-${i+1}-correctAnswer-img" type="text" placeholder="URL da imagem" >
            </div>
            <div>
                <h1>Resposta incorretas</h1>
                <div>
                    <input data-test="wrong-answer-input" id="question-${i+1}-wrongAnswer01-text" type="text" placeholder="Resposta incorreta 1" >
                    <input data-test="wrong-img-input" id="question-${i+1}-wrongAnswer01-img" type="text" placeholder="URL da imagem 1" >
                </div>
                <div>
                    <input data-test="wrong-answer-input" id="question-${i+1}-wrongAnswer02-text" type="text" placeholder="Resposta incorreta 2" >
                    <input data-test="wrong-img-input" id="question-${i+1}-wrongAnswer02-img" type="text" placeholder="URL da imagem 2" >
                </div>
                <div>
                    <input data-test="wrong-answer-input" id="question-${i+1}-wrongAnswer03-text" type="text" placeholder="Resposta incorreta 3" >
                    <input data-test="wrong-img-input" id="question-${i+1}-wrongAnswer03-img" type="text" placeholder="URL da imagem 3" >
                </div>
            </div>
        </div>`
    }

    let question = document.querySelector(".pergunta1");
    question.classList.add("displayActive");
    question.classList.remove("displayNone");

    let boxQuestion = document.querySelector(`.boxPergunta1`);
    boxQuestion.classList.add("displayBoxNone");

    screen_3_2.innerHTML += `<button data-test="go-create-levels" onclick="buttonDefineQuizzLevels()">Prosseguir pra criar níveis</button>`
}

function createQuizzLevels (levelCount) {
    createQuizShowThirdScreen();

    for (let i = 0; i < levelCount; i++) {
        screen_3_3.innerHTML += `
        <div data-test="" id="${i+1}" class="next-question boxLevel${i+1}" >
            <h1>Nível ${i+1}</h1>
            <button data-test="toggle" onclick="toggleLevelsFormVisibility(this.parentElement.id)"><ion-icon name="create-outline" ></ion-icon></button>
        </div>

        <div data-test="level-ctn" class="input-box questions levels level${i+1} displayNone">
            <h1>Nível ${i+1}</h1>
            <input data-test="level-input" id="level-${i+1}-title" type="text" placeholder="Título do nível">
            <input data-test="level-percent-input" id="level-${i+1}-percentage" type="text" placeholder="% de acerto mínima">
            <input data-test="level-img-input" id="level-${i+1}-img" type="text" placeholder="URL da imagem do nível">
            <input data-test="level-description-input" id="level-${i+1}-description" type="text" placeholder="Descrição do nível">
        </div>`
    }

    let level = document.querySelector(".level1");
    level.classList.add("displayLevelActive");
    level.classList.remove("displayNone");

    let boxLevel = document.querySelector(`.boxLevel1`);
    boxLevel.classList.add("displayBoxLevelNone");

    screen_3_3.innerHTML += `<button data-test="finish" onclick="buttonFinalizeQuizz()">Finalizar Quizz</button>`
}

function buttonDefineQuizzLevels() {
    // if user input valid goto next part of quizz creation, else alert user
    let userInputIsValid = true;
    // variável para testar se existe um nível com valor de 0%
    let levelEqualsZero = false;
    for(let i = 0; i < cstmQuestionCt; i++) {
        // levelPercentage = document.getElementById(`level-${i+1}-percentage`).value;
        if(!customQuizzCheckUserInputQuestion(i+1)) {
            userInputIsValid = false;
            break;
        }
        // if(levelPercentage === 0) {
        //     levelEqualsZero = true;
        // } else {alert("Deve existir um nível com valor de 0%"); break;}
    }

    if(userInputIsValid) {
        questionArrayGenerator();
        createQuizzLevels(cstmLevelCt);
    }
}

function questionArrayGenerator() {
    for (let i = 0; i < cstmQuestionCt; i++) {
        let elQuestion = document.querySelector(`.pergunta${i+1}`);
        let answers = [];

        answers.push({
            text: elQuestion.children[1].children[1].value,
            image: elQuestion.children[1].children[2].value,
            isCorrectAnswer: true,
        })

        for (let i = 1; i <= 3; i++) {
            if ((elQuestion.children[2].children[i].children[0].value) != '') {
              answers.push({
                text: elQuestion.children[2].children[i].children[0].value,
                image: elQuestion.children[2].children[i].children[1].value,
                isCorrectAnswer: false,
              });
            }
        }

        const question = {
            title: elQuestion.children[0].children[1].value,
            color: elQuestion.children[0].children[2].value,
            answers,
        }

        arrayQuestios.push(question);
    }
}

function questionLevelGenerator() {
    for (let i = 0; i < cstmLevelCt; i++) {
        let elLevels = document.querySelector(`.level${i+1}`);

        arrayLevels.push({
            title: elLevels.children[1].value,
            minValue: parseInt(elLevels.children[2].value),
            image: elLevels.children[3].value,
            text: elLevels.children[4].value,
        });
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
    let elQuestion = document.querySelector(`.pergunta${questionNum}`);

    // check if valid: text, bgColor, img, answers
    questionText = elQuestion.children[0].children[1].value;
    questionColor = elQuestion.children[0].children[2].value
    correctAnswerText = elQuestion.children[1].children[1].value;
    correctAnswerImg = elQuestion.children[1].children[2].value;
    wrongAnswer01Text = elQuestion.children[2].children[1].children[0].value;
    wrongAnswer01Img = elQuestion.children[2].children[1].children[1].value;
    wrongAnswer02Text = elQuestion.children[2].children[2].children[0].value;
    wrongAnswer02Img = elQuestion.children[2].children[2].children[1].value;
    wrongAnswer03Text = elQuestion.children[2].children[3].children[0].value;
    wrongAnswer03Img = elQuestion.children[2].children[3].children[1].value;
    
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

function toggleLevelsFormVisibility(id) {
    let levelCurrent = document.querySelector(".displayLevelActive");
    levelCurrent.classList.remove("displayLevelActive");
    levelCurrent.classList.add("displayNone");

    let boxLevelCurrent = document.querySelector(".displayBoxLevelNone");
    boxLevelCurrent.classList.remove("displayBoxLevelNone");

    let newLevel = document.querySelector(`.level${id}`);
    newLevel.classList.add("displayLevelActive");
    newLevel.classList.remove("displayNone");

    let newBoxLevel = document.querySelector(`.boxLevel${id}`);
    newBoxLevel.classList.add("displayBoxLevelNone");
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
        questionLevelGenerator();

        const newQuizz = {
            title: cstmTitle,
            image: cstmImage,
            questions: arrayQuestios,
            levels: arrayLevels,
        }

        axiosUploadQuizz(newQuizz);
    }
}

function axiosUploadQuizz(quizz) {
    let promise = axios.post('https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes', quizz);
    promise.then((response) => {

        const userQuizzID = JSON.stringify(response.data.id); // Tranforma o nosso array de objt em uma string    

        const arrayUserQuizzID = JSON.parse(localStorage.getItem("userQuizzID"));
        
        if(arrayUserQuizzID) {
            let obj = {id: userQuizzID};
            arrayUserQuizzID.push(obj);
            localStorage.setItem("userQuizzID", JSON.stringify(arrayUserQuizzID)); // Envia essa string para o storege, depois se quisermos puxar e usar ela temos que trensformar de volta.
        } else {
            let newArrayUserQuizzID = JSON.stringify([{ id: userQuizzID }]);
            localStorage.setItem("userQuizzID", newArrayUserQuizzID); // Envia essa string para o storege, depois se quisermos puxar e usar ela temos que trensformar de volta.
        }
    
        createQuizShowFourthScreen(response.data);
    });
    promise.catch((erro) => console.log("Erro ao criar quizz. Mensagem: " + erro));
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

// também peguei essa validação de valor hexadecimal do Mr Gepeto...
function isValidHexColor(input) {
  if (input.charAt(0) !== "#") {
    return false;
  }

  if (input.length !== 4 && input.length !== 7) {
    return false;
  }

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

  return true;
}
  
// apenas faz a logica de troca de tela para a tela de criação de quizz;
function buttonCreateQuizz() { 
    screen_1.style.display = 'none';
    screen_3.style.display = 'flex';
    screen_3_1.style.display = 'flex';
    screen_3_2.style.display = 'none';
    screen_3_3.style.display = 'none';
    screen_3_4.style.display = 'none';
}

function createQuizShowSecondScreen() {
    screen_1.style.display = 'none';
    screen_3.style.display = 'flex';
    screen_3_1.style.display = 'none';
    screen_3_2.style.display = 'flex';
    screen_3_3.style.display = 'none';
    screen_3_4.style.display = 'none';
}

function createQuizShowThirdScreen() {
    screen_1.style.display = 'none';
    screen_3.style.display = 'flex';
    screen_3_1.style.display = 'none';
    screen_3_2.style.display = 'none';
    screen_3_3.style.display = 'flex';
    screen_3_4.style.display = 'none';
}

function createQuizShowFourthScreen(quizz) {
    screen_1.style.display = 'none';
    screen_3.style.display = 'flex';
    screen_3_1.style.display = 'none';
    screen_3_2.style.display = 'none';
    screen_3_3.style.display = 'none';
    screen_3_4.style.display = 'flex';

    const el = document.querySelector(".tela-3-4");
    console.log("QUIZZ VINDO -> " + quizz)

    el.innerHTML = `
    <h1>Seu quizz está pronto!</h1>
    <div class="quizz-card"> 
        <div></div> 
        <img src="${quizz.image}" alt="${quizz.title}">
        <p>${quizz.title}</p>
    </div>
    <button id="${quizz.id}" onclick="openQuizz(this.id)">Acessar Quizz</button>
    <button class="button-home" onclick="back()">Voltar pra home</button>
    `
}