import { useEffect } from 'react';
import useGameSession from './hooks/useGameSession';
import ChatPanel from './components/ChatPanel';
import PreviewPanel from './components/PreviewPanel';

export default function App() {
  const {
    sessionId,
    versions,
    messages,
    selectedVersionId,
    currentHtml,
    isLoading,
    initSession,
    submitMessage,
    loadPreBuiltGame,
    setSelectedVersionId,
  } = useGameSession();

  useEffect(() => {
    initSession();
  }, [initSession]);

  return (
    <div className="h-full w-full flex bg-gray-900 text-white">
      <div className="w-[400px] min-w-[320px] border-r border-gray-700">
        <ChatPanel messages={messages} isLoading={isLoading} onSend={submitMessage} onSelectPreBuilt={loadPreBuiltGame} />
      </div>
      <div className="flex-1">
        <PreviewPanel
          versions={versions}
          selectedVersionId={selectedVersionId}
          currentHtml={currentHtml}
          onSelectVersion={setSelectedVersionId}
        />
      </div>
    </div>
  );
}
