function stampValue(value) {
  return {
    createdDate: new Date(),
    value,
  };
}

export function get(key) {
  let item = localStorage.getItem(key);
  item = JSON.parse(item);
  if (!item) {
    return item;
  }
  return item.value;
}

export function set(key, value) {
  let currValue = stampValue(value);
  currValue = JSON.stringify(currValue);
  localStorage.setItem(key, currValue);
}

export function remove(key) {
  localStorage.removeItem(key);
}

export function cleanStorage() {
  const storageEntries = Object.entries(localStorage);
  storageEntries.forEach((e) => {
    const value = JSON.parse(e[1]);
    if (Date.now() - new Date(value.createdDate) > 0) {
      remove(e[0]);
    }
  });
}

export default {
  get,
  set,
  remove,
  cleanStorage,
};
