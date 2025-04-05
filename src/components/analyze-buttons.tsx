"use client";

import { useState } from "react";
import { useGitIngest } from "@/context/git-ingest-context";

export default function AnalyzeButtons() {
  const { isLoading, repoData } = useGitIngest() || {};
  if (!useGitIngest) throw new Error("useGitIngest must be within GitIngestProvider");

  const [question, setQuestion] = useState("");
  const [output, setOutput] = useState("");

  const handleAskQuestion = async () => {
    if (!question || !repoData?.filesContent) return;
    try {
      const response = await fetch("https://talk-to-code-1.onrender.com/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: repoData.filesContent, question }),
      });
      const data = await response.json();
      setOutput(data.answer || "No answer available");
    } catch (error) {
      console.error("Question error:", error);
      setOutput("Error: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  };

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <textarea
        className=" bg-cream-50 border-2 border-gray-800 rounded-xl h-[600px] w-[450px] shadow-inner p-4 resize-none focus:outline-none focus:ring-2 focus:ring-amber-400"
        value={repoData?.summary || (isLoading ? "Summarizing..." : "Ingest to see summary")}
        placeholder="Summary here"
        readOnly
        disabled={isLoading}
      />
      <textarea
        className="w-full bg-cream-50 border-2 border-gray-800 rounded-xl h-[100px] shadow-inner p-4 resize-none focus:outline-none focus:ring-2 focus:ring-amber-400"
        placeholder="Ask about code"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <div className="flex justify-end">
        <button
          className="px-4 py-2 bg-amber-300 text-amber-800 border border-amber-400 rounded-md shadow-sm font-medium hover:bg-amber-400 transition-colors"
          onClick={handleAskQuestion}
          disabled={isLoading || !question}
        >
          Talk to Code
        </button>
      </div>
      {/* <textarea
        className="w-full bg-cream-50 border-2 border-gray-800 rounded-xl h-[320px] shadow-inner p-4 resize-none focus:outline-none focus:ring-2 focus:ring-amber-400"
        value={output}
        placeholder="Output here"
        readOnly
      /> */}
    </div>
  );
}