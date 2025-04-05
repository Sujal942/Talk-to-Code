"use client";

import { useGitIngest } from "@/context/git-ingest-context";

export default function FilesContentPanel() {
  const { repoData } = useGitIngest();

  return (
    <textarea className="bg-cream-50 border-2 border-gray-800 rounded-md p-4 h-[280px] w-[670px] overflow-auto shadow-inner">
   
        {repoData.filesContent ? repoData.filesContent : ``}

    </textarea>
  );
}
