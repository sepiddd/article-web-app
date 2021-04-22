import { IDataAccess } from "../types/IDataAccess";

export class DataAccess<T> implements IDataAccess<T> {
  constructor(
    protected connection: Promise<IDBDatabase>,
    protected storeName: string
  ) {}

  async add(item: T) {
    const db = await this.connection;
    const request = db
      .transaction([this.storeName], "readwrite")
      .objectStore(this.storeName)
      .add(item);

    return this.requestHandler(request);
  }

  async retrieve() {
    const db = await this.connection;
    const store = db
      .transaction([this.storeName], "readonly")
      .objectStore(this.storeName);

    return new Promise<T[]>((resolve, reject) => {
      const result: any[] = [];
      store.openCursor().onsuccess = (event) => {
        const cursor = (event.target as any).result;
        if (cursor) {
          result.push(cursor.value);
          cursor.continue();
        } else {
          return resolve(result);
        }
      };
    });
  }

  async update(item: T) {
    const db = await this.connection;
    const request = db
      .transaction([this.storeName], "readwrite")
      .objectStore(this.storeName)
      .put(item);

    return this.requestHandler(request);
  }

  async get(key: any) {
    const db = await this.connection;
    const request = db
      .transaction([this.storeName], "readonly")
      .objectStore(this.storeName)
      .get(key);

    return this.requestHandler(request);
  }

  async remove(id: string) {
    const db = await this.connection;
    const request = db
      .transaction([this.storeName], "readwrite")
      .objectStore(this.storeName)
      .delete(id);

    return this.requestHandler(request);
  }

  protected requestHandler(request: IDBRequest) {
    return new Promise<T>((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.result);
    });
  }
}
