export default function MessageList({ messages, isLoading }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {messages.length === 0 && !isLoading && (
        <p className="text-gray-400 text-sm text-center mt-20">
          Describe the game you want to build
        </p>
      )}
      {messages.map((msg) => (
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
      ))}
      {isLoading && (
        <div className="bg-gray-700 text-gray-200 mr-8 p-3 rounded-lg text-sm animate-pulse">
          Generating game...
        </div>
      )}
    </div>
  );
}
