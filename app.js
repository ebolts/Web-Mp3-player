import f from "./facon.js";

const playButton = document.querySelector(".start"),
  musicPlayer = document.querySelector(".media-player"),
  songTitle = document.querySelector(".songTitle"),
  audioSong = document.querySelector("audio"),
  songImage = document.querySelector(".songImage"),
  loadingSong = document.querySelector(".loading"),
  songObject = document.querySelector(".song-object"),
  songItem = document.querySelector(".songItem"),
  playlist = document.querySelector(".playlist"),
  recentplayed = document.querySelector(".recently-played"),
  discoverSongs = document.querySelector(".discover"),
  searchbtn = document.querySelector(".search"),
  upload = document.querySelector(".upload");
let deleteSongsCount = 0;
let songs;
recentplayed.addEventListener("click", () => {
  requestLocal();
});

playlist.addEventListener("click", () => {
  document.querySelector(".sub-menu-discover").style.display = "none";
  document.querySelector(".sub-menu-recent-songs").style.display = "none";
  document.querySelector(".sub-menu-playlist").style.display = "block";
  document.querySelector(".sub-menu-search").style.display = "none";
  document.querySelector(".sub-menu-upload").style.display = "none";
  document.querySelector(".table-title").innerHTML = "Playlist";
});

discoverSongs.addEventListener("click", () => {
  document.querySelector(".sub-menu-playlist").style.display = "none";
  document.querySelector(".sub-menu-recent-songs").style.display = "none";
  document.querySelector(".sub-menu-discover").style.display = "block";
  document.querySelector(".sub-menu-search").style.display = "none";
  document.querySelector(".sub-menu-upload").style.display = "none";
  document.querySelector(".table-title").innerHTML = "Discover";
  retrieveSongs();
});

searchbtn.addEventListener("click", () => {
  document.querySelector(".sub-menu-playlist").style.display = "none";
  document.querySelector(".sub-menu-recent-songs").style.display = "none";
  document.querySelector(".sub-menu-discover").style.display = "none";
  document.querySelector(".sub-menu-upload").style.display = "none";
  document.querySelector(".sub-menu-search").style.display = "block";
  document.querySelector(".table-title").innerHTML = "Search";
  songObject.innerHTML = " ";

  const form = document.querySelector("#searchForm");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    retrieveSongsSearch();
  });
});

upload.addEventListener("click", () => {
  document.querySelector(".sub-menu-playlist").style.display = "none";
  document.querySelector(".sub-menu-recent-songs").style.display = "none";
  document.querySelector(".sub-menu-discover").style.display = "none";
  document.querySelector(".sub-menu-search").style.display = "none";
  document.querySelector(".sub-menu-upload").style.display = "block";
  document.querySelector(".table-title").innerHTML = "Upload";
  retrieveSongs();
});

function isAudioPLaying() {
  return musicPlayer.classList.contains("playing");
}

async function retrieveSongs() {
  await fetch(
    "http://api.napster.com/v2.2/artists/Art.28463069/tracks/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&limit=10"
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response failed");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      songs = data.tracks;
      console.log(songs);

      loadFromAPI(songs);
    })
    .catch((error) =>
      console.error("There was an issue with fetch request", error)
    );
}

