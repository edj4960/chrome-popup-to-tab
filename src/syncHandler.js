const SyncHandler = {
  get(key, defaultValue = null) {
    return new Promise(resolve => {
      chrome.storage.sync.get([key], result => {
        resolve(result[key] !== undefined ? result[key] : defaultValue);
      });
    });
  },

  set(key, value) {
    return new Promise(resolve => {
      chrome.storage.sync.set({ [key]: value }, () => {
        resolve();
      });
    });
  },

  onChange(callback) {
    chrome.storage.onChanged.addListener((changes, areaName) => {
      if (areaName === 'sync') {
        callback(changes);
      }
    });
  },
};