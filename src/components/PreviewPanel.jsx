import { useState } from 'react';
import Toolbar from './Toolbar';
import GameFrame from './GameFrame';

export default function PreviewPanel({ versions, selectedVersionId, currentHtml, onSelectVersion }) {
  const [rerunKey, setRerunKey] = useState(0);
  const currentVersion = versions.find((v) => v.versionId === selectedVersionId);
  const isPreBuilt = currentVersion?.versionId?.startsWith('prebuilt-') ?? false;

  function handleRerun() {
    setRerunKey((k) => k + 1);
  }

  function handleDownload() {
    if (!currentHtml) return;
    const blob = new Blob([currentHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'game.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="w-full h-full flex flex-col bg-gray-900">
      <Toolbar
        versions={versions}
        selectedVersionId={selectedVersionId}
        onSelectVersion={onSelectVersion}
        onRerun={handleRerun}
        onDownload={handleDownload}
      />
      <GameFrame key={rerunKey} html={currentHtml} isPreBuilt={isPreBuilt} />
    </div>
  );
}
