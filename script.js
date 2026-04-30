const confirmTexts = [
  "정말 탈퇴하시겠습니까?",
  "정말로 탈퇴하시겠습니까?",
  "탈퇴하셔도 괜찮으신가요?",
  "탈퇴 후 후회하지 않으시겠습니까?",
  "지금 탈퇴하지 않으셔도 됩니다",
  "탈퇴는 언제든지 가능합니다",
  "정말 마지막으로 확인합니다"
];

let confirmStep = 0;
let startTime = null;

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function startFlow() {
  startTime = Date.now();
  showScreen('screen-confirm');
}

function exit() {
  showScreen('screen-intro');
  confirmStep = 0;

  const text = document.getElementById('confirm-text');
  const yesBtn = document.getElementById('yes-btn');
  const noBtn = document.getElementById('no-btn');
  const buttons = document.getElementById('buttons');

  text.textContent = '정말 탈퇴하시겠습니까?';
  yesBtn.style.opacity = '1';
  yesBtn.style.fontSize = '';
  yesBtn.style.transform = '';
  noBtn.style.fontSize = '';
  noBtn.style.fontWeight = '';
  buttons.style.flexDirection = '';
  yesBtn.removeEventListener('mouseover', escapeButton);
}

function nextConfirm() {
  const text = document.getElementById('confirm-text');
  const yesBtn = document.getElementById('yes-btn');
  const noBtn = document.getElementById('no-btn');
  const buttons = document.getElementById('buttons');

  yesBtn.disabled = true;
  noBtn.disabled = true;
  setTimeout(() => {
    yesBtn.disabled = false;
    noBtn.disabled = false;
  }, 800 + confirmStep * 200);

  confirmStep++;

  if (confirmStep < confirmTexts.length) {
    text.textContent = confirmTexts[confirmStep];
  }

  const opacity = Math.max(0.2, 1 - confirmStep * 0.1);
  const fontSize = Math.max(0.5, 1 - confirmStep * 0.08);
  yesBtn.style.opacity = opacity;
  yesBtn.style.fontSize = fontSize + 'rem';

  const noBtnSize = Math.min(1.4, 0.95 + confirmStep * 0.08);
  noBtn.style.fontSize = noBtnSize + 'rem';
  noBtn.style.fontWeight = 'bold';

  if (confirmStep % 2 === 0) {
    buttons.style.flexDirection = 'row';
  } else {
    buttons.style.flexDirection = 'row-reverse';
  }

  if (confirmStep >= 4) {
    yesBtn.addEventListener('mouseover', escapeButton);
  }

  if (confirmStep >= confirmTexts.length) {
    setTimeout(() => {
      startLoading();
    }, 600);
  }
}

function escapeButton() {
  const btn = document.getElementById('yes-btn');
  const x = Math.random() * 80 - 40;
  const y = Math.random() * 80 - 40;
  btn.style.transform = `translate(${x}px, ${y}px)`;
}

function startLoading() {
  showScreen('screen-loading');
  const bar = document.getElementById('loading-bar');
  const percent = document.getElementById('loading-percent');
  let current = 0;

  const interval = setInterval(() => {
    if (current < 100) {
      current += Math.random() * 3;
      if (current > 100) current = 100;
      bar.value = current;
      percent.textContent = Math.floor(current) + '%';
    } else {
      clearInterval(interval);
      setTimeout(() => {
        showScreen('screen-done');
        setTimeout(() => {
          showEnding();
        }, 2000);
      }, 500);
    }
  }, 100);
}

function showEnding() {
  const elapsed = Date.now() - startTime;
  const minutes = Math.floor(elapsed / 60000);
  const seconds = Math.floor((elapsed % 60000) / 1000);

  let timeText = '';
  if (minutes > 0) {
    timeText = `계정 탈퇴까지 ${minutes}분 ${seconds}초가 걸렸습니다`;
  } else {
    timeText = `계정 탈퇴까지 ${seconds}초가 걸렸습니다`;
  }

  document.getElementById('ending-time').textContent = timeText;
  showScreen('screen-ending');
}

function restart() {
  exit();
  startTime = Date.now();
}