import { useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

import Hero from "../components/common/Hero";
import { DeceasedDetails } from "./AgreementComponent/DeceasedDetails";
import NextOfKinDetails from "./AgreementComponent/NextOfKinDetails";
import Paragraph from "./AgreementComponent/Paragraph";
import { SignatureDetails } from "./AgreementComponent/SignatureDetails";

/* ================= Reusable Components ================= */

const FormLabel = ({ children, required }) => (
  <label className="block text-lg font-bold text-gray-700 mb-1">
    {children} {required && <span className="text-red-500">*</span>}
  </label>
);

const InputField = ({
  type = "text",
  placeholder,
  required,
  value,
  onChange,
}) => (
  <input
    type={type}
    required={required}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
  />
);

const SelectField = ({ options, required }) => (
  <select
    required={required}
    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black bg-white"
  >
    <option value="">Select Choice</option>
    {options.map((opt, idx) => (
      <option key={idx} value={opt}>
        {opt}
      </option>
    ))}
  </select>
);

/* ================= Main Component ================= */

const AgreementForm = () => {
  const salutations = ["Mr", "Mrs", "Ms", "Miss", "Dr", "Other"];

  const [firstName, setFirstName] = useState("");
  const [kinFirstName, setKinFirstName] = useState("");
  const [dob, setDob] = useState(null);
  const [dod, setDod] = useState(null);
  const [notPassed, setNotPassed] = useState(false);
  const [kinIdImages, setKinIdImages] = useState([]);
  const [signatureImage, setSignatureImage] = useState([]);
  const [uploadError, setUploadError] = useState("");
  const [signatureType, setSignatureType] = useState("Digital Signature");

  //
  const [DeaceasedImages, setDeaceasedImages] = useState([]);
  const sigPadRef = useRef(null);
  const [isEnglish, setIsEnglish] = useState(true); // English default

  const Deceased = isEnglish ? "the deceased" : "去世";

  const nameLabel = firstName ? firstName : Deceased;
  const NextOfKin = isEnglish ? "the next of kin" : "近亲";
  const kinNameValue = kinFirstName ? kinFirstName : NextOfKin;
  // for mobile camera feature

  //  for  Deaceased images
  const handleDeaceasedIdUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    const totalFiles = DeaceasedImages.length + newFiles.length;

    if (totalFiles > 2) {
      setUploadError("You can upload a maximum of 2 images.");
      e.target.value = "";
      return;
    }

    // Allowed formats
    const allowedFormats = ["jpg", "jpeg", "png", "heic"];

    // Check file extensions
    const invalidFile = newFiles.find((file) => {
      const ext = file.name.split(".").pop().toLowerCase();
      return !allowedFormats.includes(ext);
    });

    if (invalidFile) {
      setUploadError("Only .jpg, .jpeg, .png, .heic files are allowed.");
      e.target.value = "";
      return;
    }

    setDeaceasedImages([...DeaceasedImages, ...newFiles]);
    setUploadError(""); // Clear error on success
  };

  //  for next kin images
  const handleKinIdUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    const totalFiles = kinIdImages.length + newFiles.length;

    if (totalFiles > 2) {
      setUploadError("You can upload a maximum of 2 images.");
      e.target.value = "";
      return;
    }

    // Allowed formats
    const allowedFormats = ["jpg", "jpeg", "png", "heic"];

    // Check file extensions
    const invalidFile = newFiles.find((file) => {
      const ext = file.name.split(".").pop().toLowerCase();
      return !allowedFormats.includes(ext);
    });

    if (invalidFile) {
      setUploadError("Only .jpg, .jpeg, .png, .heic files are allowed.");
      e.target.value = "";
      return;
    }

    setKinIdImages([...kinIdImages, ...newFiles]);
    setUploadError(""); // Clear error on success
  };

  // for signature
  const signatureHandler = (e) => {
    const newFiles = Array.from(e.target.files);
    // const totalFiles = signatureImage.length + newFiles.length;

    // if (totalFiles > 2) {
    //   setUploadError("You can upload a maximum of 2 images.");
    //   e.target.value = "";
    //   return;
    // }

    // Allowed formats
    const allowedFormats = ["jpg", "jpeg", "png", "heic"];

    // Check file extensions
    const invalidFile = newFiles.find((file) => {
      const ext = file.name.split(".").pop().toLowerCase();
      return !allowedFormats.includes(ext);
    });

    if (invalidFile) {
      setUploadError("Only .jpg, .jpeg, .png, .heic files are allowed.");
      e.target.value = "";
      return;
    }

    setSignatureImage([...signatureImage, ...newFiles]);
    setUploadError(""); // Clear error on success
  };

  // function for remove image
  const removeImage = (index, type) => {
    if (type === "deceased") {
      setDeaceasedImages(DeaceasedImages.filter((_, i) => i !== index));
      setUploadError("");
    } else if (type === "signature") {
      setSignatureImage(signatureImage.filter((_, i) => i !== index));
      setUploadError("");
    } else if (type === "kin")
      setKinIdImages(kinIdImages.filter((_, i) => i !== index));
    setUploadError("");
  };

  return (
    <>
      <Hero
        title={"BTF 's Consent and Agreement Form"}
        subtitle={"Agreement"}
      />
      <Paragraph />
      <section className="py-8 md:py-16  bg-gray-50">
        <div className="max-w-4xl mx-auto  md:px-6">
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow border border-gray-300 ">
            <div className="mb-8">
              <FormLabel required>Select Your Preferred Language</FormLabel>
              <select
                value={isEnglish ? "english" : "chinese"}
                onChange={(e) => setIsEnglish(e.target.value === "english")}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black bg-white"
              >
                <option value="english">English</option>
                <option value="chinese">Chinese</option>
              </select>
            </div>

            <form className="space-y-12">
              {/* ================= DECEASED DETAILS ================= */}
              <DeceasedDetails
                salutations={salutations}
                firstName={firstName}
                setFirstName={setFirstName}
                dob={dob}
                setDob={setDob}
                dod={dod}
                setDod={setDod}
                notPassed={notPassed}
                setNotPassed={setNotPassed}
                nameLabel={nameLabel}
                DeaceasedImages={DeaceasedImages}
                handleDeaceasedIdUpload={handleDeaceasedIdUpload}
                removeImage={removeImage}
                uploadError={uploadError}
                isEnglish={isEnglish}
                FormLabel={FormLabel}
                InputField={InputField}
                SelectField={SelectField}
              />
              {/* ================= NEXT OF KIN ================= */}
              <NextOfKinDetails
                salutations={salutations}
                setKinFirstName={setKinFirstName}
                nameLabel={nameLabel}
                kinNameValue={kinNameValue}
                kinIdImages={kinIdImages}
                handleKinIdUpload={handleKinIdUpload}
                removeImage={removeImage}
                uploadError={uploadError}
                isEnglish={isEnglish}
                FormLabel={FormLabel}
                InputField={InputField}
                SelectField={SelectField}
              />
              {/* ================= SIGNATURE ================= */}
              <SignatureDetails
                signatureType={signatureType}
                setSignatureType={setSignatureType}
                signatureHandler={signatureHandler}
                signatureImage={signatureImage}
                removeImage={removeImage}
                sigPadRef={sigPadRef}
                isEnglish={isEnglish}
                FormLabel={FormLabel}
              />

              {/* ================= SUBMIT ================= */}
              <button
                type="submit"
                className="w-full text-2xl bg-black text-white py-4 rounded-lg hover:bg-gray-800 transition font-bold"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AgreementForm;
