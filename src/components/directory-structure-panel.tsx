"use client";

import { useGitIngest } from "@/context/git-ingest-context";

export default function DirectoryStructurePanel() {
  const { repoData } = useGitIngest();

  return (
    <div className="bg-cream-50 border-2 border-gray-800 rounded-md p-4 w-full lg:w-1/2 h-[200px] overflow-auto shadow-inner">
      <pre className="text-sm font-mono">
        {repoData.directoryStructure
          ? repoData.directoryStructure
          : `├── ignore_patterns.py
├── ingestion_utils.py
├── notebook_utils.py
├── path_utils.py
├── query_parser_utils.py
├── timeout_wrapper.py
├── server/
│   ├── __init__.py
│   ├── main.py
│   └── query_processor.py`}
      </pre>
    </div>
  );
}
