import f from "./facon.js";

const playButton = document.querySelector(".start"),
  musicPlayer = document.querySelector(".media-player"),
  audioSong = document.querySelector("audio"),
  loadingSong = document.querySelector(".loading"),
  songObject = document.querySelector(".song-object"),
  songObject1 = document.querySelector(".song-object1"),
  songItem = document.querySelector(".songItem"),
  playlist = document.querySelector(".playlist"),
  recentplayed = document.querySelector(".recently-played"),
  discoverSongs = document.querySelector(".discover"),
  searchbtn = document.querySelector(".search"),
  upload = document.querySelector(".upload"),
  topTracks = document.querySelector(".topTracks");
let deleteSongsCount = 0;
let songs;
let titleState;
recentplayed.addEventListener("click", () => {
  document.querySelector(".songsWithName").style.display = "none";
  document.querySelector(".artistTracks").style.display = "none";
  requestLocal();
});

playlist.addEventListener("click", () => {
  document.querySelector(".sub-menu-discover").style.display = "none";
  document.querySelector(".sub-menu-recent-songs").style.display = "none";
  document.querySelector(".sub-menu-playlist").style.display = "block";
  document.querySelector(".sub-menu-search").style.display = "none";
  document.querySelector(".sub-menu-upload").style.display = "none";
  document.querySelector(".table-title").innerHTML = "Playlist";

  document.querySelector(".songsWithName").style.display = "none";
  document.querySelector(".artistTracks").style.display = "none";
  songObject.innerHTML = " ";
  songObject1.innerHTML = " ";
});

discoverSongs.addEventListener("click", () => {
  document.querySelector(".sub-menu-playlist").style.display = "none";
  document.querySelector(".sub-menu-recent-songs").style.display = "none";
  document.querySelector(".sub-menu-discover").style.display = "block";
  document.querySelector(".sub-menu-search").style.display = "none";
  document.querySelector(".sub-menu-upload").style.display = "none";
  document.querySelector(".table-title").innerHTML = "Discover";

  document.querySelector(".songsWithName").style.display = "none";
  document.querySelector(".artistTracks").style.display = "none";
  titleState = false;
  songObject1.innerHTML = " ";
  songObject.innerHTML = " ";
});

searchbtn.addEventListener("click", () => {
  document.querySelector(".sub-menu-playlist").style.display = "none";
  document.querySelector(".sub-menu-recent-songs").style.display = "none";
  document.querySelector(".sub-menu-discover").style.display = "none";
  document.querySelector(".sub-menu-upload").style.display = "none";
  document.querySelector(".sub-menu-search").style.display = "block";
  document.querySelector(".table-title").innerHTML = "Search";
  songObject.innerHTML = " ";
  songObject1.innerHTML = " ";
  document.querySelector(".songsWithName").style.display = "none";
  document.querySelector(".artistTracks").style.display = "none";

  const form = document.querySelector("#searchForm");
  titleState = true;
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
  songObject.innerHTML = " ";
  songObject1.innerHTML = " ";
});

function isAudioPLaying() {
  return musicPlayer.classList.contains("playing");
}

async function retrieveTopTracksWeek() {
  await fetch(
    "http://api.napster.com/v2.2/tracks/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&range=week"
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

      generalLoadSearchAPI(songs);
    })
    .catch((error) =>
      console.error("There was an issue with fetch request", error)
    );
}

async function retrieveChristmasTracks() {
  await fetch(
    "http://api.napster.com/v2.2/genres/g.120/tracks/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4"
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

      generalLoadSearchAPI(songs);
    })
    .catch((error) =>
      console.error("There was an issue with fetch request", error)
    );
}

