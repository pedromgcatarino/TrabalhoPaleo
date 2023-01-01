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
        question: '1 + 1?',
        answers: [
            {text: '4', value: true},
            {text: '22', value: false}
        ]
    }
]

let shuffledQuestions;
let numQuestion;

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
    const value = selected.dataset.value
    Array.from(answers.children).forEach(button => {
        setStatusClass(button, button.dataset.value)
    })
    if (selected.dataset.value){
        initText.innerText = "Está correto, muito bem!"
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
        initText.innerText = "Acabou o jogo. Gostarias de jogar outra vez?"
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