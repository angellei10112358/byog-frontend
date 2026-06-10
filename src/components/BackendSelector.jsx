import { useState } from 'react';
import { checkHealth } from '../api';

const BACKENDS = [
  { label: 'Render', url: 'https://byog-backend.onrender.com' },
  { label: 'Railway', url: '' },
  { label: 'Local', url: 'http://localhost:3001' },
];

export default function BackendSelector({ currentUrl, onSwitch }) {
  const [customUrl, setCustomUrl] = useState('');
  const [testing, setTesting] = useState(false);

  async function handleSelect(label) {
    if (label === 'Custom') return;
    const entry = BACKENDS.find((b) => b.label === label);
    if (!entry || !entry.url) return;
    await switchTo(entry.url, label);
  }

  async function handleCustom() {
    if (!customUrl.trim()) return;
    await switchTo(customUrl.trim(), 'Custom');
  }

  async function switchTo(url, label) {
    setTesting(true);
    try {
      await checkHealth(url);
      onSwitch(url, label);
    } catch {
      alert(`Backend "${label}" is not responding. Check the URL or try another.`);
    } finally {
      setTesting(false);
    }
  }

  const currentLabel = BACKENDS.find((b) => b.url === currentUrl)?.label
    || (currentUrl.includes('railway') ? 'Railway' : 'Custom');

  return (
    <div className="flex items-center gap-2">
      <select
        value={currentLabel}
        onChange={(e) => handleSelect(e.target.value)}
        disabled={testing}
        className="bg-gray-700 text-gray-200 text-xs rounded px-2 py-1 border border-gray-600 outline-none focus:ring-1 focus:ring-blue-500"
      >
        {BACKENDS.filter((b) => b.url).map((b) => (
          <option key={b.label} value={b.label}>{b.label}</option>
        ))}
        {!BACKENDS.find((b) => b.url === currentUrl) && (
          <option value="Custom">Custom</option>
        )}
      </select>
      <input
        type="text"
        value={customUrl}
        onChange={(e) => setCustomUrl(e.target.value)}
        placeholder="https://..."
        className="bg-gray-700 text-gray-200 text-xs rounded px-2 py-1 border border-gray-600 outline-none focus:ring-1 focus:ring-blue-500 w-36"
      />
      <button
        onClick={handleCustom}
        disabled={testing || !customUrl.trim()}
        className="text-xs bg-blue-700 hover:bg-blue-600 disabled:bg-gray-600 text-white px-2 py-1 rounded transition-colors"
      >
        {testing ? '...' : 'Go'}
      </button>
    </div>
  );
}