import injectTransparentBg from '../utils/injectTransparentBg';

export default function GameFrame({ html, transparentBg }) {
  if (!html) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 text-sm placeholder-prompt">
        Generate a game to see it here
      </div>
    );
  }

  const srcdoc = transparentBg ? injectTransparentBg(html) : html;

  return (
    <div className="flex-1 bg-white flex items-center justify-center overflow-hidden">
      <div className="max-w-full max-h-full" style={{ aspectRatio: '16/10' }}>
        <iframe
          srcDoc={srcdoc}
          sandbox="allow-scripts allow-same-origin"
          className="w-full h-full border-0"
          title="game-preview"
        />
      </div>
    </div>
  );
}