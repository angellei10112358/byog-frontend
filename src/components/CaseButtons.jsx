import { useRef, useEffect } from 'react';

const GAMES = ['Tetris', 'Battle City', 'Dragon Quest', 'Minesweeper', 'Sudoku', 'Chinese Chess', 'Bubble Shooter', '2048'];

const PRE_CMD = '$pre-case$';

export default function CaseButtons({ onSend }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const isMobile = window.innerWidth < 768;
    if (isMobile && el.scrollWidth <= el.clientWidth) return;

    const speed = isMobile ? 2 : 1;
    const pauseFrames = isMobile ? 40 : 0;
    let dir = 1, pause = 0, active = true;

    function tick() {
      if (!active) return;
      if (pause > 0) { pause--; requestAnimationFrame(tick); return; }
      el.scrollLeft += dir * speed;
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth) { dir = -1; pause = pauseFrames; }
      if (el.scrollLeft <= 0) { dir = 1; pause = pauseFrames; }
      requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);

    if (!isMobile) return () => { active = false; };

    function onTouch() { active = false; }
    function onEnd() { active = true; dir = 1; pause = 0; requestAnimationFrame(tick); }
    el.addEventListener('touchstart', onTouch, { passive: true });
    el.addEventListener('touchend', onEnd, { passive: true });
    return () => {
      active = false;
      el.removeEventListener('touchstart', onTouch);
      el.removeEventListener('touchend', onEnd);
    };
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
