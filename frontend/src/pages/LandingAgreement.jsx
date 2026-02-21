import { useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import base64ToFile from "../utility";
import { showToast } from "../utility/toast";
import SignatureField from "./packages/_components/SignatureField";
import DatePicker from "react-datepicker";
import { postJsonSafe } from "./packages/_components/helper";
import LandingParagraph from "./packages/aggrementComponent/LandingParagraph";

const CORE = import.meta.env.VITE_API_URL;

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

const SelectField = ({ options, required, value, onChange }) => (
  <select
    required={required}
    value={value}
    onChange={onChange}
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

const LandingAgreement = () => {
  const sigCanvasRef = useRef(null);

  const salutations = ["Mr", "Mrs", "Ms", "Miss", "Master", "Baby", "Dr", "Other"];

  const [isEnglish, setIsEnglish] = useState(true);
  const [signatureType, setSignatureType] = useState("Digital Signature");
  const [notPassed, setNotPassed] = useState(false);

  const [deceasedFormValues, setDeceasedFormValues] = useState({
    salutation: "",
    givenName: "",
    surname: "",
    dateofdeath: "",
    dateofbirth: "",
    deceasedpersonaddress: "",
    deceasedPassedReason: "",
    deceasedNow: "",
    batterypowereddevices: "",
    regulardoctoraddress: "",
    photo: [],
  });

  const [formKinValues, setFormKinValues] = useState({
    kin_salutation: "",
    kin_givenName: "",
    kin_surname: "",
    kin_currentAddress: "",
    kin_mobile: "",
    kin_email: "",
    kin_relation: "",
    kin_photo: null,
    kin_sign: null,
  });

  // ui states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  /* ================= Handlers ================= */

  const handleDeceasedChange = (field, value) => {
    setDeceasedFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleKinChange = (field, value) => {
    setFormKinValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // deceased photos -> backend expects: photo (array)
  const handleDeceasedPhotoUpload = (files) => {
    const fileArray = Array.from(files || []);
    setDeceasedFormValues((prev) => ({
      ...prev,
      photo: [...prev.photo, ...fileArray].slice(0, 2),
    }));
  };

  const removeDeceasedPhoto = (index) => {
    setDeceasedFormValues((prev) => ({
      ...prev,
      photo: prev.photo.filter((_, i) => i !== index),
    }));
  };

  // kin photo -> backend expects: kin_photo (single)
  const handleKinPhotoUpload = (files) => {
    const file = (files && files[0]) || null;
    setFormKinValues((prev) => ({ ...prev, kin_photo: file }));
  };

  const removeKinPhoto = () => {
    setFormKinValues((prev) => ({ ...prev, kin_photo: null }));
  };

  // kin sign -> backend expects: kin_sign (single)
  const handleKinSignUpload = (files) => {
    const file = (files && files[0]) || null;
    setFormKinValues((prev) => ({ ...prev, kin_sign: file }));
  };

  const saveSignatureFromCanvas = async () => {
    if (!sigCanvasRef.current) return null;

    try {
      const dataUrl = await sigCanvasRef.current.exportImage("png");
      if (!dataUrl) return null;

      const file = base64ToFile(dataUrl, "signature.png");
      setFormKinValues((prev) => ({ ...prev, kin_sign: file }));
      return file;
    } catch (err) {
      console.error("Signature save error:", err);
      return null;
    }
  };

  const clearSignature = () => {
    sigCanvasRef.current?.clearCanvas();
    setFormKinValues((prev) => ({ ...prev, kin_sign: null }));
  };

  /* ================= Submit (POST to backend) ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      // if user chose digital signature but hasn’t saved yet, save now
      if (signatureType === "Digital Signature" && !formKinValues.kin_sign) {
        await saveSignatureFromCanvas();
      }

      // Basic required checks (client side)
      if (!formKinValues.kin_salutation ||
        !formKinValues.kin_givenName ||
        !formKinValues.kin_surname ||
        !formKinValues.kin_currentAddress ||
        !formKinValues.kin_mobile ||
        !formKinValues.kin_email ||
        !formKinValues.kin_relation) {
        throw new Error("Please fill all required Next of Kin fields.");
      }

      const formData = new FormData();

      formData.append("salutation", deceasedFormValues.salutation);
      formData.append("givenName", deceasedFormValues.givenName);
      formData.append("surname", deceasedFormValues.surname);
      formData.append("dateofbirth", deceasedFormValues.dateofbirth);
      formData.append("dateofdeath", notPassed ? "" : deceasedFormValues.dateofdeath);
      formData.append("deceasedpersonaddress", deceasedFormValues.deceasedpersonaddress);
      formData.append("deceasedPassedReason", deceasedFormValues.deceasedPassedReason);
      formData.append("deceasedNow", deceasedFormValues.deceasedNow);
      formData.append("batterypowereddevices", deceasedFormValues.batterypowereddevices);
      formData.append("regulardoctoraddress", deceasedFormValues.regulardoctoraddress);
      formData.append("kin_salutation", formKinValues.kin_salutation);
      formData.append("kin_givenName", formKinValues.kin_givenName);
      formData.append("kin_surname", formKinValues.kin_surname);
      formData.append("kin_currentAddress", formKinValues.kin_currentAddress);
      formData.append("kin_mobile", formKinValues.kin_mobile);
      formData.append("kin_email", formKinValues.kin_email);
      formData.append("kin_relation", formKinValues.kin_relation);

      // files:
      deceasedFormValues.photo.forEach((file) => {
        formData.append("photo", file); // backend: upload.fields name "photo"
      });

      if (formKinValues.kin_photo) {
        formData.append("kin_photo", formKinValues.kin_photo); // backend: "kin_photo"
      }

      if (formKinValues.kin_sign) {
        formData.append("kin_sign", formKinValues.kin_sign); // backend: "kin_sign"
      }

      // ✅ call your backend controller route
      const res = await fetch(`${CORE}/landing-agreement-with-fixed-price`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.message || "Failed to submit agreement");
      }
      await postJsonSafe(`${CORE}/notify-admin-agreement`, {
        clientEmail: formKinValues.kin_email,
      });
      await postJsonSafe(`${CORE}/notify-client-account`, {
        email: formKinValues.kin_email,
        customerName: `${formKinValues.kin_givenName} ${formKinValues.kin_surname}`.trim(),
      });

      setMessage("Form submitted successfully!");
      showToast.success("Agreement submitted successfully", {
        duration: 3000,
        options: { position: "bottom-right" },
      });

    } catch (err) {
      console.error("Submit error:", err);
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* ================= Labels for translations (minimal) ================= */

  const deceasedLabel = deceasedFormValues.givenName || "deceased";
  const kinLabel = formKinValues.kin_givenName || "Next of kin";

  /* ================= Render ================= */

  return (
    <>
      <LandingParagraph />

      <section className=" bg-gray-50">
        <div className="max-w-4xl mx-auto md:px-6">
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow border border-gray-300">
            <form className="space-y-12" onSubmit={handleSubmit}>
              {/* Language */}
              <div className="rounded-xl p-2">
                <div className="mb-6">
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
              </div>

              {/* ================= DECEASED DETAILS ================= */}
              <div>
                <h3 className="text-4xl text-center font-bold mb-6">
                  {isEnglish ? "Deceased Person Details" : "逝者信息"}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <FormLabel required>Salutation</FormLabel>
                    <SelectField
                      options={salutations}
                      required
                      value={deceasedFormValues.salutation}
                      onChange={(e) => handleDeceasedChange("salutation", e.target.value)}
                    />
                  </div>

                  <div>
                    <FormLabel required>First given name</FormLabel>
                    <InputField
                      value={deceasedFormValues.givenName}
                      onChange={(e) => handleDeceasedChange("givenName", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <FormLabel>Other given name(s)</FormLabel>
                    <InputField
                      onChange={(e) => handleDeceasedChange("otherNames", e.target.value)}
                    />
                  </div>

                  <div>
                    <FormLabel required>Surname / Family Name</FormLabel>
                    <InputField
                      value={deceasedFormValues.surname}
                      onChange={(e) => handleDeceasedChange("surname", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <FormLabel required>Date of Birth</FormLabel>
                    <DatePicker
                      selected={
                        deceasedFormValues.dateofbirth
                          ? new Date(deceasedFormValues.dateofbirth)
                          : null
                      }
                      onChange={(date) =>
                        handleDeceasedChange(
                          "dateofbirth",
                          date ? date.toISOString().split("T")[0] : ""
                        )
                      }
                      dateFormat="dd/MM/yyyy"
                      placeholderText={isEnglish ? "dd/mm/yyyy" : "日/月/年"}
                      className="w-full p-3 border rounded-md"
                      required
                    />
                  </div>

                  <div className="flex items-center w-full md:col-span-2">
                    <input
                      type="checkbox"
                      checked={notPassed}
                      onChange={(e) => setNotPassed(e.target.checked)}
                      className="w-5 h-5 mr-2"
                    />
                    <span className="font-medium">
                      {isEnglish ? "person has not passed away" : "还未过世"}
                    </span>
                  </div>

                  {!notPassed && (
                    <div>
                      <FormLabel required>Date of Death</FormLabel>
                      <DatePicker
                        selected={
                          deceasedFormValues.dateofdeath
                            ? new Date(deceasedFormValues.dateofdeath)
                            : null
                        }
                        onChange={(date) =>
                          handleDeceasedChange(
                            "dateofdeath",
                            date ? date.toISOString().split("T")[0] : ""
                          )
                        }
                        dateFormat="dd/MM/yyyy"
                        placeholderText={isEnglish ? "dd/mm/yyyy" : "日/月/年"}
                        className="w-full p-3 border rounded-md"
                        required
                      />
                    </div>
                  )}

                  <div className="md:col-span-2">
                    <FormLabel required>Last registered address</FormLabel>
                    <InputField
                      required
                      value={deceasedFormValues.deceasedpersonaddress}
                      onChange={(e) =>
                        handleDeceasedChange("deceasedpersonaddress", e.target.value)
                      }
                      placeholder="This is the address they have resided at for the last 3 months."
                    />
                  </div>

                  {!notPassed && (
                    <>
                      <div className="md:col-span-2">
                        <FormLabel required>
                          {`Where did ${deceasedLabel} pass away?`}
                        </FormLabel>
                        <InputField
                          required
                          value={deceasedFormValues.deceasedNow}
                          onChange={(e) => handleDeceasedChange("deceasedNow", e.target.value)}
                          placeholder="Eg: Home / Hospital"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <FormLabel required>
                          {`Where is ${deceasedLabel} now?`}
                        </FormLabel>
                        <InputField
                          required
                          value={deceasedFormValues.deceasedPassedReason}
                          onChange={(e) =>
                            handleDeceasedChange("deceasedPassedReason", e.target.value)
                          }
                          placeholder="Eg: Home / Hospital"
                        />
                      </div>
                    </>
                  )}

                  <div className="md:col-span-2">
                    <FormLabel required>
                      Does the {deceasedLabel} have any battery powered devices?
                    </FormLabel>
                    <InputField
                      required
                      value={deceasedFormValues.batterypowereddevices}
                      onChange={(e) =>
                        handleDeceasedChange("batterypowereddevices", e.target.value)
                      }
                      placeholder="Pacemakers, defibrillators etc."
                    />
                  </div>

                  <div className="md:col-span-2">
                    <FormLabel required>Regular doctor (GP) & surgery address</FormLabel>
                    <InputField
                      required
                      value={deceasedFormValues.regulardoctoraddress}
                      onChange={(e) =>
                        handleDeceasedChange("regulardoctoraddress", e.target.value)
                      }
                      placeholder="Eg: Dr Adam Brown, Strathfield"
                    />
                  </div>

                  {/* Deceased photo upload */}
                  <div className="md:col-span-2">
                    <FormLabel required>Upload photo identification for {deceasedLabel}</FormLabel>

                    <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition group">
                      <div className="flex flex-col items-center justify-center text-center p-4">
                        <p className="text-sm text-gray-500 mb-4">
                          You can upload up to 2 images (jpg, jpeg, png, heic)
                        </p>
                      </div>

                      <input
                        type="file"
                        className="hidden"
                        multiple
                        onChange={(e) => handleDeceasedPhotoUpload(e.target.files)}
                      />
                    </label>
                  </div>

                  {/* Deceased photo previews */}
                  <div className="md:col-span-2">
                    <div className="flex flex-wrap gap-2">
                      {deceasedFormValues.photo.map((file, index) => (
                        <div key={index} className="relative inline-block">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${index + 1}`}
                            className="w-52 object-cover border rounded"
                          />
                          <button
                            type="button"
                            onClick={() => removeDeceasedPhoto(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ================= NEXT OF KIN ================= */}
              <div>
                <h3 className="text-4xl text-center font-bold mb-6">
                  {isEnglish ? "Next of Kin Details" : "近亲信息"}
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <FormLabel required>Salutation</FormLabel>
                    <SelectField
                      options={salutations}
                      value={formKinValues.kin_salutation}
                      onChange={(e) => handleKinChange("kin_salutation", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <FormLabel required>First given name</FormLabel>
                    <InputField
                      value={formKinValues.kin_givenName}
                      onChange={(e) => handleKinChange("kin_givenName", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <FormLabel required>Surname / Family Name</FormLabel>
                    <InputField
                      value={formKinValues.kin_surname}
                      onChange={(e) => handleKinChange("kin_surname", e.target.value)}
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <FormLabel required>Current Address</FormLabel>
                    <InputField
                      value={formKinValues.kin_currentAddress}
                      onChange={(e) => handleKinChange("kin_currentAddress", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <FormLabel required>Mobile</FormLabel>
                    <InputField
                      type="tel"
                      value={formKinValues.kin_mobile}
                      onChange={(e) => handleKinChange("kin_mobile", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <FormLabel required>Email</FormLabel>
                    <InputField
                      type="email"
                      value={formKinValues.kin_email}
                      onChange={(e) => handleKinChange("kin_email", e.target.value)}
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <FormLabel required>Your relationship to {deceasedLabel}?</FormLabel>
                    <InputField
                      value={formKinValues.kin_relation}
                      onChange={(e) => handleKinChange("kin_relation", e.target.value)}
                      required
                    />
                  </div>

                  {/* Kin photo upload */}
                  <div className="md:col-span-2">
                    <FormLabel required>Upload photo identification for {kinLabel}</FormLabel>

                    <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition group">
                      <div className="flex flex-col items-center justify-center text-center p-4">
                        <p className="text-sm text-gray-500 mb-4">
                          Upload 1 image (jpg, jpeg, png, heic)
                        </p>
                      </div>

                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleKinPhotoUpload(e.target.files)}
                      />
                    </label>
                  </div>

                  {/* Kin photo preview */}
                  <div className="md:col-span-2">
                    {formKinValues.kin_photo && (
                      <div className="relative inline-block">
                        <img
                          src={URL.createObjectURL(formKinValues.kin_photo)}
                          alt="Kin preview"
                          className="w-52 object-cover border rounded"
                        />
                        <button
                          type="button"
                          onClick={removeKinPhoto}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* ================= SIGNATURE ================= */}
              <div>
                <h3 className="text-4xl text-center font-bold mb-6">
                  {isEnglish ? "Signature" : "签名"}
                </h3>

                <div>
                  <FormLabel required>Choose Your Signature Type</FormLabel>
                  <select
                    value={signatureType}
                    onChange={(e) => setSignatureType(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black bg-white"
                  >
                    <option value="Digital Signature">Screen Signature</option>
                    <option value="Upload Photo">Upload Photo</option>
                  </select>
                </div>

                {/* Upload Signature Image */}
                {signatureType === "Upload Photo" && (
                  <div className="mt-4">
                    <FormLabel required>Upload Your Signature Here</FormLabel>

                    <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition group p-1">
                      <div className="flex flex-col items-center justify-center text-center py-4">
                        <p className="text-sm text-gray-500 mb-4">
                          Upload 1 image (jpg, jpeg, png, heic)
                        </p>
                      </div>

                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleKinSignUpload(e.target.files)}
                      />
                    </label>

                    {formKinValues.kin_sign && (
                      <div className="mt-3 text-sm text-gray-600">
                        Signature file selected: <b>{formKinValues.kin_sign.name}</b>
                      </div>
                    )}
                  </div>
                )}

                {/* Digital Signature */}
                {signatureType === "Digital Signature" && (
                  <div className="mt-4">
                    <FormLabel required>Sign Your Name Here</FormLabel>
                    <div className="border rounded-md bg-gray-50 p-2">
                      <SignatureField
                        sigPadRef={sigCanvasRef}
                        saveSignature={saveSignatureFromCanvas}
                        clearSignature={clearSignature}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Errors */}
              {error && (
                <div className="p-4 bg-red-50 text-red-700 rounded-lg">{error}</div>
              )}

              {message && (
                <div className="p-4 bg-green-50 text-green-700 rounded-lg">
                  {message}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full text-2xl bg-black text-white py-4 rounded-lg hover:bg-gray-800 transition font-bold disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingAgreement;