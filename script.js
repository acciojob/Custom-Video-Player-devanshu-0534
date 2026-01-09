/* Select elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* ---------- Play / Pause ---------- */
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

/* ---------- Update Play Button ---------- */
function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

/* ---------- Skip ---------- */
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

/* ---------- Volume & Playback Speed ---------- */
function handleRangeUpdate() {
  video[this.name] = this.value;
}

/* ---------- Progress Bar ---------- */
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

/* ---------- Scrub ---------- */
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

/* ---------- Error Handling ---------- */
video.addEventListener('error', () => {
  alert('Error: Video failed to load.');
});

/* ---------- Event Listeners ---------- */
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

skipButtons.forEach(btn => btn.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('input', handleRangeUpdate));

let mouseDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);
