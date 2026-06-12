export default function ThemeSelector({ currentTheme, onChange }) {
  return (
    <select
      value={currentTheme}
      onChange={(e) => onChange(e.target.value)}
      className="bg-gray-700 text-gray-200 text-xs rounded px-2 py-1 border border-gray-600 outline-none focus:ring-1 focus:ring-blue-500"
    >
      <option value="classic">Classic</option>
      <option value="modern">Modern</option>
    </select>
  );
}
