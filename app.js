import f from "./facon.js";

const playButton = document.querySelector(".start"),
  musicPlayer = document.querySelector(".media-player"),
  audioSong = document.querySelector("audio"),
  loadingSong = document.querySelector(".loading"),
  ArtistTopTracks = document.querySelector(".artistTopTracks"),
  SongsWithName = document.querySelector(".songsWithName"),
  playlist = document.querySelector(".playlist"),
  recentplayed = document.querySelector(".recently-played"),
  discoverSongs = document.querySelector(".discover"),
  searchbtn = document.querySelector(".search"),
  upload = document.querySelector(".upload"),
  topTracks = document.querySelector(".topTracks");

const backButton = document.querySelector(".back");
const forwardButton = document.querySelector(".forward");
const img = document.querySelector(".testimg");
const MPimg = document.querySelector(".song-box-img");
const MPName = document.querySelector(".MP-name");
const MPArtist = document.querySelector(".MP-artist");
const PreviewTitle = document.querySelector(".song-info-title");
const PreviewArtistName = document.querySelector(".song-info-artist");
const PreviewSongArt = document.querySelector(".preview-song-art");
const MainMenuList = document.querySelector(".main-menu-list");
const SubMenuDiscover = document.querySelector(".sub-menu-discover");
const SubMenuPlaylist = document.querySelector(".sub-menu-playlist");

let deleteSongsCount = 0;
let songs;
let titleState;
let countIndex
export let songID = 0
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

  document.querySelector(".songsWithNameTitle").style.display = "none";
  document.querySelector(".artistTracks").style.display = "none";
  ArtistTopTracks.innerHTML = " ";
  SongsWithName.innerHTML = " ";
});

discoverSongs.addEventListener("click", () => {
  document.querySelector(".sub-menu-playlist").style.display = "none";
  document.querySelector(".sub-menu-recent-songs").style.display = "none";
  document.querySelector(".sub-menu-discover").style.display = "block";
  document.querySelector(".sub-menu-search").style.display = "none";
  document.querySelector(".sub-menu-upload").style.display = "none";
  document.querySelector(".table-title").innerHTML = "Discover";

  document.querySelector(".songsWithNameTitle").style.display = "none";
  document.querySelector(".artistTracks").style.display = "none";
  titleState = false;
  SongsWithName.innerHTML = " ";
  ArtistTopTracks.innerHTML = " ";
});

searchbtn.addEventListener("click", () => {
  document.querySelector(".sub-menu-playlist").style.display = "none";
  document.querySelector(".sub-menu-recent-songs").style.display = "none";
  document.querySelector(".sub-menu-discover").style.display = "none";
  document.querySelector(".sub-menu-upload").style.display = "none";
  document.querySelector(".sub-menu-search").style.display = "block";
  document.querySelector(".table-title").innerHTML = "Search";
  ArtistTopTracks.innerHTML = " ";
  SongsWithName.innerHTML = " ";
  document.querySelector(".songsWithNameTitle").style.display = "none";
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
  ArtistTopTracks.innerHTML = " ";
  SongsWithName.innerHTML = " ";
});
document.querySelector(".recently-played").classList.add("selectedBtn");

MainMenuList.addEventListener("click", (event) => {
  const MainMenuSelectedBtn = MainMenuList.querySelectorAll(".selectedBtn");

  if (MainMenuSelectedBtn.length && event.target.tagName === "BUTTON") {
    MainMenuSelectedBtn[0].classList.remove("selectedBtn");
  }

  if (["BUTTON"].includes(event.target.tagName)) {
    event.target.classList.add("selectedBtn");
  }
});

SubMenuDiscover.addEventListener("click", (event) => {
  const SubMenuDiscoverSelectedBtn =
    SubMenuDiscover.querySelectorAll(".selectedBtn");

  if (SubMenuDiscoverSelectedBtn.length && event.target.tagName === "BUTTON") {
    SubMenuDiscoverSelectedBtn[0].classList.remove("selectedBtn");
  }

  if (["BUTTON"].includes(event.target.tagName)) {
    event.target.classList.add("selectedBtn");
  }
});

