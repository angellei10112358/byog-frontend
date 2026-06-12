import ChatPanel from './ChatPanel';
import PreviewPanel from './PreviewPanel';

export default function ModernLayout({ messages, isLoading, onSend, addContextDivider, versions, selectedVersionId, currentHtml, onSelectVersion }) {
  return (
    <div className="flex-1 flex items-start justify-center gap-6 p-6 overflow-auto">
      <div className="w-[420px] min-w-[320px] rounded-2xl border border-gray-500/30 bg-gray-800 overflow-hidden shadow-lg shadow-black/20">
        <ChatPanel messages={messages} isLoading={isLoading} onSend={onSend} addContextDivider={addContextDivider} />
      </div>
      <div className="flex-1 rounded-2xl border border-gray-500/30 bg-gray-700/70 overflow-hidden shadow-lg shadow-black/20">
        <PreviewPanel versions={versions} selectedVersionId={selectedVersionId} currentHtml={currentHtml} onSelectVersion={onSelectVersion} />
      </div>
    </div>
  );
}
