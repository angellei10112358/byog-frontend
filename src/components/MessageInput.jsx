import { useState } from 'react';

export default function MessageInput({ onSend, isLoading }) {
  const [text, setText] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim() || isLoading) return;
    onSend(text.trim());
    setText('');
  }

  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-600 p-4 flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={isLoading ? 'Working...' : 'Describe your game or request a fix'}
        disabled={isLoading}
        className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={isLoading || !text.trim()}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
      >
        Send
      </button>
    </form>
  );
}
