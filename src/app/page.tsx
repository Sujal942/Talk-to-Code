"use client";
import { useState } from "react";
import Image from "next/image";
import { GitIngestProvider } from "../context/git-ingest-context";
import Logo from "../components/logo";
import GitIngestForm from "../components/git-ingest-form";
import AnalyzeButtons from "../components/analyze-buttons";
import SummaryPanel from "../components/summary-panel";
import DirectoryStructurePanel from "../components/directory-structure-panel";
import FilesContentPanel from "../components/files-content-panel";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col ml-22 min-h-screen bg-gray-50">
      <GitIngestProvider>
        {/* Header */}
        <header className="border-b border-gray-200 px-6 mt-[-38px] flex items-center justify-between bg-white sticky top-0 z-20">
          <Logo />
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-sm px-3 py-1 bg-gray-100 border rounded hover:bg-gray-200 transition"
            >
              {isSidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
            </button>
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
              {/* Git Ingest Form */}
              <div className="border-2 border-gray-800 rounded-xl p-8 bg-white shadow-md">
                <GitIngestForm />
              </div>

              {/* Summary and Directory Panel */}
              <div className="border-2 border-gray-800 rounded-xl p-6 bg-white shadow-md">
                <div className="flex flex-col lg:flex-row gap-6">
                  <SummaryPanel />
                  <DirectoryStructurePanel />
                </div>
              </div>

              {/* Files Content Panel */}
              <div className="border-2 border-gray-800 rounded-xl p-6 bg-white shadow-md">
                <h2 className="font-bold text-xl mb-4">Files Content</h2>
                <FilesContentPanel />
              </div>
            </div>
          </div>

          {/* Right Panel (Sidebar) */}
          {isSidebarOpen && (
            <div className="w-2/5 p-6 bg-white overflow-y-auto border-l border-gray-200 transition-all duration-300">
              <AnalyzeButtons />
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-200 p-4 flex justify-between items-center text-sm text-gray-600 mt-auto">
          <button className="flex items-center gap-1">Suggest a feature</button>
          <button className="flex items-center gap-1">
            Made By Meta Daters
          </button>
        </footer>
      </GitIngestProvider>
    </div>
  );
}
