import React, { useState } from 'react';
import ChatWindow from '../components/ChatWindow';

const WritingAssist: React.FC = () => {
  const [text, setText] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  // Dummy handlers for actions
  const handleSaveToSheets = () => {
    setStatus('Saved to Google Sheets! (Demo)');
    setTimeout(() => setStatus(null), 2000);
  };
  const handleDownloadPDF = () => {
    setStatus('PDF Downloaded! (Demo)');
    setTimeout(() => setStatus(null), 2000);
  };
  const handleComposeEmail = () => {
    setStatus('Email draft created! (Demo)');
    setTimeout(() => setStatus(null), 2000);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl mx-auto py-10 px-4">
      {/* Chat window for AI writing help */}
      <div className="flex-1 min-w-[320px]">
        <h2 className="text-2xl font-bold mb-4 text-fuchsia-700">AI Writing Assistant</h2>
        <ChatWindow isMinimized={false} onMinimize={() => {}} />
      </div>
      {/* Writing area */}
      <div className="flex-1 min-w-[320px]">
        <h2 className="text-2xl font-bold mb-4 text-fuchsia-700">Write a Letter or Email</h2>
        <textarea
          className="w-full h-64 p-4 rounded-lg border border-fuchsia-200 focus:ring-2 focus:ring-fuchsia-400 mb-4 resize-vertical"
          placeholder="Write your letter or email here..."
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <div className="flex gap-4 mb-2">
          <button
            className="bg-fuchsia-600 text-white px-4 py-2 rounded-lg hover:bg-fuchsia-700 transition"
            onClick={handleSaveToSheets}
          >
            Save to Google Sheets
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={handleDownloadPDF}
          >
            Download as PDF
          </button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            onClick={handleComposeEmail}
          >
            Compose Email
          </button>
        </div>
        {status && <div className="text-sm text-fuchsia-700 mt-2">{status}</div>}
      </div>
    </div>
  );
};

export default WritingAssist;
