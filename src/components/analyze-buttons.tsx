"use client";

import { useState } from "react";
import { useGitIngest } from "@/context/git-ingest-context";

export default function AnalyzeButtons() {
  const gitIngestContext = useGitIngest();
  if (!gitIngestContext) {
    throw new Error("useGitIngest must be used within a GitIngestProvider");
  }
  const { analyzeCodebase, analyzeStructure, isLoading, repoData } = gitIngestContext;
  const [activeTab, setActiveTab] = useState<"codebase" | "structure" | null>(null);
  const [question, setQuestion] = useState("");
  const [output, setOutput] = useState("");

  const handleAnalyzeCodebase = async () => {
    setActiveTab("codebase");
    setOutput("");
    await analyzeCodebase();
  };

  const handleAnalyzeStructure = async () => {
    setActiveTab("structure");
    setOutput("");
    await analyzeStructure();
  };

  const handleAskQuestion = async () => {
    if (!question || !repoData.filesContent) return;
    try {
      const response = await fetch("http://localhost:8000/analyze", { // Keep this for "Talk to Code" if needed, or replace with Gemini
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: repoData.filesContent, question }),
      });
      const data = await response.json();
      setOutput(data.answer || "No answer available");
    } catch (error) {
      console.error("Error asking question:", error);
      setOutput("Error getting answer");
    }
  };

  return (
    <div className="space-y-6 max-w-md mx-auto">
      {/* Analysis Input */}
      <textarea
        className="w-full bg-cream-50 border-2 border-gray-800 rounded-xl h-[250px] shadow-inner p-4 resize-none focus:outline-none focus:ring-2 focus:ring-amber-400"
        placeholder={
          activeTab === "codebase"
            ? isLoading
              ? "Analyzing codebase..."
              : "Enter repository details for codebase analysis"
            : activeTab === "structure"
              ? isLoading
                ? "Analyzing structure..."
                : "Enter repository details for structure analysis"
              : "Select an analysis type to begin"
        }
        disabled={isLoading}
      />
      {/* Buttons Container */}
      <div className="flex justify-between gap-4">
        <button
          className={`flex-1 px-4 py-2 rounded-md font-medium border border-amber-400 shadow-sm transition-colors duration-200 ${activeTab === "codebase"
            ? "bg-amber-400 text-amber-900"
            : "bg-amber-300 text-amber-800 hover:bg-amber-400"
            } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={handleAnalyzeCodebase}
          disabled={isLoading}
        >
          Analyze Codebase
        </button>
        <button
          className={`flex-1 px-4 py-2 rounded-md font-medium border border-amber-400 shadow-sm transition-colors duration-200 ${activeTab === "structure"
            ? "bg-amber-400 text-amber-900"
            : "bg-amber-300 text-amber-800 hover:bg-amber-400"
            } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={handleAnalyzeStructure}
          disabled={isLoading}
        >
          Analyze Structure
        </button>
      </div>
      {/* Question Input */}
      <textarea
        className="w-full bg-cream-50 border-2 border-gray-800 rounded-xl h-[100px] shadow-inner p-4 resize-none focus:outline-none focus:ring-2 focus:ring-amber-400"
        placeholder="Ask a question about the code"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      {/* Talk to Code Button */}
      <div className="flex justify-end">
        <button
          className="px-4 py-2 bg-amber-300 text-amber-800 border border-amber-400 rounded-md shadow-sm font-medium hover:bg-amber-400 transition-colors duration-200"
          onClick={handleAskQuestion}
          disabled={isLoading || !question}
        >
          Talk to Code
        </button>
      </div>
      {/* Output Textarea */}
      <textarea
        className="w-full bg-cream-50 border-2 border-gray-800 rounded-xl h-[320px] shadow-inner p-4 resize-none focus:outline-none focus:ring-2 focus:ring-amber-400"
        value={output}
        placeholder="Output or answer will appear here"
        readOnly
      />
    </div>
  );
}