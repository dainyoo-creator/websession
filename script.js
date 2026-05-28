// 동물별 데이터 — img에 사진 주소, text에 직접 쓴 글을 넣으세요.
const animalData = {
  "Munchkin": {
    img: "1.png",
    text: "먼치킨의 다리는 몇cm일까요?"
  },
  "Duroc": {
    img: "3.png",
    text: "....,,"
  }
  "Bichon Frise": {
    img: "2.png",
    text: "숑숑 털이 날린다,,"
  }
   "Holland Lop": {
    img: "4.png",
    text: "처진 귀 때문에 약간 불쌍해보이는 특징이 있습니다"
  }
   "Syrian Hamster": {
    img: "5.png",
    text: "뵤.. 나 아기 햄스터"
  }
};

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalImg = document.getElementById("modalImg");
const modalText = document.getElementById("modalText");

// data-name이 있는 칸 전부에 클릭 기능 연결
document.querySelectorAll("[data-name]").forEach(function (cell) {
  cell.addEventListener("click", function () {
    const name = cell.getAttribute("data-name");
    const info = animalData[name] || {};

    modalTitle.textContent = name;
    modalText.textContent = info.text || (name + "에 대한 글이 아직 없어요.");

    if (info.img) {
      modalImg.src = info.img;
      modalImg.style.display = "block";
    } else {
      modalImg.style.display = "none";
    }

    modal.classList.add("open");
  });
});

// 닫기: X 버튼 또는 바깥 어두운 부분 클릭
document.getElementById("modalClose").addEventListener("click", function () {
  modal.classList.remove("open");
});
modal.addEventListener("click", function (e) {
  if (e.target === modal) modal.classList.remove("open");
});