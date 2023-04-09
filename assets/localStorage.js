import jwtDecode from "jwt-decode";

export const getLocal = (key) => {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(key);
    return item;
  }
};

export const setLocal = (key, value) => {
  localStorage.setItem(key, value);
};

export const decode = (token) => {
  return jwtDecode(token);
};

export const removeLocal = (key) => {
  localStorage.removeItem(key);
};
