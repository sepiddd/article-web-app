import { User } from "../types";
import { DataAccess } from "./DataAccess";

export class UserAccess extends DataAccess<User> {
  async getByEmail(email: string) {
    const db = await this.connection;
    const request = db
      .transaction([this.storeName], "readonly")
      .objectStore(this.storeName)
      .index("u_idx")
      .get(IDBKeyRange.only(email));

    return this.requestHandler(request);
  }
}
