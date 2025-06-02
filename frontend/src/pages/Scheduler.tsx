import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';

interface ScheduledTask {
  id: string;
  type: 'email' | 'cron' | 'agent';
  description: string;
  status: 'active' | 'paused' | 'stopped';
  nextRun: Date;
}

const SchedulerPage: React.FC = () => {
  const [tasks, setTasks] = useState<ScheduledTask[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState<'email' | 'cron' | 'agent'>('email');
  const [form, setForm] = useState<any>({});

  // Replace all dummy state logic with real API calls
  useEffect(() => {
    // Fetch tasks from backend on mount
    fetch('/api/scheduler/tasks')
      .then(res => res.json())
      .then(setTasks)
      .catch(() => setTasks([]));
  }, []);

  const handleAddTask = async () => {
    const payload = {
      type: formType,
      description: form.description,
      to: form.to,
      subject: form.subject,
      body: form.body,
      date: form.date,
      interval: form.interval,
      condition: form.condition,
      actionDesc: form.actionDesc,
    };
    const res = await fetch('/api/scheduler/task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      const newTask = await res.json();
      setTasks([...tasks, newTask]);
      setShowForm(false);
      setForm({});
    }
  };

  const handlePause = async (id: string) => {
    await fetch(`/api/scheduler/task/${id}/pause`, { method: 'POST' });
    setTasks(tasks => tasks.map(t => t.id === id ? { ...t, status: t.status === 'paused' ? 'active' : 'paused' } : t));
  };
  const handleStop = async (id: string) => {
    await fetch(`/api/scheduler/task/${id}`, { method: 'DELETE' });
    setTasks(tasks => tasks.filter(t => t.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Task Scheduler</h1>
      <Button className="mb-4" onClick={() => setShowForm(true)}>+ New Task</Button>
      {showForm && (
        <div className="mb-8 p-4 border rounded bg-white">
          <div className="mb-2">
            <Label>Type</Label>
            <select value={formType} onChange={e => setFormType(e.target.value as any)} className="block w-full mt-1">
              <option value="email">Email</option>
              <option value="cron">Cronjob</option>
              <option value="agent">Agent Event</option>
            </select>
          </div>
          <div className="mb-2">
            <Label>Description</Label>
            <Input value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} />
          </div>
          {formType === 'email' && (
            <>
              <div className="mb-2">
                <Label>To</Label>
                <Input value={form.to || ''} onChange={e => setForm({ ...form, to: e.target.value })} />
              </div>
              <div className="mb-2">
                <Label>Subject</Label>
                <Input value={form.subject || ''} onChange={e => setForm({ ...form, subject: e.target.value })} />
              </div>
              <div className="mb-2">
                <Label>Body</Label>
                <Textarea value={form.body || ''} onChange={e => setForm({ ...form, body: e.target.value })} />
              </div>
              <div className="mb-2">
                <Label>Date/Time</Label>
                <Input type="datetime-local" value={form.date || ''} onChange={e => setForm({ ...form, date: e.target.value })} />
              </div>
            </>
          )}
          {formType === 'cron' && (
            <>
              <div className="mb-2">
                <Label>Interval (seconds)</Label>
                <Input type="number" value={form.interval || ''} onChange={e => setForm({ ...form, interval: e.target.value })} />
              </div>
              <div className="mb-2">
                <Label>Action Description</Label>
                <Input value={form.actionDesc || ''} onChange={e => setForm({ ...form, actionDesc: e.target.value })} />
              </div>
            </>
          )}
          {formType === 'agent' && (
            <>
              <div className="mb-2">
                <Label>Semantic Condition</Label>
                <Input value={form.condition || ''} onChange={e => setForm({ ...form, condition: e.target.value })} />
              </div>
              <div className="mb-2">
                <Label>Interval (seconds)</Label>
                <Input type="number" value={form.interval || ''} onChange={e => setForm({ ...form, interval: e.target.value })} />
              </div>
              <div className="mb-2">
                <Label>Action Description</Label>
                <Input value={form.actionDesc || ''} onChange={e => setForm({ ...form, actionDesc: e.target.value })} />
              </div>
            </>
          )}
          <div className="flex gap-2 mt-4">
            <Button onClick={handleAddTask}>Save</Button>
            <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </div>
      )}
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Scheduled Tasks</h2>
        <ul>
          {tasks.map(task => (
            <li key={task.id} className="flex items-center justify-between border-b py-2">
              <div>
                <span className="font-medium">[{task.type}]</span> {task.description} <span className="text-xs text-gray-500">(Next: {task.nextRun.toLocaleString ? task.nextRun.toLocaleString() : String(task.nextRun)})</span>
                <span className={`ml-2 text-xs ${task.status === 'active' ? 'text-green-600' : 'text-yellow-600'}`}>{task.status}</span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handlePause(task.id)}>{task.status === 'paused' ? 'Resume' : 'Pause'}</Button>
                <Button size="sm" variant="destructive" onClick={() => handleStop(task.id)}>Stop</Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white rounded shadow p-4 mt-8">
        <h2 className="text-lg font-semibold mb-4">Audit Trail</h2>
        <p className="text-gray-500">(Coming soon: All actions and agent events will be logged here.)</p>
      </div>
    </div>
  );
};

export default SchedulerPage;
