import React from 'react';

const LandingPage: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
    <img src="/favicon.ico" alt="Gmail Icon" className="w-16 h-16 mb-4" />
    <h1 className="text-4xl font-bold mb-2">Mail Whisperer Dashboard</h1>
    <p className="text-lg text-gray-600 mb-6 max-w-xl">
      Welcome to your AI-powered Gmail dashboard!<br />
      • Categorize and label emails with the help of an agent.<br />
      • Schedule emails, cron jobs, and agent events.<br />
      • View a full audit trail of actions.<br />
      • Chat with the agent in real time.<br />
    </p>
    <div className="flex gap-4">
      <a href="/scheduler" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Scheduler</a>
      <a href="/audit" className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition">Audit Trail</a>
      <a href="/" className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition">Inbox</a>
    </div>
  </div>
);

export default LandingPage;
