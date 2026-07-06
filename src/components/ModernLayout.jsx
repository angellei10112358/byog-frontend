import { useState, useEffect, useRef, useCallback } from 'react';
import ChatPanel from './ChatPanel';
import PreviewPanel from './PreviewPanel';
import HowToUse from './HowToUse';

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

  const previewRef = useRef(null);
  const [previewHeight, setPreviewHeight] = useState(null);

  const updatePreviewHeight = useCallback(() => {
    if (!previewRef.current) return;
    const h = previewRef.current.offsetHeight;
    if (h > 0) setPreviewHeight(h);
  }, []);

  useEffect(() => {
    if (!currentHtml || !previewRef.current) { setPreviewHeight(null); return; }
    if (!previewRef.current) return;
    const ro = new ResizeObserver(() => updatePreviewHeight());
    ro.observe(previewRef.current);
    const timer = setTimeout(updatePreviewHeight, 500);
    return () => { ro.disconnect(); clearTimeout(timer); };
  }, [currentHtml, updatePreviewHeight]);

  const isEmpty = !currentHtml;

  if (isMobile) {
    return (
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="text-center pt-3 pb-2 text-lg tracking-wide title-art">
          Build Your Own Games!
        </div>
        <div className="px-1 flex items-center justify-between gap-2 mb-1">
          <span />
          <HowToUse />
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
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="text-center pt-8 pb-3 text-2xl tracking-wide title-art">
        Build Your Own Games!
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className={`flex gap-4 p-4 xl:gap-8 xl:p-8 ${isEmpty ? 'items-stretch' : 'items-start'}`} style={{ minHeight: '100%' }}>
          <div className={`w-[30%] min-w-[260px] max-w-[420px] rounded-2xl bg-sky-500/20 overflow-hidden shadow-lg shadow-black/20 modern-chat-bg ${devMode ? 'ring-2 ring-blue-400/60' : ''}`}
               style={isEmpty ? {} : (previewHeight ? { height: previewHeight + 'px' } : {})}>
            <div className="flex items-center justify-end px-3 pt-2 pb-0">
              <HowToUse />
            </div>
            <ChatPanel messages={messages} isLoading={isLoading} onSend={onSend} addContextDivider={addContextDivider} />
          </div>
          <div ref={previewRef} className={`flex-1 rounded-2xl bg-cyan-300/20 overflow-hidden shadow-lg shadow-black/20 modern-preview-bg ${devMode ? 'ring-2 ring-blue-400/60' : ''}`}>
            <PreviewPanel versions={versions} selectedVersionId={selectedVersionId} currentHtml={currentHtml} onSelectVersion={onSelectVersion} transparentBg detectHeight={!isEmpty} />
          </div>
        </div>
      </div>
      {devMode && (
        <div className="fixed top-2 right-2 z-50">
          <button onClick={() => setDevMode(false)} className="bg-red-700 hover:bg-red-600 text-white text-xs px-3 py-1.5 rounded shadow">Exit Developer Mode</button>
        </div>
      )}
    </div>
  );
}
