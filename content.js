// content.js

// Function to hide YouTube Shorts
function hideShorts() {
  chrome.storage.sync.get(['disableShorts'], function (data) {
    if (data.disableShorts) {
      // Hide Shorts in the main content
      const sectionRenderers = document.querySelectorAll('ytd-rich-section-renderer');
      sectionRenderers.forEach(section => {
        const contentDiv = section.querySelector('#content');
        if (contentDiv) {
          const shortsContainers = contentDiv.querySelectorAll('#dismissible');
          shortsContainers.forEach(container => {
            container.style.display = 'none';
          });
        }
      });

      // Hide Shorts in the sidebar
      const sidebarShortsButton = document.querySelector('#items > ytd-guide-entry-renderer:nth-child(2)');
      if (sidebarShortsButton) {
        sidebarShortsButton.style.display = 'none'; // Hide the Shorts button
      }
    }
  });
}

// Apply filter on page load
hideShorts();

// Observe changes to apply filter on dynamic content
const observer = new MutationObserver(hideShorts);
observer.observe(document.body, { childList: true, subtree: true });
