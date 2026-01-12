export function List({ items }) {
  return (
    <ul className="space-y-2 text-lg text-gray-700">
      {items?.map((item, i) => (
        <li key={i}>• {item}</li>
      ))}
    </ul>
  );
}

export function Select({ label, value, options, onChange }) {
  return (
    <div className="flex justify-between items-center text-sm py-2 ">
      <span className="text-gray-600 text-lg">{label}</span>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="p-2  rounded bg-gray-100 text-left w-2/3"
      >
        {options?.map((opt) => (
          <option className="text-sm" key={opt} value={opt}>
            {opt ? opt : value}
          </option>
        ))}
      </select>
    </div>
  );
}

const CORE = "http://localhost:4000";
export default CORE;
