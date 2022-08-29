class Question {
    constructor(figure, value1, value2) {
        this.figure = figure;
        this.value1 = value1;
        this.value2 = value2;
    }

    area() {
        if(this.figure === "square" || this.figure === "rectangle") {
            return this.value1*this.value2;
        }
        else if(this.figure === "ellipse" || this.figure === "circle") {
            return Math.PI*this.value1*this.value2;
        }
    }

    text() {
        if(this.figure === "square") {
            return "What is the area of a square of side " + this.value1 + "?";
        }
        else if(this.figure === "circle") {
            return "What is the area of a circle of radius " + this.value1 + "?";
        }
        else if(this.figure === "rectangle") {
            return "What is the area of a rectangle of sides " + this.value1 + " and " + this.value2 + "?";
        }
        else if(this.figure === "ellipse") {
            return "What is the area of an ellipse with the major axis " + Math.max(this.value1, this.value2) + " and minor axis " + Math.min(this.value1, this.value2) + "?";
        }
    }
}

function getCircle() {
    const random = Math.floor(Math.random()*100 + 1);
    return new Question("circle", random, random);
}

function getSquare() {
    const random = Math.floor(Math.random()*100 + 1);
    return new Question("square", random, random);
}

function getRectangle() {
    const random1 = Math.floor(Math.random()*100 + 1);
    let random2 = Math.floor(Math.random()*100 + 1);

    while(random2 === random1) {
        random2 = Math.floor(Math.random()*100 + 1);
    }

    return new Question("rectangle", random1, random2);
}

function getEllipse() {
    const random1 = Math.floor(Math.random()*100 + 1);
    let random2 = Math.floor(Math.random()*100 + 1);

    while(random2 === random1) {
        random2 = Math.floor(Math.random()*100 + 1);
    }

    return new Question("ellipse", random1, random2);
}

function questions() {
    const ellipse = getEllipse();
    const rectangle = getRectangle();
    const square = getSquare();
    const circle = getCircle();
    const arr = [ellipse, rectangle, square, circle];
    const qs = [];

    for(let figure of arr) {
        const obj = new Object();
        obj.question = figure.text();
        obj.answer = figure.area();
        obj.option = [0,0,0,obj.answer];
        obj.text = figure.text();
        qs.push(obj);
    }
    return qs;
}
const question = document.getElementById("question");
const quizContainer = document.getElementById("quiz-container");

const scoreboard = document.getElementById('scoreboard');

const options = [];

for(let i = 0; i < 4; i++) {
    options.push(document.getElementById('option' + i));
}
console.log(options);

const next = document.querySelector('.next');
const points = document.getElementById('score');
const span = document.querySelectorAll('span');
const stat = document.getElementById("stat");

let i = 0;
let score = 0;

const qs = questions();
console.log(qs);

function displayQuestion() {

    for(let i = 0; i < span.length; i++) {
        span[i].style.background = "none";
    }

    question.innerHTML = "" + (i+1) + ". " +  qs[i].text;
    let currentOptions = qs[i].option;

    for(let j = 0; j < currentOptions.length; j++) {
        options[j].innerHTML = currentOptions[j];
    }
    stat.innerHTML = "Question"+" "+(i+1)+" "+"of"+" "+qs.length;
}

function calcScore(option) {
    if(option.innerHTML == qs[i].answer) {
        score++;
        document.getElementById(option.id).style.background = "limegreen";
    }
    else {
        document.getElementById(option.id).style.background = "tomato";
    }
}


function nextQuestion() {
    if(i < qs.length - 1) {
        i++;
        displayQuestion();
    }
    else {
        points.innerHTML = score + "/" + qs.length;
        quizContainer.style.display = "none";
        scoreboard.style.display = "block";
    }
}

next.addEventListener("click", nextQuestion);

//for(let option of options) {
//    option.addEventListener("click", nextQuestion);
//}

function backToQuiz() {
    location.reload();
}

function checkAnswer() {
    scoreboard.style.display = "none";
    const answerBank = document.getElementById("answerBank");
    answerBank.style.display = "block";
    const answers = document.getElementById("answers");

    for(let i = 0; i < qs.length; i++) {
        let listItem = document.createElement("li");
        listItem.innerHTML = qs[i].answer;
        answers.appendChild(listItem);
    }
}
displayQuestion();
