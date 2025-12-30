import { useEffect, useState } from "react";
import InputField from "../../components/InputField";
import InfoSection from "../../components/InfoSection";
import ServicesSection from "../../components/ServicesSection";
import { useNavigate, useParams } from "react-router";
import CORE from "../../components/common/Reusables";

const DeceasedPersonPage = () => {
  const navigate = useNavigate();
  const { userid } = useParams();
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formValues, setFormValues] = useState({
    salutation: "",
    givenName: "",
    surname: "",
    dateOfDeath: "",
    address: "",
    deceasedPassedReason: "",
    deceasedNow: "",
    batterypowereddevices: "",
    regulardoctoraddress: "",
  });
  console.log({ formData });
  const geNext = async () => {
    try {
      const payload = {
        userid,
        ...formValues,
      };

      const res = await fetch(`${CORE}/desencepersondetailsanswer`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Server Error:", text);
        return;
      }
      navigate(`/${userid}/kindetailpage`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (id, value) => {
    setFormValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(`${CORE}/desencepersondetails`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch questions");
        const data = await res.json();
        setQuestions(data);

        // Initialize formData with empty strings for each question
        const initialFormData = {};
        data.forEach((q) => {
          initialFormData[q.id] = "";
        });
        setFormData(initialFormData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);
  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <ServicesSection />

      <InputField>
        <div className="text-3xl font-bold mb-5 pt-[-30px]">
          Deacesed Person Details
        </div>
        {questions.map((q) => {
          let field = "";
          switch (q.id) {
            case 1:
              field = "salutation";
              break;
            case 2:
              field = "givenName";
              break;
            case 3:
              field = "surname";
              break;
            case 4:
              field = "dateOfDeath";
              break;
            case 5:
              field = "address";
              break;
            case 6:
              field = "deceasedPassedReason";
              break;
            case 7:
              field = "deceasedNow";
              break;
            case 8:
              field = "batterypowereddevices";
              break;
            case 9:
              field = "regulardoctoraddress";
              break;
            default:
              field = "";
          }
          return (
            <div key={q.id} className="mb-4">
              <label className="block font-semibold mb-2">{q.question}</label>
              <input
                type="text"
                value={formValues[field] || ""}
                onChange={(e) => handleChange(field, e.target.value)}
                className="p-2 w-full border rounded bg-white text-black"
              />
            </div>
          );
        })}
        <button
          onClick={geNext}
          className="p-3 bg-white text-black rounded-md hover:bg-gray-300 font-bold"
        >
          Next
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

export default DeceasedPersonPage;
