"use client";

import { createContext, useContext, useState, useEffect } from "react";

const GitIngestContext = createContext<any>(null);

export function GitIngestProvider({ children }: { children: React.ReactNode }) {
  const [repoData, setRepoData] = useState({
    directoryStructure: "",
    filesContent: "",
    repoName: "",
    filesAnalyzed: 0,
    estimatedTokens: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchRepository = async (repoUrl: string, exclude: string, maxSizeKb: number) => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repo_url: repoUrl, exclude, max_size_kb: maxSizeKb }),
      });
      const data = await response.json();
      setRepoData({
        directoryStructure: data.directoryStructure,
        filesContent: data.filesContent,
        repoName: data.repoName,
        filesAnalyzed: data.filesAnalyzed,
        estimatedTokens: data.estimatedTokens,
      });
    } catch (error) {
      console.error("Error fetching repository:", error);
      setRepoData((prev) => ({ ...prev, directoryStructure: "Error loading structure", filesContent: "Error loading content" }));
    } finally {
      setIsLoading(false);
    }
  };

  const analyzeCodebase = async () => {
    // Placeholder or future enhancement
    setRepoData((prev) => ({ ...prev, filesContent: "Codebase analysis in progress..." }));
  };

  const analyzeStructure = async () => {
    // Placeholder or future enhancement
    setRepoData((prev) => ({ ...prev, directoryStructure: "Structure analysis in progress..." }));
  };

  return (
    <GitIngestContext.Provider value={{ repoData, fetchRepository, analyzeCodebase, analyzeStructure, isLoading }}>
      {children}
    </GitIngestContext.Provider>
  );
}

export const useGitIngest = () => useContext(GitIngestContext);