export default function Toolbar({ versions, selectedVersionId, onSelectVersion, onRerun, onDownload }) {
  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-gray-800 border-b border-gray-700">
      <select
        value={selectedVersionId || ''}
        onChange={(e) => onSelectVersion(e.target.value)}
        className="bg-gray-700 text-white text-sm rounded px-3 py-1.5 outline-none focus:ring-2 focus:ring-blue-500"
      >
        {versions.length === 0 && <option value="">No versions</option>}
        {versions.map((v) => (
          <option key={v.versionId} value={v.versionId}>
            {v.versionId} — {v.label}
          </option>
        ))}
      </select>

      <button
        onClick={onRerun}
        disabled={versions.length === 0}
        className="bg-gray-700 hover:bg-gray-600 disabled:opacity-40 text-white text-sm px-3 py-1.5 rounded transition-colors"
      >
        Rerun
      </button>

      <span className="flex-1 text-center text-gray-300 text-xs tracking-wide">Test your game here</span>

      <button
        onClick={onDownload}
        disabled={versions.length === 0}
        className="bg-green-700 hover:bg-green-600 disabled:opacity-40 text-white text-sm px-3 py-1.5 rounded transition-colors"
      >
        Download
      </button>
    </div>
  );
}
