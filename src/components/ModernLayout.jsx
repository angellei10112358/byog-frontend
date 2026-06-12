import { useState, useEffect, useRef, useCallback } from 'react';
import ChatPanel from './ChatPanel';
import PreviewPanel from './PreviewPanel';

const KONAMI = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

const DEFAULT_PANELS = {
  chat: { x: 196, y: 39, w: 514, h: 808 },
  preview: { x: 798, y: 39, w: 1068, h: 808 },
};

export default function ModernLayout({ messages, isLoading, onSend, addContextDivider, versions, selectedVersionId, currentHtml, onSelectVersion }) {
  const [devMode, setDevMode] = useState(false);
  const [panels, setPanels] = useState(DEFAULT_PANELS);
  const keyBuf = useRef([]);
  const containerRef = useRef(null);
  const chatRef = useRef(null);
  const prevRef = useRef(null);
  const drag = useRef(null);

  useEffect(() => {
    if (devMode) return;
    const handler = (e) => {
      keyBuf.current.push(e.keyCode);
      if (keyBuf.current.length > 10) keyBuf.current.shift();
      if (keyBuf.current.length === 10 && keyBuf.current.every((k, i) => k === KONAMI[i])) {
        const c = containerRef.current;
        if (!c) return;
        const cr = c.getBoundingClientRect();
        const snap = (el) => { const r = el.getBoundingClientRect(); return { x: r.left - cr.left, y: r.top - cr.top, w: r.width, h: r.height }; };
        setPanels({ chat: snap(chatRef.current), preview: snap(prevRef.current) });
        setDevMode(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [devMode]);

  const exitDevMode = () => { setDevMode(false); setPanels(DEFAULT_PANELS); };

  const exportLayout = () => {
    const blob = new Blob([JSON.stringify({ chatPanel: panels.chat, previewPanel: panels.preview }, null, 2)], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'layout.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  };

  const startDrag = useCallback((id, e) => {
    if (!devMode || !panels) return;
    e.preventDefault();
    drag.current = { id, type: 'move', ox: e.clientX - panels[id].x, oy: e.clientY - panels[id].y };
  }, [devMode, panels]);

  const startResize = useCallback((id, corner, e) => {
    if (!devMode || !panels) return;
    e.preventDefault();
    e.stopPropagation();
    drag.current = { id, type: 'resize', corner, ox: e.clientX, oy: e.clientY, pw: panels[id].w, ph: panels[id].h, px: panels[id].x, py: panels[id].y };
  }, [devMode, panels]);

  useEffect(() => {
    if (!devMode) return;
    const mm = (e) => {
      const d = drag.current;
      if (!d) return;
      const { id, type, ox, oy, pw, ph, px, py, corner } = d;
      const dx = e.clientX - ox;
      const dy = e.clientY - oy;
      setPanels((prev) => {
        const p = { ...prev[id] };
        if (type === 'move') {
          p.x = e.clientX - ox;
          p.y = e.clientY - oy;
        } else if (type === 'resize') {
          if (corner.includes('e')) p.w = Math.max(200, pw + dx);
          if (corner.includes('s')) p.h = Math.max(100, ph + dy);
          if (corner.includes('w')) { p.w = Math.max(200, pw - dx); p.x = px + dx; }
          if (corner.includes('n')) { p.h = Math.max(100, ph - dy); p.y = py + dy; }
        }
        return { ...prev, [id]: p };
      });
    };
    const mu = () => { drag.current = null; };
    window.addEventListener('mousemove', mm);
    window.addEventListener('mouseup', mu);
    return () => { window.removeEventListener('mousemove', mm); window.removeEventListener('mouseup', mu); };
  }, [devMode]);

  return (
    <div className="flex-1 flex flex-col">
      <div className="text-center pt-8 pb-3 text-white text-2xl font-semibold tracking-wide">
        Build Your Own Games!
      </div>
      <div ref={containerRef} className="flex-1 relative overflow-auto">
        {devMode && (
          <div className="absolute top-2 right-2 z-50 flex gap-2 items-center">
            <button onClick={exportLayout} className="bg-gray-700 hover:bg-gray-600 text-gray-200 text-xs px-3 py-1.5 rounded shadow">Export Layout</button>
            <button onClick={exitDevMode} className="bg-red-700 hover:bg-red-600 text-white text-xs px-3 py-1.5 rounded shadow">Exit Developer Mode</button>
          </div>
        )}
        <div
          ref={chatRef}
          onMouseDown={devMode ? (e) => startDrag('chat', e) : undefined}
          style={{ left: panels.chat.x, top: panels.chat.y, width: panels.chat.w, height: panels.chat.h }}
          className={`${devMode ? 'border-2 border-blue-400/60 cursor-move' : ''} absolute rounded-2xl bg-sky-500/20 overflow-hidden shadow-lg shadow-black/20 modern-chat-bg`}
        >
          <ChatPanel messages={messages} isLoading={isLoading} onSend={onSend} addContextDivider={addContextDivider} />
          {devMode && (
            <>
              <div className="absolute top-0 left-0 w-4 h-4 bg-blue-400/80 rounded-br cursor-nw-resize" onMouseDown={(e) => startResize('chat', 'nw', e)} />
              <div className="absolute top-0 right-0 w-4 h-4 bg-blue-400/80 rounded-bl cursor-ne-resize" onMouseDown={(e) => startResize('chat', 'ne', e)} />
              <div className="absolute bottom-0 left-0 w-4 h-4 bg-blue-400/80 rounded-tr cursor-sw-resize" onMouseDown={(e) => startResize('chat', 'sw', e)} />
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-blue-400/80 rounded-tl cursor-se-resize" onMouseDown={(e) => startResize('chat', 'se', e)} />
            </>
          )}
        </div>
        <div
          ref={prevRef}
          onMouseDown={devMode ? (e) => startDrag('preview', e) : undefined}
          style={{ left: panels.preview.x, top: panels.preview.y, width: panels.preview.w, height: panels.preview.h }}
          className={`${devMode ? 'border-2 border-blue-400/60 cursor-move' : ''} absolute rounded-2xl bg-cyan-300/20 overflow-hidden shadow-lg shadow-black/20 modern-preview-bg`}
        >
          <PreviewPanel versions={versions} selectedVersionId={selectedVersionId} currentHtml={currentHtml} onSelectVersion={onSelectVersion} transparentBg />
          {devMode && (
            <>
              <div className="absolute top-0 left-0 w-4 h-4 bg-blue-400/80 rounded-br cursor-nw-resize" onMouseDown={(e) => startResize('preview', 'nw', e)} />
              <div className="absolute top-0 right-0 w-4 h-4 bg-blue-400/80 rounded-bl cursor-ne-resize" onMouseDown={(e) => startResize('preview', 'ne', e)} />
              <div className="absolute bottom-0 left-0 w-4 h-4 bg-blue-400/80 rounded-tr cursor-sw-resize" onMouseDown={(e) => startResize('preview', 'sw', e)} />
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-blue-400/80 rounded-tl cursor-se-resize" onMouseDown={(e) => startResize('preview', 'se', e)} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
