"use client";

import { useGitIngest } from "@/context/git-ingest-context";

export default function DirectoryStructurePanel() {
  const gitIngestContext = useGitIngest();
  if (!gitIngestContext) {
    throw new Error("GitIngestContext is not available");
  }
  const { repoData } = gitIngestContext;

  const renderTreeItem = (line: string) => {
    const indentLevel = line.search(/\S/);
    const isDirectory = line.trim().endsWith("/");

    return (
      <div
        key={line}
        className="flex items-center gap-2"
        style={{ paddingLeft: `${indentLevel * 16}px` }}
      >
        {isDirectory ? (
          <svg
            className="w-4 h-4 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
            />
          </svg>
        ) : (
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        )}
        <span className={`${isDirectory ? "font-semibold" : ""}`}>
          {line.trim()}
        </span>
      </div>
    );
  };

  const treeLines = (repoData.directoryStructure || "")
    .split("\n")
    .filter(Boolean);

  return (
    <div className="bg-cream-50 border-2 border-gray-800 rounded-md p-4 w-full lg:w-1/2 h-[200px] overflow-auto shadow-inner">
      {treeLines.map(renderTreeItem)}
    </div>
  );
}
