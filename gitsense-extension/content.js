// Function to check if we're on a GitHub repository page
function isRepoPage() {
  // Check if the URL matches a GitHub repository pattern
  return /^https:\/\/github\.com\/[^\/]+\/[^\/]+\/?$/.test(window.location.href);
}

// Function to inject the GitSense button
function injectGitSenseButton() {
  if (!isRepoPage()) return;

  // Find the navigation area where we'll inject our button
  const navArea = document.querySelector('ul.pagehead-actions');
  
  if (!navArea) return;
  
  // Check if our button already exists to avoid duplicates
  if (document.getElementById('gitsense-button')) return;
  
  // Create list item to match GitHub's style
  const listItem = document.createElement('li');
  
  // Create the button
  const button = document.createElement('button');
  button.id = 'gitsense-button';
  button.className = 'btn btn-sm';
  button.innerHTML = '🧠 Analyze with GitSense';
  button.style.marginRight = '8px';
  
  // Add click event listener
  button.addEventListener('click', handleAnalyzeClick);
  
  // Append button to list item
  listItem.appendChild(button);
  
  // Insert at the beginning of the nav area
  navArea.prepend(listItem);
  
  console.log('GitSense button injected successfully');
}

// Function to handle button click
function handleAnalyzeClick() {
  // Show loading state
  const button = document.getElementById('gitsense-button');
  const originalText = button.innerHTML;
  button.innerHTML = '⏳ Analyzing...';
  button.disabled = true;
  
  // Get repository URL
  const repoUrl = window.location.href;
  
  // Open a new tab with the deployed website URL, passing the repo URL as a parameter
  const deployedSiteUrl = `https://talk-to-code-frontend.vercel.app/learn-open-source?repo_url=${encodeURIComponent(repoUrl)}`;
  window.open(deployedSiteUrl, '_blank');
  
  // Reset button state after a short delay
  setTimeout(() => {
    button.innerHTML = originalText;
    button.disabled = false;
  }, 1000);
}

// Run the injection when the page loads
injectGitSenseButton();

// Also run when the URL changes (for single-page apps)
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    setTimeout(injectGitSenseButton, 1000); // Delay to ensure the DOM is ready
  }
}).observe(document, { subtree: true, childList: true });
