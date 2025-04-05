import re
import requests
from typing import Tuple
import logging

logger = logging.getLogger(__name__)

def is_valid_git_url(url: str) -> bool:
    """Check if the provided URL is a valid Git repository URL."""
    # Common Git URL patterns
    patterns = [
        r'^https?://github\.com/[\w.-]+/[\w.-]+(?:\.git)?$',  # GitHub HTTPS
        r'^git@github\.com:[\w.-]+/[\w.-]+(?:\.git)?$',        # GitHub SSH
        r'^https?://gitlab\.com/[\w.-]+/[\w.-]+(?:\.git)?$',  # GitLab HTTPS
        r'^git@gitlab\.com:[\w.-]+/[\w.-]+(?:\.git)?$',        # GitLab SSH
        r'^https?://bitbucket\.org/[\w.-]+/[\w.-]+(?:\.git)?$'  # Bitbucket HTTPS
    ]
    
    return any(re.match(pattern, url) for pattern in patterns)

def validate_repository_access(url: str) -> Tuple[bool, str]:
    """Validate if the repository exists and is accessible."""
    try:
        # Convert SSH URLs to HTTPS for validation
        if url.startswith('git@'):
            domain = url.split('@')[1].split(':')[0]
            path = url.split(':')[1].rstrip('.git')
            url = f'https://{domain}/{path}'
        
        # Add .git suffix if not present
        if not url.endswith('.git'):
            url = f'{url}.git'
        
        # Try to access the repository
        response = requests.head(url, allow_redirects=True)
        if response.status_code == 200:
            return True, ""
        else:
            return False, f"Repository not accessible (HTTP {response.status_code})"
    
    except requests.exceptions.RequestException as e:
        logger.error(f"Error validating repository access: {str(e)}")
        return False, f"Failed to validate repository: {str(e)}"