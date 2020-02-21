export const getItemFromStore = (key, defaultValue, store = localStorage) =>
  JSON.parse(store.getItem(key)) || defaultValue;
export const setItemToStore = (key, payload, store = localStorage) => store.setItem(key, JSON.stringify(payload));