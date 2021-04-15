import { User } from "../types";

const userProvider = {
  get(email: string) {
    localStorage.setItem("email", email);
    const user = null;
    return user;
    /** TODO: */
  },
  create(data: User) {
    console.log("data", data);
    /** TODO: */
  },
};

export default userProvider;
