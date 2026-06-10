export default function GameFrame({ html }) {
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
        srcDoc={html}
        sandbox="allow-scripts"
        className="w-full h-full border-0"
        title="game-preview"
      />
    </div>
  );
}