let imageDataURl;
const jsmediatags = window.jsmediatags;
const submit1 = document.querySelector("#submit1");

document.querySelector("#fileInput").addEventListener("change", function () {
  const reader = new FileReader();
  const file = this.files[0];
  jsmediatags.read(file, {
    onSuccess: function (tag) {
      // Array buffer to base64
      console.log(tag);
      const data = tag.tags.picture.data;
      const format = tag.tags.picture.format;
      let base64String = "";
      for (let i = 0; i < data.length; i++) {
        base64String += String.fromCharCode(data[i]);
      }
      // Output media tags
      document.querySelector(
        ".testimg"
      ).style.backgroundImage = `url(data:${format};base64,${window.btoa(
        base64String
      )})`;
    },
    onError: function (error) {
      console.log(error);
    },
  });

  reader.addEventListener("load", () => {
    imageDataURl = reader.result;
    console.log(imageDataURl);
  });
  reader.readAsDataURL(this.files[0]);
});

// 1
const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

if (!indexedDB) {
  console.log("IndexedDB could not be found in this browser.");
}

// 2
const request = indexedDB.open("SongsDatabase", 1);

request.onerror = function (event) {
  console.error("An error occurred with IndexedDB");
  console.error(event);
};

request.onupgradeneeded = function () {
  //1
  const db = request.result;

  //2
  const store = db.createObjectStore("songs", { keyPath: "id" });

  //3
  store.createIndex("song_name", ["name"], { unique: false });
};

request.onsuccess = function () {
  console.log("Database opened successfully");

  const db = request.result;

  // 1
  const transaction = db.transaction("songs", "readwrite");

  //2
  const store = transaction.objectStore("songs");
  const songIndex = store.index("song_name");

  //3
  store.put({
    id: 1,
    name: "curse",
    mp3data: "curemp3dataURL",
    image: "cureimagedataURL",
  });
  store.put({
    id: 2,
    name: "bad habits",
    mp3data: "badhabitsmp3DataURL",
    image: "badhabitsimageDataURL",
  });

  //4

  const nameQuery = songIndex.get(["curse"]);

  // 5

  nameQuery.onsuccess = function () {
    console.log("nameQuery", nameQuery.result);
  };

  // 6
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

    //3
    store.createIndex("song_name", ["name"], { unique: false });
  };

  open.onsuccess = function () {
    let db = open.result;
    let tx = db.transaction("songs", "readwrite");
    let store = tx.objectStore("songs");

    const songIndex = store.index("song_name");

    store.put({
      id: 3,
      name: "added-file",
      mp3data: "badhabitsmp3DataURL",
      image: imageDataURl,
    });

    const SQuery = songIndex.get(["added-file"]);
    const audioSong = document.querySelector("audio");
    const img = document.querySelector(".testimg");
    SQuery.onsuccess = function () {
      console.log("nameQuery", SQuery.result.image);
      audioSong.src = `${SQuery.result.image}`;
    };
    tx.oncomplete = function () {
      db.close();
    };
  };
});
