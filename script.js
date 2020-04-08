/* eslint-disable linebreak-style */
const state = {
  animation: false,
  time: false,
  stepCount: 0,
  winCase: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', ' '],
};
let eS = [];
let arr = [];
const gameState = [[], [], [], []];


// Секундомер /////////////////////////////////////////////


// объявляем переменные
const base = 60;
let clocktimer;
let dateObj;
let dh;
let dm;
let ds;
let readout = '';
let h = 1;
let m = 1;
let tm = 1;
let s = 0;
let ts = 0;
let ms = 0;
let initT = 0;

// функция для очистки поля
function ClearСlock() {
  clearTimeout(clocktimer);
  h = 1;
  m = 1;
  tm = 1;
  s = 0;
  ts = 0;
  ms = 0;
  initT = 0;
  readout = '00:00:00';
  document.querySelector('.time').innerHTML = readout;
}

// функция для старта секундомера
function StartTIME() {
  const cdateObj = new Date();
  const t = (cdateObj.getTime() - dateObj.getTime()) - (s * 1000);
  if (t > 999) {
    s += 1;
  }
  if (s >= (m * base)) {
    ts = 0;
    m += 1;
  } else {
    ts = parseInt((ms / 100) + s, 10);
    if (ts >= base) {
      ts -= ((m - 1) * base);
    }
  }
  if (m > (h * base)) {
    tm = 1;
    h += 1;
  } else {
    tm = parseInt((ms / 100) + m, 10);
    if (tm >= base) {
      tm -= ((h - 1) * base);
    }
  }
  ms = Math.round(t / 10);
  if (ms > 99) {
    ms = 0;
  }
  if (ms === 0) {
    ms = '00';
  }
  if (ms > 0 && ms <= 9) {
    ms = `0${ms}`;
  }
  if (ts > 0) {
    ds = ts;
    if (ts < 10) {
      ds = `0${ts}`;
    }
  } else {
    ds = '00';
  }
  dm = tm - 1;
  if (dm > 0) {
    if (dm < 10) {
      dm = `0${dm}`;
    }
  } else {
    dm = '00';
  }
  dh = h - 1;
  if (dh > 0) {
    if (dh < 10) {
      dh = `0${dh}`;
    }
  } else {
    dh = '00';
  }
  readout = `${dh}:${dm}:${ds}`;
  document.querySelector('.time').innerHTML = readout;
  clocktimer = setTimeout(() => { StartTIME(); }, 1);
}

// Функция запуска и остановки
function StartStop() {
  if (initT === 0) {
    dateObj = new Date();
    StartTIME();
    document.querySelector('.playBtn').innerHTML = 'Стоп';
    state.time = true;
    initT = 1;
    localStorage.setItem('time', 'dateObj');
  } else {
    clearTimeout(clocktimer);
    document.querySelector('.playBtn').innerHTML = 'Старт';
    state.time = false;
    initT = 0;
  }
}


function shuffle(array) {
  const shuffled = array.slice();
  shuffled.sort(() => Math.random() - 0.5);
  return shuffled;
}

