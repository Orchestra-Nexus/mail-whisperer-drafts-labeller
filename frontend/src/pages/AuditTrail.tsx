import React, { useEffect, useState } from 'react';

interface AuditTrail {
  id: number;
  email_id: number;
  action: string;
  user: string;
  timestamp: string;
}

const AuditTrailPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditTrail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/audit')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch audit logs');
        return res.json();
      })
      .then(setLogs)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Audit Trail</h1>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-2 py-1 border">ID</th>
                <th className="px-2 py-1 border">Email ID</th>
                <th className="px-2 py-1 border">Action</th>
                <th className="px-2 py-1 border">User</th>
                <th className="px-2 py-1 border">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id}>
                  <td className="px-2 py-1 border">{log.id}</td>
                  <td className="px-2 py-1 border">{log.email_id}</td>
                  <td className="px-2 py-1 border">{log.action}</td>
                  <td className="px-2 py-1 border">{log.user}</td>
                  <td className="px-2 py-1 border">{new Date(log.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AuditTrailPage;
