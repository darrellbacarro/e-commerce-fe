const path = (root: string, sublink: string) => {
  return `${root}${sublink}`;
};

const MAIN_ROOT = "";

export const MAIN_PATH = {
  root: MAIN_ROOT,
  notFound: "*",
  login: path(MAIN_ROOT, "/login"),
  admin: path(MAIN_ROOT, "/admin"),
};
