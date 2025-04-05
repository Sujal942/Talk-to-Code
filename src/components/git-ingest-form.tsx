"use client";

import { useState } from "react";
import { useGitIngest } from "@/context/git-ingest-context";

export default function GitIngestForm() {
  const { fetchRepository, isLoading } = useGitIngest();
  const [repoUrl, setRepoUrl] = useState("");
  const [includeSmallFiles, setIncludeSmallFiles] = useState(true);
  const [excludePattern, setExcludePattern] = useState("");

  const handleIngest = async () => {
    await fetchRepository(repoUrl, excludePattern, includeSmallFiles ? 50 : 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          className="flex-1 border-2 border-gray-800 rounded-md px-4 py-3 text-lg shadow-inner"
          placeholder="GitHub repository URL"
        />
        <button
          className="bg-amber-300 hover:bg-amber-400 text-amber-800 px-6 py-3 rounded-md text-lg font-medium border border-amber-400 shadow-sm transition-colors"
          onClick={handleIngest}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Ingest"}
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              className="appearance-none bg-blue-100 text-blue-800 px-4 py-2 pr-8 rounded-md border border-blue-200 font-medium"
              defaultValue="exclude"
            >
              <option value="exclude">Exclude</option>
              <option value="include">Include</option>
            </select>
            <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
              <svg
                className="w-4 h-4 text-blue-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>

          <input
            type="text"
            value={excludePattern}
            onChange={(e) => setExcludePattern(e.target.value)}
            placeholder="*.md, test/..."
            className="border-2 border-gray-300 rounded-md px-3 py-2 text-sm flex-1 shadow-inner"
          />
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <span className="text-sm text-gray-700 font-medium">
            Include files under:
          </span>
          <input
            type="range"
            name=""
            id=""
            onClick={() => setIncludeSmallFiles(!includeSmallFiles)}
            className="w-auto inset-0 rounded-full bg-gradient-to-r from-red-400 to-amber-200"
          />
          {/* <div className="relative w-48 h-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-400 to-amber-200"></div>
            <div
              className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-2 border-gray-400 shadow-md cursor-pointer transition-all ${
                includeSmallFiles ? "left-[calc(50%-12px)]" : "left-0"
              }`}
              onClick={() => setIncludeSmallFiles(!includeSmallFiles)}
            ></div>
          </div> */}
          <span className="text-sm text-gray-700 font-medium mr-6">50kb</span>
        </div>
      </div>
    </div>
  );
}
