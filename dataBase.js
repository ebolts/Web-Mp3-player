let songMp3;
let songDisplay;
let songName;
const jsmediatags = window.jsmediatags;
const submit1 = document.querySelector("#submit1");

document.querySelector("#fileInput").addEventListener("change", function () {
  const file = this.files[0];
  console.log(file);
  // read mp3 file metadata to collect image and name
  jsmediatags.read(file, {
    onSuccess: function (tag) {
      // Array buffer to base64
      const data = tag.tags.picture.data;
      const format = tag.tags.picture.format;
      let base64String = "";
      for (let i = 0; i < data.length; i++) {
        base64String += String.fromCharCode(data[i]);
      }
      // Output media tags
      songDisplay = `url(data:${format};base64,${window.btoa(base64String)})`;
      document.querySelector(".testimg").style.backgroundImage = songDisplay;
    },
    onError: function (error) {
      console.log(error);
    },
  });

  songMp3 = file.name;
  songName = file.name.substring(-1, songMp3.length - 4);
});
const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

if (!indexedDB) {
  console.log("IndexedDB could not be found in this browser.");
}
const request = indexedDB.open("SongsDatabase", 1);

request.onerror = function (event) {
  console.error("An error occurred with IndexedDB");
  console.error(event);
};

request.onupgradeneeded = function () {
  const db = request.result;
  const store = db.createObjectStore("songs", { keyPath: "id" });

  store.createIndex("song_name", ["name"], { unique: false });
};

request.onsuccess = function () {
  console.log("Database opened successfully");
  const db = request.result;
  const transaction = db.transaction("songs", "readwrite");
  const store = transaction.objectStore("songs");
  const songIndex = store.index("song_name");

  store.put({
    id: 1,
    name: "Curse",
    mp3data: "curemp3DataURL",
    image: "cureimageDataURL",
  });
  store.put({
    id: 2,
    name: "Bad Habits",
    mp3data: "badhabitsmp3DataURL",
    image: "badhabitsimageDataURL",
  });

  transaction.oncomplete = function () {
    db.close();
  };
};

submit1.addEventListener("click", () => {
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
    store.put({
      id: 3,
      name: songName,
      mp3data: songMp3,
      image: songDisplay,
    });

    const songIndex = store.index("song_name");
    const SQuery = songIndex.get([songName]);
    const audioSong = document.querySelector("audio");
    const img = document.querySelector(".testimg");
    SQuery.onsuccess = function () {
      console.log("nameQuery", SQuery.result.mp3data);
      audioSong.src = `${SQuery.result.mp3data}`;
    };
    tx.oncomplete = function () {
      db.close();
    };
  };
});
