"use client";

import { useGitIngest } from "@/context/git-ingest-context";

export default function DirectoryStructurePanel() {
  const { repoData } = useGitIngest();

  return (
    <div className="bg-cream-50 border-2 border-gray-800 rounded-md p-4 w-full lg:w-1/2 h-[200px] overflow-auto shadow-inner">
      <pre className="text-sm font-mono">
        {repoData.directoryStructure ? repoData.directoryStructure : ``}
      </pre>
    </div>
  );
}
