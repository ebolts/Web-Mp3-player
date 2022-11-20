const playButton = document.querySelector(".start");
const backButton = document.querySelector(".back");
const forwardButton = document.querySelector(".forward");
const musicPlayer = document.querySelector(".musicPlayer");
const songTitle = document.querySelector(".songTitle");
const audioSong = document.querySelector("audio");
const songImage = document.querySelector(".songImage");

let songsIndex = 0;

let songs;

function isAudioPLaying() {
  return musicPlayer.classList.contains("playing");
}
async function retrieveSongs() {
  await fetch(
    "https://api.napster.com/v2.2/tracks/top?range=year&apikey=ZmMyMDNkYTktZTFhNi00NzIwLTlhZWEtMWIzZGZjZTVjNTlm"
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response failed");
      }
      return response.json();
    })
    .then((data) => {
      songs = data.tracks;
      loadSong(songs[songsIndex]);
    })
    .catch((error) =>
      console.error("There was an issue with fetch request", error)
    );
}
retrieveSongs();

function playAudio() {
  musicPlayer.classList.add("playing");
  playButton.querySelector("i").classList.remove("ph-play");
  playButton.querySelector("i").classList.add("ph-pause");
  audioSong.play();
}
function pauseAudio() {
  musicPlayer.classList.remove("playing");
  playButton.querySelector("i").classList.remove("ph-pause");
  playButton.querySelector("i").classList.add("ph-play");
  audioSong.pause();
}
function loadSong(song) {
  songTitle.innerText = song.name;
  audioSong.src = song.previewURL;
  let albumArt = song.albumId;
  console.log(albumArt);
  songImage.src = `https://api.napster.com/imageserver/v2/albums/${albumArt}/images/170x170.jpg`;
}
function perviousSong() {
  songsIndex--;
  songsIndex >= 0 ? loadSong(songs[songsIndex]) : songsIndex++;
  isAudioPLaying() ? playAudio() : pauseAudio();
}
function nextSong() {
  songsIndex++;
  songsIndex <= songs.length - 1 ? loadSong(songs[songsIndex]) : songsIndex--;
  isAudioPLaying() ? playAudio() : pauseAudio();
}

// EVENT LISTENERS
playButton.addEventListener("click", () => {
  isAudioPLaying() ? pauseAudio() : playAudio(); // is audio play true? then pause else play
});
backButton.addEventListener("click", perviousSong);
forwardButton.addEventListener("click", nextSong);
