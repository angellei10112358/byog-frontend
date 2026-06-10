const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3001';
const API_KEY = import.meta.env.VITE_API_KEY || '';

async function request(url, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (API_KEY) headers['Authorization'] = `Bearer ${API_KEY}`;
  const res = await fetch(url, { ...options, headers });
  const data = await res.json();
  if (!res.ok || data.error) throw new Error(data.error || 'Request failed');
  return data;
}

export async function createSession() {
  return request(`${BASE}/api/sessions`, { method: 'POST' });
}

export async function sendMessage(sessionId, message, previousGameHtml) {
  const body = { message };
  if (previousGameHtml) body.previousGameHtml = previousGameHtml;
  return request(`${BASE}/api/sessions/${sessionId}/messages`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function checkHealth() {
  return request(`${BASE}/api/health`);
}
