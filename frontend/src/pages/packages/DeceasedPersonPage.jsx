import { useEffect, useState } from "react";
import InfoSection from "../../components/InfoSection";
import ServicesSection from "../../components/ServicesSection";
import { useNavigate, useParams } from "react-router";
import CORE from "../../components/common/Reusables";
import InputField from "../../components/InputField";
import PopupEnquirey from "./_components/PopupEnquirey";
import { FiLoader } from "react-icons/fi";

const DeceasedPersonPage = () => {
  const navigate = useNavigate();
  const { userid } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activePopup, setActivePopup] = useState(null);
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

  const openPopup = (popupType) => {
    setActivePopup(popupType);
  };

  const closePopup = () => {
    setActivePopup(null);
  };
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
        setFormValues(initialFormData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);
  if (loading)
    return (
      <p className="text-white ">
        <FiLoader />
      </p>
    );
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
          let inputType = "text";
          switch (q.id) {
            case 1:
              field = "salutation";
              inputType = "gender";
              break;
            case 2:
              field = "givenName";
              break;
            case 3:
              field = "surname";
              break;
            case 4:
              field = "dateOfDeath";
              inputType = "date";
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
              inputType = "select";
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
              {inputType === "gender" && (
                <select
                  value={formValues[field] || ""}
                  onChange={(e) => handleChange(field, e.target.value)}
                  className="p-2 w-full border rounded bg-white text-black"
                >
                  <option value="Mr">Mr</option>
                  <option value="Miss">Miss</option>
                  <option value="Sir">Sir</option>
                  <option value="Mister">Mister</option>
                </select>
              )}
              {inputType === "select" && (
                <select
                  value={formValues[field] || ""}
                  onChange={(e) => handleChange(field, e.target.value)}
                  className="p-2 w-full border rounded bg-white text-black"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              )}
              {inputType !== "select" && inputType !== "gender" && (
                <input
                  type={inputType}
                  value={formValues[field] || ""}
                  onChange={(e) => handleChange(field, e.target.value)}
                  className="p-2 w-full border rounded bg-white text-black"
                />
              )}
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
        <button
          className="bg-black text-white text-xl rounded-2xl p-2"
          onClick={() => openPopup("enquirey")}
        >
          ENQUIRE NOW
        </button>
      </div>

      <InfoSection />
      <PopupEnquirey
        isOpen={activePopup === "enquirey"}
        onClose={closePopup}
        mode="enquirey"
        mainTitle="Please tell us what you whant to know about us"
        description="We'll get back to you shortly"
        title="Make an Enquiry"
        subtitle="We'll get back to you shortly"
        onSuccess={(userData) => {
          console.log("Enquiry submitted:", userData);
          closePopup();
          // Handle enquiry submission
        }}
      />
    </div>
  );
};

export default DeceasedPersonPage;
