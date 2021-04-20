export class DBAccess {
  private dbAccess: DBAccess | null;
  private db: IDBDatabase | undefined;

  constructor() {
    this.dbAccess = null;
    this.db = undefined;
  }

  async connect(dbName: string) {
    if (this.db) {
      return this.db;
    }

    let attempts = 3;
    const request = indexedDB.open(dbName, 1);

    return new Promise<IDBDatabase>((resolve, reject) => {
      request.onerror = (error) => {
        attempts--;
        if (attempts) {
          return this.connect(dbName);
        }
        return reject(error);
      };
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };
      request.onupgradeneeded = () => {
        this.db = request.result;
        request.result
          .createObjectStore("users", {
            keyPath: "id",
            autoIncrement: true,
          })
          .createIndex("u_idx", "email", { unique: true });
        request.result
          .createObjectStore("articles", {
            keyPath: "id",
            autoIncrement: true,
          })
          .createIndex("a_idx", "userId", { unique: false });
        resolve(this.db);
      };
    });
  }

  get instance() {
    return this.dbAccess ? this.dbAccess : (this.dbAccess = new DBAccess());
  }
}
