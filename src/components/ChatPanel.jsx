import MessageList from './MessageList';
import MessageInput from './MessageInput';
import CaseButtons from './CaseButtons';

export default function ChatPanel({ messages, isLoading, onSend, addContextDivider }) {
  return (
    <div className="w-full h-full flex flex-col bg-gray-900">
      <div className="border-b border-gray-700 px-4 py-3">
        <h2 className="text-white font-semibold text-sm text-center">Type your idea here</h2>
      </div>
      <MessageList messages={messages} isLoading={isLoading} />
      <CaseButtons onSend={onSend} />
      <div className="px-4 py-1">
        <button
          onClick={addContextDivider}
          className="w-full text-xs text-gray-400 border border-dashed border-gray-600 rounded py-1.5 hover:text-gray-200 hover:border-gray-400 transition-colors"
        >
          Build a New Game!
        </button>
      </div>
      <MessageInput onSend={onSend} isLoading={isLoading} />
    </div>
  );
}
