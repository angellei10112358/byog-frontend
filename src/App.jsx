import { useEffect, useState } from 'react';
import { getApiBase, setApiBase } from './api';
import useGameSession from './hooks/useGameSession';
import ChatPanel from './components/ChatPanel';
import PreviewPanel from './components/PreviewPanel';
import BackendSelector from './components/BackendSelector';

export default function App() {
  const [backendUrl, setBackendUrl] = useState(getApiBase);
  const {
    versions,
    messages,
    selectedVersionId,
    currentHtml,
    isLoading,
    initSession,
    submitMessage,
    switchBackend,
    setSelectedVersionId,
    addContextDivider,
  } = useGameSession();

  useEffect(() => {
    initSession();
  }, [initSession]);

  async function handleSwitchBackend(url, label) {
    setApiBase(url);
    setBackendUrl(url);
    await switchBackend();
  }

  return (
    <div className="h-full w-full flex flex-col bg-gray-900 text-white">
      <div className="bg-yellow-800 text-yellow-200 text-xs text-center py-1 px-4 relative">
        For the best experience, please use <strong>Chrome</strong> instead of Firefox. Some games may not display correctly in Firefox.
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <BackendSelector currentUrl={backendUrl} onSwitch={handleSwitchBackend} />
        </div>
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