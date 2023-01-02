const startBtn = document.getElementById('startbtn')
const nextBtn = document.getElementById('nextbtn')
const questionContainer = document.getElementById('questionContainer')
const questionEl = document.getElementById('question')
const answers = document.getElementById('answerbtns')
const initText = document.getElementById('initial-text')

const questions = [
    {
        question: 'Como se chama o geólogo que descobriu o primeiro fóssil em Portugal?',
        answers: [
            {text: 'Carlos Ribeiro', value: true},
            {text: 'António Costa', value: false},
            {text: 'Octávio Mateus', value: false},
            {text: 'Christophe Hendrickx', value: false}
        ]
    },
    {
        question: 'Qual o nome da espécie batizada por Octávio Mateus e Christophe Hendrickx, que se considera ter sido o maior predador terrestre da Europa?',
        answers: [
            {text: 'Metoposaurus algarvensis', value: false},
            {text: 'Lusotitan atalaiensis', value: false},
            {text: 'Torvosaurus gurneyi', value: true},
            {text: 'Zby Atlanticus', value: false},
        ]
    },
    {
        question: 'Qual o nome do dinossauro mais comprido encontrado em Portugal?',
        answers: [
            {text: 'Zby Atlanticus', value: false},
            {text: 'Dinheirosaurus Lourinhanensis', value: true},
            {text: 'Lusotitan atalaiensis', value: false},
            {text: 'Miragaia Longicollum', value: false},
        ]
    },
    {
        question: 'Que municipio português é conhecido como a Capital dos Dinossauros?',
        answers: [
            {text: 'Lourinhã', value: true},
            {text: 'Minho', value: false},
            {text: 'Loures', value: false},
            {text: 'Arouca', value: false},
        ]
    },
    {
        question: 'No ranking mundial de espécies de dinossauros descobertas por quilómetro quadrado, em que lugar está Portugal?',
        answers: [
            {text: '3º', value: false},
            {text: '10º', value: false},
            {text: '1º', value: true},
            {text: '24º', value: false},
        ]
    },
    {
        question: 'A descoberta do Allosaurus europaeus (Allosaorus fragilis) teve grande importância mundial. Qual foi a razão?',
        answers: [
            {text: 'Antes da descoberta, apenas eram conhecidos fosséis Allosaurus na América do Norte', value: true},
            {text: 'Foi a primeira descoberta fóssil em Portugal', value: false},
            {text: 'Foi o primeiro dinossauro descoberto do Cretácico Superior', value: false},
            {text: 'O fóssil descoberto era o esqueleto completo do dinossauro', value: false},
        ]
    },
    {
        question: 'Quantas vértebras cervicais possuía a espécie de dinossauro Miragaia Longicollum?',
        answers: [
            {text: '5', value: false},
            {text: '17', value: true},
            {text: '11', value: false},
            {text: '46', value: false},
        ]
    },
    {
        question: 'O dinheirosauros lourinhanensis utilizava uma estratégia curiosa para se defender, qual era essa estratégia?',
        answers: [
            {text: 'Enterrava a sua cabeça', value: false},
            {text: 'Atacava com o seu pescoço gigante', value: false},
            {text: 'Utilizava a cauda como chicote', value: true},
            {text: 'Fugia muito rápido', value: false},
        ]
    },
    {
        question: 'Em que período viveu o Metoposaurus algarvensis?',
        answers: [
            {text: 'Cretácico', value: false},
            {text: 'Jurássico Inferior', value: false},
            {text: 'Jurássico Superior', value: false},
            {text: 'Triásico', value: true},
        ]
    },
    {
        question: 'Qual das seguintes classificações se aplica ao Dracopelta zbyszewskii?',
        answers: [
            {text: 'Crocodylia', value: false},
            {text: 'Terópode', value: false},
            {text: 'Saurópode', value: false},
            {text: 'Ornitísquio', value: true},
        ]
    }
]

let shuffledQuestions;
let numQuestion;
let rightAnswers;

startBtn.addEventListener('click',start)
nextBtn.addEventListener('click', () => {
    numQuestion++;
    nextQuestion();
})

function start(){
    startBtn.classList.add('hide')
    questionContainer.classList.remove('hide')
    initText.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    numQuestion = 0;
    rightAnswers = 0;
    nextQuestion()
}

function nextQuestion(){
    reset();
    showQuestion(shuffledQuestions[numQuestion])
}

function showQuestion(question){
    questionEl.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.value){
            button.dataset.value = answer.value
        }
        button.addEventListener('click', selectAnswer)
        answers.appendChild(button)
    })
}

function reset(){
    nextBtn.classList.add('hide')
    initText.classList.add('hide')
    while (answers.firstChild){
        answers.removeChild(answers.firstChild)
    }
}

function selectAnswer(e){
    const selected = e.target
    Array.from(answers.children).forEach(button => {
        setStatusClass(button, button.dataset.value)
    })
    if (selected.dataset.value){
        initText.innerText = "Está correto, muito bem!"
        rightAnswers++;
        initText.classList.remove('hide')
    }
    else {
        initText.innerText = "Resposta incorreta :c"
        initText.classList.remove('hide')
    }

    if (numQuestion < shuffledQuestions.length - 1){
        nextBtn.classList.remove('hide')
    }
    else {
        initText.innerText = 'Acabou o jogo. A tua pontuação foi ' + rightAnswers + '/10.'
        initText.classList.remove('hide')
        startBtn.innerText = 'Tentar outra vez'
        startBtn.classList.remove('hide')
    }
}

function setStatusClass(element, value) {
    clearStatus(element)
    if (value){
        element.classList.add('correct')
    }
    else {
        element.classList.add('wrong')
    }
}

function clearStatus(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}