SubMenuPlaylist.addEventListener("click", (event) => {
  const SubMenuPlaylistSelectedBtn =
    SubMenuPlaylist.querySelectorAll(".selectedBtn");

  if (SubMenuPlaylistSelectedBtn.length && event.target.tagName === "BUTTON") {
    SubMenuPlaylistSelectedBtn[0].classList.remove("selectedBtn");
  }

  if (["BUTTON"].includes(event.target.tagName)) {
    event.target.classList.add("selectedBtn");
  }
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
  playButton.classList.add("selectedBtn");
}

function pauseAudio() {
  musicPlayer.classList.remove("playing");
  playButton.querySelector("i").classList.remove("ph-pause");
  playButton.querySelector("i").classList.add("ph-play");
  audioSong.pause();
  playButton.classList.remove("selectedBtn");
}

function requestLocal() {
  document.querySelector(".sub-menu-playlist").style.display = "none";
  document.querySelector(".sub-menu-discover").style.display = "none";
  document.querySelector(".sub-menu-search").style.display = "none";
  document.querySelector(".sub-menu-upload").style.display = "none";
  document.querySelector(".sub-menu-recent-songs").style.display = "block";
  document.querySelector(".songsWithNameTitle").style.display = "none";
  document.querySelector(".artistTracks").style.display = "none";
  console.log("open db on event click");
  document.querySelector(".table-title").innerHTML = "Recently Added";

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
      ArtistTopTracks.innerHTML = " ";
      SongsWithName.innerHTML = " ";

      const DisplayArrayOfSongs = IDQuery.result.reverse().map((song) => {
        let seconds = song.time;
        console.log(seconds);
        let songElement;
        console.log("song:", song);

        let context = f`<div class="song-id-${
          song.id
        }" ref="songdiv" style="display: flex; text-align: left; align-items:center; justify-content: space-between; max-height: 152px; 
          margin: 15px 0px 15px 0px; 
            " > 
            <div style="display: flex; align-items: left; justify-content: left;  width:200px; max-height: 152px; height: 100%;padding-left: 20px; "> 
              <img class="image" src=${
                song.image
              } style=" width: 50%; height: auto;  object-fit: cover;  background-size: cover; background-image:${
          song.image
        }" >
            </div>
            
            <div style="text-align: left; width:200px; padding-right: 10px"> 
              <h5 class="card-title " >${song.name}</h5>
            </div>
    
            <div style="text-align: left; width:200px; padding-right: 10px"> 
              <h5 class="card-title " >${song.artist}</h5>
            </div>
    
            <div style="text-align: left; width:200px; padding-right: 10px"> 
              <h5 class="card-title" >${secondsToMinutes(seconds)}</h5>
            </div>
    
            <div style="text-align: left; width:200px; "> 
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
            let childNodes = Array.from(ArtistTopTracks.childNodes);
            let index = childNodes.indexOf(elementName);
            console.log(index);
            let removeElementNode = ArtistTopTracks.childNodes[index];
            store.delete(song.id);

            console.log(removeElementNode);
            deleteSongsCount++;

            songElement = ArtistTopTracks.removeChild(removeElementNode);

            return songElement;
          };
          tx.oncomplete = function () {
            db.close();
          };
        });

        songdiv.addEventListener("click", (event) => {
          // Get all elements with the "selected" class
          const selectedElements =
            ArtistTopTracks.querySelectorAll(".selected");

          // Check if there are any selected elements
          if (selectedElements.length) {
            // If there are, remove the "selected" class from the first one
            selectedElements[0].classList.remove("selected");
          }
          // check if tag is one the three, if so add selected class
          if (["IMG", "DIV", "H5"].includes(event.target.tagName)) {
            songdiv.classList.add("selected");
          }

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
            const songIndex = store.index("song_name");
            const IDQuery = songIndex.get([song.name]);
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
              
              console.log("IDQuery.result.time", IDQuery.result.time);
              
              songID = IDQuery.result.id
              countIndex = songID 
              console.log("songID", songID);
              
              audioSong.src = `${IDQuery.result.mp3data}`;
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

        songElement = ArtistTopTracks.appendChild(context);
        console.log(ArtistTopTracks.childNodes);

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
  ArtistTopTracks.innerHTML = " ";

  let songElement;
  const DisplayArrayOfSongs = songs.map((song) => {
    let albumArt = song.albumId;
    let artisrtArt = song.artistId;
    let trackArt = `https://api.napster.com/imageserver/v2/albums/${albumArt}/images/500x500.jpg`;
    let artistIMG = `https://api.napster.com/imageserver/v2/artists/${artisrtArt}/images/633x422.jpg`;
    let seconds = song.playbackSeconds;

    let context = f`<div class="song-id-${
      song.id
    }" ref="songdiv" style="display: flex; text-align: left; align-items:center; justify-content: space-between; max-height: 152px; 
      margin: 15px 0px 15px 0px; 
        " > 
        <div style="display: flex; align-items: left; justify-content: left;  width:200px; max-height: 152px; height: 100%; padding-left: 20px; "> 
          <img class="image" src=${trackArt} style=" width: 50%; height: auto;" >
        </div>
        
        <div style="text-align: left; width:200px; padding-right: 10px"> 
          <h5 class="card-title " >${song.name}</h5>
        </div>

        <div style="text-align: left; width:200px; padding-right: 10px"> 
          <h5 class="card-title " >${song.artistName}</h5>
        </div>

        <div style="text-align: left; width:200px; padding-right: 10px"> 
          <h5 class="card-title" >${secondsToMinutes(seconds)}</h5>
        </div>

        <div style="text-align: left; width:200px; "> 
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

    songElement = ArtistTopTracks.appendChild(context);

    return songElement;
  });

  if (DisplayArrayOfSongs.length > 0 && titleState == true) {
    document.querySelector(".artistTracks").style.display = "block";
  }
}

function loadSearchSongsFromAPI(songs) {
  let songElement;
  SongsWithName.innerHTML = " ";

  const DisplayArrayOfSongs = songs.map((song) => {
    console.log("song: ", song);
    let albumArt = song.albumId;
    let artisrtArt = song.artistId;
    let trackArt = `https://api.napster.com/imageserver/v2/albums/${albumArt}/images/500x500.jpg`;
    let artistIMG = `https://api.napster.com/imageserver/v2/artists/${artisrtArt}/images/633x422.jpg`;
    let seconds = song.playbackSeconds;

    let context = f`<div class="song-id-${
      song.id
    }" ref="songdiv" style="display: flex; text-align: left; align-items:center; justify-content: space-between; max-height: 152px; 
      margin: 15px 0px 15px 0px; 
        " > 
        <div style="display: flex; align-items: left; justify-content: left;  width:200px; max-height: 152px; height: 100%;padding-left: 20px;"> 
          <img class="image" src=${trackArt} style=" width: 50%; height: auto;" >
        </div>
        
        <div style="text-align: left; width:200px; padding-right: 10px"> 
          <h5 class="card-title " >${song.name}</h5>
        </div>

        <div style="text-align: left; width:200px; padding-right: 10px"> 
          <h5 class="card-title " >${song.artistName}</h5>
        </div>

        <div style="text-align: left; width:200px; padding-right: 10px"> 
          <h5 class="card-title" >${secondsToMinutes(seconds)}</h5>
        </div>

        <div style="text-align: left; width:200px; "> 
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

    songElement = SongsWithName.appendChild(context);

    return songElement;
  });
  if (DisplayArrayOfSongs.length > 0) {
    console.log("test");
    document.querySelector(".songsWithNameTitle").style.display = "block";
  }
}

requestLocal();

playButton.addEventListener("click", () => {
  isAudioPLaying() ? pauseAudio() : playAudio(); // is audio play true? then pause else play
});

const audioElement = document.querySelector("audio");
audioElement.volume = 0.5;
const musicBar = document.querySelector(".musicBar");
const volume = document.querySelector(".volume");
const progressBar = document.querySelector(".progress");
const volumeProgressBar = document.querySelector(".volumeProgress");
const endTime = document.querySelector(".endTime");
const startTime = document.querySelector(".startTime");
const muteBtn = document.querySelector(".mute");

muteBtn.addEventListener("click", () => {
  const icon = muteBtn.querySelector("i");

  if (icon.classList.contains("ph-speaker-slash")) {
    audioElement.muted = false;
    icon.classList.remove("ph-speaker-slash");
    icon.classList.add("ph-speaker-high");
  } else {
    audioElement.muted = true;
    icon.classList.remove("ph-speaker-high");
    icon.classList.add("ph-speaker-slash");
  }
});

audioElement.addEventListener("ended", pauseAudio);
forwardButton.addEventListener("click", () => {
  pauseAudio();
});
backButton.addEventListener("click", () => {
  pauseAudio();
});
audioElement.addEventListener("timeupdate", function () {
  musicBar.value = audioElement.currentTime;
  startTime.innerHTML = secondsToMinutes(audioElement.currentTime);

  progressBar.value = audioElement.currentTime;
});

audioElement.addEventListener("loadedmetadata", function () {
  musicBar.max = audioElement.duration;
  endTime.innerHTML = secondsToMinutes(audioElement.duration);
  progressBar.max = audioElement.duration;
});

volume.addEventListener("input", function () {
  audioElement.volume = this.value;
  volumeProgressBar.value = this.value;

  if (this.value < 0.01) {
    muteBtn.querySelector("i").classList.add("ph-speaker-slash");
    muteBtn.querySelector("i").classList.remove("ph-speaker-high");
  } else {
    muteBtn.querySelector("i").classList.remove("ph-speaker-slash");
    muteBtn.querySelector("i").classList.add("ph-speaker-high");
  }
});

musicBar.addEventListener("input", function () {
  audioElement.currentTime = this.value;

  startTime.innerHTML = secondsToMinutes(this.value);
});
progressBar.addEventListener("input", function () {
  console.log("progressBar.value:", progressBar.value);
});

function secondsToMinutes(seconds) {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = Math.floor(seconds % 60);
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


forwardButton.addEventListener("click", () => {
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


    
    let keyArray = store.getAllKeys()
    
    
   
    
      keyArray.onsuccess = function () {
        console.log("keyArray.result[indexCount]", keyArray.result.length)
        console.log("songID",songID);
        console.log("countIndex",countIndex);
        countIndex == 0  || countIndex < keyArray.result.length? countIndex++ :null ;
        
        console.log("countIndex",countIndex);
      const IDQuery = store.get(keyArray.result[countIndex-1]);
      IDQuery.onsuccess = function () {
        console.log("IDQuery.result:", IDQuery.result);
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

        audioSong.src = `${IDQuery.result.mp3data}`;

        PreviewSongArt.src = IDQuery.result.image;
        PreviewTitle.innerHTML = IDQuery.result.name;
        PreviewArtistName.innerHTML = IDQuery.result.artist;

        MPimg.src = IDQuery.result.image;

        MPName.innerHTML = IDQuery.result.name;
        MPArtist.innerHTML = IDQuery.result.artist;
      };
     
    };

    tx.oncomplete = function () {
      db.close();
    };
  };
});



backButton.addEventListener("click", () => {
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


    
    let keyArray = store.getAllKeys()
    
   
    
      keyArray.onsuccess = function () {
        console.log("keyArray.result.length ", keyArray.result )
        console.log("indexCount", countIndex)
        console.log(countIndex > 0  )
        countIndex > 1  ? countIndex-- :null ;
        
       
      const IDQuery = store.get(keyArray.result[countIndex-1]);
      IDQuery.onsuccess = function () {
        console.log("IDQuery.result:", IDQuery.result);
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

        audioSong.src = `${IDQuery.result.mp3data}`;

        PreviewSongArt.src = IDQuery.result.image;
        PreviewTitle.innerHTML = IDQuery.result.name;
        PreviewArtistName.innerHTML = IDQuery.result.artist;

        MPimg.src = IDQuery.result.image;

        MPName.innerHTML = IDQuery.result.name;
        MPArtist.innerHTML = IDQuery.result.artist;
      };
     
    };

    tx.oncomplete = function () {
      db.close();
    };
  };
});