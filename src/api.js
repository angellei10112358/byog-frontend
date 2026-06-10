const DEFAULT_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3001';
const API_KEY = import.meta.env.VITE_API_KEY || '';

let currentBase = localStorage.getItem('byog_backend_url') || DEFAULT_BASE;

export function getApiBase() {
  return currentBase;
}

export function setApiBase(url) {
  currentBase = url;
  localStorage.setItem('byog_backend_url', url);
}

export async function checkHealth(base) {
  const res = await fetch(`${base || currentBase}/api/health`);
  return res.json();
}

async function request(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (API_KEY) headers['Authorization'] = `Bearer ${API_KEY}`;
  const res = await fetch(`${currentBase}${path}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok || data.error) throw new Error(data.error || 'Request failed');
  return data;
}

export async function createSession() {
  return request('/api/sessions', { method: 'POST' });
}

export async function sendMessage(sessionId, message, previousGameHtml) {
  const body = { message };
  if (previousGameHtml) body.previousGameHtml = previousGameHtml;
  return request(`/api/sessions/${sessionId}/messages`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}
