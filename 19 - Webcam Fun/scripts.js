const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
	navigator.mediaDevices.getUserMedia({video: true, audio: false})
	.then(localMediaStream => {
		//need to convert video to a url
		video.src = window.URL.createObjectURL(localMediaStream);
		video.play();
	})
	.catch(err => {
		console.log(`You denied the camera!`, err);
	})
}

//set the video to appear on the canvas every
//x seconds

function paintToCanvas() {
	const width= video.videoWidth;
	const height= video.videoHeight;
	
	canvas.width = width;
	canvas.height = height;

	return setInterval(() => {
		ctx.drawImage(video,0,0, width, height);
		//take out pixels
		let pixels= ctx.getImageData(0,0, width,height);
		//mess with pixels
		pixels = rgbSplit(pixels);
		ctx.globalAlpha= 0.1;
		//put the transformed pixels back
		ctx.putImageData(pixels,0,0);

	}, 16) 
}

//enable photo taking ability
function takePhoto() {
	snap.currentTime= 0;
	snap.play();

	//take data out of the canvas
	const data = canvas.toDataURL('image/jpeg');
	const link= document.createElement('a');
	link.href= data;
	link.setAttribute('download', 'handsome');
	link.textContent= 'Download Image';
	link.innerHTML = `<img src="${data}" alt="Handsome Man"/>`;
	strip.insertBefore(link, strip.firstChild);
}

//making filters
function redEffect(pixels) {
	//loop through pixels and set rbg
	for(let i=0; i< pixels.data.length; i+=4) {
		pixels.data[i + 0] = pixels.data[i + 0] + 100; //red
		pixels.data[i + 1] = pixels.data[i + 0] - 50;//Green
		pixels.data[i + 2] = pixels.data[i + 0] * 0.5;//Blue
	}
	return pixels;

}

function rgbSplit(pixels) {
	for(let i=0; i< pixels.data.length; i+=4) {
		pixels.data[i - 150] = pixels.data[i + 0]; //red
		pixels.data[i + 300] = pixels.data[i + 1];//Green
		pixels.data[i - 150] = pixels.data[i + 2];//Blue
	}
	return pixels;

}

getVideo();

//once the video is played, then display the video on the canvas
video.addEventListener('canplay', paintToCanvas);
