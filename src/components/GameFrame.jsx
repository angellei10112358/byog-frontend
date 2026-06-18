import { useRef, useState, useEffect, useCallback } from 'react';
import injectTransparentBg, { injectGameFitCss } from '../utils/injectTransparentBg';

export default function GameFrame({ html, transparentBg, fitContent }) {
  const iframeRef = useRef(null);
  const [gameHeight, setGameHeight] = useState(null);

  const updateHeight = useCallback(() => {
    if (!fitContent) return;
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;
    try {
      const doc = iframe.contentWindow.document;
      const h = doc.documentElement.scrollHeight;
      if (h > 0) setGameHeight(h);
    } catch (_) {}
  }, [fitContent]);

  useEffect(() => {
    if (!fitContent || !html) return;
    setGameHeight(null);
    const timer = setTimeout(updateHeight, 300);
    return () => clearTimeout(timer);
  }, [html, fitContent, updateHeight]);

  if (!html) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 text-sm placeholder-prompt">
        Generate a game to see it here
      </div>
    );
  }

  const srcdoc = fitContent
    ? injectGameFitCss(html)
    : (transparentBg ? injectTransparentBg(html) : html);

  if (fitContent) {
    return (
      <div className="bg-white" style={{ minHeight: gameHeight ? undefined : '400px' }}>
        <iframe
          ref={iframeRef}
          srcDoc={srcdoc}
          onLoad={updateHeight}
          sandbox="allow-scripts allow-same-origin"
          className="w-full border-0"
          style={{ height: gameHeight ? gameHeight + 'px' : '100%' }}
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
