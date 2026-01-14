import { useEffect, useRef, useState } from "react";
import InputField from "../../components/InputField";
import InfoSection from "../../components/InfoSection";
import ServicesSection from "../../components/ServicesSection";

import { useNavigate, useParams } from "react-router";
const CORE = import.meta.env.VITE_API_URL;

import base64ToFile from "../../utility";
import SignatureField from "./_components/SignatureField";
const KinDetailsPage = () => {
  const navigate = useNavigate();
  const { userid } = useParams();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formValues, setFormValues] = useState({
    salutation: "",
    givenName: "",
    surname: "",
    currentAddress: "",
    mobile: "",
    email: "",
    relation: "",
  });
  const geNext = async () => {
    try {
      const fd = new FormData();
      fd.append("salutation", formValues.salutation);
      fd.append("givenName", formValues.givenName);
      fd.append("surname", formValues.surname);
      fd.append("currentAddress", formValues.currentAddress);
      fd.append("mobile", formValues.mobile);
      fd.append("email", formValues.email);
      fd.append("relation", formValues.relation);
      if (formValues.photo) fd.append("photo", formValues.photo);
      if (formValues.sign) fd.append("sign", formValues.sign);

      fd.append("userid", userid);

      const res = await fetch(`${CORE}/${userid}/next-to-keen-details`, {
        method: "POST",
        credentials: "include",
        body: fd,
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Server Error:", text);
        return;
      }

      navigate(`/${userid}/dashboard`);
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
        const res = await fetch(`${CORE}/${userid}/kindetiales`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch questions");
        const data = await res.json();
        setQuestions(data);

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
  }, [userid]);
  const sigPadRef = useRef(null);

  const saveSignature = () => {
    if (!sigPadRef.current.isEmpty()) {
      const dataUrl = sigPadRef.current
        .getTrimmedCanvas()
        .toDataURL("image/png");

      const file = base64ToFile(dataUrl, "signature.png");

      handleChange("sign", file);
    }
  };

  const clearSignature = () => {
    sigPadRef.current.clear();
    handleChange(field, null);
  };
  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  return (
    <div>
      <ServicesSection />

      <InputField>
        <div className="text-3xl font-bold mb-5 pt-[-30px]">
          Next of Kin Details
        </div>
        {questions.map((q) => {
          let field = "";
          let inputType = "text";
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
              field = "currentAddress";
              break;

            case 5:
              field = "mobile";
              break;
            case 6:
              field = "email";
              break;
            case 7:
              field = "relation";
              break;
            case 8:
              field = "photo";
              inputType = "file";
              break;
            case 9:
              field = "canvasSign";
              inputType = "canvas";
              break;
          }
          return (
            <div key={q.id} className="mb-4">
              <label className="block font-semibold mb-2">{q.question}</label>

              {inputType === "text" && (
                <input
                  type="text"
                  value={formValues[field] || ""}
                  onChange={(e) => handleChange(field, e.target.value)}
                  className="p-2 w-full border rounded bg-white text-black"
                />
              )}
              {inputType === "file" && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleChange(field, e.target.files[0])}
                  className="p-2 w-full border rounded bg-white text-black"
                />
              )}
              {inputType === "canvas" && (
                <div className="border rounded bg-white p-2">
                  <SignatureField
                    sigPadRef={sigPadRef}
                    saveSignature={saveSignature}
                    clearSignature={clearSignature}
                    penColor="black"
                    canvasProps={{
                      width: 400,
                      height: 150,
                      className: "w-full h-[150px]",
                    }}
                  />
                </div>
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
      <InfoSection />
    </div>
  );
};

export default KinDetailsPage;
