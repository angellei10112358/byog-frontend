import { useEffect } from 'react';
import useGameSession from './hooks/useGameSession';
import ChatPanel from './components/ChatPanel';
import PreviewPanel from './components/PreviewPanel';

export default function App() {
  const {
    versions,
    messages,
    selectedVersionId,
    currentHtml,
    isLoading,
    initSession,
    submitMessage,
    setSelectedVersionId,
    addContextDivider,
  } = useGameSession();

  useEffect(() => {
    initSession();
  }, [initSession]);

  return (
    <div className="h-full w-full flex flex-col bg-gray-900 text-white">
      <div className="bg-yellow-800 text-yellow-200 text-xs text-center py-1 px-4">
        For the best experience, please use <strong>Chrome</strong> instead of Firefox. Some games may not display correctly in Firefox.
      </div>
      <div className="flex-1 flex overflow-hidden">
      <div className="w-[400px] min-w-[320px] border-r border-gray-700">
        <ChatPanel messages={messages} isLoading={isLoading} onSend={submitMessage} addContextDivider={addContextDivider} />
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
    </div>
  );
}