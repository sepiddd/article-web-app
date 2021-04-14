const openRequest = indexedDB.open("store", 2);

openRequest.onsuccess = function () {
  let db = openRequest.result;

  db.createObjectStore("user", {
    keyPath: "id",
    autoIncrement: true,
  });
};

export default openRequest;
