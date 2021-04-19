import { DBAccess } from "../utils/DBAccess";

export const DB_CONNECTION = new DBAccess().instance.connect("store");