function restartPuzzle() {
  document.querySelector('.puzzle').remove();
  const puzzle = document.createElement('div');
  puzzle.className = 'puzzle';
  document.querySelector('.panel').before(puzzle);
  const randomArray = shuffle(state.winCase);
  eS = [];
  eS.push(Math.floor(randomArray.indexOf(' ') / 4)); eS.push(randomArray.indexOf(' ') % 4);

  for (let i = 0; i < 4; i += 1) {
    for (let k = 0; k < 4; k += 1) {
      const n = randomArray.shift();
      gameState[i][k] = n;
      const square = document.createElement('div');
      square.classList.add('square');
      square.innerText = n;
      if (n === ' ') {
        square.classList.add('empty');
      }
      document.querySelector('.puzzle').append(square);
    }
  }
}
function init() {
  const h2 = document.createElement('h2');
  h2.innerHTML = 'Gem Puzzle';
  const container = document.createElement('div');
  const puzzle = document.createElement('div');
  const panel = document.createElement('div');
  const stepCount = document.createElement('div');
  const playBtn = document.createElement('button');
  const time = document.createElement('div');
  const restart = document.createElement('button');
  const modal = document.createElement('div');
  const overlay = document.createElement('div');

  modal.className = 'modal';
  overlay.className = 'overlay';
  restart.className = 'restart';
  restart.innerHTML = 'Рестарт';
  time.className = 'time';
  time.innerHTML = '00:00:00';
  playBtn.className = 'playBtn';
  playBtn.innerHTML = 'Старт';
  stepCount.className = 'stepCount';
  stepCount.innerHTML = 'Ходов: 0';
  panel.className = 'panel';
  container.className = 'container';
  puzzle.className = 'puzzle';
  document.body.append(container);
  document.body.append(modal);
  document.body.append(overlay);
  container.append(h2);
  container.append(puzzle);
  container.append(panel);
  panel.append(stepCount);
  panel.append(playBtn);
  panel.append(restart);
  panel.append(time);

  const randomArray = shuffle(state.winCase);
  eS.push(Math.floor(randomArray.indexOf(' ') / 4)); eS.push(randomArray.indexOf(' ') % 4);

  for (let i = 0; i < 4; i += 1) {
    for (let k = 0; k < 4; k += 1) {
      const n = randomArray.shift();
      gameState[i][k] = n;
      const square = document.createElement('div');
      square.classList.add('square');
      square.innerText = n;
      if (n === ' ') {
        square.classList.add('empty');
      }
      document.querySelector('.puzzle').append(square);
    }
  }
}
function drawPuzzle() {
  document.querySelector('.puzzle').remove();
  const puzzle = document.createElement('div');
  puzzle.className = 'puzzle';
  document.querySelector('.panel').before(puzzle);
  for (let i = 0; i < 4; i += 1) {
    for (let k = 0; k < 4; k += 1) {
      const square = document.createElement('div');
      square.className = 'square';
      square.innerText = gameState[i][k];
      document.querySelector('.puzzle').append(square);
    }
  }
  document.querySelector(`.square:nth-child(${eS[0] * 4 + eS[1] + 1})`).classList.add('empty');
}
function render(value, emptyS) {
  const [x, y] = emptyS;
  const elem = document.querySelector(`.square:nth-child(${x * 4 + y + 1})`);
  switch (value) {
    case 'down':
      if (value !== null) {
        const promise = new Promise(((resolve) => {
          state.animation = true;
          setTimeout(() => resolve(elem), 300);
          elem.style.transform = 'translateY(100%)';
        }));
        promise.then(() => { drawPuzzle(); state.animation = false; });
      }
      break;
    case 'up':
      if (value !== null) {
        const promise1 = new Promise(((resolve) => {
          state.animation = true;
          setTimeout(() => resolve(elem), 300);
          elem.style.transform = 'translateY(-100%)';
        }));
        promise1.then(() => { drawPuzzle(); state.animation = false; });
      }
      break;
    case 'left':
      if (value !== null) {
        const promise2 = new Promise(((resolve) => {
          state.animation = true;
          setTimeout(() => resolve(elem), 300);
          elem.style.transform = 'translateX(-100%)';
        }));
        promise2.then(() => { drawPuzzle(); state.animation = false; });
      }
      break;
    case 'right':
      if (value !== null) {
        const promise3 = new Promise(((resolve) => {
          state.animation = true;
          setTimeout(() => resolve(elem), 300);
          elem.style.transform = 'translateX(100%)';
        }));
        promise3.then(() => { drawPuzzle(); state.animation = false; });
      }
      break;
    default:
      break;
  }
}
function winner() {
  let n = 0;
  arr = [];
  for (let i = 0; i < gameState.length; i += 1) {
    for (let k = 0; k < gameState[i].length; k += 1) {
      arr.push(gameState[i][k]);
    }
  }
  state.winCase.forEach((item, index) => {
    if (item === arr[index]) {
      n += 1;
    }
  });
  if (n === 16) {
    const img = document.createElement('img');
    img.src = './success.gif';
    document.querySelector('.modal').classList.add('active');
    document.querySelector('.overlay').classList.add('active');
    document.querySelector('.modal').innerHTML = `Ура! Вы решили головоломку за ${document.querySelector('.time').innerHTML} и ${state.stepCount} ходов `;
    img.onload = () => { document.querySelector('.modal').append(img); };
  } else { console.log(`Готовых блоков: ${n}`); }
}
document.addEventListener('keydown', (e) => {
  if (state.animation === false && (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
    if (!state.time) {
      StartStop();
    }
    switch (e.key) {
      case 'ArrowDown':
        if (eS[0] - 1 >= 0) {
          state.stepCount += 1;
          document.querySelector('.stepCount').innerHTML = `Ходов: ${state.stepCount}`;
          const val = gameState[eS[0]][eS[1]];
          gameState[eS[0]][eS[1]] = gameState[eS[0] - 1][eS[1]];
          gameState[eS[0] - 1][eS[1]] = val;
          eS = [eS[0] - 1, eS[1]];
          render('down', eS);
          winner();
        }
        break;
      case 'ArrowUp':
        if (eS[0] + 1 < 4) {
          state.stepCount += 1;
          document.querySelector('.stepCount').innerHTML = `Ходов: ${state.stepCount}`;
          const val = gameState[eS[0]][eS[1]];
          gameState[eS[0]][eS[1]] = gameState[eS[0] + 1][eS[1]];
          gameState[eS[0] + 1][eS[1]] = val;
          eS = [eS[0] + 1, eS[1]];
          render('up', eS);
          winner();
        }
        break;
      case 'ArrowLeft':
        if (eS[1] + 1 < 4) {
          state.stepCount += 1;
          document.querySelector('.stepCount').innerHTML = `Ходов: ${state.stepCount}`;
          const val = gameState[eS[0]][eS[1]];
          gameState[eS[0]][eS[1]] = gameState[eS[0]][eS[1] + 1];
          gameState[eS[0]][eS[1] + 1] = val;
          eS = [eS[0], eS[1] + 1];
          render('left', eS);
          winner();
        }

        break;
      case 'ArrowRight':
        if (eS[1] - 1 >= 0) {
          state.stepCount += 1;
          document.querySelector('.stepCount').innerHTML = `Ходов: ${state.stepCount}`;
          const val = gameState[eS[0]][eS[1]];
          gameState[eS[0]][eS[1]] = gameState[eS[0]][eS[1] - 1];
          gameState[eS[0]][eS[1] - 1] = val;
          eS = [eS[0], eS[1] - 1];
          render('right', eS);
          winner();
        }
        break;

      default:
        break;
    }
  }
});


init();


document.addEventListener('click', (e) => {
  if (e.target.className === 'playBtn') {
    StartStop();
  } else if (e.target.className === 'restart') {
    restartPuzzle();
    clearTimeout(clocktimer);
    ClearСlock();
    state.time = false;
  } else if (state.animation === false && e.path[0].classList.contains('square')) {
    if (state.time === false) {
      StartStop();
      state.time = true;
    }
    arr = [];
    for (let i = 0; i < gameState.length; i += 1) {
      for (let k = 0; k < gameState[i].length; k += 1) {
        arr.push(gameState[i][k]);
      }
    }
    const a = arr.indexOf(e.target.innerHTML);
    const cS = [Math.floor(a / 4), a % 4];
    // console.log(cS, eS)
    if (eS[0] === cS[0] + 1 && eS[1] === cS[1]) {
      // Down
      state.stepCount += 1;
      document.querySelector('.stepCount').innerHTML = `Ходов: ${state.stepCount}`;
      const val = gameState[eS[0]][eS[1]];
      gameState[eS[0]][eS[1]] = gameState[eS[0] - 1][eS[1]];
      gameState[eS[0] - 1][eS[1]] = val;
      eS = [eS[0] - 1, eS[1]];
      render('down', eS);
      winner();
    } else if (eS[0] === cS[0] - 1 && eS[1] === cS[1]) {
      // Up
      state.stepCount += 1;
      document.querySelector('.stepCount').innerHTML = `Ходов: ${state.stepCount}`;
      const val = gameState[eS[0]][eS[1]];
      gameState[eS[0]][eS[1]] = gameState[eS[0] + 1][eS[1]];
      gameState[eS[0] + 1][eS[1]] = val;
      eS = [eS[0] + 1, eS[1]];
      render('up', eS);
      winner();
    } else if (eS[0] === cS[0] && eS[1] === cS[1] + 1) {
      // Right
      state.stepCount += 1;
      document.querySelector('.stepCount').innerHTML = `Ходов: ${state.stepCount}`;
      const val = gameState[eS[0]][eS[1]];
      gameState[eS[0]][eS[1]] = gameState[eS[0]][eS[1] - 1];
      gameState[eS[0]][eS[1] - 1] = val;
      eS = [eS[0], eS[1] - 1];
      render('right', eS);
      winner();
    } else if (eS[0] === cS[0] && eS[1] === cS[1] - 1) {
      // Left
      state.stepCount += 1;
      document.querySelector('.stepCount').innerHTML = `Ходов: ${state.stepCount}`;
      const val = gameState[eS[0]][eS[1]];
      gameState[eS[0]][eS[1]] = gameState[eS[0]][eS[1] + 1];
      gameState[eS[0]][eS[1] + 1] = val;
      eS = [eS[0], eS[1] + 1];
      render('left', eS);
      winner();
    }
  }
});


document.querySelector('.modal').addEventListener('click', () => {
  document.querySelector('.modal').classList.remove('active');
  document.querySelector('.overlay').classList.remove('active');
});
