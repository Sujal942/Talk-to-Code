import os
import tempfile
import shutil
from git import Repo
from pathlib import Path
from typing import Dict, List, Tuple, Any
import logging

# Configure logging
logger = logging.getLogger(__name__)

def count_tokens(text: str) -> int:
    """Rough estimation of token count."""
    return len(text.split())

def should_exclude(file_path: str, exclude_patterns: List[str]) -> bool:
    """Check if file should be excluded based on patterns."""
    from fnmatch import fnmatch
    return any(fnmatch(file_path, pattern) for pattern in exclude_patterns)

def read_file_content(file_path: Path, max_size_kb: int) -> str:
    """Read file content if size is within limit."""
    if not file_path.is_file() or file_path.stat().st_size > max_size_kb * 1024:
        return ""
    try:
        return file_path.read_text(encoding='utf-8')
    except Exception as e:
        logger.error(f"Error reading file {file_path}: {str(e)}")
        return ""

def build_tree_structure(path_list: List[str]) -> str:
    """Build a hierarchical tree structure from a list of paths."""
    class Node:
        def __init__(self, name):
            self.name = name
            self.children = {}
            self.is_file = False

    # Create root node
    root = Node('')

    # Build tree
    for path in sorted(path_list):
        current = root
        parts = path.split('/')
        
        # Process all parts except the last one
        for part in parts[:-1]:
            if part not in current.children:
                current.children[part] = Node(part)
            current = current.children[part]
        
        # Process the last part
        last_part = parts[-1]
        if last_part:  # If not empty (not a directory)
            current.children[last_part] = Node(last_part)
            current.children[last_part].is_file = True

    # Generate string representation
    def _build_str(node: Node, prefix: str = '', is_last: bool = True) -> List[str]:
        result = []
        if node.name:
            marker = '└── ' if is_last else '├── '
            result.append(prefix + marker + node.name + ('/' if not node.is_file else ''))
            prefix += '    ' if is_last else '│   '

        children = list(node.children.values())
        for i, child in enumerate(children):
            result.extend(_build_str(child, prefix, i == len(children) - 1))
        return result

    return '\n'.join(_build_str(root))

from git_utils import is_valid_git_url, validate_repository_access

def ingest(repo_url: str, exclude: List[str], max_size_kb: int = 50) -> Tuple[Dict[str, Any], str, Dict[str, str]]:
    """Clone repository and extract content."""
    # Validate repository URL
    if not is_valid_git_url(repo_url):
        raise ValueError("Invalid Git repository URL format")
    
    # Check repository accessibility
    is_accessible, error_msg = validate_repository_access(repo_url)
    if not is_accessible:
        raise ValueError(f"Repository validation failed: {error_msg}")
    
    with tempfile.TemporaryDirectory() as temp_dir:
        try:
            # Clone repository
            logger.info(f"Cloning repository: {repo_url}")
            repo = Repo.clone_from(repo_url, temp_dir)
            
            # Initialize variables
            files_analyzed = 0
            total_tokens = 0
            content_dict = {}
            paths = []
            
            # Walk through repository
            for root, dirs, files in os.walk(temp_dir):
                rel_root = os.path.relpath(root, temp_dir)
                if rel_root == '.':
                    rel_root = ''
                
                # Add directories to paths
                for d in dirs:
                    if not d.startswith('.'):
                        dir_path = os.path.join(rel_root, d).replace('\\', '/')
                        if dir_path:
                            paths.append(dir_path + '/')
                
                # Process files
                for file in files:
                    rel_path = os.path.join(rel_root, file).replace('\\', '/')
                    
                    # Skip excluded files
                    if should_exclude(rel_path, exclude):
                        continue
                    
                    # Read file content
                    file_path = Path(os.path.join(root, file))
                    content = read_file_content(file_path, max_size_kb)
                    
                    if content:
                        files_analyzed += 1
                        tokens = count_tokens(content)
                        total_tokens += tokens
                        content_dict[rel_path] = content
                        paths.append(rel_path)
            
            # Build tree structure
            tree_structure = build_tree_structure(paths)
            
            summary = {
                "files_analyzed": files_analyzed,
                "estimated_tokens": total_tokens
            }
            
            logger.info(f"Repository analysis complete: {files_analyzed} files analyzed")
            return summary, tree_structure, content_dict
            
        except Exception as e:
            logger.error(f"Failed to process repository: {str(e)}")
            raise Exception(f"Failed to process repository: {str(e)}")