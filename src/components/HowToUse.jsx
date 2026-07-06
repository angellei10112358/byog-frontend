import { useState } from 'react';

export default function HowToUse() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-xs text-gray-300 hover:text-white border border-gray-600 hover:border-gray-400 rounded px-2.5 py-1 transition-colors bg-red-500/80"
      >
        How-to-use
      </button>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-3 -right-3 w-7 h-7 flex items-center justify-center rounded-full bg-gray-800 text-white text-sm font-bold hover:bg-gray-600 shadow"
            >
              &times;
            </button>
            <img
              src={`${import.meta.env.BASE_URL}illus.png`}
              alt="How to use"
              className="max-w-full max-h-[85vh] rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
}