async function retrieveSongsSearch() {
  const input = document.querySelector("#textInput");
  const inputValue = input.value;
  let artistName;
  let trackName;

  console.log(inputValue);
  await fetch(
    `http://api.napster.com/v2.2/search?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&per_type_limit=1&query=${inputValue}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response failed");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      artistName = data.search.data.artists[0].id;
      trackName = data.search.data.tracks[0].id;
    });

  await fetch(
    `http://api.napster.com/v2.2/artists/${artistName}/tracks/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&limit=10`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response failed");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      songs = data.tracks;
      console.log(songs);

      loadFromAPI(songs);
    })
    .catch((error) =>
      console.error("There was an issue with fetch request", error)
    );

  await fetch(
    `http://api.napster.com/v2.2/tracks/${trackName}?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&limit=10`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response failed");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      songs = data.tracks;
      console.log(songs);

      loadFromAPI(songs);
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

function requestLocal() {
  document.querySelector(".table-title").innerHTML = "Recently Added";
  document.querySelector(".sub-menu-playlist").style.display = "none";
  document.querySelector(".sub-menu-discover").style.display = "none";
  document.querySelector(".sub-menu-search").style.display = "none";
  document.querySelector(".sub-menu-upload").style.display = "none";
  document.querySelector(".sub-menu-recent-songs").style.display = "block";
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
    const IDQuery = store.getAll();

    IDQuery.onsuccess = function () {
      console.log(IDQuery);
      songObject.innerHTML = " ";
      const showInHtml = IDQuery.result.reverse().map((song) => {
        console.log(song.id);

        let songElement;
        console.log(song);

        let context = f`<div class="song-id-${song.id}" ref="songdiv" style="display: flex; text-align: left; align-items:center;  "> 
    
            <div style="text-align: left; width:300px "> 
            <img class="image" src=${song.image} style=" width: 50%; height: auto;">
            </div>
            
            <div style="text-align: left; width:300px"> 
              <h5 class="card-title " >${song.name}</h5>
            </div>
    
            <div style="text-align: left; width:300px"> 
              <h5 class="card-title " >${song.artist}</h5>
            </div>
    
            <div style="text-align: left; width:300px"> 
              <h5 class="card-title" >${song.time}</h5>
            </div>
    
            <div style="text-align: left; width:300px"> 
              <i class="ph-minus" ref="minusbtn"></i>
              
            </div>
    
          </div>`;

        let { minusbtn, songdiv } = context.collect();
        minusbtn.addEventListener("click", () => {
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
            let elementName = document.querySelector(`.song-id-${song.id}`);
            let childNodes = Array.from(songObject.childNodes);
            let index = childNodes.indexOf(elementName);
            console.log(index);
            let removeElementNode = songObject.childNodes[index];
            store.delete(song.id);

            console.log(removeElementNode);
            deleteSongsCount++;

            songElement = songObject.removeChild(removeElementNode);

            return songElement;
          };
          tx.oncomplete = function () {
            db.close();
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
            const MPimg = document.querySelector(".song-box-img");
            const MPName = document.querySelector(".MP-name");
            const MPArtist = document.querySelector(".MP-artist");

            IDQuery.onsuccess = function () {
              console.log("nameQuery", IDQuery.result.name);
              console.log("mp3dataQuery", IDQuery.result.mp3data);
              console.log("imageQuery:", IDQuery.result.image);
              audioSong.src = `${IDQuery.result.mp3data}`;

              img.style.backgroundImage = `url(${IDQuery.result.image})`;
              MPimg.style.backgroundImage = `url(${IDQuery.result.image})`;
              MPName.innerHTML = IDQuery.result.name;
              MPArtist.innerHTML = IDQuery.result.artist;
            };

            tx.oncomplete = function () {
              db.close();
            };
          };
        });

        songElement = songObject.appendChild(context);
        console.log(songObject.childNodes);

        return songElement;
      });

      //img.style.backgroundImage = `${IDQuery.result.image}`;
      console.log(showInHtml);
      return showInHtml;
    };

    tx.oncomplete = function () {
      db.close();
    };
  };
}

function loadFromAPI(songs) {
  let songElement;
  songObject.innerHTML = " ";
  const showInHtml = songs.map((song) => {
    let albumArt = song.albumId;
    let simg = `https://api.napster.com/imageserver/v2/albums/${albumArt}/images/500x500.jpg`;

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
          console.log("countIndex", countIndex.result);
          console.log("song id:", countIndex.result + 1 + deleteSongsCount);
          store.put({
            id: countIndex.result + 1 + deleteSongsCount,
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
        const MPimg = document.querySelector(".song-box-img");
        const MPName = document.querySelector(".MP-name");
        const MPArtist = document.querySelector(".MP-artist");

        IDQuery.onsuccess = function () {
          console.log("nameQuery", IDQuery.result.name);
          console.log("mp3dataQuery", IDQuery.result.mp3data);
          console.log("imageQuery:", IDQuery.result.image);
          audioSong.src = `${IDQuery.result.mp3data}`;

          img.style.backgroundImage = `url(${IDQuery.result.image})`;
          MPimg.style.backgroundImage = `url(${IDQuery.result.image})`;
          MPName.innerHTML = IDQuery.result.name;
          MPArtist.innerHTML = IDQuery.result.artist;
        };

        tx.oncomplete = function () {
          db.close();
        };
      };
    });
    console.log(songObject.appendChild(context));
    songElement = songObject.appendChild(context);

    return songElement;
  });
  console.log(showInHtml);
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

requestLocal();
// EVENT LISTENERS
playButton.addEventListener("click", () => {
  isAudioPLaying() ? pauseAudio() : playAudio(); // is audio play true? then pause else play
});
