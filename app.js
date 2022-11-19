const playButton = document.querySelector(".start");
const backButton = document.querySelector(".back");
const forwardButton = document.querySelector(".forward");
const musicPlayer = document.querySelector(".musicPlayer");
const songTitle = document.querySelector(".songTitle");

let songTitleArray = ["song1", "song2", "song3"];
let songTitleIndex = 0;

loadSong(songTitleArray[songTitleIndex]);
function isAudioPLaying() {
  return musicPlayer.classList.contains("playing");
}

function playAudio() {
  musicPlayer.classList.add("playing");
  playButton.querySelector("i").classList.remove("ph-play");
  playButton.querySelector("i").classList.add("ph-pause");
}
function pauseAudio() {
  musicPlayer.classList.remove("playing");
  playButton.querySelector("i").classList.remove("ph-pause");
  playButton.querySelector("i").classList.add("ph-play");
}
function loadSong(song) {
  songTitle.innerText = song;
}
function perviousSong() {
  songTitleIndex--;
  songTitleIndex >= 0
    ? loadSong(songTitleArray[songTitleIndex])
    : songTitleIndex++;
  isAudioPLaying() ? playAudio() : pauseAudio();
}
function nextSong() {
  songTitleIndex++;
  songTitleIndex <= songTitleArray.length - 1
    ? loadSong(songTitleArray[songTitleIndex])
    : songTitleIndex--;
  isAudioPLaying() ? playAudio() : pauseAudio();
}

// EVENT LISTENERS
playButton.addEventListener("click", () => {
  isAudioPLaying() ? pauseAudio() : playAudio(); // is audio play true? then pause else play
});
backButton.addEventListener("click", perviousSong);
forwardButton.addEventListener("click", nextSong);
