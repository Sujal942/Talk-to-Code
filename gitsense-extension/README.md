# GitSense Chrome Extension

GitSense is a Chrome extension that integrates with GitHub repository pages to provide AI-powered insights and analysis of repositories.

## Features

- Injects an "🧠 Analyze with GitSense" button directly onto GitHub repository pages
- Analyzes repositories to extract valuable insights:
  - Directory structure
  - Tech stack used
  - Repository summary
  - Key files and components
  - TODOs and FIXMEs
  - Visualizations (language distribution charts)

## Installation

### Local Development

1. Clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top-right corner
4. Click "Load unpacked" and select the `gitsense-extension` directory
5. The extension should now be installed and visible in your Chrome toolbar

### Backend Setup

The extension requires a backend server to analyze repositories. The backend is built with Flask and uses the GitHub API to fetch repository data.

1. Make sure your backend server is running at `http://localhost:5000`
2. Ensure you have a valid GitHub token set in your backend's `.env` file
3. The backend should expose the following endpoints:
   - `/health` - Health check endpoint
   - `/analyze_repo` - Endpoint to analyze repositories

## Usage

1. Navigate to any GitHub repository page (e.g., `https://github.com/username/repo`)
2. You'll see a "🧠 Analyze with GitSense" button in the repository header
3. Click the button to analyze the repository
4. A modal will appear showing insights about the repository

## Configuration

You can configure the backend URL by clicking on the GitSense extension icon in your Chrome toolbar.

## Development

### Extension Structure

- `manifest.json` - Extension configuration
- `content.js` - Content script that injects the button and handles analysis
- `popup.html` & `popup.js` - Extension popup UI and logic
- `background.js` - Background script for handling extension events
- `styles.css` - Styles for the injected UI elements

### Backend Structure

The backend server is built with Flask and provides endpoints for analyzing GitHub repositories. It uses the GitHub API to fetch repository data and performs analysis to extract insights.

## License

MIT
