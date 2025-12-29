const Input = ({
  id,
  name,
  type = "text",
  value,
  onChange,
  children,
  label,
}) => {
  return (
    <div className="flex  justify-center gap-3 flex-col">
      <label className="block text-sm font-medium text-gray-700">
        {" "}
        {label}
      </label>
      <input
        className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        id={id}
      >
        {children}
      </input>
    </div>
  );
};

export default Input;
