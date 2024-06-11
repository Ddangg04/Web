// Khởi tạo chỉ số slide và đường dẫn ảnh
var slideIndex = 1;
var imgSrc;

// Hàm thay đổi slide
function plusDivs(n) {
  // Gọi hàm hiển thị slide với chỉ số mới
  showDivs((slideIndex += n));
}

// Hàm hiển thị slide
function showDivs(n) {
  var i;
  // Lấy danh sách các slide
  var x = document.getElementsByClassName("mySlides");
  // Nếu chỉ số vượt quá số lượng slide, quay lại slide đầu
  if (n > x.length) {
    slideIndex = 1;
  }
  // Nếu chỉ số nhỏ hơn 1, chuyển đến slide cuối
  if (n < 1) {
    slideIndex = x.length;
  }
  // Ẩn tất cả slide
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  // Hiển thị slide hiện tại
  x[slideIndex - 1].style.display = "block";
}

// Hàm thay đổi ảnh khi di chuột vào
function hover(img, newSrc) {
  // Lưu lại đường dẫn ảnh gốc
  imgSrc = img.src;
  // Thay đổi ảnh
  img.src = newSrc;
}
// Hàm khôi phục ảnh gốc khi di chuột ra
function leave(img) {
  // Khôi phục ảnh gốc
  img.src = imgSrc;
}
// Hàm chạy khi trang web tải xong
$(document).ready(function () {
  // Khi click vào #iw1, hiển thị hoặc ẩn .sub-action
  $("#iw1").click(function () {
    $(this).children(".sub-action").slideToggle();
  });
});
//Js choi game
document.addEventListener("DOMContentLoaded", () => {
  const startScreen = document.getElementById("start-screen");
  const gameTypeScreen = document.getElementById("game-type-screen");
  const quizScreen = document.getElementById("quiz-screen");
  const startBtn = document.getElementById("start-btn");
  const gameTypeBtns = document.querySelectorAll(".game-type-btn");
  const backBtn = document.getElementById("back-btn");
  const quizBackBtn = document.getElementById("quiz-back-btn");
  const questionElement = document.getElementById("question");
  const optionBtns = document.querySelectorAll(".option-btn");
  const hintElement = document.getElementById("hint-text");

  let currentQuestionIndex = 0;
  let score = 0;

  const questions = {
    math: [
      {
        question: "What is 2 + 2?",
        options: {
          A: "3",
          B: "4",
          C: "5",
          D: "6",
        },
        answer: "B",
        hint: "It's the same as 2 times 2.",
      },
      // Add more questions here
    ],
    english: [
      {
        question: "What is the synonym of 'happy'?",
        options: {
          A: "Sad",
          B: "Joyful",
          C: "Angry",
          D: "Tired",
        },
        answer: "B",
        hint: "It means the same as joyful.",
      },
      // Add more questions here
    ],
    general: [
      {
        question: "What is the capital of France?",
        options: {
          A: "Berlin",
          B: "Madrid",
          C: "Paris",
          D: "Rome",
        },
        answer: "C",
        hint: "It's known as the city of love.",
      },
      // Add more questions here
    ],
  };

  let currentQuestions = [];

  startBtn.addEventListener("click", () => {
    startScreen.classList.remove("active");
    gameTypeScreen.classList.add("active");
  });

  gameTypeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const gameType = btn.getAttribute("data-type");
      currentQuestions = questions[gameType];
      gameTypeScreen.classList.remove("active");
      quizScreen.classList.add("active");
      loadQuestion();
    });
  });

  backBtn.addEventListener("click", () => {
    gameTypeScreen.classList.remove("active");
    startScreen.classList.add("active");
  });

  quizBackBtn.addEventListener("click", () => {
    quizScreen.classList.remove("active");
    gameTypeScreen.classList.add("active");
  });

  optionBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const answer = btn.getAttribute("data-answer");
      if (answer === currentQuestions[currentQuestionIndex].answer) {
        score += 10;
        currentQuestionIndex++;
        if (currentQuestionIndex < currentQuestions.length) {
          loadQuestion();
        } else {
          alert(`Quiz completed! Your score is ${score}.`);
          resetGame();
        }
      } else {
        alert("Wrong answer! Try again.");
      }
    });
  });

  function loadQuestion() {
    const currentQuestion = currentQuestions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionBtns.forEach((btn) => {
      const option = btn.getAttribute("data-answer");
      btn.textContent = currentQuestion.options[option];
    });
    hintElement.textContent = currentQuestion.hint;
  }

  function resetGame() {
    currentQuestionIndex = 0;
    score = 0;
    quizScreen.classList.remove("active");
    startScreen.classList.add("active");
  }
});
