import MessageList from './MessageList';
import MessageInput from './MessageInput';
import CaseButtons from './CaseButtons';

export default function ChatPanel({ messages, isLoading, onSend }) {
  return (
    <div className="w-full h-full flex flex-col bg-gray-900">
      <div className="border-b border-gray-700 px-4 py-3">
        <h2 className="text-white font-semibold text-sm">Chat</h2>
      </div>
      <MessageList messages={messages} isLoading={isLoading} />
      <CaseButtons onSend={onSend} />
      <MessageInput onSend={onSend} isLoading={isLoading} />
    </div>
  );
}
