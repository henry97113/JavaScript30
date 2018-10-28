const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  navigator.mediaDevices.getUserMedia({video: true, audio: false} )
  .then((stream) => {
    video.srcObject = stream;
    video.onloadedmetadata = function(e) {
      video.play();
    };
  })
  .catch(function(err) { console.log(err.name + ": " + err.message); }); // always check for errors at the end.
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);  // 每 16 毫秒將攝影機畫面「印」至 canvas
    // 取得圖像資訊，imgData.data 會是一類陣列，imgData.data[0] => red, imgData.data[1] => green, imgData.data[2] => blue, imgData.data[3] => alpha 以此四個一組類推
    let pixels = ctx.getImageData(0, 0, width, height);
    // 加上濾鏡
    pixels = rgbSplit(pixels);
    // 輸出至 canvas
    ctx.putImageData(pixels, 0, 0);
  }, 16)
}

function takePhoto() {
  // 播放音效
  snap.currentTime = 0;
  snap.play();

  // 儲存照片
  const data = canvas.toDataURL("image/png");
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'Handsome.png');
  link.innerHTML = `<img src="${link}" alt="handsome guy/girl"/>`;
  // strip.appendChild(link);
  strip.insertBefore(link, strip.firstChild);  // 最新的照片會在最前面，使用 appendChild 會放在最後面
}

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
  }
  return pixels;
}

function invertEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i] = 255 - pixels.data[i];         // RED
    pixels.data[i + 1] = 255 - pixels.data[i + 1]; // GREEN
    pixels.data[i + 2] = 255 - pixels.data[i + 2]; // BLUE
    pixels.data[i + 3] = 255;
  }
  return pixels;
}

function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i - 150] = pixels.data[i];         // RED
    pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
    pixels.data[i - 550] = pixels.data[i + 2]; // BLUE
  }
  return pixels;
}

video.addEventListener('canplay', paintToCanvas);
getVideo(); 