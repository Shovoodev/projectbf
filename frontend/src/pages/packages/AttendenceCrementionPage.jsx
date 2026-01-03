import { useEffect, useState } from "react";
import InputField from "../../components/InputField";
import InfoSection from "../../components/InfoSection";
import ServicesSection from "../../components/ServicesSection";
import { useNavigate, useParams } from "react-router";
import CORE from "../../components/common/Reusables";

const AttendenceCrementionPage = () => {
  const BASE_PRICE = 4400;
  const navigate = useNavigate();
  const { userid } = useParams();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [totalPrice, setTotalPrice] = useState(BASE_PRICE);

  const [formValues, setFormValues] = useState({
    stationery: { value: "", price: 0 },
    bodypreparation: { value: "", price: 0 },
    coffin: { value: "", price: 0 },
    flowers: { value: "", price: 0 },
    urn: { value: "", price: 0 },
    collectionOfUrn: { value: "", price: 0 },
  });

  const handleOptionChange = (index, value, priceImpact) => {
    const keys = ["stationery", "bodypreparation", "coffin", "flowers", "urn"][
      index
    ];

    const key = keys[index];

    setFormValues((prev) => {
      const updated = { ...prev, [key]: { value, price: priceImpact } };
      const totalPriceImpact = Object.values(updated).reduce(
        (sum, opt) => sum + (opt.price || 0),
        0
      );
      setTotalPrice(BASE_PRICE + totalPriceImpact);

      return updated;
    });
  };

  const geNext = async (e) => {
    e.preventDefault();

    try {
      // const res = await fetch(
      //   "http://localhost:4000/newattendingservicecremationanswers",
      //   {
      //     method: "POST",
      //     credentials: "include",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       ...formValues,
      //       totalPriceImpact: Object.values(formValues).reduce(
      //         (sum, opt) => sum + (opt.price || 0),
      //         0
      //       ),
      //     }),
      //   }
      // );

      // if (!res.ok) {
      //   const text = await res.text();
      //   console.error("Server Error:", text);
      //   return;
      // }

      navigate(`/${userid}/deceasedpersondetails`);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    if (data.length > 0) {
      setFormValues({
        stationery: data[0].options[0]?.value || "No option selected",
        bodypreparation: data[1]?.options[0]?.value || "No option selected",
        coffin: data[2]?.options[0]?.value || "No opiton selected",
        flowers: data[3]?.options[0]?.value || "No option selected",
        urn: data[4]?.options[0]?.value || "No option selected",
        collectionOfUrn: data[5]?.options[0]?.value || "No option selected",
      });
    }
  }, [data]);

  useEffect(() => {
    const fetchStepData = async () => {
      try {
        const response = await fetch(`${CORE}/newattendingservicecremation`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStepData();
  }, []);

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <ServicesSection />

      <InputField>
        <div className="text-5xl font-bold mb-10">Price : ${totalPrice}</div>

        {data?.map((item, index) => {
          const options = Array.isArray(item.options?.[0])
            ? item.options[0]
            : item.options;

          return (
            <div key={item.id}>
              <label className="block font-semibold text-xl">
                {item.question}
              </label>

              <select
                className="text-black p-2 w-full my-3 bg-white"
                value={
                  formValues[
                    [
                      "stationery",
                      "bodypreparation",
                      "coffin",
                      "flowers",
                      "urn",
                      "collectionOfUrn",
                    ][index]
                  ]
                }
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  const selectedOption = options.find(
                    (opt) => opt.value === selectedValue
                  );

                  handleOptionChange(
                    index,
                    selectedValue,
                    selectedOption?.priceAdjustment || 0
                  );
                }}
              >
                {options?.map((option, i) => (
                  <option key={i} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          );
        })}

        <button
          onClick={geNext}
          className="p-3 bg-white text-black rounded-md hover:bg-gray-300 font-bold"
        >
          Proceed To Agreement
        </button>
      </InputField>

      <div className="mx-20 mt-[-40px] gap-2">
        <button className="bg-black text-white text-xl rounded-2xl p-2">
          ENQUIRE NOW
        </button>
        <button className="bg-black text-white text-xl rounded-2xl p-2 ml-2">
          PREPAY
        </button>
      </div>

      <InfoSection />
    </div>
  );
};

export default AttendenceCrementionPage;
