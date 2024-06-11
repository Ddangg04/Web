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
  ],
};

let currentQuestions = [];
