"use client";
import React from "react";

interface Issue {
  number: number;
  title: string;
  html_url: string;
  labels: { name: string }[];
}

interface IssuesByCategory {
  goodFirst: Issue[];
  enhancements: Issue[];
  bugs: Issue[];
  features: Issue[];
  uiux: Issue[];
}

interface GoodFirstIssuesPanelProps {
  issues: IssuesByCategory;
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
  const sections = [
    { title: "Good First Issues", data: issues.goodFirst, color: "text-blue-600" },
    { title: "Enhancements", data: issues.enhancements, color: "text-green-600" },
    { title: "Bugs", data: issues.bugs, color: "text-red-600" },
    { title: "New Features", data: issues.features, color: "text-purple-600" },
    { title: "UI/UX", data: issues.uiux, color: "text-orange-600" },
  ];

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Open Issues by Category</h3>
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

      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.title}>
            <h4 className={`font-semibold ${section.color} mb-2`}>{section.title}</h4>
            {section.data.length > 0 ? (
              <ul className="list-disc pl-5">
                {section.data.map((issue) => (
                  <li key={issue.number} className="mb-2">
                    <a
                      href={issue.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${section.color} hover:underline`}
                    >
                      {issue.title} (#{issue.number})
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              !isLoading && (
                <p className="text-gray-500">No {section.title.toLowerCase()} available.</p>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoodFirstIssuesPanel;