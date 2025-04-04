// "use client";
// import Image from "next/image";
// import { GitIngestProvider } from "../context/git-ingest-context"; // Adjusted the path to match the correct location
// import Logo from "../components/logo"; // Adjusted the path to match the correct location
// import GitIngestForm from "../components/git-ingest-form"; // Adjusted the path to match the correct location
// import AnalyzeButtons from "../components/analyze-buttons"; // Adjusted the path to match the correct location
// import SummaryPanel from "../components/summary-panel"; // Adjusted the path to match the correct location
// import DirectoryStructurePanel from "../components/directory-structure-panel"; // Adjusted the path to match the correct
// import FilesContentPanel from "../components/files-content-panel"; // Adjusted the path to match the correct location

// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <GitIngestProvider>
//         <main className="min-h-screen bg-white flex flex-col">
//           <header className="border-b border-gray-200 px-6 py-3 flex items-center justify-between bg-white sticky top-0 z-10">
//             <Logo />
//             <div className="flex items-center gap-6">
//               <a
//                 href="#"
//                 className="text-gray-700 flex items-center gap-2 hover:text-gray-900 transition-colors"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="20"
//                   height="20"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   className="lucide lucide-download"
//                 >
//                   <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
//                   <polyline points="7 10 12 15 17 10" />
//                   <line x1="12" y1="15" x2="12" y2="3" />
//                 </svg>
//                 Extension
//               </a>
//               <a
//                 href="https://github.com/topics/github-api"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-gray-700 flex items-center gap-2 hover:text-gray-900 transition-colors"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="20"
//                   height="20"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   className="lucide lucide-github"
//                 >
//                   <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
//                   <path d="M9 18c-4.51 2-5-2-7-2" />
//                 </svg>
//                 GitHub
//               </a>
//               <div className="flex items-center gap-1 text-amber-500">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="18"
//                   height="18"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                   stroke="currentColor"
//                   strokeWidth="1"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   className="lucide lucide-star"
//                 >
//                   <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
//                 </svg>
//                 <span>7.8k</span>
//               </div>
//             </div>
//           </header>

//           <div className="flex h-[calc(100vh-60px)]">
//             {/* Left Panel */}
//             <div className="w-[55%] border-r border-gray-200 p-6 overflow-auto">
//               <div className="space-y-6">
//                 <div className="border-2 border-gray-800 rounded-xl p-8 bg-cream-50 relative shadow-[8px_8px_0px_rgba(0,0,0,0.2)]">
//                   <div className="absolute -left-6 -top-6">
//                     <svg
//                       width="60"
//                       height="60"
//                       viewBox="0 0 60 60"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         d="M30 60C46.5685 60 60 46.5685 60 30C60 13.4315 46.5685 0 30 0C13.4315 0 0 13.4315 0 30C0 46.5685 13.4315 60 30 60Z"
//                         fill="#4ECCA3"
//                       />
//                       <path
//                         d="M15 30C15 21.7157 21.7157 15 30 15C38.2843 15 45 21.7157 45 30C45 38.2843 38.2843 45 30 45C21.7157 45 15 38.2843 15 30Z"
//                         fill="#4ECCA3"
//                       />
//                       <path
//                         d="M22.5 30C22.5 25.8579 25.8579 22.5 30 22.5C34.1421 22.5 37.5 25.8579 37.5 30C37.5 34.1421 34.1421 37.5 30 37.5C25.8579 37.5 22.5 34.1421 22.5 30Z"
//                         fill="white"
//                       />
//                     </svg>
//                   </div>
//                   <GitIngestForm />
//                 </div>

//                 <div className="border-2 border-gray-800 rounded-xl p-6 bg-white shadow-[8px_8px_0px_rgba(0,0,0,0.2)]">
//                   <div className="flex justify-between items-center mb-6">
//                     <h2 className="font-bold text-xl">Summary</h2>
//                     <div className="flex items-center gap-2">
//                       <h2 className="font-bold text-xl">Directory Structure</h2>
//                       <button className="bg-amber-300 hover:bg-amber-400 text-amber-800 px-4 py-2 rounded-md text-sm flex items-center gap-2 font-medium border border-amber-400 shadow-sm transition-colors">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           width="16"
//                           height="16"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           className="lucide lucide-copy"
//                         >
//                           <rect
//                             width="14"
//                             height="14"
//                             x="8"
//                             y="8"
//                             rx="2"
//                             ry="2"
//                           />
//                           <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
//                         </svg>
//                         Copy
//                       </button>
//                     </div>
//                   </div>

