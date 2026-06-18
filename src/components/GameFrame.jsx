import { useRef, useState, useEffect, useCallback } from 'react';
import injectTransparentBg from '../utils/injectTransparentBg';

export default function GameFrame({ html, transparentBg, detectHeight }) {
  const iframeRef = useRef(null);
  const [gameHeight, setGameHeight] = useState(null);

  const updateHeight = useCallback(() => {
    if (!detectHeight) return;
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;
    try {
      const doc = iframe.contentWindow.document;
      const h = doc.documentElement.scrollHeight;
      if (h > 0) setGameHeight(h);
    } catch (_) {}
  }, [detectHeight]);

  useEffect(() => {
    if (!detectHeight || !html) { setGameHeight(null); return; }
    const timer = setTimeout(updateHeight, 300);
    return () => clearTimeout(timer);
  }, [html, detectHeight, updateHeight]);

  if (!html) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 text-sm placeholder-prompt">
        Generate a game to see it here
      </div>
    );
  }

  const srcdoc = transparentBg ? injectTransparentBg(html) : html;

  if (detectHeight) {
    return (
      <div className="bg-white" style={{ minHeight: '400px' }}>
        <iframe
          ref={iframeRef}
          srcDoc={srcdoc}
          onLoad={updateHeight}
          sandbox="allow-scripts allow-same-origin"
          className="w-full border-0"
          style={{ height: gameHeight ? gameHeight + 'px' : '400px' }}
          title="game-preview"
        />
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white">
      <iframe
        srcDoc={srcdoc}
        sandbox="allow-scripts allow-same-origin"
        className="w-full h-full border-0"
        title="game-preview"
      />
    </div>
  );
}
