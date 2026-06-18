import Toolbar from './Toolbar';
import GameFrame from './GameFrame';
import injectTransparentBg from '../utils/injectTransparentBg';

export default function PreviewPanel({ versions, selectedVersionId, currentHtml, onSelectVersion, transparentBg, detectHeight }) {
  const currentVersion = versions.find((v) => v.versionId === selectedVersionId);
  const isPreBuilt = currentVersion?.versionId?.startsWith('prebuilt-') ?? false;

  function handleRerun() {
    const iframe = document.querySelector('iframe');
    if (iframe && currentHtml) {
      iframe.srcdoc = transparentBg ? injectTransparentBg(currentHtml) : currentHtml;
    }
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
    <div className="w-full flex flex-col bg-gray-900" style={detectHeight ? {} : { height: '100%' }}>
      <Toolbar
        versions={versions}
        selectedVersionId={selectedVersionId}
        onSelectVersion={onSelectVersion}
        onRerun={handleRerun}
        onDownload={handleDownload}
      />
      <GameFrame html={currentHtml} transparentBg={transparentBg} detectHeight={detectHeight} />
    </div>
  );
}
