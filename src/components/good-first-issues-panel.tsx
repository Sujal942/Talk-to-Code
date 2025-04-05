"use client";
import React from "react";

interface Issue {
  number: number;
  title: string;
  html_url: string;
  labels: { name: string }[];
}

interface GoodFirstIssuesPanelProps {
  issues: Issue[];
  isLoading: boolean;
  error: string | null;
  onRefresh: () => void;
}

const GoodFirstIssuesPanel: React.FC<GoodFirstIssuesPanelProps> = ({
  issues,
  isLoading,
  error,
  onRefresh,
}) => {
  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-lg">Good First Issues</h3>
        <button
          onClick={onRefresh}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? "Refreshing..." : "Refresh"}
        </button>
      </div>
      {isLoading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {issues.length > 0 ? (
        <ul className="list-disc pl-5">
          {issues.map((issue) => (
            <li key={issue.number} className="mb-2">
              <a
                href={issue.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {issue.title} (#{issue.number})
              </a>
            </li>
          ))}
        </ul>
      ) : (
        !isLoading && <p className="text-gray-500">No good first issues available.</p>
      )}
    </div>
  );
};

export default GoodFirstIssuesPanel;