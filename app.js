const playButton = document.querySelector(".start");

const musicPlayer = document.querySelector(".musicPlayer");
const songTitle = document.querySelector(".songTitle");
const audioSong = document.querySelector("audio");
const songImage = document.querySelector(".songImage");
const loadingSong = document.querySelector(".loading");
const songObject = document.querySelector(".song-object");
let songList = document.querySelector(".songList");
const songItem = document.querySelector(".songItem");
let test = document.querySelector(".test");

let songs;
let arr;

const playlist = document.querySelector(".playlist");
const recentplayed = document.querySelector(".recently-played");

playlist.addEventListener("click", () => {
  document.querySelector(".sub-menu-playlist").style.display = "block";
  document.querySelector(".sub-menu-recent-songs").style.display = "none";
});

recentplayed.addEventListener("click", () => {
  document.querySelector(".sub-menu-playlist").style.display = "none";
  document.querySelector(".sub-menu-recent-songs").style.display = "block";
});
function isAudioPLaying() {
  return musicPlayer.classList.contains("playing");
}

async function retrieveSongs() {
  await fetch(
    "http://api.napster.com/v2.2/artists/Art.28463069/tracks?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&limit=5"
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

function loadtest(songs) {
  const showInHtml = songs.map((song) => {
    let albumArt = song.albumId;

    let simg = `https://api.napster.com/imageserver/v2/albums/${albumArt}/images/200x200.jpg`;

    return `
    
        <div style="display: flex; text-align: left; align-items:center;  "> 

        <div style="text-align: left; width:300px "> 
        <img class="image" src=${simg} style=" width: 50%; height: auto;">
        </div>
        
        <div style="text-align: left; width:300px"> 
        <h5 class="card-title " >${song.name}</h5>
        </div>
        <div style="text-align: left; width:300px"> 
        <h5 class="card-title " >${song.artistName}</h5>
        </div>
        <div style="text-align: left; width:300px"> 
        <h5 class="card-title" >${song.playbackSeconds}</h5>
        </div>
        
        </div>
        `;
  });
  console.log(showInHtml);
  songObject.innerHTML = showInHtml.join(" ");
  console.log(songObject);
}

function perviousSong() {
  isAudioPLaying() ? playAudio() : pauseAudio();
}
function nextSong() {
  isAudioPLaying() ? playAudio() : pauseAudio();
}

// function handleFormSubmit(event) {
//   event.preventDefault();
//   const data = new FormData(event.target);
//   const formJSON = Object.fromEntries(data.entries());

//   const results = document.querySelector(".results pre");

//   results.innerText = JSON.stringify(formJSON, null, 2);
// }
// const form = document.querySelector(".fileForm");
// form.addEventListener("submit", handleFormSubmit);

// EVENT LISTENERS
playButton.addEventListener("click", () => {
  isAudioPLaying() ? pauseAudio() : playAudio(); // is audio play true? then pause else play
});

retrieveSongs();
