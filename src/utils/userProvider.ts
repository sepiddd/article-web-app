const userProvider = {
  get(email: string) {
    localStorage.setItem("email", email);
    const user = null;
    return user;
    /** TODO: */
  },
};

export default userProvider;
