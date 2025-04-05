"use client";

import { useGitIngest } from "@/context/git-ingest-context";

export default function FilesContentPanel() {
  const context = useGitIngest();
  if (!context) return null;

  const { repoData } = context;

  return (
    <div className="bg-cream-50 border-2 border-gray-800 rounded-md p-4 h-[280px] w-[670px] overflow-auto shadow-inner">
      {Object.entries(repoData.filesContent || {}).map(
        ([filePath, content]) => {
          const lines = typeof content === "string" ? content.split("\n") : [];
          return (
            <div key={filePath} className="mb-6">
              <div className="font-bold text-gray-700 mb-2 flex items-center gap-2">
                <svg
                  className="w-4 h-4"
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
                {filePath}
              </div>
              <div className="bg-white rounded border border-gray-300 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm font-mono">
                    <tbody>
                      {lines.map((line, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="py-0.5 px-2 text-right text-gray-500 select-none bg-gray-50 border-r border-gray-300 w-[1%] whitespace-nowrap">
                            {index + 1}
                          </td>
                          <td className="py-0.5 px-3">
                            <pre className="font-mono">{line || " "}</pre>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
}
