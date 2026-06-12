import { useState } from 'react';
import { checkHealth } from '../api';

const BACKENDS = [
  { label: 'Google', url: import.meta.env.VITE_BACKEND_GOOGLE },
  { label: 'Render', url: import.meta.env.VITE_BACKEND_RENDER },
  { label: 'Railway', url: import.meta.env.VITE_BACKEND_RAILWAY },
].filter((b) => b.url);

export default function BackendSelector({ currentUrl, onSwitch }) {
  const [testing, setTesting] = useState(false);

  async function handleSelect(e) {
    const label = e.target.value;
    const entry = BACKENDS.find((b) => b.label === label);
    if (!entry) return;
    setTesting(true);
    try {
      await checkHealth(entry.url);
      onSwitch(entry.url, label);
    } catch {
      alert(`Backend "${label}" is not responding. Try another.`);
    } finally {
      setTesting(false);
    }
  }

  const currentLabel = BACKENDS.find((b) => b.url === currentUrl)?.label || BACKENDS[0]?.label;

  return (
    <span className="flex items-center gap-1">
      <span className="text-gray-300 text-xs">Backend:</span>
      <select
        value={currentLabel}
        onChange={handleSelect}
        disabled={testing}
        className="bg-gray-700 text-gray-200 text-xs rounded px-2 py-1 border border-gray-600 outline-none focus:ring-1 focus:ring-blue-500"
      >
        {BACKENDS.map((b) => (
          <option key={b.label} value={b.label}>{b.label}</option>
        ))}
      </select>
    </span>
  );
}