export const getBooks = () => {
  const res = localStorage.getItem('books');
  return JSON.parse(res);
};

export const postBooks = (value) => {
  localStorage.setItem('books', JSON.stringify(value));
};

export const postValue = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getValue = (key) => {
  const res = localStorage.getItem(key);
  return JSON.parse(res);
};

export const clear = () => {
  const value = getBooks();
  localStorage.clear();
  postBooks(value);
};
