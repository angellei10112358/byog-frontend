import { useState, useEffect, useRef } from 'react';
import ChatPanel from './ChatPanel';
import PreviewPanel from './PreviewPanel';

const KONAMI = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

function useIsMobile() {
  const [mobile, setMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return mobile;
}

export default function ModernLayout({ messages, isLoading, onSend, addContextDivider, versions, selectedVersionId, currentHtml, onSelectVersion }) {
  const isMobile = useIsMobile();
  const [devMode, setDevMode] = useState(false);
  const keyBuf = useRef([]);

  useEffect(() => {
    if (devMode) return;
    const handler = (e) => {
      keyBuf.current.push(e.keyCode);
      if (keyBuf.current.length > 10) keyBuf.current.shift();
      if (keyBuf.current.length === 10 && keyBuf.current.every((k, i) => k === KONAMI[i])) {
        setDevMode(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [devMode]);

  if (isMobile) {
    return (
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="text-center pt-3 pb-2 text-lg tracking-wide title-art">
          Build Your Own Games!
        </div>
        <div className="px-1">
          <div className="rounded-2xl bg-sky-500/20 overflow-hidden shadow-lg shadow-black/20 modern-chat-bg mobile-chat">
            <ChatPanel messages={messages} isLoading={isLoading} onSend={onSend} addContextDivider={addContextDivider} />
          </div>
        </div>
        <div className="px-1 pb-1 flex flex-col" style={{ minHeight: '100vh' }}>
          <div className="flex-1 rounded-2xl bg-cyan-300/20 overflow-hidden shadow-lg shadow-black/20 modern-preview-bg">
            <PreviewPanel versions={versions} selectedVersionId={selectedVersionId} currentHtml={currentHtml} onSelectVersion={onSelectVersion} transparentBg />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="text-center pt-8 pb-3 text-2xl tracking-wide title-art">
        Build Your Own Games!
      </div>
      <div className="flex-1 flex gap-4 p-4 xl:gap-8 xl:p-8 overflow-hidden">
        <div className={`w-[30%] min-w-[260px] max-w-[420px] rounded-2xl bg-sky-500/20 overflow-hidden shadow-lg shadow-black/20 modern-chat-bg ${devMode ? 'ring-2 ring-blue-400/60' : ''}`}>
          <ChatPanel messages={messages} isLoading={isLoading} onSend={onSend} addContextDivider={addContextDivider} />
        </div>
        <div className={`flex-1 rounded-2xl bg-cyan-300/20 overflow-hidden shadow-lg shadow-black/20 modern-preview-bg ${currentHtml && !devMode ? 'bg-cyan-300/20' : ''} ${devMode ? 'ring-2 ring-blue-400/60' : ''}`}>
          <PreviewPanel versions={versions} selectedVersionId={selectedVersionId} currentHtml={currentHtml} onSelectVersion={onSelectVersion} transparentBg />
        </div>
      </div>
      {devMode && (
        <div className="fixed top-2 right-2 z-50 flex gap-2 items-center">
          <button onClick={() => setDevMode(false)} className="bg-red-700 hover:bg-red-600 text-white text-xs px-3 py-1.5 rounded shadow">Exit Developer Mode</button>
        </div>
      )}
    </div>
  );
}
