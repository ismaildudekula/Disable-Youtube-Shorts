// options.js

document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get(['disableShorts'], (data) => {
      document.getElementById('disableShorts').checked = data.disableShorts;
    });
  });
  
  document.getElementById('saveButton').addEventListener('click', () => {
    const disableShorts = document.getElementById('disableShorts').checked;
    chrome.storage.sync.set({ disableShorts: disableShorts }, () => {
      alert('Settings saved!');
    });
  });
  