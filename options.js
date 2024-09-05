// options.js

// Load the saved state on page load
document.addEventListener('DOMContentLoaded', () => {
  const disableShortsCheckbox = document.getElementById('disableShorts');

  chrome.storage.sync.get(['disableShorts'], (result) => {
      disableShortsCheckbox.checked = result.disableShorts || false;
  });

  // Save user preference when checkbox is changed
  disableShortsCheckbox.addEventListener('change', () => {
      const isChecked = disableShortsCheckbox.checked;
      chrome.storage.sync.set({ disableShorts: isChecked });
  });
});
