"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface GitIngestContextType {
  repoData: RepoData;
  fetchRepository: (repoUrl: string, exclude: string, maxSizeKb: number) => Promise<void>;
  analyzeCodebase: () => Promise<void>;
  analyzeStructure: () => Promise<void>;
  isLoading: boolean;
}

const GitIngestContext = createContext<GitIngestContextType | null>(null);

export function GitIngestProvider({ children }: { children: React.ReactNode }) {
  interface RepoData {
    directoryStructure: string;
    filesContent: Record<string, string>;
    repoName: string;
    filesAnalyzed: number;
    estimatedTokens: number;
  }

  const [repoData, setRepoData] = useState<RepoData>({
    directoryStructure: "",
    filesContent: {},
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
        body: JSON.stringify({
          repo_url: repoUrl,
          exclude,
          max_size_kb: maxSizeKb,
        }),
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
      setRepoData((prev) => ({ ...prev, directoryStructure: "Error loading structure", filesContent: {} }));
    } finally {
      setIsLoading(false);
    }
  };

  const analyzeCodebase = async () => {
    if (!repoData.filesContent) return;
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: repoData.filesContent,
          question: "Analyze this codebase and provide a summary of its main components and functionality."
        }),
      });
      const data = await response.json();
      setRepoData((prev) => ({ ...prev, filesContent: data.answer || "No analysis available" }));
    } catch (error) {
      console.error("Error analyzing codebase:", error);
      setRepoData((prev) => ({ ...prev, filesContent: "Error analyzing codebase" }));
    } finally {
      setIsLoading(false);
    }
  };

  const analyzeStructure = async () => {
    if (!repoData.directoryStructure) return;
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: repoData.directoryStructure,
          question: "Analyze this directory structure and explain the project organization."
        }),
      });
      const data = await response.json();
      setRepoData((prev) => ({ ...prev, directoryStructure: data.answer || "No analysis available" }));
    } catch (error) {
      console.error("Error analyzing structure:", error);
      setRepoData((prev) => ({ ...prev, directoryStructure: "Error analyzing structure" }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GitIngestContext.Provider value={{ repoData, fetchRepository, analyzeCodebase, analyzeStructure, isLoading }}>
      {children}
    </GitIngestContext.Provider>
  );
}

export const useGitIngest = () => useContext(GitIngestContext);