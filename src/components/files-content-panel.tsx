"use client";

import { useGitIngest } from "@/context/git-ingest-context";

export default function FilesContentPanel() {
  const { repoData } = useGitIngest();

  return (
    <div className="bg-cream-50 border-2 border-gray-800 rounded-md p-4 h-[280px] overflow-auto shadow-inner">
      <pre className="text-sm font-mono">
        {repoData.filesContent ? repoData.filesContent : ``}
      </pre>
    </div>
  );
}
