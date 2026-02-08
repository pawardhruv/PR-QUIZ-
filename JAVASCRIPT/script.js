const logicQuestions = [
    { id: 1, question: "Who is known as the 'God of Cricket'?", options: ["Ricky Ponting", "Sachin Tendulkar", "Brian Lara", "Virat Kohli"], correctAnswer: "Sachin Tendulkar" },
    { id: 2, question: "How many world cups has India won (ODI)?", options: ["1", "2", "3", "4"], correctAnswer: "2" },
    { id: 3, question: "Which player has the record for the highest individual score in ODIs (264)?", options: ["Chris Gayle", "Martin Guptill", "Rohit Sharma", "Virender Sehwag"], correctAnswer: "Rohit Sharma" },
    { id: 4, question: "Which country won the first T20 World Cup in 2007?", options: ["Pakistan", "India", "Australia", "West Indies"], correctAnswer: "India" },
    { id: 5, question: "Who is the fastest bowler in the world?", options: ["Brett Lee", "Shoaib Akhtar", "Shaun Tait", "Mark Wood"], correctAnswer: "Shoaib Akhtar" },
    { id: 6, question: "What is the length of a cricket pitch?", options: ["20 yards", "22 yards", "24 yards", "21 yards"], correctAnswer: "22 yards" },
    { id: 7, question: "Who has the most centuries in international cricket?", options: ["Virat Kohli", "Ricky Ponting", "Sachin Tendulkar", "Jacques Kallis"], correctAnswer: "Sachin Tendulkar" },
    { id: 8, question: "Which IPL team has won the most trophies?", options: ["CSK", "MI", "Both CSK & MI", "KKR"], correctAnswer: "Both CSK & MI" },
    { id: 9, question: "What do we call a bowler taking 3 wickets in 3 balls?", options: ["Magic", "Hat-trick", "Triple-out", "Century"], correctAnswer: "Hat-trick" },
    { id: 10, question: "Who is the captain of India's 2024 T20 World Cup winning team?", options: ["Hardik Pandya", "Virat Kohli", "Rohit Sharma", "MS Dhoni"], correctAnswer: "Rohit Sharma" },
    { id: 11, question: "How many players are there in a cricket team on the field?", options: ["10", "11", "12", "9"], correctAnswer: "11" },
    { id: 12, question: "Which stadium is the largest in the world?", options: ["Lords", "MCG", "Narendra Modi Stadium", "Eden Gardens"], correctAnswer: "Narendra Modi Stadium" },
    { id: 13, question: "What is the nickname of Shikhar Dhawan?", options: ["Gabbar", "Hitman", "Chiku", "Captain Cool"], correctAnswer: "Gabbar" },
    { id: 14, question: "Who hit 6 sixes in an over against England in 2007?", options: ["MS Dhoni", "Yuvraj Singh", "Hardik Pandya", "Chris Gayle"], correctAnswer: "Yuvraj Singh" },
    { id: 15, question: "Which trophy is played between Australia and England?", options: ["Border Gavaskar", "The Ashes", "World Cup", "Asia Cup"], correctAnswer: "The Ashes" },
    { id: 16, question: "Who is called 'Mr. 360'?", options: ["Virat Kohli", "AB de Villiers", "Glenn Maxwell", "Suryakumar Yadav"], correctAnswer: "AB de Villiers" },
    { id: 17, question: "How many balls are there in one over?", options: ["4", "5", "6", "8"], correctAnswer: "6" },
    { id: 18, question: "Which umpire is famous for his crooked finger?", options: ["Steve Bucknor", "Billy Bowden", "Aleem Dar", "Nitin Menon"], correctAnswer: "Billy Bowden" },
    { id: 19, question: "What is the color of the ball used in Day/Night Test matches?", options: ["Red", "White", "Pink", "Orange"], correctAnswer: "Pink" },
    { id: 20, question: "Who won the Orange Cap in IPL 2024?", options: ["Travis Head", "Virat Kohli", "Ruturaj Gaikwad", "Abhishek Sharma"], correctAnswer: "Virat Kohli" }
];

const qutionshow = document.getElementById('quiz-que-show');
const optionshow = document.querySelector('.quiz-card ul');
const quenumber = document.querySelector('.quiz-heading');
const quelist = document.querySelector('.question-list ul');
const numbercircle = document.querySelector('.number-circle');
const timerBox = document.getElementById('timer');
const quizSubmit = document.getElementById('quiz-submit');
const overlay = document.getElementById('resultOverlay');
const finalScore = document.getElementById('finalScore');
const closeBtn = document.getElementById('closeResult');

let currentque = 0;
var totalSeconds = logicQuestions.length * 60;
var timerInterval;

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(function () {
        var min = Math.floor(totalSeconds / 60);
        var sec = totalSeconds % 60;
        if (sec < 10) sec = "0" + sec;
        if (min < 10) min = "0" + min;
        timerBox.innerHTML = min + ":" + sec;
        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            quizSubmit.click();
        }
        totalSeconds--;
    }, 1000);
}

// Array 

const nextquestion = (index) => {
    currentque = index;
    qutionshow.textContent = logicQuestions[currentque].question;
    quenumber.textContent = "Question " + (currentque + 1);

    optionshow.innerHTML = "";
    logicQuestions[currentque].options.forEach(option => {
        let li = document.createElement('li');
        li.innerHTML = `<input type="radio" name="${currentque}" value="${option}" ${logicQuestions[currentque].yourans == option ? 'checked' : ''}> ${option}`;
        li.onclick = () => {
            logicQuestions[currentque].yourans = option;
            nextquestion(currentque);
        };
        optionshow.appendChild(li);
    });

    // This part now populates the Grid defined in CSS
    numbercircle.innerHTML = "";
    logicQuestions.forEach((q, i) => {
        let btn = document.createElement('button');
        // Red if unanswered (btn-danger), Green if answered (btn-success)
        btn.classList.add('btn', q.yourans ? 'btn-success' : 'btn-danger');
        btn.textContent = i + 1;
        btn.onclick = () => nextquestion(i);
        numbercircle.appendChild(btn);
    });

    // Left List
    quelist.innerHTML = "";
    logicQuestions.forEach((q, i) => {
        let li = document.createElement('li');
        li.textContent = "Question " + q.id;
        li.classList.toggle('green', i === currentque);
        li.onclick = () => nextquestion(i);
        quelist.appendChild(li);
    });
}


document.getElementById('next').onclick = () => { if (currentque < logicQuestions.length - 1) nextquestion(currentque + 1); }
document.getElementById('prev').onclick = () => { if (currentque > 0) nextquestion(currentque - 1); }

quizSubmit.addEventListener('click', () => {
    let score = 0;
    logicQuestions.forEach(q => { if (q.correctAnswer === q.yourans) score++; });
    finalScore.textContent = `${score} / ${logicQuestions.length}`;
    overlay.classList.add('active');
});

closeBtn.addEventListener('click', () => {
    overlay.classList.remove('active');
    logicQuestions.forEach(q => delete q.yourans);
    currentque = 0;
    totalSeconds = logicQuestions.length * 60;
    nextquestion(0);
    startTimer();
});

nextquestion(0);
startTimer();