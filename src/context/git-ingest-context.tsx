"use client";

import { createContext, useContext, useState } from "react";

// Token estimation (simplified, replace with Gemini's tokenizer if available)
const estimateTokenCount = (text: string) => Math.ceil(text.length / 4);
const MAX_TOKENS = 10000; // Adjust based on Gemini docs (e.g., 128,000 for some models)

// Function to beautify Gemini response
const beautifySummary = (rawText: string): string => {
  // Split into lines and process
  const lines = rawText.split("\n").filter(line => line.trim());
  let formatted = "";

  lines.forEach((line, index) => {
    line = line.trim();
    if (line.startsWith("The") || line.match(/^\w+:/)) {
      // Treat as a heading (e.g., "The codebase..." or "Overview:")
      formatted += `\n### ${line}\n`;
    } else if (line.match(/^[-*]\s/)) {
      // Preserve bullet points
      formatted += `${line.replace(/^[-*]\s/, "- ")}\n`;
    } else if (line.length > 0) {
      // Add as paragraph
      formatted += `${line}\n\n`;
    }
  });

  // Remove trailing newlines and ensure proper spacing
  return formatted.trim().replace(/\n{3,}/g, "\n\n");
};

interface GitIngestContextType {
  repoData: RepoData;
  fetchRepository: (repoUrl: string, exclude: string, maxSizeKb: number) => Promise<void>;
  isLoading: boolean;
}

const GitIngestContext = createContext<GitIngestContextType | null>(null);

export interface RepoData {
  directoryStructure: string;
  filesContent: Record<string, string>;
  repoName: string;
  filesAnalyzed: number;
  estimatedTokens: number;
  summary?: string;
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

  const fetchRepository = async (repoUrl: string, exclude: string, maxSizeKb: number) => {
    setIsLoading(true);
    try {
      const response = await fetch("https://talk-to-code-1.onrender.com/ingest", {
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
      await summarizeCodebase(data.directoryStructure, data.filesContent);
    } catch (error) {
      console.error("Fetch error:", error);
      setRepoData((prev) => ({
        ...prev,
        directoryStructure: "Error loading structure",
        filesContent: {},
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const summarizeCodebase = async (directoryStructure: string, filesContent: Record<string, string>) => {
    if (!directoryStructure || !filesContent) return;
    setIsLoading(true);
    try {
      const filesContentString = Object.entries(filesContent)
        .map(([fileName, content]) => `${fileName}:\n${content}`).join("\n\n");
      let combinedContent = `${directoryStructure}\n\n${filesContentString}`;
      const tokenCount = estimateTokenCount(combinedContent);
      if (tokenCount > MAX_TOKENS) combinedContent = combinedContent.slice(0, MAX_TOKENS * 4);

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-001:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: combinedContent }] }],
            generationConfig: { temperature: 0.7, maxOutputTokens: 2048 },
          }),
        }
      );
      const data = await response.json();
      const rawSummary = data.candidates?.[0]?.content?.parts?.[0]?.text || "No summary available";
      const formattedSummary = beautifySummary(rawSummary);
      setRepoData((prev) => ({
        ...prev,
        summary: formattedSummary,
      }));
    } catch (error) {
      console.error("Summarize error:", error);
      setRepoData((prev) => ({ ...prev, summary: "Error generating summary" }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GitIngestContext.Provider value={{ repoData, fetchRepository, isLoading }}>
      {children}
    </GitIngestContext.Provider>
  );
}

export const useGitIngest = () => useContext(GitIngestContext);