import f from "./facon.js";

const playButton = document.querySelector(".start");
const musicPlayer = document.querySelector(".media-player");
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
  let songElement;
  const showInHtml = songs.map((song) => {
    console.log(song);
    let albumArt = song.albumId;
    let simg = `https://api.napster.com/imageserver/v2/albums/${albumArt}/images/200x200.jpg`;

    let context = f`<div ref="songdiv" style="display: flex; text-align: left; align-items:center;  "> 

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

        <div style="text-align: left; width:300px"> 
          <i class="ph-plus" ref="plusbtn"></i>
        </div>

      </div>`;

    let { plusbtn, songdiv } = context.collect();
    plusbtn.addEventListener("click", () => {
      console.log("open db on event click");
      let indexedDB =
        window.indexedDB ||
        window.mozIndexedDB ||
        window.webkitIndexedDB ||
        window.msIndexedDB;

      let open = indexedDB.open("SongsDatabase", 1);

      open.onupgradeneeded = function () {
        let db = open.result;
        const store = db.createObjectStore("songs", { keyPath: "id" });
        store.createIndex("song_name", ["name"], { unique: false });
      };

      open.onsuccess = function () {
        let db = open.result;
        let tx = db.transaction("songs", "readwrite");
        let store = tx.objectStore("songs");
        let countIndex = store.count();
        countIndex.onsuccess = function () {
          console.log(countIndex.result + 1);
          store.put({
            id: countIndex.result + 1,
            name: song.name,
            artist: song.artistName,
            time: song.playbackSeconds,
            mp3data: song.previewURL,
            image: simg,
          });
        };
        tx.oncomplete = function () {
          db.close();
        };
      };
    });

    songdiv.addEventListener("click", () => {
      console.log("open db on event click");
      let indexedDB =
        window.indexedDB ||
        window.mozIndexedDB ||
        window.webkitIndexedDB ||
        window.msIndexedDB;

      let open = indexedDB.open("SongsDatabase", 1);

      open.onupgradeneeded = function () {
        let db = open.result;
        const store = db.createObjectStore("songs", { keyPath: "id" });
        store.createIndex("song_name", ["name"], { unique: false });
      };

      open.onsuccess = function () {
        let db = open.result;
        let tx = db.transaction("songs", "readwrite");
        let store = tx.objectStore("songs");
        const audioSong = document.querySelector("audio");

        const songIndex = store.index("song_name");
        const IDQuery = songIndex.get([song.name]);
        const img = document.querySelector(".testimg");

        IDQuery.onsuccess = function () {
          console.log(IDQuery);
          console.log("nameQuery", IDQuery.result.name);
          console.log("mp3dataQuery", IDQuery.result.mp3data);
          console.log("imageQuery:", IDQuery.result.image);
          audioSong.src = `${IDQuery.result.mp3data}`;
          img.style.backgroundImage = `${IDQuery.result.image}`;
        };

        tx.oncomplete = function () {
          db.close();
        };
      };
    });

    songElement = songObject.appendChild(context);
    return songElement;
  });
  console.log(showInHtml);

  // let tesyt = showInHtml.join(" ");
  // console.log(tesyt);
  // songObject.innerHTML = tesyt;
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
