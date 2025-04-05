"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface GitIngestContextType {
  repoData: RepoData;
  fetchRepository: (
    repoUrl: string,
    exclude: string,
    maxSizeKb: number
  ) => Promise<void>;
  analyzeCodebase: () => Promise<void>;
  analyzeStructure: () => Promise<void>;
  isLoading: boolean;
}

const GitIngestContext = createContext<GitIngestContextType | null>(null);

export interface RepoData {
  directoryStructure: string;
  filesContent: Record<string, string>;
  repoName: string;
  filesAnalyzed: number;
  estimatedTokens: number;
}

export function GitIngestProvider({ children }: { children: React.ReactNode }) {
  const [repoData, setRepoData] = useState<RepoData>({
    directoryStructure: "",
    filesContent: {},
    repoName: "",
    filesAnalyzed: 0,
    estimatedTokens: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Fetch repository data from the Python backend
  const fetchRepository = async (
    repoUrl: string,
    exclude: string,
    maxSizeKb: number
  ) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://talk-to-code-1.onrender.com/ingest",
        {
          // const response = await fetch("http://localhost:8000/ingest", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            repo_url: repoUrl,
            exclude,
            max_size_kb: maxSizeKb,
          }),
        }
      );
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
      setRepoData((prev) => ({
        ...prev,
        directoryStructure: "Error loading structure",
        filesContent: {},
      }));
    } finally {
      setIsLoading(false);
    }
  };

  // Analyze codebase using Gemini API
  const analyzeCodebase = async () => {
    if (!repoData.filesContent) return;
    setIsLoading(true);
    try {
      const response = await fetch("https://api.gemini.google.com/v1/analyze", {
        // Hypothetical Gemini API endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`, // Replace with actual API key
        },
        body: JSON.stringify({
          content: JSON.stringify(repoData.filesContent), // Send filesContent as JSON
          prompt:
            "Analyze this codebase and provide a quick summary of its main components and functionality to help developers and contributors understand it.",
        }),
      });
      const data = await response.json();
      setRepoData((prev) => ({
        ...prev,
        filesContent: data.summary || "No analysis available",
      }));
    } catch (error) {
      console.error("Error analyzing codebase with Gemini API:", error);
      setRepoData((prev) => ({ ...prev, filesContent: {} }));
    } finally {
      setIsLoading(false);
    }
  };

  // Analyze structure using Gemini API
  const analyzeStructure = async () => {
    if (!repoData.directoryStructure) return;
    setIsLoading(true);
    try {
      const response = await fetch("https://api.gemini.google.com/v1/analyze", {
        // Hypothetical Gemini API endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`, // Replace with actual API key
        },
        body: JSON.stringify({
          content: repoData.directoryStructure,
          prompt:
            "Analyze this directory structure and explain the project organization to help developers and contributors understand it.",
        }),
      });
      const data = await response.json();
      setRepoData((prev) => ({
        ...prev,
        directoryStructure: data.summary || "No analysis available",
      }));
    } catch (error) {
      console.error("Error analyzing structure with Gemini API:", error);
      setRepoData((prev) => ({
        ...prev,
        directoryStructure: "Error analyzing structure",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GitIngestContext.Provider
      value={{
        repoData,
        fetchRepository,
        analyzeCodebase,
        analyzeStructure,
        isLoading,
      }}
    >
      {children}
    </GitIngestContext.Provider>
  );
}

export const useGitIngest = () => useContext(GitIngestContext);
