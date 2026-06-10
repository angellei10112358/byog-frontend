import { useRef, useEffect } from 'react';

const GAMES = ['Tetris', 'Battle City', 'Dragon Quest', 'Minesweeper', 'Sudoku', 'Chinese Chess', 'Bubble Shooter', '2048'];

const PRE_CMD = '$pre-case$';

export default function CaseButtons({ onSend }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let direction = 1;
    const id = setInterval(() => {
      el.scrollLeft += direction;
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth) direction = -1;
      if (el.scrollLeft <= 0) direction = 1;
    }, 30);
    return () => clearInterval(id);
  }, []);

  return (
    <div ref={scrollRef} className="overflow-x-auto whitespace-nowrap px-4 py-2 border-b border-gray-700 bg-gray-800 scroll-smooth">
      <div className="flex gap-2">
        {GAMES.map((name) => (
          <button
            key={name}
            onClick={() => onSend(`${PRE_CMD} ${name}`)}
            className="flex-shrink-0 bg-gray-700 hover:bg-gray-600 text-gray-200 text-xs px-3 py-1.5 rounded-full transition-colors"
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}