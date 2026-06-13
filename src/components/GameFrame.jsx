export default function GameFrame({ html, transparentBg }) {
  if (!html) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 text-sm placeholder-prompt">
        Generate a game to see it here
      </div>
    );
  }

  const srcdoc = transparentBg
    ? html.replace('</head>', '<style>body { background: transparent !important; }</style></head>')
    : html;

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