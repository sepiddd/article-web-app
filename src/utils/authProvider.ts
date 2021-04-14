const authProvider = {
  login(email: string, password: string) {
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    /** TODO: */
  },
};

export default authProvider;
