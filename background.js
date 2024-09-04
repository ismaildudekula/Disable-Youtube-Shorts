// background.js

// Listen for navigation events
chrome.webNavigation.onBeforeNavigate.addListener(function (details) {
  const url = new URL(details.url);
  
  // Check if the URL is a Shorts URL
  if (url.hostname === 'www.youtube.com' && (url.pathname.startsWith('/shorts') || url.pathname === '/shorts')) {
    // Redirect to another URL (e.g., YouTube homepage)
    chrome.tabs.update(details.tabId, { url: 'https://www.youtube.com/' });
  }
}, { url: [{ hostContains: 'youtube.com' }] });