async function retrieveRapHipHopTracks() {
  await fetch(
    "http://api.napster.com/v2.2/genres/g.146/tracks/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&range=week"
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

      generalLoadSearchAPI(songs);
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
    `http://api.napster.com/v2.2/search?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&per_type_limit=10&query=${inputValue}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response failed");
      }
      return response.json();
    })
    .then((data) => {
      console.log("data object to get artist id: ", data);

      artistName = data.search.data.artists[0].id;
      console.log("artistName console log (id): ", artistName);

      trackName = data.search.data.tracks;
      console.log("trackName: ", trackName);
      loadSearchSongsFromAPI(trackName);
    })
    .catch((error) =>
      console.error("There was an issue with fetch request", error)
    );

  await fetch(
    `http://api.napster.com/v2.2/artists/${artistName}/tracks/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&limit=20`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response failed");
      }
      return response.json();
    })
    .then((data) => {
      console.log("ArtistName data object: ", data);

      songs = data.tracks;
      console.log("ArtistName songs console log: ", songs);
      generalLoadSearchAPI(songs);
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

    const IDQuery = store.getAll();

    IDQuery.onsuccess = function () {
      songObject.innerHTML = " ";
      songObject1.innerHTML = " ";

      const DisplayArrayOfSongs = IDQuery.result.reverse().map((song) => {
        let seconds = song.time;
        console.log(seconds);
        let songElement;
        console.log("song:", song);

        let context = f`<div class="song-id-${
          song.id
        }" ref="songdiv" style="display: flex; text-align: left; align-items:center; max-height: 152px; 
          margin: 15px 0px 15px 0px; 
            " > 
            <div style="display: flex; align-items: left; justify-content: left;  width:300px; max-height: 152px; height: 100%; "> 
              <img class="image" src=${
                song.image
              } style=" width: 50%; height: auto;  object-fit: cover;  background-size: cover; background-image:${
          song.image
        }" >
            </div>
            
            <div style="text-align: left; width:300px; padding-right: 10px"> 
              <h5 class="card-title " >${song.name}</h5>
            </div>
    
            <div style="text-align: left; width:300px; padding-right: 10px"> 
              <h5 class="card-title " >${song.artist}</h5>
            </div>
    
            <div style="text-align: left; width:300px; padding-right: 10px"> 
              <h5 class="card-title" >${secondsToMinutes(seconds)}</h5>
            </div>
    
            <div style="text-align: left; width:300px; "> 
              <i class="ph-minus" ref="minusbtn"></i>
              
            </div>
    
          </div>`;

        let { minusbtn, songdiv } = context.collect();

        document.addEventListener("click", function (event) {
          songdiv.classList.add("selected");

          // checks if the div element is click
          // in this case it shouldn't be (e.g clicked on another div) so remove background
          if (!songdiv.contains(event.target)) {
            songdiv.classList.remove("selected");
          }
        });
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
            const PreviewTitle = document.querySelector(".song-info-title");

            const PreviewArtistName =
              document.querySelector(".song-info-artist");
            const PreviewSongArt = document.querySelector(".preview-song-art");

            PreviewSongArt.style.display = "block";

            IDQuery.onsuccess = function () {
              const isThereAnArtist = new Image();

              isThereAnArtist.src = IDQuery.result.artistIMG;
              isThereAnArtist.onload = function () {
                // The image has been successfully loaded
                img.src = IDQuery.result.artistIMG;
              };
              // Set a callback function to run if there was an error loading the image
              isThereAnArtist.onerror = function () {
                // There was an error loading the image
                img.src = IDQuery.result.image;
                // // call style again to display any user uploaded songs not from url
                //img.style.backgroundImage = IDQuery.result.image;
              };
              console.log("IDQuery.result.mp3data: ", IDQuery.result.mp3data);
              console.log("IDQuery.result.time", IDQuery.result.time);

              audioSong.src = `${IDQuery.result.mp3data}`;
              //PreviewSongArt.style.backgroundImage = `url(${IDQuery.result.image})`;
              PreviewSongArt.src = IDQuery.result.image;
              PreviewTitle.innerHTML = IDQuery.result.name;
              PreviewArtistName.innerHTML = IDQuery.result.artist;

              MPimg.src = IDQuery.result.image;

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
      console.log(DisplayArrayOfSongs);
      return DisplayArrayOfSongs;
    };

    tx.oncomplete = function () {
      db.close();
    };
  };
}

function generalLoadSearchAPI(songs) {
  songObject.innerHTML = " ";

  let songElement;
  const DisplayArrayOfSongs = songs.map((song) => {
    let albumArt = song.albumId;
    let artisrtArt = song.artistId;
    let trackArt = `https://api.napster.com/imageserver/v2/albums/${albumArt}/images/500x500.jpg`;
    let artistIMG = `https://api.napster.com/imageserver/v2/artists/${artisrtArt}/images/633x422.jpg`;
    let seconds = song.playbackSeconds;

    let context = f`<div class="song-id-${
      song.id
    }" ref="songdiv" style="display: flex; text-align: left; align-items:center; max-height: 152px; 
      margin: 15px 0px 15px 0px; 
        " > 
        <div style="display: flex; align-items: left; justify-content: left;  width:300px; max-height: 152px; height: 100%; "> 
          <img class="image" src=${trackArt} style=" width: 50%; height: auto;" >
        </div>
        
        <div style="text-align: left; width:300px; padding-right: 10px"> 
          <h5 class="card-title " >${song.name}</h5>
        </div>

        <div style="text-align: left; width:300px; padding-right: 10px"> 
          <h5 class="card-title " >${song.artistName}</h5>
        </div>

        <div style="text-align: left; width:300px; padding-right: 10px"> 
          <h5 class="card-title" >${secondsToMinutes(seconds)}</h5>
        </div>

        <div style="text-align: left; width:300px; "> 
          <i class="ph-plus" ref="plusbtn"></i>
          
        </div>

      </div>`;

    let { plusbtn, songdiv } = context.collect();
    document.addEventListener("click", function (event) {
      songdiv.classList.add("selected");
      // checks if the div element is click
      // in this case it shouldn't be (e.g clicked on another div) so remove background
      if (!songdiv.contains(event.target)) {
        songdiv.classList.remove("selected");
      }
    });
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
            artistIMG: artistIMG,
            time: song.playbackSeconds,
            mp3data: song.previewURL,
            image: trackArt,
          });
        };
        tx.oncomplete = function () {
          db.close();
        };
      };
    });

    songdiv.addEventListener("click", () => {
      const audioSong = document.querySelector("audio");
      const img = document.querySelector(".testimg");
      const MPimg = document.querySelector(".song-box-img");
      const MPName = document.querySelector(".MP-name");
      const MPArtist = document.querySelector(".MP-artist");
      const PreviewTitle = document.querySelector(".song-info-title");
      const PreviewArtistName = document.querySelector(".song-info-artist");
      const PreviewSongArt = document.querySelector(".preview-song-art");
      const isThereAnArtist = new Image();
      isThereAnArtist.src = artistIMG;
      isThereAnArtist.onload = function () {
        // The image has been successfully loaded
        img.src = artistIMG;
      };
      // Set a callback function to run if there was an error loading the image
      isThereAnArtist.onerror = function () {
        // There was an error loading the image
        img.src = trackArt;
      };
      PreviewSongArt.style.display = "block";
      audioSong.src = song.previewURL;

      MPimg.src = trackArt;
      PreviewSongArt.src = trackArt;
      MPName.innerHTML = song.name;
      MPArtist.innerHTML = song.artistName;
      PreviewTitle.innerHTML = song.name;
      PreviewArtistName.innerHTML = song.artistName;
    });

    songElement = songObject.appendChild(context);

    return songElement;
  });

  if (DisplayArrayOfSongs.length > 0 && titleState == true) {
    document.querySelector(".artistTracks").style.display = "block";
  }
}

