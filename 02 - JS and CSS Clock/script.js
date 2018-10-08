const secondHand = document.querySelector('.second-hand');
const minuteHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');
const currentTime = new Date();

let secondCount = 0, minuteCount = 0, hourCount = 0;

function setClock() {
    const secondDegrees = ((currentTime.getSeconds()/ 60) * 360) + 90;
    const minuteDegrees = ((currentTime.getMinutes()/ 60) * 360) + 90;
    const hourDegrees = ((currentTime.getHours()/ 12) * 360) + 90;
    secondHand.style.transform = `rotate(${secondDegrees}deg)`;
    minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}

function updateClock() {
    // 
    secondCount++;
    const secondDegrees = (currentTime.getSeconds() + secondCount) * 6 + 90;
    let minuteDegrees, hourDegrees;
    secondHand.style.transform = `rotate(${secondDegrees}deg)`;
    // 分針進位
    if((secondDegrees - 90) % 360 === 0) {
        minuteCount++;
        minuteDegrees = (currentTime.getMinutes() + minuteCount) * 6 + 90;
        minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
    }
    // 時針進位
    if ((secondDegrees - 90) % 360 === 0 && (minuteDegrees - 90) % 360 === 0) {
        hourCount++;
        hourDegrees = (currentTime.getHours() + hourCount) * 30 + 90;
        hourHand.style.transform = `rotate(${hourDegrees}deg)`;
    }
}

setClock();
window.setInterval(updateClock, 1000);