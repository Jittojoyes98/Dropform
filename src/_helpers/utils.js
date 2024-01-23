export const getDataFromLocalStorage = (key) => {
  return localStorage.getItem(key);
};
export const addToLocalStorage = (object) => {
  localStorage.setItem(object["key"], object["value"]);
};
