import { useRef, useEffect } from 'react';

const GAMES = ['Tetris', 'Battle City', 'Dragon Quest', 'Minesweeper', 'Sudoku', 'Chinese Chess', 'Bubble Shooter', '2048'];

const PRE_CMD = '$pre-case$';

export default function CaseButtons({ onSend }) {
  const scrollRef = useRef(null);
  const dirRef = useRef(1);
  const pauseRef = useRef(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const isMobile = window.innerWidth < 768;
    if (isMobile && el.scrollWidth <= el.clientWidth) return;

    const speed = isMobile ? 2 : 1;
    const pauseFrames = isMobile ? 40 : 0;
    const tick = () => {
      if (pauseRef.current > 0) { pauseRef.current--; return; }
      el.scrollLeft += dirRef.current * speed;
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth) {
        dirRef.current = -1;
        pauseRef.current = pauseFrames;
      }
      if (el.scrollLeft <= 0) {
        dirRef.current = 1;
        pauseRef.current = pauseFrames;
      }
    };

    timerRef.current = setInterval(tick, 30);
    const cancel = () => { if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; } };

    if (!isMobile) return cancel;

    const start = () => { dirRef.current = 1; pauseRef.current = 0; timerRef.current = setInterval(tick, 30); };
    const onTouch = () => { cancel(); };
    const onEnd = () => { if (!timerRef.current) start(); };
    el.addEventListener('touchstart', onTouch, { passive: true });
    el.addEventListener('touchend', onEnd, { passive: true });
    return () => {
      cancel();
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