interface IRead<T> {
  retrieve(): Promise<T[]>;
  get(key: any): Promise<T>;
}

interface IWrite<T> {
  add(item: T): Promise<T>;
  update(item: T): Promise<T>;
  remove(uid: string): Promise<T>;
}

export interface IDataAccess<T> extends IRead<T>, IWrite<T> {}
