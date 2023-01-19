import { deleteSongsCount } from "./app.js";

let songMp3;
let songDisplay;
let songName;
let songArtist;
let indexCount = 0;
let audioTime;
let lastid;

const jsmediatags = window.jsmediatags;
const SubmitFile = document.querySelector(".Submitfile");
const backButton = document.querySelector(".back");
const forwardButton = document.querySelector(".forward");
const img = document.querySelector(".testimg");
const MPimg = document.querySelector(".song-box-img");
const MPName = document.querySelector(".MP-name");
const MPArtist = document.querySelector(".MP-artist");
const PreviewTitle = document.querySelector(".song-info-title");
const PreviewSongArt = document.querySelector(".preview-song-art");
const PreviewArtistName = document.querySelector(".song-info-artist");
const Submitfile = document.querySelector(".Submitfile");

const audioSong = document.querySelector("audio");
audioSong.addEventListener("loadedmetadata", () => {
  // Display the duration of the audio file
  audioTime = Math.floor(audioSong.duration);
});

document.querySelector(".fileInput").addEventListener("change", function () {
  const file = this.files[0];

  // Read the file as a data URL
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    // Get the data URL of the audio file
    const dataURL = reader.result;
    // does allow user to playsong before submitted. But is needed to get song duration from source.
    audioSong.src = dataURL;
    songMp3 = dataURL;
  };

  // read mp3 file metadata to collect image and name
  jsmediatags.read(file, {
    onSuccess: function (tag) {
      console.log("tag:", tag);
      console.log("tags:", tag.tags);
      // Array buffer to base64
      const data = tag.tags.picture.data;
      const format = tag.tags.picture.format;
      songArtist = tag.tags.artist;
      songName = tag.tags.title;
      PreviewTitle.innerHTML = songName;
      MPName.innerHTML = songName;
      PreviewArtistName.innerHTML = songArtist;
      MPArtist.innerHTML = songArtist;
      Submitfile.innerHTML = `Submit: ${songName}`;
      console.log("songname:", songName);
      let base64String = "";
      for (let i = 0; i < data.length; i++) {
        base64String += String.fromCharCode(data[i]);
      }
      // Output media tags
      songDisplay = `data:${format};base64,${window.btoa(base64String)}`;
      console.log(songDisplay);
      MPimg.src = songDisplay;
      img.src = songDisplay;
      PreviewSongArt.src = songDisplay;
    },
    onError: function (error) {
      console.log(error);
    },
  });
});

SubmitFile.addEventListener("click", () => {
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
    const store2 = db.createObjectStore("playlists", { keyPath: "id" });
    store.createIndex("song_name", ["name"], { unique: false });
    store2.createIndex("playlist_name", ["name"], { unique: false });
  };

  open.onsuccess = function () {
    let db = open.result;
    let tx = db.transaction("songs", "readwrite");
    let store = tx.objectStore("songs");
    let countIndex = store.count();
    countIndex.onsuccess = function () {
      const request = store.openCursor(null, "prev");
      request.onsuccess = function (event) {
        const cursor = event.target.result;
        if (cursor) {
          // This is the last object in the table
          console.log("lastid:", lastid);
          lastid = cursor.value.id;
        } // get total aomunt of keys and subtrack from lastest key value to find already deleted tracks
        let deleteSongsLocalCount = deleteSongsCount;
        deleteSongsLocalCount = lastid - countIndex.result;
        console.log("deleteSongsCount:", deleteSongsLocalCount);

        console.log("countIndex.result + 1:", countIndex.result + 1);
        store.put({
          id: countIndex.result + 1 + deleteSongsLocalCount,
          name: songName,
          artist: songArtist,
          time: audioTime,
          mp3data: songMp3,
          image: songDisplay,
        });

        const songIndex = store.index("song_name");
        const SQuery = songIndex.get([songName]);
        const audioSong = document.querySelector("audio");

        SQuery.onsuccess = function () {
          console.log("time :", SQuery.result.time);
          audioSong.src = `${SQuery.result.mp3data}`;
        };
      };
    };
    tx.oncomplete = function () {
      db.close();
    };
  };
});
