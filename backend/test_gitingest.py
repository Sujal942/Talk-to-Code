import unittest
from unittest.mock import patch, MagicMock
from pathlib import Path
from gitingest import ingest, build_tree_structure, should_exclude, read_file_content

class TestGitIngest(unittest.TestCase):
    def test_should_exclude(self):
        exclude_patterns = ['*.pyc', '.git/*', '__pycache__/*']
        self.assertTrue(should_exclude('file.pyc', exclude_patterns))
        self.assertTrue(should_exclude('.git/config', exclude_patterns))
        self.assertFalse(should_exclude('src/main.py', exclude_patterns))

    def test_build_tree_structure(self):
        paths = [
            'src/',
            'src/main.py',
            'tests/',
            'tests/test_main.py',
            'README.md'
        ]
        expected_structure = (
            '├── README.md\n'
            '├── src/\n'
            '│   └── main.py\n'
            '└── tests/\n'
            '    └── test_main.py'
        )
        result = build_tree_structure(paths)
        self.assertEqual(result, expected_structure)

    @patch('pathlib.Path.is_file')
    @patch('pathlib.Path.stat')
    @patch('pathlib.Path.read_text')
    def test_read_file_content(self, mock_read_text, mock_stat, mock_is_file):
        mock_is_file.return_value = True
        mock_stat.return_value = MagicMock(st_size=1024)  # 1KB
        mock_read_text.return_value = 'test content'
        
        content = read_file_content(Path('test.txt'), max_size_kb=50)
        self.assertEqual(content, 'test content')

    @patch('git.Repo.clone_from')
    @patch('tempfile.TemporaryDirectory')
    def test_ingest(self, mock_temp_dir, mock_clone_from):
        # Mock temporary directory
        mock_temp_dir.return_value.__enter__.return_value = '/tmp/test'
        
        # Mock repository structure
        mock_walk = [
            ('/tmp/test', ['src'], ['README.md']),
            ('/tmp/test/src', [], ['main.py'])
        ]
        
        with patch('os.walk', return_value=mock_walk):
            with patch('pathlib.Path.read_text', return_value='test content'):
                with patch('pathlib.Path.is_file', return_value=True):
                    with patch('pathlib.Path.stat', return_value=MagicMock(st_size=1024)):
                        summary, tree, content = ingest(
                            'https://github.com/user/repo.git',
                            exclude=[],
                            max_size_kb=50
                        )
        
        self.assertEqual(summary['files_analyzed'], 2)
        self.assertIn('README.md', content)
        self.assertIn('src/main.py', content)

if __name__ == '__main__':
    unittest.main()