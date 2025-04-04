"use client";
import Image from "next/image";
import { GitIngestProvider } from "../context/git-ingest-context";
import Logo from "../components/logo";
import GitIngestForm from "../components/git-ingest-form";
import AnalyzeButtons from "../components/analyze-buttons";
import SummaryPanel from "../components/summary-panel";
import DirectoryStructurePanel from "../components/directory-structure-panel";
import FilesContentPanel from "../components/files-content-panel";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <GitIngestProvider>
        {/* Header */}
        <header className="border-b border-gray-200 px-6 py-4 flex items-center justify-between bg-white sticky top-0 z-20">
          <Logo />
          {/* <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-gray-700 hover:text-gray-900 transition-colors flex items-center gap-2"
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-download"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Extension
            </a>
          </div> */}
        </header>

        {/* Main Content */}
        <div className="flex flex-1 max-w-screen-xl mx-auto w-full h-[calc(100vh-60px)] overflow-hidden">
          {/* Left Panel */}
          <div className="w-3/5 border-r border-gray-200 p-6 overflow-y-auto">
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

          {/* Right Panel */}
          <div className="w-2/5 p-6 bg-white overflow-y-auto">
            <AnalyzeButtons />
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-200 p-4 flex justify-between items-center text-sm text-gray-600 mt-auto">
          {/* <button className="flex items-center gap-1">
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-lightbulb"
            >
              <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
              <path d="M9 18h6" />
            </svg>
            Suggest a feature
          </button> */}
        </footer>
      </GitIngestProvider>
    </div>
  );
}
