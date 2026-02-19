export function List({ items }) {
  return (
    <ul className="space-y-2 text-base sm:text-lg text-gray-700">
      {items?.map((item, i) => (
        <li
          key={i}
          className="font-lato whitespace-normal break-words leading-relaxed"
        >
          • {item}
        </li>
      ))}
    </ul>
  );
}

export function Select({ label, value, options, onChange }) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4 py-2">
      <span className="text-gray-600 text-base sm:text-lg sm:max-w-[45%]">
        {label}
      </span>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full sm:w-2/3 p-2 text-base sm:text-lg rounded bg-gray-100 text-left"
      >
        {options?.map((opt) => (
          <option className="text-sm" key={opt} value={opt}>
            {opt || value}
          </option>
        ))}
      </select>
    </div>
  );
}
