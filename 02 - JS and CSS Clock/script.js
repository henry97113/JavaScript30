const secondHand = document.querySelector('.second-hand');
const minuteHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');
const currentTime = new Date();
const second = currentTime.getSeconds();
const minute = currentTime.getMinutes();
const hour = currentTime.getHours();

let secondCount = 0;

function setClock() {
    const secondDegrees = ((second / 60) * 360) + 90;
    const minuteDegrees = ((minute / 60) * 360) + ((second / 60) * 6) + 90;
    const hourDegrees = ((hour / 12) * 360) + ((minute / 60) * 30) + 90;
    secondHand.style.transform = `rotate(${secondDegrees}deg)`;
    minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}

function updateClock() {
    secondCount++;
    const newSecond = currentTime.getSeconds() + secondCount;
    const secondDegrees = (newSecond) * 6 + 90;
    let minuteDegrees, hourDegrees;
    secondHand.style.transform = `rotate(${secondDegrees}deg)`;
    minuteDegrees = ((minute / 60) * 360) + ((newSecond / 60) * 6) + 90;
    minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
    hourDegrees = ((hour / 12) * 360) + (minute / 60 * 30) + ((newSecond / 3600) * 30) + 90;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}

setClock();
window.setInterval(updateClock, 1000);