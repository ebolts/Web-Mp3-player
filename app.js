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
const ShowPlayList = document.querySelector(".showPlaylist");
const input = document.querySelector("#textInput");

export let deleteSongsCount = 0;
let deletePLCount = 0;
let songs;
let titleState;
let songID;
let lastid;
let DisplayArrayOfPlaylists;
requestLocal();
recentplayed.addEventListener("click", () => {
  requestLocal();
  input.value = " ";
});

playlist.addEventListener("click", () => {
  loadPlayLists();
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
  input.value = "";
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
  ShowPlayList.innerHTML = " ";

  input.value = "";
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
  ShowPlayList.innerHTML = " ";
  input.value = "";
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
  ShowPlayList.innerHTML = " ";
  input.value = "";
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
    "https://api.napster.com/v2.0/tracks/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&range=month"
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response failed");
      }
      return response.json();
    })
    .then((data) => {
      songs = data.tracks;

      generalLoadSearchAPI(songs);
    })
    .catch((error) =>
      console.error("There was an issue with fetch request", error)
    );
}

async function retrieveChristmasTracks() {
  await fetch(
    "https://api.napster.com/v2.0/genres/g.120/tracks/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4"
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response failed");
      }
      return response.json();
    })
    .then((data) => {
      songs = data.tracks;

      generalLoadSearchAPI(songs);
    })
    .catch((error) =>
      console.error("There was an issue with fetch request", error)
    );
}

async function retrieveRapHipHopTracks() {
  await fetch(
    "https://api.napster.com/v2.0/genres/g.146/tracks/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&range=week"
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response failed");
      }
      return response.json();
    })
    .then((data) => {
      songs = data.tracks;

      generalLoadSearchAPI(songs);
    })
    .catch((error) =>
      console.error("There was an issue with fetch request", error)
    );
}

