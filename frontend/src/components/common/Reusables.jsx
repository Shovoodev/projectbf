export function Card({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="font-semibold uppercase text-sm mb-4">{title}</h3>
      {children}
    </div>
  );
}

export function List({ items }) {
  return (
    <ul className="space-y-2 text-sm text-gray-700">
      {items.map((item, i) => (
        <li key={i}>• {item}</li>
      ))}
    </ul>
  );
}

export function Select({ label, value, options, onChange }) {
  return (
    <div className="flex justify-between items-center text-sm py-2 border-b last:border-none">
      <span className="text-gray-600">{label}</span>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="p-1 border rounded bg-gray-100 text-right w-48"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