//                   <div className="flex flex-col lg:flex-row gap-6">
//                     <SummaryPanel />
//                     <DirectoryStructurePanel />
//                   </div>

//                   <div className="flex gap-3 mt-6">
//                     <button className="bg-amber-300 hover:bg-amber-400 text-amber-800 px-4 py-2 rounded-md text-sm flex items-center gap-2 font-medium border border-amber-400 shadow-sm transition-colors">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="16"
//                         height="16"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         className="lucide lucide-download"
//                       >
//                         <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
//                         <polyline points="7 10 12 15 17 10" />
//                         <line x1="12" y1="15" x2="12" y2="3" />
//                       </svg>
//                       Download
//                     </button>
//                     <button className="bg-amber-300 hover:bg-amber-400 text-amber-800 px-4 py-2 rounded-md text-sm flex items-center gap-2 font-medium border border-amber-400 shadow-sm transition-colors">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="16"
//                         height="16"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         className="lucide lucide-copy"
//                       >
//                         <rect
//                           width="14"
//                           height="14"
//                           x="8"
//                           y="8"
//                           rx="2"
//                           ry="2"
//                         />
//                         <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
//                       </svg>
//                       Copy All
//                     </button>
//                   </div>
//                 </div>

//                 <div className="border-2 border-gray-800 rounded-xl p-6 bg-white shadow-[8px_8px_0px_rgba(0,0,0,0.2)]">
//                   <div className="flex justify-between items-center mb-6">
//                     <h2 className="font-bold text-xl">Files Content</h2>
//                     <button className="bg-amber-300 hover:bg-amber-400 text-amber-800 px-4 py-2 rounded-md text-sm flex items-center gap-2 font-medium border border-amber-400 shadow-sm transition-colors">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="16"
//                         height="16"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         className="lucide lucide-copy"
//                       >
//                         <rect
//                           width="14"
//                           height="14"
//                           x="8"
//                           y="8"
//                           rx="2"
//                           ry="2"
//                         />
//                         <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
//                       </svg>
//                       Copy
//                     </button>
//                   </div>
//                   <FilesContentPanel />
//                 </div>
//               </div>
//             </div>

//             {/* Right Panel */}
//             <div className="w-[45%] p-6 bg-white overflow-auto">
//               <AnalyzeButtons />

//               <div className="absolute bottom-4 right-4">
//                 <div className="w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center">
//                   <div className="w-8 h-8 bg-pink-400 rounded-t-full"></div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <footer className="border-t border-gray-200 p-4 flex justify-between items-center text-sm text-gray-600">
//             <button className="flex items-center gap-1">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="16"
//                 height="16"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="lucide lucide-lightbulb"
//               >
//                 <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
//                 <path d="M9 18h6" />
//                 <path d="M10 22h4" />
//               </svg>
//               Suggest a feature
//             </button>
//             <div className="flex items-center gap-2">
//               <span>made with</span>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="16"
//                 height="16"
//                 viewBox="0 0 24 24"
//                 fill="red"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="lucide lucide-heart"
//               >
//                 <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
//               </svg>
//               <span>by @jamz</span>
//             </div>
//             <button>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="16"
//                 height="16"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="lucide lucide-discord"
//               >
//                 <circle cx="9" cy="12" r="1" />
//                 <circle cx="15" cy="12" r="1" />
//                 <path d="M8 17a5 5 0 0 0 8 0" />
//                 <path d="M15.5 17.5 16 19l2 1c3-2 4-10 4-12-1-4-4-5-6-5l-1 3" />
//                 <path d="M8.5 17.5 8 19l-2 1c-3-2-4-10-4-12 1-4 4-5 6-5l1 3" />
//               </svg>
//             </button>
//           </footer>
//         </main>
//       </GitIngestProvider>
//     </div>
//   );
// }

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
          <div className="flex items-center gap-6">
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
          </div>
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
          <button className="flex items-center gap-1">
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
          </button>
        </footer>
      </GitIngestProvider>
    </div>
  );
}
