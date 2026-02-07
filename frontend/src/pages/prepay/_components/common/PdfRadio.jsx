const PdfRadio = ({ checked, label }) => (
    <div className="flex items-center gap-2 min-w-[80px]">
        <div
            className={`
          w-4 h-4 rounded-full border-2 flex items-center justify-center
          ${checked ? "border-black" : "border-gray-400"}
        `}
        >
            {checked && <div className="w-2 h-2 bg-black rounded-full" />}
        </div>
        <span className="text-slate-700">{label}</span>
    </div>
);

export default PdfRadio

