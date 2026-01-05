import { Select } from "../../../components/common/Reusables";

const RenderQuestion = ({ item, selections, setSelections }) => {
  if (item.type !== "select") return null;

  const handleChange = (value) => {
    const selectedOption = item.options.find((opt) => opt.label === value);

    setSelections((prev) => ({
      ...prev,
      [item.question]: {
        value,
        price: selectedOption?.priceAdjustment || 0,
      },
    }));
  };

  return (
    <Select
      label={item.question}
      value={selections[item.question]?.value || item.options[0]?.label}
      options={item.options.map((opt) => opt.label)}
      onChange={handleChange}
    />
  );
};

export default RenderQuestion;
