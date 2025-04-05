"use client";
import { useState, useEffect } from "react";
import Logo from "../../components/logo";
import GoodFirstIssuesPanel from "../../components/good-first-issues-panel";
import axios from "axios";

export default function Contribute() {
  const [issues, setIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [repoUrl, setRepoUrl] = useState("https://github.com/Sujal942/Talk-to-Code");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const fetchIssues = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${repoUrl.replace(
          "https://github.com/",
          ""
        )}/issues`,
        {
          headers: {
            Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`, // Use environment variable
          },
          params: {
            state: "open",
            labels: "good first issue",
          },
        }
      );
      const filteredIssues = response.data.filter((issue: any) =>
        issue.labels.some((label: any) => label.name.toLowerCase() === "good first issue")
      );
      setIssues(filteredIssues);
    } catch (err) {
      setError(
        `Error fetching issues: ${
          axios.isAxiosError(err) ? err.message : "Unknown error"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, [repoUrl]);

  return (
    <div className="flex flex-col ml-22 lg:ml-10 min-h-screen bg-gray-50">
      {/* Header - Reused from Home */}
      <header className="border-b border-gray-200 p-4 flex items-center justify-between bg-white sticky top-0 z-20">
        <Logo />
        <div className="flex items-center gap-6">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-sm px-3 py-1 bg-gray-100 border rounded hover:bg-gray-200 transition"
          >
            {isSidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
          </button>
          <a
            href="/"
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            Home
          </a>
          <a
            href="#"
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            Extension
          </a>
          <a
            href="#"
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            Github
          </a>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 max-w-screen-xl mx-auto w-full h-[calc(100vh-60px)] overflow-hidden transition-all duration-300">
        {/* Left Panel */}
        <div
          className={`transition-all duration-300 ${
            isSidebarOpen ? "w-3/5" : "w-full"
          } border-r border-gray-200 p-6 overflow-y-auto`}
        >
          <div className="space-y-6">
            <div className="border-2 border-gray-800 rounded-xl p-8 bg-white shadow-md">
              <h2 className="font-bold text-xl mb-4">Contribute to {repoUrl}</h2>
              <input
                type="text"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Enter GitHub repository URL"
              />
              <GoodFirstIssuesPanel
                issues={issues}
                isLoading={isLoading}
                error={error}
                onRefresh={fetchIssues}
              />
            </div>
          </div>
        </div>

        {/* Right Panel (Sidebar) - Optional, can be added later */}
        {isSidebarOpen && (
          <div className="w-2/5 p-6 bg-white overflow-y-auto border-l border-gray-200 transition-all duration-300">
            {/* Add sidebar content if needed, e.g., AnalyzeButtons */}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 p-4 flex justify-between items-center text-sm text-gray-600 mt-auto">
        <button className="flex items-center gap-1">Suggest a feature</button>
        <button className="flex items-center gap-1">Made By Meta Daters</button>
      </footer>
    </div>
  );
}

