"use client";

import { useGitIngest } from "@/context/git-ingest-context";

export default function FilesContentPanel() {
  const { repoData } = useGitIngest();

  return (
    <div className="bg-cream-50 border-2 border-gray-800 rounded-md p-4 h-[280px] overflow-auto shadow-inner">
      <pre className="text-sm font-mono">
        {repoData.filesContent
          ? repoData.filesContent
          : `**Python package**: Import it in your code

## Requirements

- Python 3.7+

## Installation

\`\`\`bash
pip install gitingest
\`\`\`

## Browser Extension Usage

<!-- Markdown-linkable ICONS -->
<a href="https://chromewebstore.google.com/detail/gitingest-lite/fdjkghjkltjkgjrjfgwfww" target="_blank" title="Get GitIngest Extension from Chrome Web Store"><img height="48" src="https://github.com/user/elements/assets/23e4e45-f4d7-4e5c-9e2e-2aa53e5f757" alt="Get the Edge Add-on" /></a>
<a href="https://addons.mozilla.org/firefox/addon/gitingest" target="_blank" title="Get GitIngest Extension from Firefox Add-on"><img height="48" src="http://github.com/user" alt="Get GitIngest Extension from Firefox Add-on" /></a>
<a href="https://microsoftedge.microsoft.com/addons/detail/gitingest/fhjkgwfwjkgfwjkgfwjkgf" target="_blank" title="Get GitIngest Extension from Microsoft Edge Add-on"><img height="48" src="https://github.com/user/elements/assets/2e5197e-a2ae-4c2e-b2c5-d51e4e9f9e" alt="Get the Edge Add-on" /></a>

The extension is open source at [jamz2/gitingest-extension]`}
      </pre>
    </div>
  );
}
