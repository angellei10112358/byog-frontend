import { useRef, useEffect } from 'react';

const GAMES = ['Tetris', 'Battle City', 'Dragon Quest', 'Minesweeper', 'Sudoku', 'Chinese Chess', 'Bubble Shooter', '2048'];

const PRE_CMD = '$pre-case$';

export default function CaseButtons({ onSend }) {
  const scrollRef = useRef(null);
  const timerRef = useRef(null);

  function startScroll(el, isMobile) {
    if (isMobile && el.scrollWidth <= el.clientWidth) return;
    let direction = 1;
    let pause = 0;
    const speed = isMobile ? 2 : 1;
    const pauseFrames = isMobile ? 40 : 0;
    timerRef.current = setInterval(() => {
      if (pause > 0) { pause--; return; }
      el.scrollLeft += direction * speed;
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth) { direction = -1; pause = pauseFrames; }
      if (el.scrollLeft <= 0) { direction = 1; pause = pauseFrames; }
    }, 30);
  }

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const isMobile = window.innerWidth < 768;
    startScroll(el, isMobile);

    if (!isMobile) return;
    const onTouch = () => {
      if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    };
    const onEnd = () => {
      if (!timerRef.current) startScroll(el, true);
    };
    el.addEventListener('touchstart', onTouch, { passive: true });
    el.addEventListener('touchend', onEnd, { passive: true });
    return () => {
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