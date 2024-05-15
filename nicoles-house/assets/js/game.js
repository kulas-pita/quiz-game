const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "What is the old name of the Philippines?",
    choice1: "Filipinas",
    choice2: "Luzon",
    choice3: "Maharlika",
    choice4: "Visayas",
    answer: 1
  },
  {
    question: "Who killed Magellan?",
    choice1: "Lapu Lapu",
    choice2: "Tandang Sora",
    choice3: "Emilio Aguinaldo",
    choice4: "Diego Silang",
    answer: 1
  },
  {
    question: "Who was the 'Great Dissenter'?",
    choice1: "Claro M. Recto",
    choice2: "Apolinario Mabini",
    choice3: "Andres Bonifacio",
    choice4: "Jose Rizal",
    answer: 1
  },
  {
    question: "What is the first word of the 1987 Philippine Constitution?",
    choice1: "We",
    choice2: "The",
    choice3: "In",
    choice4: "Our",
    answer: 1
  },
  {
    question: "Who wrote the 'Kartilla', considered the 'bible' of the Katipunan movement?",
    choice1: "Emilio Jacinto",
    choice2: "Andres Bonifacio",
    choice3: "Melchora Aquino",
    choice4: "Antonio Luna",
    answer: 1
  },
  {
    question: "What is considered the earliest form of writing in the Philippines?",
    choice1: "Baybayin",
    choice2: "Kawi",
    choice3: "Sanskrit",
    choice4: "Arabic",
    answer: 1
  },
  {
    question: "Who first introduced the Islamic religion in the Philippines?",
    choice1: "Makhdum",
    choice2: "Ferdinand Magellan",
    choice3: "Lapu Lapu",
    choice4: "Rajah Sulayman",
    answer: 1
  },
  {
    question: "Who was credited with naming the Philippines 'Felipinas'?",
    choice1: "Ruy Lopez de Villalobos",
    choice2: "Ferdinand Magellan",
    choice3: "Christopher Columbus",
    choice4: "Miguel Lopez de Legazpi",
    answer: 1
  },
  {
    question: "For how many years did Spanish rule last in the Philippines?",
    choice1: "333",
    choice2: "1521",
    choice3: "50",
    choice4: "1898",
    answer: 1
  },
  {
    question: "Who won the first Philippine National Presidential Election?",
    choice1: "Manuel Luis Quezon",
    choice2: "Sergio Osmeña",
    choice3: "Emilio Aguinaldo",
    choice4: "Manuel Roxas",
    answer: 1
  },
  {
    question: "Foreign influences were evident on most aspects of Filipino culture - the Philippine languages, for example. Now, from which Asian language do these words come from, 'alam', 'hukom', and 'salamat'?",
    choice1: "Arabic",
    choice2: "Chinese",
    choice3: "Japanese",
    choice4: "Sanskrit",
    answer: 1
  },
  {
    question: "She is a Filipino heroine. After her husband died, she continued the war against Spain, was caught and hanged.",
    choice1: "Gabriela Silang",
    choice2: "Tandang Sora",
    choice3: "Melchora Aquino",
    choice4: "Gregoria de Jesus",
    answer: 1
  },
  {
    question: "Who founded the La Liga Filipina?",
    choice1: "Jose Rizal",
    choice2: "Andres Bonifacio",
    choice3: "Emilio Aguinaldo",
    choice4: "Marcelo H. del Pilar",
    answer: 1
  },
  {
    question: "While at the Ateneo, Rizal met his first love. She was a pretty fourteen-year-old Batangueña. Who was she?",
    choice1: "Segunda Katigbak",
    choice2: "Leonor Rivera",
    choice3: "Josephine Bracken",
    choice4: "Consuelo Ortiga",
    answer: 1
  },
  {
    question: "Raja Lakandula and Raja Sulayman revolted against Governor Guido de Lavezaris because of the abuses by the Spaniards. What is the revolt called?",
    choice1: "Manila Revolt",
    choice2: "Tondo Conspiracy",
    choice3: "Dagohoy Rebellion",
    choice4: "Sumuroy Rebellion",
    answer: 1
  },
  {
    question: "During the Japanese occupation of the Philippines, a Filipino president was appointed by the Japanese. Who was he?",
    choice1: "Jose P. Laurel Sr.",
    choice2: "Manuel Roxas",
    choice3: "Sergio Osmena",
    choice4: "Emilio Aguinaldo",
    answer: 1
  }
];


//CONSTANTS
const INCORRECT_TAX = 10;
const MAX_QUESTIONS = 10;

// Start Game & Timer
startGame = () => {
  questionCounter = 0;
  score = 100;
  availableQuesions = [...questions];
  getNewQuestion();

  // Timer
  setInterval(function () {
    score--;
    scoreText.innerText = score;

    if (score === 0) {
      localStorage.setItem("mostRecentScore", score);

      //go to the end page
      return window.location.assign("../../assets/html/end.html");
    }
  }, 1000);
};

// Display Next Random Question and Answers
getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    //go to the end page
    return window.location.assign("../html/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  // Get Answers
  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

//Get User's Choice
choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "incorrect") {
      decrementScore(INCORRECT_TAX);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 500);
  });
});

//Penalty for wrong choice
decrementScore = num => {
  score -= num;
  scoreText.innerText = score;
};


startGame();
