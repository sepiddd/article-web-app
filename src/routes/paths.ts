function path(root: string, sublink: string): string {
  return `${root}${sublink}`;
}

const ROOTS = {
  app: "",
  auth: "/auth",
};

export const PATH_AUTH = {
  root: ROOTS.auth,
  login: path(ROOTS.auth, "/login"),
  register: path(ROOTS.auth, "/register"),
};

export const PATH_APP = {
  root: ROOTS.app,
  list: path(ROOTS.app, "/list"),
};
