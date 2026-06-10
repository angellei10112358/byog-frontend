import { useState, useCallback, useRef } from 'react';
import { createSession, sendMessage } from '../api';

export default function useGameSession() {
  const [sessionId, setSessionId] = useState(null);
  const [versions, setVersions] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedVersionId, setSelectedVersionId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newGameMode, setNewGameMode] = useState(false);
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

  const addContextDivider = useCallback(() => {
    setMessages((prev) => [...prev, { role: 'divider', id: Date.now() }]);
    setNewGameMode(true);
  }, []);

  const submitMessage = useCallback(async (text) => {
    setError(null);
    const id = sessionRef.current;
    if (!id) throw new Error('No active session');

    const prevHtml = !newGameMode ? versions[versions.length - 1]?.html : null;

    setMessages((prev) => [...prev, { role: 'user', text, id: Date.now() }]);
    setIsLoading(true);
    setNewGameMode(false);

    try {
      const res = await sendMessage(id, text, prevHtml);
      const versionId = res.prebuilt ? `prebuilt-${res.versionId}` : res.versionId;
      const newVersion = { versionId, html: res.html, label: text.slice(0, 80), createdAt: res.createdAt };
      setVersions((prev) => [...prev, newVersion]);
      setSelectedVersionId(versionId);
      setTimeout(() => document.querySelector('iframe')?.focus(), 100);
      setMessages((prev) => [
        ...prev,
        { role: 'system', text: 'Go check your game!', id: Date.now() + 1 },
      ]);
    } catch (err) {
      setError(err.message);
      setMessages((prev) => [
        ...prev,
        { role: 'system', text: `Error: ${err.message}. If the request times out, try a simpler description or upgrade to a paid Render plan for longer timeout support.`, id: Date.now() + 1 },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [newGameMode, versions]);

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
    setSelectedVersionId,
    setNewGameMode,
    addContextDivider,
  };
}