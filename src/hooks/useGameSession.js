import { useState, useCallback, useRef } from 'react';
import { createSession, sendMessage } from '../api';

export default function useGameSession() {
  const [sessionId, setSessionId] = useState(null);
  const [versions, setVersions] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedVersionId, setSelectedVersionId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const sessionRef = useRef(null);

  const initSession = useCallback(async () => {
    try {
      const { sessionId: id } = await createSession();
      setSessionId(id);
      sessionRef.current = id;
      return id;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const submitMessage = useCallback(async (text) => {
    setError(null);
    const id = sessionRef.current;
    if (!id) throw new Error('No active session');

    setMessages((prev) => [...prev, { role: 'user', text, id: Date.now() }]);
    setIsLoading(true);

    try {
      const { versionId, html, createdAt } = await sendMessage(id, text);
      const newVersion = { versionId, html, label: text.slice(0, 80), createdAt };
      setVersions((prev) => [...prev, newVersion]);
      setSelectedVersionId(versionId);
      setMessages((prev) => [
        ...prev,
        { role: 'system', text: 'Go check your game!', id: Date.now() + 1 },
      ]);
    } catch (err) {
      setError(err.message);
      setMessages((prev) => [
        ...prev,
        { role: 'system', text: `Error: ${err.message}`, id: Date.now() + 1 },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadPreBuiltGame = useCallback(async (game) => {
    try {
      const res = await fetch(game.file);
      const html = await res.text();
      const versionId = `prebuilt-${game.id}-${Date.now()}`;
      const newVersion = { versionId, html, label: game.label, createdAt: new Date().toISOString() };
      setVersions((prev) => [...prev, newVersion]);
      setSelectedVersionId(versionId);
      setMessages((prev) => [
        ...prev,
        { role: 'user', text: `Show me ${game.label}`, id: Date.now() },
        { role: 'system', text: `Loaded ${game.label}`, id: Date.now() + 1 },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'system', text: `Failed to load ${game.label}`, id: Date.now() },
      ]);
    }
  }, []);

  const currentHtml = versions.find((v) => v.versionId === selectedVersionId)?.html || null;

  return {
    sessionId,
    versions,
    messages,
    selectedVersionId,
    currentHtml,
    isLoading,
    error,
    initSession,
    submitMessage,
    loadPreBuiltGame,
    setSelectedVersionId,
  };
}
