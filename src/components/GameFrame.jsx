import { useRef, useEffect, useState } from 'react';

export default function GameFrame({ html, isPreBuilt }) {
  const urlRef = useRef(null);
  const [src, setSrc] = useState(null);

  useEffect(() => {
    if (urlRef.current) {
      URL.revokeObjectURL(urlRef.current);
      urlRef.current = null;
    }
    if (html) {
      const blob = new Blob([html], { type: 'text/html' });
      urlRef.current = URL.createObjectURL(blob);
      setSrc(urlRef.current);
    }
  }, [html]);

  useEffect(() => {
    return () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    };
  }, []);

  if (!html) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
        Generate a game to see it here
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white">
      <iframe
        src={src}
        sandbox={isPreBuilt ? 'allow-scripts allow-same-origin' : 'allow-scripts'}
        className="w-full h-full border-0"
        title="game-preview"
      />
    </div>
  );
}
