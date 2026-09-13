import { useState } from 'react';
import { checkHealth } from '../api';

const LOCAL_URL_KEY = 'byog_backend_local_url';
const DEFAULT_LOCAL_URL = 'http://127.0.0.1';

const stripSlash = (s) => s?.replace(/\/+$/, '') || '';

function getStoredLocalUrl() {
  return stripSlash(localStorage.getItem(LOCAL_URL_KEY)) || DEFAULT_LOCAL_URL;
}

const BACKENDS = [
  { label: 'Self-host', url: import.meta.env.VITE_BACKEND_SELF_HOST || 'http://localhost:3001' },
  { label: 'Google', url: import.meta.env.VITE_BACKEND_GOOGLE },
  { label: 'Render', url: import.meta.env.VITE_BACKEND_RENDER },
  { label: 'Railway', url: import.meta.env.VITE_BACKEND_RAILWAY },
].filter((b) => b.url);

export default function BackendSelector({ currentUrl, onSwitch }) {
  const [testing, setTesting] = useState(false);
  const [localUrl, setLocalUrl] = useState(getStoredLocalUrl);
  const [editingLocal, setEditingLocal] = useState(false);

  const backends = [...BACKENDS, { label: 'Local', url: localUrl }];

  async function connect(url, label) {
    setTesting(true);
    try {
      await checkHealth(url);
      onSwitch(url, label);
      return true;
    } catch {
      alert(`Backend "${label}" is not responding. Try another.`);
      return false;
    } finally {
      setTesting(false);
    }
  }

  async function handleSelect(e) {
    const label = e.target.value;
    if (label === 'Local') {
      setEditingLocal(true);
      const url = getStoredLocalUrl();
      setLocalUrl(url);
      await connect(url, label);
      return;
    }
    setEditingLocal(false);
    const entry = BACKENDS.find((b) => b.label === label);
    if (!entry) return;
    await connect(entry.url, label);
  }

  async function handleLocalSubmit() {
    const url = stripSlash(localUrl.trim());
    if (!url) return;
    setLocalUrl(url);
    localStorage.setItem(LOCAL_URL_KEY, url);
    await connect(url, 'Local');
  }

  const currentLabel = backends.find((b) => b.url === currentUrl)?.label || backends[0]?.label;
  const showLocalInput = editingLocal || currentLabel === 'Local';

  return (
    <span className="flex flex-col gap-1">
      <span className="flex items-center gap-1">
        <span className="text-gray-300 text-xs">Backend:</span>
        <select
          value={currentLabel}
          onChange={handleSelect}
          disabled={testing}
          className="bg-gray-700 text-gray-200 text-xs rounded px-2 py-1 border border-gray-600 outline-none focus:ring-1 focus:ring-blue-500"
        >
          {backends.map((b) => (
            <option key={b.label} value={b.label}>{b.label}</option>
          ))}
        </select>
      </span>
      {showLocalInput && (
        <span className="flex items-center gap-1">
          <input
            value={localUrl}
            onChange={(e) => setLocalUrl(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleLocalSubmit(); }}
            disabled={testing}
            placeholder={DEFAULT_LOCAL_URL}
            className="bg-gray-700 text-gray-200 text-xs rounded px-2 py-1 border border-gray-600 outline-none focus:ring-1 focus:ring-blue-500 w-48"
          />
          <button
            onClick={handleLocalSubmit}
            disabled={testing}
            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs rounded px-2 py-1"
          >
            {testing ? '...' : 'Go'}
          </button>
        </span>
      )}
    </span>
  );
}