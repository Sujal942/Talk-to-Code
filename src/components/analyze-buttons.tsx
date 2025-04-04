"use client";

import { useState } from "react";
import { useGitIngest } from "@/context/git-ingest-context";

export default function AnalyzeButtons() {
  const { analyzeCodebase, analyzeStructure, isLoading } = useGitIngest();
  const [activeTab, setActiveTab] = useState<"codebase" | "structure" | null>(
    null
  );

  const handleAnalyzeCodebase = async () => {
    setActiveTab("codebase");
    await analyzeCodebase();
  };

  const handleAnalyzeStructure = async () => {
    setActiveTab("structure");
    await analyzeStructure();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <button
          className={`${
            activeTab === "codebase"
              ? "bg-amber-400 text-amber-900"
              : "bg-amber-300 hover:bg-amber-400 text-amber-800"
          } px-4 py-2 rounded-md font-medium border border-amber-400 shadow-sm transition-colors`}
          onClick={handleAnalyzeCodebase}
          disabled={isLoading}
        >
          Analyze Codebase
        </button>
        <button
          className={`${
            activeTab === "structure"
              ? "bg-amber-400 text-amber-900"
              : "bg-amber-300 hover:bg-amber-400 text-amber-800"
          } px-4 py-2 rounded-md font-medium border border-amber-400 shadow-sm transition-colors`}
          onClick={handleAnalyzeStructure}
          disabled={isLoading}
        >
          Analyze Structure
        </button>
      </div>

      <div className="bg-cream-50 border-2 border-gray-800 rounded-xl h-[250px] shadow-inner p-4">
        {activeTab === "codebase" && (
          <div className="h-full flex items-center justify-center">
            {isLoading ? (
              <div className="animate-pulse">Analyzing codebase...</div>
            ) : (
              <div className="text-center">
                <h3 className="font-bold mb-2">Codebase Analysis</h3>
                <p className="text-sm text-gray-600">
                  Select a repository to analyze its codebase
                </p>
              </div>
            )}
          </div>
        )}
        {activeTab === "structure" && (
          <div className="h-full flex items-center justify-center">
            {isLoading ? (
              <div className="animate-pulse">Analyzing structure...</div>
            ) : (
              <div className="text-center">
                <h3 className="font-bold mb-2">Structure Analysis</h3>
                <p className="text-sm text-gray-600">
                  Select a repository to analyze its structure
                </p>
              </div>
            )}
          </div>
        )}
        {!activeTab && (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <h3 className="font-bold mb-2">No Analysis Selected</h3>
              <p className="text-sm text-gray-600">
                Click one of the analyze buttons above
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-cream-50 border-2 border-gray-800 rounded-xl h-[250px] shadow-inner"></div>

      <div className="flex justify-end mt-4">
        <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
          Ask about code
        </button>
      </div>
    </div>
  );
}
