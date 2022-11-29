const playButton = document.querySelector(".start");

const musicPlayer = document.querySelector(".musicPlayer");
const songTitle = document.querySelector(".songTitle");
const audioSong = document.querySelector("audio");
const songImage = document.querySelector(".songImage");
const loadingSong = document.querySelector(".loading");
let songList = document.querySelector(".songList");
const songItem = document.querySelector(".songItem");
let test = document.querySelector(".test");

let songs;
let arr;

function isAudioPLaying() {
  return musicPlayer.classList.contains("playing");
}
function displayList() {
  retrieveSongs();
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
      console.log(songs);

      loadtest(songs);
    })
    .catch((error) =>
      console.error("There was an issue with fetch request", error)
    );
}

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

const myContent = document.querySelector("#myContent");

function loadtest(songs) {
  const showInHtml = songs.map((song) => {
    let albumArt = song.albumId;
    let simg = `https://api.napster.com/imageserver/v2/albums/${albumArt}/images/200x200.jpg`;

    return `
        <img class="iamge" src=${simg}>
        <h5 class="card-title">${song.name}</h5>
        `;
  });
  myContent.innerHTML = showInHtml;
}

function perviousSong() {
  //songsIndex--;
  //songsIndex >= 0 ? loadSong(songs[songsIndex]) : songsIndex++;
  isAudioPLaying() ? playAudio() : pauseAudio();
}
function nextSong() {
  //songsIndex++;
  //songsIndex <= songs.length - 1 ? loadSong(songs[songsIndex]) : songsIndex--;
  isAudioPLaying() ? playAudio() : pauseAudio();
}

function handleFormSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const formJSON = Object.fromEntries(data.entries());

  const results = document.querySelector(".results pre");

  results.innerText = JSON.stringify(formJSON, null, 2);
}
const form = document.querySelector(".fileForm");
form.addEventListener("submit", handleFormSubmit);

// EVENT LISTENERS
playButton.addEventListener("click", () => {
  isAudioPLaying() ? pauseAudio() : playAudio(); // is audio play true? then pause else play
});

displayList();
