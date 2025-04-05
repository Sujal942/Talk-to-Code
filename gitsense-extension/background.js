// Listen for installation
chrome.runtime.onInstalled.addListener(() => {
  console.log('GitSense extension installed');
  
  // Set default backend URL if not already set
  chrome.storage.sync.get(['backendUrl'], function(result) {
    if (!result.backendUrl) {
      chrome.storage.sync.set({ backendUrl: 'http://localhost:5000' });
    }
  });
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getBackendUrl') {
    chrome.storage.sync.get(['backendUrl'], function(result) {
      sendResponse({ backendUrl: result.backendUrl || 'http://localhost:5000' });
    });
    return true; // Required for async response
  }
});
