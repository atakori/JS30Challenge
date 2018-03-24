// Get Elements
	const player= document.querySelector('.player');
	const video= player.querySelector('.viewer');
	const progress= player.querySelector('.progress');
	const progressBar= player.querySelector('.progress__filled');
	const toggle= player.querySelector('.toggle');
	const skipButtons= player.querySelectorAll('[data-skip]');
	const ranges= player.querySelectorAll('.player__slider');

//Build functions
	function togglePlay() {
		if(video.paused) {
			video.play();
		} else {
			video.pause();
		}
	}

	function updateButton() {
		const icon= this.paused ? '>' : '||';
		toggle.textContent= icon;
	}

	function skip() {
		console.log(this.dataset.skip);
		video.currentTime += parseFloat(this.dataset.skip);
	}

	function handleRangeUpdate() {
		video[this.name] = this.value;
	}

	function handleProgress() {
		//calculate percentage of how far the video is verse how long it is currentlu
		const percent= (video.currentTime / video.duration) *100;
		progressBar.style.flexBasis = `${percent}%`;
	}

	function scrub(e) {
		console.log(e);
		const scrubTime= (e.offsetX / progress.offsetWidth) * video.duration;
		video.currentTime = scrubTime;
	}

//create event listeners
	video.addEventListener('click', togglePlay);
	//trigger play and pause events
	video.addEventListener('play', updateButton);
	video.addEventListener('pause', updateButton)
	toggle.addEventListener('click', togglePlay);
	video.addEventListener('timeupdate', handleProgress);

	skipButtons.forEach(button => {
		button.addEventListener('click', skip);
	})
	ranges.forEach(range => {
		range.addEventListener('change', handleRangeUpdate);
		range.addEventListener('mousemove', handleRangeUpdate);
	})

	//set up video time drag
	let mouseDown = false
	progress.addEventListener('click', scrub);
	progress.addEventListener('mousedown', () => mouseDown = true);
	progress.addEventListener('mouseup', () => mouseDown = false);
	progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));