async function retrieveSongsSearch() {
  const inputValue = input.value;
  let artistName;
  let trackName;

  await fetch(
    `https://api.napster.com/v2.2/search?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&per_type_limit=10&query=${inputValue}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response failed");
      }
      return response.json();
    })
    .then((data) => {
      artistName = data.search.data.artists[0].id;
      trackName = data.search.data.tracks;
      loadSearchSongsFromAPI(trackName);
    })
    .catch((error) =>
      console.error("There was an issue with fetch request", error)
    );

  await fetch(
    `https://api.napster.com/v2.2/artists/${artistName}/tracks/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&limit=20`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response failed");
      }
      return response.json();
    })
    .then((data) => {
      songs = data.tracks;
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
  document.querySelector(".table-title").innerHTML = "Recently Added";
  ShowPlayList.innerHTML = " ";

  let indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB;

  let open = indexedDB.open("SongsDatabase", 1);

  open.onupgradeneeded = function () {
    let db = open.result;
    const store = db.createObjectStore("songs", { keyPath: "id" });
    const store2 = db.createObjectStore("playlists", { keyPath: "id" });
    store.createIndex("song_name", ["name"], { unique: false });
    store2.createIndex("playlist_name", ["name"], { unique: false });
  };

  open.onsuccess = function () {
    let db = open.result;
    let tx = db.transaction("songs", "readwrite");
    let tx2 = db.transaction("playlists", "readwrite");

    let store = tx.objectStore("songs");
    let store2 = tx2.objectStore("playlists");
    // used when a users wants to add more than one song to a new playlist.
    let AddMorePL = 0;

    const IDQuery = store.getAll();
    const PLQuery = store2.getAll();

    IDQuery.onsuccess = function () {
      ArtistTopTracks.innerHTML = " ";
      SongsWithName.innerHTML = " ";

      const DisplayArrayOfSongs = IDQuery.result.reverse().map((song) => {
        let seconds = song.time;
        let songElement;

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
              <div style="text-align: left; width:200px; "> 
                <h5 class="card-title " >${song.name}</h5>
              </div>
      
              <div style="text-align: left; width:200px; "> 
                <h5 class="card-title " >${song.artist}</h5>
              </div>
      
              <div style="text-align: left; width:200px; "> 
                <h5 class="card-title" >${secondsToMinutes(seconds)}</h5>
              </div>
      
              <div class="dropDownDiv" style="text-align: left; width:200px; height:30px "> 
                <i class="ph-dots-three-vertical" ref="dropDown" style="width:15px"></i>
                
                <div class="options" style=" z-index:10; position: absolute;" ref="dropDownContent">
                    <button ref="deletedBTN"> <i class="ph-minus" style="width:25px; height:10px; padding-top: 4px"></i>Remove from library</button>
                    <button ref="newPL"> <i class="ph-list-plus" style="width:25px; padding-top: 4px"></i> Create new playlist</button>
                    <label class="optionLabel">Add to playlist</label>
                    <div class="dropDownplDiv" ref="dropDownContentPL"></div>
              </div>
            </div>
          </div>`;

        let {
          dropDown,
          dropDownContent,
          dropDownContentPL,
          songdiv,
          deletedBTN,
          newPL,
        } = context.collect();

        document.addEventListener("click", function (event) {
          songdiv.classList.add("selected");
          if (!songdiv.contains(event.target)) {
            songdiv.classList.remove("selected");

            dropDownContent.classList.remove("show");

            dropDownContentPL.innerHTML = " ";
          }
        });

        dropDown.addEventListener("click", (event) => {
          if (dropDownContent.classList.contains("show")) {
            dropDownContent.classList.remove("show");

            dropDownContentPL.innerHTML = " ";
          } else {
            PLQuery.result.reverse().map((playlist) => {
              let PLcontent = f`<button ref="playlistbtn"> <i class="ph-playlist" style="width:25px; padding-top: 4px"></i>${playlist.name}</button>`;

              let { playlistbtn } = PLcontent.collect();
              playlistbtn.addEventListener("click", (event) => {
                let indexedDB =
                  window.indexedDB ||
                  window.mozIndexedDB ||
                  window.webkitIndexedDB ||
                  window.msIndexedDB;
                let open = indexedDB.open("SongsDatabase", 1);

                open.onsuccess = function () {
                  let db = open.result;
                  let tx = db.transaction("songs", "readwrite");
                  let store = tx.objectStore("songs");
                  store.put({
                    id: song.id,
                    name: song.name,
                    artist: song.artist,
                    artistIMG: song.artistIMG,
                    time: song.time,
                    mp3data: song.mp3data,
                    image: song.image,
                    playlistID: playlist.id,
                  });
                };

                tx.oncomplete = function () {
                  db.close();
                };
              });

              dropDownContentPL.appendChild(PLcontent);
            });

            dropDownContent.classList.add("show");
          }
        });

        newPL.addEventListener("click", (event) => {
          openPrompt();

          let indexedDB =
            window.indexedDB ||
            window.mozIndexedDB ||
            window.webkitIndexedDB ||
            window.msIndexedDB;
          let open = indexedDB.open("SongsDatabase", 1);

          open.onsuccess = function () {
            let db = open.result;
            let tx = db.transaction("songs", "readwrite");

            let store = tx.objectStore("songs");

            let PLID = PLQuery.result.length;
            if (PLID == 0) {
              deletePLCount = 0;
            }

            store.put({
              id: song.id,
              name: song.name,
              artist: song.artist,
              artistIMG: song.artistIMG,
              time: song.time,
              mp3data: song.mp3data,
              image: song.image,
              playlistID: PLID + deletePLCount + AddMorePL + 1,
            });
            // adds to the next playlist instead of the same if the users hasnt changed screens
            AddMorePL++;
          };

          tx.oncomplete = function () {
            db.close();
          };
        });

        deletedBTN.addEventListener("click", () => {
          let indexedDB =
            window.indexedDB ||
            window.mozIndexedDB ||
            window.webkitIndexedDB ||
            window.msIndexedDB;
          let open = indexedDB.open("SongsDatabase", 1);

          open.onsuccess = function () {
            let db = open.result;
            let tx = db.transaction("songs", "readwrite");
            let store = tx.objectStore("songs");
            let elementName = document.querySelector(`.song-id-${song.id}`);
            let childNodes = Array.from(ArtistTopTracks.childNodes);
            let index = childNodes.indexOf(elementName);
            let removeElementNode = ArtistTopTracks.childNodes[index];
            store.delete(song.id);
            deleteSongsCount++;

            songElement = ArtistTopTracks.removeChild(removeElementNode);

            return songElement;
          };
          tx.oncomplete = function () {
            db.close();
          };
        });

        songdiv.addEventListener("click", (event) => {
          MPimg.style.display = "block";
          playButton.querySelector("i").classList.remove("ph-pause");
          playButton.querySelector("i").classList.add("ph-play");
          playButton.classList.remove("selectedBtn");
          musicPlayer.classList.remove("playing");
          // Get all elements with the "selected" class
          const selectedElements =
            ArtistTopTracks.querySelectorAll(".selected");

          // Check if there are any selected elements
          if (selectedElements.length) {
            // If there are, remove the "selected" class from the first one
            selectedElements[0].classList.remove("selected");
          }
          // check if tag is one the three, if so add selected class
          if (["IMG", "DIV", "H5", "I"].includes(event.target.tagName)) {
            songdiv.classList.add("selected");
          }
          let indexedDB =
            window.indexedDB ||
            window.mozIndexedDB ||
            window.webkitIndexedDB ||
            window.msIndexedDB;
          let open = indexedDB.open("SongsDatabase", 1);

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

              songID = IDQuery.result.id;

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

        return songElement;
      });

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
        
        <div style="text-align: left; width:200px; "> 
          <h5 class="card-title " >${song.name}</h5>
        </div>
        <div style="text-align: left; width:200px; "> 
          <h5 class="card-title " >${song.artistName}</h5>
        </div>
        <div style="text-align: left; width:200px; "> 
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
      alert("Song Added");
      let indexedDB =
        window.indexedDB ||
        window.mozIndexedDB ||
        window.webkitIndexedDB ||
        window.msIndexedDB;
      let open = indexedDB.open("SongsDatabase", 1);

      open.onsuccess = function () {
        let db = open.result;
        let tx = db.transaction("songs", "readwrite");
        let store = tx.objectStore("songs");
        let songID = store.count();

        songID.onsuccess = function () {
          const request = store.openCursor(null, "prev");
          request.onsuccess = function (event) {
            const cursor = event.target.result;
            if (cursor) {
              // This is the last object in the table
              lastid = cursor.value.id;
            } else {
              lastid = 0;
            } // get total aomunt of keys and subtrack from lastest key value to find already deleted tracks
            deleteSongsCount = lastid - songID.result;

            store.put({
              id: songID.result + 1 + deleteSongsCount,
              name: song.name,
              artist: song.artistName,
              artistIMG: artistIMG,
              time: song.playbackSeconds,
              mp3data: song.previewURL,
              image: trackArt,
            });
          };
        };
        tx.oncomplete = function () {
          db.close();
        };
      };
    });

    songdiv.addEventListener("click", () => {
      MPimg.style.display = "block";
      playButton.querySelector("i").classList.remove("ph-pause");
      playButton.querySelector("i").classList.add("ph-play");
      playButton.classList.remove("selectedBtn");
      musicPlayer.classList.remove("playing");
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
        
        <div style="text-align: left; width:200px; "> 
          <h5 class="card-title " >${song.name}</h5>
        </div>
        <div style="text-align: left; width:200px; "> 
          <h5 class="card-title " >${song.artistName}</h5>
        </div>
        <div style="text-align: left; width:200px; "> 
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
      alert("Song Added");
      let indexedDB =
        window.indexedDB ||
        window.mozIndexedDB ||
        window.webkitIndexedDB ||
        window.msIndexedDB;
      let open = indexedDB.open("SongsDatabase", 1);
      open.onsuccess = function () {
        let db = open.result;
        let tx = db.transaction("songs", "readwrite");
        let store = tx.objectStore("songs");
        let songID = store.count();
        songID.onsuccess = function () {
          const request = store.openCursor(null, "prev");
          request.onsuccess = function (event) {
            const cursor = event.target.result;
            if (cursor) {
              // This is the last object in the table
              lastid = cursor.value.id;
            } else {
              lastid = 0;
            } // get total aomunt of keys and subtrack from lastest key value to find already deleted tracks

            deleteSongsCount = lastid - songID.result;
            store.put({
              id: songID.result + 1 + deleteSongsCount,
              name: song.name,
              artist: song.artistName,
              artistIMG: artistIMG,
              time: song.playbackSeconds,
              mp3data: song.previewURL,
              image: trackArt,
            });
          };
        };
        tx.oncomplete = function () {
          db.close();
        };
      };
    });

    songdiv.addEventListener("click", () => {
      MPimg.style.display = "block";
      playButton.querySelector("i").classList.remove("ph-pause");
      playButton.querySelector("i").classList.add("ph-play");
      playButton.classList.remove("selectedBtn");
      musicPlayer.classList.remove("playing");
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
    document.querySelector(".songsWithNameTitle").style.display = "block";
  }
}

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
progressBar.addEventListener("input", function () {});

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
  let indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB;

  let open = indexedDB.open("SongsDatabase", 1);

  open.onsuccess = function () {
    let db = open.result;
    let tx = db.transaction("songs", "readwrite");
    let store = tx.objectStore("songs");
    const audioSong = document.querySelector("audio");

    let keyArray = store.getAllKeys();

    keyArray.onsuccess = function () {
      songID == 0 || songID < keyArray.result.length ? songID++ : null;
      const IDQuery = store.get(keyArray.result[songID - 1]);
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
  let indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB;

  let open = indexedDB.open("SongsDatabase", 1);

  open.onsuccess = function () {
    let db = open.result;
    let tx = db.transaction("songs", "readwrite");
    let store = tx.objectStore("songs");
    const audioSong = document.querySelector("audio");

    let keyArray = store.getAllKeys();

    keyArray.onsuccess = function () {
      songID > 1 ? songID-- : null;

      const IDQuery = store.get(keyArray.result[songID - 1]);
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

const createNewPlaylist = document.querySelector(".createNewPlaylist");

createNewPlaylist.addEventListener("click", openPrompt);

function openPrompt() {
  let playlistName = prompt("Please enter playlist name:", "");
  if (playlistName != null) {
    let indexedDB =
      window.indexedDB ||
      window.mozIndexedDB ||
      window.webkitIndexedDB ||
      window.msIndexedDB;

    let open = indexedDB.open("SongsDatabase", 1);

    open.onsuccess = function () {
      let db = open.result;
      let tx = db.transaction("playlists", "readwrite");
      let store = tx.objectStore("playlists");
      let playListID = store.count();

      playListID.onsuccess = function () {
        const request = store.openCursor(null, "prev");
        request.onsuccess = function (event) {
          const cursor = event.target.result;
          if (cursor) {
            // This is the last object in the table
            lastid = cursor.value.id;
          } else {
            lastid = 0;
          } // get total aomunt of keys and subtrack from lastest key value to find already deleted tracks

          deletePLCount = lastid - playListID.result;
          store.put({
            id: playListID.result + 1 + deletePLCount,
            name: playlistName,
          });
        };
      };

      tx.oncomplete = function () {
        db.close();
      };
    };
  }
  loadPlayLists();
}
function loadPlayLists() {
  ShowPlayList.innerHTML = " ";
  let indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB;

  let open = indexedDB.open("SongsDatabase", 1);

  open.onsuccess = function () {
    let playlistElement;
    let db = open.result;
    let tx = db.transaction("playlists", "readwrite");
    let store = tx.objectStore("playlists");
    const IDQuery = store.getAll();
    IDQuery.onsuccess = function () {
      DisplayArrayOfPlaylists = IDQuery.result.reverse().map((playlist) => {
        let context = f`<li class="playlist-id-${playlist.id}">
              <div class="PLdiv" ref="PLdiv" style="display:flex; align-items: center; padding-right:20px"> 
                <button><i class="ph-playlist"></i>${playlist.name}
                  </button><i class="ph-minus" ref="minusbtn" style="width:20px; height:10px; "></i>
              </div> 
            </li>`;

        let { minusbtn, PLdiv } = context.collect();

        minusbtn.addEventListener("click", () => {
          ArtistTopTracks.innerHTML = " ";
          if (confirm("Delete this playlist?")) {
            let indexedDB =
              window.indexedDB ||
              window.mozIndexedDB ||
              window.webkitIndexedDB ||
              window.msIndexedDB;
            let open = indexedDB.open("SongsDatabase", 1);

            open.onsuccess = function () {
              let db = open.result;
              let tx = db.transaction("playlists", "readwrite");
              let store = tx.objectStore("playlists");
              let elementName = document.querySelector(
                `.playlist-id-${playlist.id}`
              );
              let childNodes = Array.from(ShowPlayList.childNodes);
              let index = childNodes.indexOf(elementName);
              let removeElementNode = ShowPlayList.childNodes[index];

              // Open a transaction and access the store
              const transaction = db.transaction(["songs"], "readwrite");
              const store2 = transaction.objectStore("songs");

              // Use openCursor() to iterate through the store
              store2.openCursor().onsuccess = function (event) {
                let cursor = event.target.result;

                if (cursor) {
                  let song = cursor.value;
                  // Check the object's property
                  if (song.playlistID === playlist.id) {
                    store2.put({
                      id: song.id,
                      name: song.name,
                      artist: song.artist,
                      artistIMG: song.artistIMG,
                      time: song.time,
                      mp3data: song.mp3data,
                      image: song.image,
                      playlistID: null,
                    });
                  }
                  cursor.continue();
                }
              };

              store.delete(playlist.id);
              deletePLCount++;

              playlistElement = ShowPlayList.removeChild(removeElementNode);

              return playlistElement;
            };
            tx.oncomplete = function () {
              db.close();
            };
          } else {
            return playlistElement;
          }
        });

        PLdiv.addEventListener("click", () => {
          ArtistTopTracks.innerHTML = " ";
          let indexedDB =
            window.indexedDB ||
            window.mozIndexedDB ||
            window.webkitIndexedDB ||
            window.msIndexedDB;
          let open = indexedDB.open("SongsDatabase", 1);

          open.onsuccess = function () {
            let db = open.result;
            const transaction = db.transaction(["songs"], "readwrite");
            const store2 = transaction.objectStore("songs");

            // Use openCursor() to iterate through the store
            store2.openCursor(null, "prev").onsuccess = function (event) {
              let cursor = event.target.result;

              if (cursor) {
                let song = cursor.value;
                // Check the object's property
                if (song.playlistID === playlist.id) {
                  let seconds = song.time;
                  let songElement;

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
                          <h5 class="card-title" >${secondsToMinutes(
                            seconds
                          )}</h5>
                        </div>
                
                        <div style="text-align: left; width:200px; "> 
                          <i class="ph-minus" ref="minusbtn"></i>
                          
                        </div>
                
                      </div>`;
                  let { minusbtn, songdiv } = context.collect();
                  minusbtn.addEventListener("click", () => {
                    let indexedDB =
                      window.indexedDB ||
                      window.mozIndexedDB ||
                      window.webkitIndexedDB ||
                      window.msIndexedDB;
                    let open = indexedDB.open("SongsDatabase", 1);
                    open.onupgradeneeded = function () {
                      let db = open.result;
                      const store = db.createObjectStore("songs", {
                        keyPath: "id",
                      });
                      store.createIndex("song_name", ["name"], {
                        unique: false,
                      });
                    };
                    open.onsuccess = function () {
                      let db = open.result;
                      let tx = db.transaction("songs", "readwrite");
                      let store = tx.objectStore("songs");
                      let elementName = document.querySelector(
                        `.song-id-${song.id}`
                      );
                      let childNodes = Array.from(ArtistTopTracks.childNodes);
                      let index = childNodes.indexOf(elementName);
                      let removeElementNode = ArtistTopTracks.childNodes[index];
                      store.put({
                        id: song.id,
                        name: song.name,
                        artist: song.artist,
                        artistIMG: song.artistIMG,
                        time: song.time,
                        mp3data: song.mp3data,
                        image: song.image,
                        playlistID: null,
                      });
                      deleteSongsCount++;
                      songElement =
                        ArtistTopTracks.removeChild(removeElementNode);
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
                      const store = db.createObjectStore("songs", {
                        keyPath: "id",
                      });
                      store.createIndex("song_name", ["name"], {
                        unique: false,
                      });
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
                        songID = IDQuery.result.id;
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
                  cursor.continue();
                  return songElement;
                } else {
                  cursor.continue();
                }
              }
            };

            tx.oncomplete = function () {
              db.close();
            };
          };
        });

        playlistElement = ShowPlayList.appendChild(context);
        return playlistElement;
      });
      return DisplayArrayOfPlaylists;
    };
    tx.oncomplete = function () {
      db.close();
    };
  };
}
