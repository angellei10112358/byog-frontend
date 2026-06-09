import { preBuiltGames } from '../data/cases';

export default function CaseButtons({ onSelect }) {
  return (
    <div className="overflow-x-auto whitespace-nowrap px-4 py-2 border-b border-gray-700 bg-gray-800">
      <div className="flex gap-2">
        {preBuiltGames.map((game) => (
          <button
            key={game.id}
            onClick={() => onSelect(game)}
            className="flex-shrink-0 bg-gray-700 hover:bg-gray-600 text-gray-200 text-xs px-3 py-1.5 rounded-full transition-colors"
          >
            Build a {game.label}
          </button>
        ))}
      </div>
    </div>
  );
}
