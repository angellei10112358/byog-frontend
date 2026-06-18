import injectTransparentBg from '../utils/injectTransparentBg';

export default function GameFrame({ html, transparentBg }) {
  if (!html) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 text-sm placeholder-prompt">
        Generate a game to see it here
      </div>
    );
  }

  const srcdoc = injectTransparentBg(html, transparentBg);

  return (
    <div className="flex-1 bg-white flex overflow-hidden">
      <iframe
        srcDoc={srcdoc}
        sandbox="allow-scripts allow-same-origin"
        className="flex-1 w-full border-0"
        title="game-preview"
      />
    </div>
  );
}