const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
    navigator.mediaDevices.getUserMedia({ 
        video: true, audio: false
    }).then(localMediaStream => {
        console.log(localMediaStream);
        video.srcObject = localMediaStream;
        video.play();
    }).catch(err => {
         console.error(`canny see ya!`, err);
    }); 
}

getVideo();

function printToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    return setInterval(() => { 
        ctx.drawImage(video, 0, 0, width, height);
        let pixels = ctx.getImageData(0, 0, width, height); //will take the pixels out
        // pixels = redEffect(pixels) ; //change them
        // pixels = rgbSplit(pixels);
        // ctx.globalAlpha = 0.1; //the pixels underneath are going to show for 10 more frames, putting transparency 10% and stacking
        pixels = greenScreen(pixels);
        ctx.putImageData(pixels, 0, 0); //put them back
    
    }, 16); 
}

function takePhoto() {
    snap.currentTime = 0;
    snap.play(); 
    const data = canvas.toDataURL('image/jpeg'); 
    const link = document.createElement('a');
    link.href = data; 
    link.setAttribute('download', 'beautiful'); 
    link.innerHTML = `<img src="${data}" alt="Beautiful person"/>`; 
    strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) { 
    for(let i = 0; i < pixels.data.length ; i += 4) { 
        pixels.data[i + 0] = pixels.data[i + 0] + 200; 
        pixels.data[i + 1] = pixels.data[i + 1] - 50; 
        pixels.data[i + 2] = pixels.data[i + 2] * 1; 
    }
    return pixels;
}

function rgbSplit(pixels) {
    for(let i = 0; i < pixels.data.length ; i += 4) { 
        pixels.data[i -150] = pixels.data[i + 0] + 200; 
        pixels.data[i + 100] = pixels.data[i + 1] - 50; 
        pixels.data[i - 150] = pixels.data[i + 2] * 1; 
    } 
    return pixels;
}

function greenScreen(pixels) {
    const levels = {}; 

    document.querySelectorAll('.rgb input').forEach((input) => {  
        levels[input.name] = input.value;
    });
 
    for(let i = 0; i < pixels.data.length ; i += 4) { 
        red = pixels.data[i + 0]; 
        green = pixels.data[i + 1]; 
        blue = pixels.data[i + 2]; 
        alpha = pixels.data[i + 3];

        if (red >= levels.rmin
            && green >= levels.gmin
            && blue >= levels.bmin
            && red <= levels.rmax
            && green <= levels.gmax
            && blue <= levels.bmax) {
                pixels.data[i + 3] = 0; 
            }
    }
    return pixels;
}

video.addEventListener('canplay', printToCanvas)
//filter=you get pixels out of the canvas and then you do stuff with them changing RGB values