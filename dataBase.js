let songMp3;
let songDisplay;
let songName;
let indexCount = 0;
const jsmediatags = window.jsmediatags;
const submit1 = document.querySelector("#submit1");
const backButton = document.querySelector(".back");
const forwardButton = document.querySelector(".forward");
const img = document.querySelector(".testimg");

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
      console.log(songDisplay);
      document.querySelector(".testimg").style.backgroundImage = songDisplay;
    },
    onError: function (error) {
      console.log(error);
    },
  });

  songMp3 = file.name;
  songName = songMp3.substring(-1, songMp3.length - 4);
  console.log("songname:", songName);
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

  store.put({
    id: 1,
    name: "Cursetest",
    artist: "Curse Artist",
    time: "111",
    mp3data: "curemp3DataURL",
    image: "cureimageDataURL",
  });
  store.put({
    id: 2,
    name: "Bad Habitstests",
    artist: "Bad Habits artist",
    time: "222",
    mp3data: "badhabitsmp3DataURL",
    image: "badhabitsimageDataURL",
  });
  store.put({
    id: 3,
    name: "test song",
    artist: "test artist",
    time: "333",
    mp3data: "testDataURL",
    image: "testimageDataURL",
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
    let countIndex = store.count();
    countIndex.onsuccess = function () {
      console.log(countIndex.result + 1);
      store.put({
        id: countIndex.result + 1,
        name: songName,
        mp3data: songMp3,
        image: songDisplay,
      });

      const songIndex = store.index("song_name");
      const SQuery = songIndex.get([songName]);
      const audioSong = document.querySelector("audio");

      SQuery.onsuccess = function () {
        console.log("nameQuery:", SQuery.result.mp3data);
        audioSong.src = `${SQuery.result.mp3data}`;
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

    let countIndex = store.count();
    countIndex.onsuccess = function () {
      indexCount == 1 ? null : indexCount--;
      console.log("test");

      const IDQuery = store.get(indexCount);
      IDQuery.onsuccess = function () {
        console.log("nameQuery", IDQuery.result.mp3data);
        console.log("imageQuery:", IDQuery.result.image);
        audioSong.src = `${IDQuery.result.mp3data}`;
        img.style.backgroundImage = `${IDQuery.result.image}`;
        console.log(indexCount);
      };
    };

    tx.oncomplete = function () {
      db.close();
    };
  };
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

    let countIndex = store.count();
    countIndex.onsuccess = function () {
      indexCount == countIndex.result ? null : indexCount++;
      console.log("test");

      const IDQuery = store.get(indexCount);
      IDQuery.onsuccess = function () {
        console.log("nameQuery", IDQuery.result.mp3data);
        console.log("imageQuery:", IDQuery.result.image);
        audioSong.src = `${IDQuery.result.mp3data}`;
        img.style.backgroundImage = `${IDQuery.result.image}`;
        console.log(indexCount);
      };
    };

    tx.oncomplete = function () {
      db.close();
    };
  };
});