function loadSearchSongsFromAPI(songs) {
  songObject1.innerHTML = " ";
  let songElement;

  const DisplayArrayOfSongs = songs.map((song) => {
    console.log("song: ", song);
    let albumArt = song.albumId;
    let artisrtArt = song.artistId;
    let trackArt = `https://api.napster.com/imageserver/v2/albums/${albumArt}/images/500x500.jpg`;
    let artistIMG = `https://api.napster.com/imageserver/v2/artists/${artisrtArt}/images/633x422.jpg`;
    let seconds = song.playbackSeconds;

    let context = f`<div class="song-id-${
      song.id
    }" ref="songdiv" style="display: flex; text-align: left; align-items:center; max-height: 152px; 
      margin: 15px 0px 15px 0px; 
        " > 
        <div style="display: flex; align-items: left; justify-content: left;  width:300px; max-height: 152px; height: 100%; "> 
          <img class="image" src=${trackArt} style=" width: 50%; height: auto;" >
        </div>
        
        <div style="text-align: left; width:300px; padding-right: 10px"> 
          <h5 class="card-title " >${song.name}</h5>
        </div>

        <div style="text-align: left; width:300px; padding-right: 10px"> 
          <h5 class="card-title " >${song.artistName}</h5>
        </div>

        <div style="text-align: left; width:300px; padding-right: 10px"> 
          <h5 class="card-title" >${secondsToMinutes(seconds)}</h5>
        </div>

        <div style="text-align: left; width:300px; "> 
          <i class="ph-plus" ref="plusbtn"></i>
          
        </div>

      </div>`;

    let { plusbtn, songdiv } = context.collect();
    document.addEventListener("click", function (event) {
      songdiv.classList.add("selected");
      // checks if the div element is click
      // in this case it shouldn't be (e.g clicked on another div) so remove background
      if (!songdiv.contains(event.target)) {
        songdiv.classList.remove("selected");
      }
    });
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
          //console.log("countIndex", countIndex.result);
          //console.log("song id:", countIndex.result + 1 + deleteSongsCount);
          store.put({
            id: countIndex.result + 1 + deleteSongsCount,
            name: song.name,
            artist: song.artistName,
            artistIMG: artistIMG,
            time: song.playbackSeconds,
            mp3data: song.previewURL,
            image: trackArt,
          });
        };
        tx.oncomplete = function () {
          db.close();
        };
      };
    });

    songdiv.addEventListener("click", () => {
      const audioSong = document.querySelector("audio");
      const img = document.querySelector(".testimg");
      const MPimg = document.querySelector(".song-box-img");
      const MPName = document.querySelector(".MP-name");
      const MPArtist = document.querySelector(".MP-artist");
      const PreviewTitle = document.querySelector(".song-info-title");
      const PreviewArtistName = document.querySelector(".song-info-artist");
      const PreviewSongArt = document.querySelector(".preview-song-art");
      const isThereAnArtist = new Image();
      isThereAnArtist.src = artistIMG;
      isThereAnArtist.onload = function () {
        // The image has been successfully loaded
        img.src = artistIMG;
      };
      // Set a callback function to run if there was an error loading the image
      isThereAnArtist.onerror = function () {
        // There was an error loading the image
        img.src = trackArt;
      };
      PreviewSongArt.style.display = "block";

      audioSong.src = song.previewURL;

      img.style.backgroundImage = `url(${artistIMG})`;
      PreviewSongArt.src = trackArt;

      MPimg.src = trackArt;
      MPName.innerHTML = song.name;
      MPArtist.innerHTML = song.artistName;
      PreviewTitle.innerHTML = song.name;
      PreviewArtistName.innerHTML = song.artistName;
    });

    songElement = songObject1.appendChild(context);

    return songElement;
  });
  if (DisplayArrayOfSongs.length > 0) {
    document.querySelector(".songsWithName").style.display = "block";
  }
}

function perviousSong() {
  isAudioPLaying() ? playAudio() : pauseAudio();
}
function nextSong() {
  isAudioPLaying() ? playAudio() : pauseAudio();
}

requestLocal();
// EVENT LISTENERS
playButton.addEventListener("click", () => {
  isAudioPLaying() ? pauseAudio() : playAudio(); // is audio play true? then pause else play
});
function secondsToMinutes(seconds) {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;
  // Add a leading zero to the seconds
  if (remainingSeconds < 10) {
    remainingSeconds = "0" + remainingSeconds;
  }
  return minutes + ":" + remainingSeconds;
}

topTracks.addEventListener("click", () => {
  retrieveTopTracksWeek();
});
const christmasTracks = document.querySelector(".christmasTracks");
christmasTracks.addEventListener("click", () => {
  retrieveChristmasTracks();
});
const rapHipHopTracks = document.querySelector(".rapHipHopTracks");
rapHipHopTracks.addEventListener("click", () => {
  retrieveRapHipHopTracks();
});
