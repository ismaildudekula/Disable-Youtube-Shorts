// content.js

// Function to hide or show Shorts sections based on user preference
function toggleShorts(hide) {
  // Hide or show Shorts section on the homepage
  const shortsSections = document.querySelectorAll('ytd-rich-shelf-renderer');
  shortsSections.forEach(section => {
      const dismissibleDivs = section.querySelectorAll('#dismissible');
      dismissibleDivs.forEach(div => {
          div.style.display = hide ? 'none' : '';
      });
  });

  // Hide or show Shorts button in the sidebar
  const shortsButton = document.querySelector('#items > ytd-guide-entry-renderer:nth-child(2)');
  if (shortsButton) {
      shortsButton.style.display = hide ? 'none' : '';
  }

  // Redirect if the user is watching a Shorts video, or do nothing based on preference
  const url = window.location.href;
  if (url.includes('/shorts') && hide) {
      window.location.href = 'https://www.youtube.com/';
  }

  // Hide or show Shorts from suggested videos on a regular video page
  if (url.includes('/watch')) {
      const suggestedShorts = document.querySelector('#contents > ytd-reel-shelf-renderer');
      if (suggestedShorts) {
          suggestedShorts.style.display = hide ? 'none' : '';
      }
  }
}

// Function to handle user preferences
function applyUserPreferences() {
  chrome.storage.sync.get(['disableShorts'], (result) => {
      const hideShorts = result.disableShorts || false;
      toggleShorts(hideShorts);
  });
}

// Function to handle mutations (for dynamically loaded content)
function observeMutations() {
  const observer = new MutationObserver(() => {
      applyUserPreferences();
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

// Function to handle page load
function handlePageLoad() {
  applyUserPreferences();
  observeMutations(); // Keep checking for dynamically loaded content
}

// Run on page load
window.addEventListener('load', handlePageLoad);
