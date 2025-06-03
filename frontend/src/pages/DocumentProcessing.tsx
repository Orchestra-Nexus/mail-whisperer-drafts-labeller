import React, { useState } from 'react';

// Placeholder for file upload and document selection
const DocumentProcessing: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [workflow, setWorkflow] = useState<any[]>([]); // Replace with real workflow node structure

  // Dummy node types for the workflow builder
  const nodeTypes = [
    { type: 'validation-human', label: 'Validation (Human)' },
    { type: 'validation-agent', label: 'Validation (Agent)' },
    { type: 'agent-processing', label: 'Agent Processing' },
    { type: 'advanced-processing', label: 'Advanced Document Processing' },
    { type: 'start-agent-task', label: 'Start Agent Task' },
    { type: 'save-to-drive', label: 'Save to Drive' },
    { type: 'save-to-sheets', label: 'Save to Sheets' },
  ];

  // Placeholder for drag-and-drop workflow builder
  // In a real app, use something like react-flow or dnd-kit

  return (
    <div className="flex w-full h-[calc(100vh-56px)]">
      {/* Left: Document upload/select */}
      <div className="w-1/3 bg-white border-r p-8 flex flex-col gap-6 justify-center items-center">
        <h2 className="text-2xl font-bold mb-4">Select or Upload Document</h2>
        <input
          type="file"
          accept="application/pdf,.doc,.docx,.txt"
          onChange={e => setSelectedFile(e.target.files?.[0] || null)}
          className="mb-4"
        />
        <button className="bg-fuchsia-500 text-white px-4 py-2 rounded shadow hover:bg-fuchsia-600 transition">Select from Email/Drive</button>
        {selectedFile && (
          <div className="mt-4 text-sm text-gray-700">Selected: {selectedFile.name}</div>
        )}
      </div>
      {/* Right: Workflow builder */}
      <div className="flex-1 flex flex-col p-8">
        <h2 className="text-2xl font-bold mb-4">Document Processing Workflow</h2>
        <div className="flex gap-4 mb-6">
          {nodeTypes.map(node => (
            <div key={node.type} className="bg-blue-100 text-blue-700 px-3 py-2 rounded shadow cursor-move">
              {node.label}
            </div>
          ))}
        </div>
        <div className="flex-1 border rounded-lg bg-gray-50 p-6 min-h-[300px] flex flex-col items-center justify-center">
          <span className="text-gray-400">Drag nodes here to build your workflow (visual builder coming soon)</span>
        </div>
      </div>
    </div>
  );
};

export default DocumentProcessing;
