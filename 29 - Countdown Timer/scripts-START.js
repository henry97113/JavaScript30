const buttons = document.querySelectorAll('button[data-time]');
const custom = document.querySelector('#custom');
const timeLeft = document.querySelector('.display__time-left');
const endTIme = document.querySelector('.display__end-time');

let countdown;  // 如果 setInterval 中只有 return 只會跳出當前 function ，但 timer 不會停止執行，還是要透過 clearInterval 才行
function timer(seconds) {
  // clear all exisiting timer
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;

  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    // check if need to stop the timer
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    };
    // display time
    displayTimeLeft(secondsLeft);
  }, 1000)
}

function displayTimeLeft(seconds) {
  let minutes = Math.floor(seconds / 60);
  let remainderSeconds = seconds % 60;

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (remainderSeconds < 10) {
    remainderSeconds = `0${remainderSeconds}`;
  }

  const display =  `${minutes}:${remainderSeconds}`
  timeLeft.textContent = display;
}

function displayEndTime(timestamp) {
  const time = new Date(timestamp);
  const hours = time.getHours();
  const minutes = time.getMinutes();

  const display = `Be Back At ${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  endTIme.textContent = display;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

function startCustomTime(e) {
  e.preventDefault();
  const minutes = parseInt(this.minutes.value);

  if ((0 / minutes) !== 0 || minutes > 1440) {  // 1440 minutess = 1 day
    clearInterval(countdown);
    timeLeft.textContent = (0 / minutes) !== 0 ? 'Numbers only!' : 'Too long!';
    endTIme.textContent = '';
    return;
  }

  timer(minutes * 60);
  this.reset();
}

buttons.forEach(button => button.addEventListener('click', startTimer));
custom.addEventListener('submit', startCustomTime);