import { useRef, useEffect, useState } from 'react';

function BlobFrame({ html }) {
  const iframeRef = useRef(null);
  const [blobUrl, setBlobUrl] = useState(null);

  useEffect(() => {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    setBlobUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [html]);

  return (
    <iframe
      ref={iframeRef}
      src={blobUrl || undefined}
      sandbox="allow-scripts"
      className="w-full h-full border-0"
      title="game-preview"
    />
  );
}

function SrcdocFrame({ html }) {
  return (
    <iframe
      srcDoc={html}
      sandbox="allow-scripts"
      className="w-full h-full border-0"
      title="game-preview"
    />
  );
}

export default function GameFrame({ html, isPreBuilt }) {
  if (!html) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
        Generate a game to see it here
      </div>
    );
  }

  return isPreBuilt ? <BlobFrame html={html} /> : <SrcdocFrame html={html} />;
}