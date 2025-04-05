"use client";

import { useState } from "react";
import { useGitIngest } from "@/context/git-ingest-context";

export default function AnalyzeButtons() {
  const { analyzeCodebase, analyzeStructure, isLoading } = useGitIngest();
  const [activeTab, setActiveTab] = useState<"codebase" | "structure" | null>(null);

  const handleAnalyzeCodebase = async () => {
    setActiveTab("codebase");
    await analyzeCodebase();
  };

  const handleAnalyzeStructure = async () => {
    setActiveTab("structure");
    await analyzeStructure();
  };

  return (
    <div className="space-y-6 max-w-md mx-auto">
      {/* Buttons Container */}
      

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
      {/* Output Textarea */}
      <textarea
        className="w-full bg-cream-50 border-2 border-gray-800 rounded-xl h-[460px] shadow-inner p-4 resize-none focus:outline-none focus:ring-2 focus:ring-amber-400"
        placeholder="Output will appear here"
      />

      {/* Talk to Code Button */}
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-amber-300 text-amber-800 border border-amber-400 rounded-md shadow-sm font-medium hover:bg-amber-400 transition-colors duration-200">
          Talk to Code
        </button>
      </div>
    </div>
  );
}