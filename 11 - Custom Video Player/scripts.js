const video = document.querySelector('video');
const playToggle = document.querySelector('button.toggle');
const playSkip = document.querySelectorAll('.player__button[data-skip]');
const slider = document.querySelectorAll('.player__slider');
const progress = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');
const fullScreen = document.querySelector('.full__screen');

let clicked = false;

function playPause() {
    // const method = video.paused ? 'play' : 'pause';
    // video[method]();
    if (video.paused) {
        video.play();
        playToggle.textContent = '❚ ❚';
    } else {
        video.pause();
        playToggle.textContent = '►';
    }
    console.log(`video played!`);
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function changeSlider() {
    video[this.name] = this.value;
    // if (this.name === 'volume') {
    //     video.volume = this.value;
    // } else {
    //     video.playbackRate = this.value;
    // }
    console.log(this.name, this.value);
}

function changeProgress(e) {
    progressFilled.style.flexBasis = `${(e.offsetX / progress.offsetWidth) * 100}%`;
    video.currentTime = video.duration * (e.offsetX / progress.offsetWidth);
    console.log('offsetX: ' + e.offsetX);
}

function autoChangeStatus() {
    progressFilled.style.flexBasis = `${(video.currentTime / video.duration) * 100}%`;
    
    // 改變 playToggle 的圖標
    if (this.ended) playToggle.textContent = '►';
}

function goFullScreen() {
    var requestMethod = video.requestFullScreen || video.webkitRequestFullScreen || video.mozRequestFullScreen || video.msRequestFullScreen;
    requestMethod.call(video);
}

playToggle.addEventListener('click', playPause);
video.addEventListener('click', playPause);
playSkip.forEach(cur => cur.addEventListener('click', skip));
slider.forEach(cur => cur.addEventListener('input', changeSlider));

progress.addEventListener('click', changeProgress);
progress.addEventListener('mousemove', (e) => clicked && changeProgress(e));    // 要是 clicked 的狀態才會執行 changeProgress
progress.addEventListener('mousedown', () => clicked = true);
progress.addEventListener('mouseup', () => clicked = false);

video.addEventListener('timeupdate', autoChangeStatus);
// setInterval(autoChangeStatus, 50);

fullScreen.addEventListener('click', goFullScreen);