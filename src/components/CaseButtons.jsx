import { useRef, useEffect } from 'react';

const GAMES = ['Tetris', 'Battle City', 'Dragon Quest', 'Minesweeper', 'Sudoku', 'Chinese Chess', 'Bubble Shooter', '2048'];

const PRE_CMD = '$pre-case$';

export default function CaseButtons({ onSend }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) return;

    let dir = 1, active = true;

    const id = setInterval(() => {
      if (!active) return;
      el.scrollLeft += dir;
      if (el.scrollLeft >= maxScroll) dir = -1;
      if (el.scrollLeft <= 0) dir = 1;
    }, 30);

    return () => { active = false; clearInterval(id); };
  }, []);

  return (
    <div ref={scrollRef} className="overflow-x-auto whitespace-nowrap px-4 py-2 border-b border-gray-700 bg-gray-800">
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
