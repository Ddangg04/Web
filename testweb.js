
var score = 0;
var hintButton = document.getElementById('hint');
var confirmation = document.getElementById('confirmation');
var yesButton = document.getElementById('yes');
var noButton = document.getElementById('no');
var users = {};
var loggedIn = false; // Biến để kiểm tra trạng thái đăng nhập

function register() {
    var username = document.getElementById('registerUsername').value;
    var password = document.getElementById('registerPassword').value;

    if (users[username]) {
        alert('Tên đăng nhập đã được sử dụng');
    } else {
        users[username] = password;
        alert('Đăng ký thành công');
        document.getElementById('login').style.display = 'block';
        document.getElementById('register').style.display = 'none';
    }
}

function login() {
    var username = document.getElementById('loginUsername').value;
    var password = document.getElementById('loginPassword').value;

    if (users[username] === password) {
        loggedIn = true; // Đã đăng nhập thành công
        document.getElementById('login').style.display = 'none';
        document.getElementById('register').style.display = 'none';
        document.getElementById('gameSelection').style.display = 'block';
    } else {
        alert('Tên đăng nhập hoặc mật khẩu không đúng');
    }
}

var quickPuzzleQuestions = [
// Danh sách câu hỏi cho loại game "Giải đố nhanh"
    {
        question: 'Câu hỏi 1 cho loại game Giải đố nhanh',
        choices: ['A. Lựa chọn A', 'B. Lựa chọn B', 'C. Lựa chọn C', 'D. Lựa chọn D'],
        answer: 'A',
        hint: 'Gợi ý cho câu hỏi 1'
    },
    // Thêm các câu hỏi khác tại đây...
];

var mathPuzzleQuestions = [
    // Danh sách câu hỏi cho loại game "Giải đố Toán học"
    {
        question: 'Câu hỏi 1 cho loại game Giải đố Toán học',
        choices: ['A. Lựa chọn A', 'B. Lựa chọn B', 'C. Lựa chọn C', 'D. Lựa chọn D'],
        answer: 'B',
        hint: 'Gợi ý cho câu hỏi 1'
    },
    // Thêm các câu hỏi khác tại đây...
];

var englishPuzzleQuestions = [
    // Danh sách câu hỏi cho loại game "Giải đố Tiếng Anh"
    {
        question: 'Câu hỏi 1 cho loại game Giải đố Tiếng Anh',
        choices: ['A. Lựa chọn A', 'B. Lựa chọn B', 'C. Lựa chọn C', 'D. Lựa chọn D'],
        answer: 'C',
        hint: 'Gợi ý cho câu hỏi 1'
    },
    // Thêm các câu hỏi khác tại đây...
];

// Hàm để chọn một câu hỏi ngẫu nhiên từ danh sách câu hỏi cho loại game tương ứng
function selectRandomQuestion(gameType) {
    switch (gameType) {
        case 'Giải đố nhanh':
            return quickPuzzleQuestions[Math.floor(Math.random() * quickPuzzleQuestions.length)];
        case 'Giải đố Toán học':
            return mathPuzzleQuestions[Math.floor(Math.random() * mathPuzzleQuestions.length)];
        case 'Giải đố Tiếng Anh':
            return englishPuzzleQuestions[Math.floor(Math.random() * englishPuzzleQuestions.length)];
        default:
            return null;
    }
}

var currentQuestion; // Biến toàn cục để lưu trữ câu hỏi hiện tại

function startGame(gameType) {
    if (!loggedIn) {
        alert('Vui lòng đăng nhập trước khi chơi game.');
        return;
    }

    // Bắt đầu game tương ứng với gameType
    alert('Bắt đầu game: ' + gameType);
    
    // Chọn một câu hỏi ngẫu nhiên cho loại game và hiển thị nó
    currentQuestion = selectRandomQuestion(gameType);
    displayQuestion(currentQuestion);
    document.getElementById('questionContainer').style.display = 'block';
    // Ẩn phần tử chứa các nút chọn loại game
    document.getElementById('gameSelection').style.display = 'none';

    // Ẩn phần tử chứa các nút đăng nhập và đăng ký
    document.getElementById('login').style.display = 'none';
    document.getElementById('register').style.display = 'none';
}

    var answer = choiceButton.textContent[0];
    var resultElement = document.getElementById('result');
    if (answer === currentQuestion.answer) {
        resultElement.textContent = 'Đúng';
        score += 20;
        updateScore();
        // Kiểm tra xem còn câu hỏi nào còn lại không
        if (!remainingQuestions()) {
            // Chọn câu hỏi mới nếu còn
            setTimeout(function() {
                currentQuestion = selectRandomQuestion(currentQuestion.type);
                resultElement.textContent = '';
                displayQuestion(currentQuestion);
            }, 1000);
        } else {
            // Nếu không còn, hiển thị thông báo "Congratulate"
            document.getElementById('questionContainer').style.display = 'none';
            document.querySelector('.congratulate').style.display = 'block'; // Hiển thị phần "Congratulate
            resultElement.textContent = 'Congratulate';
        }
    } else {
        resultElement.textContent = 'Sai, hãy thử lại!';
        setTimeout(function() {
            resultElement.textContent = '';
        }, 1000);
    }

// Hàm kiểm tra xem còn câu hỏi nào còn lại trong mảng không
function remainingQuestions() {
    return quickPuzzleQuestions.length > 0 || mathPuzzleQuestions.length > 0 || englishPuzzleQuestions.length > 0;
}


function displayQuestion(question) {
    document.getElementById('question').textContent = question.question;
    for (var i = 0; i < question.choices.length; i++) {
        var choiceButton = document.getElementById('choice' + String.fromCharCode(65 + i)); // 65 is ASCII value for 'A'
        choiceButton.textContent = String.fromCharCode(65 + i) + '. ' + question.choices[i];
        choiceButton.style.display = 'block'; // Hiển thị nút lựa chọn
        choiceButton.onclick = function() {
            checkAnswer(this, question);
        };
    }
}

function updateScore() {
    document.getElementById('score').textContent = 'Điểm thưởng: ' + score;
}

hintButton.addEventListener('click', function() {
    confirmation.style.display = 'block';
});

yesButton.addEventListener('click', function() {
    confirmation.style.display = 'none';
    // Hiển thị gợi ý ở đây
    alert(questions[currentQuestion].hint);
    score -= 10;
    updateScore();
});

noButton.addEventListener('click', function() {
    confirmation.style.display = 'none';
});

function returnToPrevious() {
// Nếu đang ở phần câu hỏi, quay lại phần chọn game
if (document.getElementById('questionContainer').style.display === 'block') {
    document.getElementById('questionContainer').style.display = 'none';
    document.getElementById('gameSelection').style.display = 'block';
}
// Nếu đang ở phần chọn game, quay lại phần đăng nhập
else if (document.getElementById('gameSelection').style.display === 'block') {
    document.getElementById('gameSelection').style.display = 'none';
    document.getElementById('login').style.display = 'block';
    document.getElementById('register').style.display = 'none';
} 
else if (document.getElementById('login').style.display === 'block') {
    document.getElementById('gameSelection').style.display = 'none';
    document.getElementById('login').style.display = 'none';
    document.getElementById('register').style.display = 'block';
} 
else if (document.querySelector('.congratulate').style.display = 'block') {
    document.getElementById('gameSelection').style.display = 'block';
    document.getElementById('login').style.display = 'none';
    document.getElementById('register').style.display = 'none';
    document.querySelector('.congratulate').style.display = 'none';
}
}