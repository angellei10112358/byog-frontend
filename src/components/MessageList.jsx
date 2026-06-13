import { useState, useEffect } from 'react';
import { facts } from '../data/facts';

export default function MessageList({ messages, isLoading }) {
  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    if (!isLoading) return;
    setFactIndex(Math.floor(Math.random() * facts.length));
    const interval = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % facts.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {messages.length === 0 && !isLoading && (
        <p className="text-gray-400 text-sm text-center mt-20 placeholder-prompt">
          Describe the game you want to build
        </p>
      )}
      {messages.map((msg) => (
        msg.role === 'divider' ? (
          <div key={msg.id} className="flex items-center gap-2 text-gray-500 text-xs py-2">
            <span className="flex-1 border-t border-gray-600" />
            <span className="flex-shrink-0 px-2">Above context clear</span>
            <span className="flex-1 border-t border-gray-600" />
          </div>
        ) : (
          <div
            key={msg.id}
            className={`p-3 rounded-lg text-sm leading-relaxed whitespace-pre-wrap ${
              msg.role === 'user'
                ? 'bg-blue-600 text-white ml-8'
                : 'bg-gray-700 text-gray-200 mr-8'
            }`}
          >
            {msg.text}
          </div>
        )
      ))}
      {isLoading && (
        <div className="bg-gray-700 text-gray-200 mr-8 p-3 rounded-lg text-sm">
          <p className="text-gray-400 font-medium mb-1">Generating your game...</p>
          <p className="italic">Did you know... {facts[factIndex]}</p>
        </div>
      )}
    </div>
  );
}
