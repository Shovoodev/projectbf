import { Select } from "../../../components/common/Reusables";

const RenderQuestion = ({ item, selections, setSelections }) => {
  if (item.type !== "select") return null;

  const handleChange = (value) => {
    const selectedOption = item.options.find((opt) => opt.label === value);
    const price = selectedOption?.priceAdjustment || 0;

    console.log(`Selected ${item.question}: ${value}, Price: ${price}`);

    // Call the parent function with the exact question name
    setSelections(item.question, value, price);
  };

  const currentValue =
    selections[item.question]?.value || item.options[0]?.label || "";
  const currentPrice = selections[item.question]?.price || 0;

  return (
    <div className="mb-4">
      <Select
        label={item.question}
        value={currentValue}
        options={item.options.map((opt) => opt.label)}
        onChange={handleChange}
      />
      <div className="text-sm text-gray-600 mt-1 flex justify-between">
        <span>Price adjustment: ${currentPrice}</span>
        {currentPrice !== 0 && (
          <span
            className={currentPrice > 0 ? "text-red-600" : "text-green-600"}
          >
            {currentPrice > 0
              ? `+$${currentPrice}`
              : `-$${Math.abs(currentPrice)}`}
          </span>
        )}
      </div>
    </div>
  );
};

export default RenderQuestion;
