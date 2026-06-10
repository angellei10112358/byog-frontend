const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3001';

export async function createSession() {
  const res = await fetch(`${BASE}/api/sessions`, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to create session');
  return res.json();
}

export async function sendMessage(sessionId, message, previousGameHtml) {
  const body = { message };
  if (previousGameHtml) body.previousGameHtml = previousGameHtml;
  const res = await fetch(`${BASE}/api/sessions/${sessionId}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok || data.error) throw new Error(data.error || 'Request failed');
  return data;
}

export async function checkHealth() {
  const res = await fetch(`${BASE}/api/health`);
  return res.json();
}
