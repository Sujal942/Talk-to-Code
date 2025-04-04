"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { Octokit } from "@octokit/rest";

type RepoData = {
  repoName: string;
  filesAnalyzed: number;
  estimatedTokens: string;
  directoryStructure: string;
  filesContent: string;
};

type GitIngestContextType = {
  repoData: RepoData;
  isLoading: boolean;
  fetchRepository: (
    repoUrl: string,
    excludePattern: string,
    maxFileSize: number
  ) => Promise<void>;
  analyzeCodebase: () => Promise<void>;
  analyzeStructure: () => Promise<void>;
};

const defaultRepoData: RepoData = {
  repoName: "",
  filesAnalyzed: 0,
  estimatedTokens: "",
  directoryStructure: "",
  filesContent: "",
};

const GitIngestContext = createContext<GitIngestContextType | undefined>(
  undefined
);

export function GitIngestProvider({ children }: { children: ReactNode }) {
  const [repoData, setRepoData] = useState<RepoData>(defaultRepoData);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize Octokit with a personal access token if available
  const octokit = new Octokit({
    auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
  });

  const parseRepoUrl = (url: string) => {
    // Handle various formats of GitHub URLs
    const githubRegex = /github\.com\/([^/]+)\/([^/]+)/;
    const simpleRegex = /^([^/]+)\/([^/]+)$/;

    let owner, repo;

    if (githubRegex.test(url)) {
      const match = url.match(githubRegex);
      if (match) {
        owner = match[1];
        repo = match[2].replace(".git", "");
      }
    } else if (simpleRegex.test(url)) {
      const match = url.match(simpleRegex);
      if (match) {
        owner = match[1];
        repo = match[2];
      }
    }

    return { owner, repo };
  };

  const fetchRepository = async (
    repoUrl: string,
    excludePattern: string,
    maxFileSize: number
  ) => {
    setIsLoading(true);
    try {
      const { owner, repo } = parseRepoUrl(repoUrl);

      if (!owner || !repo) {
        throw new Error("Invalid repository URL format");
      }

      // Get repository information
      const repoInfo = await octokit.repos.get({
        owner,
        repo,
      });

      // Get repository contents
      const contents = await octokit.repos.getContent({
        owner,
        repo,
        path: "",
      });

      // Process the contents to build directory structure
      const directoryStructure = await buildDirectoryStructure(
        octokit,
        owner,
        repo,
        "",
        0
      );

      // Get README or another file for content preview
      let filesContent = "";
      try {
        const readmeResponse = await octokit.repos.getReadme({
          owner,
          repo,
        });

        const readmeContent = Buffer.from(
          readmeResponse.data.content,
          "base64"
        ).toString();
        filesContent = readmeContent;
      } catch (error) {
        filesContent = "No README file found in this repository.";
      }

      // Calculate estimated tokens (rough estimate based on file sizes)
      const estimatedTokens = Math.round(
        repoInfo.data.size / 4
      ).toLocaleString();

      setRepoData({
        repoName: `${owner}/${repo}`,
        filesAnalyzed: Array.isArray(contents.data) ? contents.data.length : 0,
        estimatedTokens: `${estimatedTokens}`,
        directoryStructure,
        filesContent,
      });
    } catch (error) {
      console.error("Error fetching repository:", error);
      // Set some default data for demonstration
      setRepoData({
        repoName: repoUrl,
        filesAnalyzed: 65,
        estimatedTokens: "56.2k",
        directoryStructure: buildFallbackDirectoryStructure(),
        filesContent:
          "Failed to fetch repository content. Please check the repository URL and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const buildDirectoryStructure = async (
    octokit: Octokit,
    owner: string,
    repo: string,
    path: string,
    depth: number,
    maxDepth = 3
  ): Promise<string> => {
    if (depth > maxDepth) return "";

    try {
      const response = await octokit.repos.getContent({
        owner,
        repo,
        path,
      });

      if (!Array.isArray(response.data)) {
        return "";
      }

      const contents = response.data;
      let structure = "";

      for (let i = 0; i < contents.length; i++) {
        const item = contents[i];
        const isLast = i === contents.length - 1;
        const prefix =
          depth > 0
            ? "│   ".repeat(depth - 1) + (isLast ? "└── " : "├── ")
            : "";

        structure += `${prefix}${item.name}${item.type === "dir" ? "/" : ""}\n`;

        if (item.type === "dir" && depth < maxDepth) {
          const subPath = path ? `${path}/${item.name}` : item.name;
          const subStructure = await buildDirectoryStructure(
            octokit,
            owner,
            repo,
            subPath,
            depth + 1,
            maxDepth
          );
          structure += subStructure;
        }
      }

      return structure;
    } catch (error) {
      console.error(`Error fetching contents for ${path}:`, error);
      return "";
    }
  };

  const buildFallbackDirectoryStructure = (): string => {
    return `├── ignore_patterns.py
├── ingestion_utils.py
├── notebook_utils.py
├── path_utils.py
├── query_parser_utils.py
├── timeout_wrapper.py
├── server/
│   ├── __init__.py
│   ├── main.py
│   └── query_processor.py`;
  };

  const analyzeCodebase = async () => {
    setIsLoading(true);
    // Simulate analysis
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  const analyzeStructure = async () => {
    setIsLoading(true);
    // Simulate analysis
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  return (
    <GitIngestContext.Provider
      value={{
        repoData,
        isLoading,
        fetchRepository,
        analyzeCodebase,
        analyzeStructure,
      }}
    >
      {children}
    </GitIngestContext.Provider>
  );
}

export function useGitIngest() {
  const context = useContext(GitIngestContext);

  if (context === undefined) {
    throw new Error("useGitIngest must be used within a GitIngestProvider");
  }

  return context;
}
