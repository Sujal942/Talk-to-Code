document.addEventListener('DOMContentLoaded', function() {
  const statusElement = document.getElementById('status');
  const backendUrlInput = document.getElementById('backend-url');
  const saveButton = document.getElementById('save-settings');
  
  // Load saved backend URL from storage
  chrome.storage.sync.get(['backendUrl'], function(result) {
    if (result.backendUrl) {
      backendUrlInput.value = result.backendUrl;
      checkBackendConnection(result.backendUrl);
    } else {
      // Default to localhost if not set
      backendUrlInput.value = 'http://localhost:5000';
      checkBackendConnection('http://localhost:5000');
    }
  });
  
  // Save settings
  saveButton.addEventListener('click', function() {
    const backendUrl = backendUrlInput.value.trim();
    
    if (!backendUrl) {
      alert('Please enter a valid backend URL');
      return;
    }
    
    // Save to storage
    chrome.storage.sync.set({ backendUrl: backendUrl }, function() {
      // Check connection after saving
      checkBackendConnection(backendUrl);
      
      // Show saved message
      saveButton.textContent = 'Saved!';
      setTimeout(() => {
        saveButton.textContent = 'Save Settings';
      }, 2000);
    });
  });
  
  // Function to check backend connection
  function checkBackendConnection(url) {
    statusElement.textContent = 'Checking connection...';
    statusElement.className = 'status';
    
    fetch(`${url}/health`, { method: 'GET' })
      .then(response => {
        if (response.ok) {
          statusElement.textContent = '✅ Connected to backend';
          statusElement.className = 'status connected';
        } else {
          throw new Error(`Server returned ${response.status}`);
        }
      })
      .catch(error => {
        console.error('Connection error:', error);
        statusElement.textContent = '❌ Cannot connect to backend';
        statusElement.className = 'status disconnected';
      });
  }
});
