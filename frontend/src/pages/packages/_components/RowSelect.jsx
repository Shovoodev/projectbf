const RowSelect = ({ label, value, onChange, options }) => (
    <div className="grid grid-cols-1 md:grid-cols-10 gap-4 items-center border-b border-gray-200/60 last:border-0 pb-4 last:pb-0">
        {/* Label - 30% width (3 out of 10 columns) */}
        <div className="md:col-span-4">
            <label className="font-body font-lato text-lg font-lato font-medium text-gray-700">
                {label}:
            </label>
        </div>

        {/* Select - 70% width (7 out of 10 columns) */}
        <div className="md:col-span-6">
            <select
                value={value}
                onChange={onChange}
                className="bg-white border font-lato border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-black focus:border-black block w-full p-3"
            >

                {options.map((opt, idx) => (
                    <option className="text-lg" key={idx} value={opt.value || opt}>
                        {opt.label || opt}
                    </option>
                ))}
            </select>
        </div>
    </div>
);

export default RowSelect