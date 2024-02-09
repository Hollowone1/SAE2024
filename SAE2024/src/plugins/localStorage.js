const saveStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const getStorage = (key, item) => {
  const content = localStorage.getItem(key);
  if (content) {
    if (item) {
      const parsed = JSON.parse(content);
      return parsed[item];
    }
    return JSON.parse(content);
  }
  return null;
};

const clearStorage = key => {
  if (key) {
    localStorage.removeItem(key);
  } else {
    localStorage.clear();
  }
};

export default {
  install(Vue) {
    Vue.prototype.$saveStorage = saveStorage;
    Vue.prototype.$getStorage = getStorage;
    Vue.prototype.$clearStorage = clearStorage;
  },
};