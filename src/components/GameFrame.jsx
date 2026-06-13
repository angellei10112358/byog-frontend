export default function GameFrame({ html, transparentBg }) {
  if (!html) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 text-sm placeholder-prompt">
        Generate a game to see it here
      </div>
    );
  }

  function injectTransparentBg(h) {
    const style = '<style>body { background: transparent !important; }</style>';
    if (h.includes('</head>')) return h.replace('</head>', style + '</head>');
    if (h.includes('</body>')) return h.replace('</body>', style + '</body>');
    if (h.includes('</html>')) return h.replace('</html>', style + '</html>');
    return h + style;
  }

  const srcdoc = transparentBg ? injectTransparentBg(html) : html;

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