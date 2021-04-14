import { User } from "../types";

const userProvider = {
  get(email: string) {
    localStorage.setItem("email", email);
    // localStorage.setItem("password", password);
    const user = null;
    return user;
    /** TODO: */
  },
  create(data: User) {},
};

export default userProvider;
