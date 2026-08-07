import React, { useState, useRef } from 'react';
import { UploadCloud, X, FileCode, Check } from 'lucide-react';

export const FileUploader = ({ isOpen, onClose, onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processFile = (file) => {
    if (!file) return;
    const reader = new FileReader();

    // Map extension to language
    const ext = file.name.split('.').pop().toLowerCase();
    let detectedLang = 'javascript';
    if (['py'].includes(ext)) detectedLang = 'python';
    else if (['java'].includes(ext)) detectedLang = 'java';
    else if (['cpp', 'cc', 'cxx', 'h', 'hpp'].includes(ext)) detectedLang = 'cpp';
    else if (['cs'].includes(ext)) detectedLang = 'csharp';
    else if (['go'].includes(ext)) detectedLang = 'go';
    else if (['ts', 'tsx'].includes(ext)) detectedLang = 'typescript';
    else if (['html'].includes(ext)) detectedLang = 'html';
    else if (['css'].includes(ext)) detectedLang = 'css';
    else if (['sql'].includes(ext)) detectedLang = 'sql';

    reader.onload = (e) => {
      const content = e.target.result;
      onFileSelect({ content, language: detectedLang, fileName: file.name });
      onClose();
    };
    reader.readAsText(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl transition-all">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-2">
            <FileCode className="w-5 h-5 text-blue-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Upload Code File
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dropzone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`mt-4 flex flex-col items-center justify-center p-8 rounded-xl border-2 border-dashed transition-all cursor-pointer ${
            isDragging
              ? 'border-blue-500 bg-blue-500/10 scale-102'
              : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-blue-400 dark:hover:border-blue-500'
          }`}
        >
          <UploadCloud className="w-12 h-12 text-blue-500 mb-3 animate-bounce" />
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 text-center">
            Drag & drop code file here, or click to browse
          </p>
          <p className="mt-1 text-xs text-slate-400 text-center">
            Supports .js, .py, .java, .cpp, .cs, .go, .ts, .sql, .html, .css
          </p>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            accept=".js,.jsx,.ts,.tsx,.py,.java,.cpp,.c,.h,.hpp,.cs,.go,.html,.css,.sql,.txt"
            className="hidden"
          />
        </div>

        {/* Action button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
