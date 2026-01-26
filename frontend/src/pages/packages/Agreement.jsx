import { useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import base64ToFile from "../../utility";
import { pdf } from "@react-pdf/renderer";
import { useLocation, useNavigate } from "react-router-dom";
import SignatureField from "./_components/SignatureField";
import StaticInvoicePDF from "./_components/StaticInvoicePDF";
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
  onChange, // Changed from 'change' to 'onChange' for consistency
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

const SelectField = ({ options, required, value, onChange }) => ( // Added value and onChange
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

const AgreementForm = () => {
  const salutations = [
    "Mr",
    "Mrs",
    "Ms",
    "Miss",
    "Master",
    "Baby",
    "Dr",
    "Other",
  ];
  const location = useLocation();
  const { selections, path } = location.state || {};
  console.log({ selections, path });

  const [hasNotPassedAway, setHasNotPassedAway] = useState(false);
  const [error, setError] = useState("");
  const [signatureType, setSignatureType] = useState("Digital Signature");
  const navigate = useNavigate();

  const [isEnglish, setIsEnglish] = useState(true);
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
    photo: null
  });

  const [formKinValues, setFormKinValues] = useState({
    salutation: "",
    givenName: "",
    surname: "",
    currentAddress: "",
    mobile: "",
    email: "",
    relation: "",
    photo: [],
    sign: null,
  });

  const sigCanvasRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [invoiceDetails, setInvoiceDetails] = useState(null);
  const saveSignature = async () => {
    if (!sigCanvasRef.current || sigCanvasRef.current.isEmpty()) {
      return null;
    }

    const dataUrl = sigCanvasRef.current.toDataURL("image/png");
    const file = base64ToFile(dataUrl, "signature.png");

    setFormKinValues((prev) => ({ ...prev, sign: file }));
    return file;
  };

  const clearSignature = () => {
    if (sigCanvasRef.current) {
      sigCanvasRef.current.clear();
    }
    setFormKinValues((prev) => ({ ...prev, sign: null }));
  };

  const handleDeceasedChange = (field, value) => {
    setDeceasedFormValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleKinChange = (field, value) => {
    setFormKinValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePhotoUpload = (files) => {
    const fileArray = Array.from(files);

    // For Next of Kin photos
    setFormKinValues((prev) => ({
      ...prev,
      photo: [...prev.photo, ...fileArray].slice(0, 2),
    }));
  };

  const handleSignatureUpload = (files) => {
    if (files && files[0]) {
      setFormKinValues(prev => ({
        ...prev,
        sign: files[0]
      }));
    }
  };

  const removePhoto = (index) => {
    setFormKinValues(prev => ({
      ...prev,
      photo: prev.photo.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      // Validate required fields
      const requiredFields = [
        { field: formKinValues.email, message: "Email is required" },
        { field: formKinValues.givenName, message: "First name is required" },
        { field: formKinValues.mobile, message: "Mobile number is required" },
        { field: deceasedFormValues.givenName, message: "Deceased first name is required" },
        { field: deceasedFormValues.surname, message: "Deceased surname is required" },
      ];

      for (const { field, message } of requiredFields) {
        if (!field || field.trim() === "") {
          throw new Error(message);
        }
      }

      // Transform selections to match backend expected format
      const transformSelectionsForBackend = (selections) => {
        if (!selections) return null;

        const transformed = {};

        // Map frontend keys to backend keys with proper structure
        const keyMapping = {
          // Format: { value: "selected option", price: "price" }
          stationery: selections.stationery,
          bodyPreparation: selections.bodyPreparation,
          coffin: selections.coffin,
          flowers: selections.flowers,
          urn: selections.urn,
          collectionOfUrn: selections.collectionOfUrn,
          transformOption: selections.transformOption || selections.transferOption,
        };

        // Convert to backend expected format
        Object.entries(keyMapping).forEach(([key, value]) => {
          if (value) {
            transformed[key] = {
              value: value.value || value,
              price: value.price || "0"
            };
          }
        });

        return transformed;
      };

      // Get transformed selections
      const backendSelections = transformSelectionsForBackend(selections);

      // Warn if no selections but allow to continue
      if (!backendSelections) {
        console.warn("No selections provided - continuing without package selections");
      }

      // 1. Register user
      const registerPayload = {
        email: formKinValues.email,
        password: formKinValues.givenName,
      };

      const responseUser = await fetch(`${CORE}/blacktulipauth/newuser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerPayload),
      });

      if (!responseUser.ok) {
        const errorData = await responseUser.json();
        throw new Error(errorData.message || "Registration failed");
      }

      // 2. Login user
      const loginRes = await fetch(`${CORE}/blacktulipauth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerPayload),
        credentials: "include",
      });

      if (!loginRes.ok) {
        throw new Error("Login failed");
      }

      // 3. Save selections if available
      if (backendSelections && path) {
        try {
          const selectionRes = await fetch(`${CORE}/${path}`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              selections: backendSelections,
              totalPrice: 0 // You can calculate this if needed
            }),
          });

          if (!selectionRes.ok) {
            const errorText = await selectionRes.text();
            console.warn("Failed to save selections:", errorText);
            // Don't throw here, continue with form submission
          }
        } catch (selectionError) {
          console.warn("Error saving selections:", selectionError);
        }
      }

      // 4. Save deceased details
      const deceasedRes = await fetch(
        `${CORE}/desencepersondetailsanswer`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(deceasedFormValues),
        }
      );

      if (!deceasedRes.ok) {
        const text = await deceasedRes.text();
        throw new Error(text || "Failed to save deceased details");
      }

      // 5. Handle signature
      let signFile = formKinValues.sign;

      if (signatureType === "Digital Signature" && !signFile) {
        signFile = await saveSignature();
        if (!signFile) {
          throw new Error("Please provide a signature");
        }
      }

      if (!signFile) {
        throw new Error("Signature is required");
      }

      // 6. Save next of kin details
      const fd = new FormData();

      fd.append("salutation", formKinValues.salutation);
      fd.append("givenName", formKinValues.givenName);
      fd.append("surname", formKinValues.surname);
      fd.append("currentAddress", formKinValues.currentAddress);
      fd.append("mobile", formKinValues.mobile);
      fd.append("email", formKinValues.email);
      fd.append("relation", formKinValues.relation);

      if (formKinValues.photo instanceof File) {
        fd.append("photo", formKinValues.photo);
      }

      fd.append("sign", signFile);

      const resforkin = await fetch(`${CORE}/next-to-keen-details`, {
        method: "POST",
        credentials: "include",
        body: fd,
      });

      if (!resforkin.ok) {
        const text = await resforkin.text();
        throw new Error(text || "Failed to save next of kin");
      }

      // 7. Get final selections and generate invoice
      try {
        const resSelections = await fetch(`${CORE}/all-selected-selections`, {
          credentials: "include",
        });

        if (!resSelections.ok) {
          throw new Error(`HTTP error! status: ${resSelections.status}`);
        }

        const data = await resSelections.json();
        const invoiceData = data.data;

        console.log("Invoice data received:", invoiceData);

        // Generate PDF with the data we just received
        if (invoiceData) {
          const blob = await pdf(
            <StaticInvoicePDF invoiceDetails={invoiceData} />
          ).toBlob();

          const base64data = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
              const base64 = reader.result?.toString().split(",")[1];
              resolve(base64);
            };
            reader.onerror = reject;
          });

          // Send invoice email
          const invoiceRes = await fetch(`${CORE}/api/send-invoice`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              selections: backendSelections || selections || {},
              pdfAttachment: base64data,
            }),
          });

          if (!invoiceRes.ok) {
            const err = await invoiceRes.json();
            console.warn("Invoice email failed:", err);
            // Don't throw here - just warn and continue
          }

          // Set invoice details for UI if needed
          setInvoiceDetails(invoiceData);
        }
      } catch (invoiceError) {
        console.warn("Invoice generation skipped:", invoiceError);
      }
      // Success
      setMessage("Form submitted successfully!");

      // Clear localStorage
      localStorage.removeItem('packageSelections');
      localStorage.removeItem('packagePath');

      // Navigate after delay
      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (err) {
      console.error("Submit error:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  const translations = {
    deceasedSectionTitle: { en: "Deceased Persons Details", zh: "逝者信息" },

    salutation: { en: "Salutation", zh: "称谓" },
    selectChoice: { en: "Select Choice", zh: "选择" },

    firstGivenName: { en: "First given name", zh: "名" },
    otherGivenNames: { en: "Other given name(s)", zh: "其他名" },
    surname: { en: "Surname / Family Name", zh: "姓" },

    dateOfBirth: { en: "Date of Birth", zh: "出生年月" },
    dobPlaceholder: { en: "dd/mm/yyyy", zh: "日/月/年" },

    dateOfDeath: { en: "Date of Death", zh: "过世日期" },
    dodPlaceholder: { en: "dd/mm/yyyy", zh: "日/月/年" },

    personNotPassed: { en: "☐ person has not passed away", zh: "还未过世" },

    lastRegisteredAddress: {
      en: "Last registered address of the deceased",
      zh: "最近注册过的居住地址",
    },
    lastAddressPlaceholder: {
      en: "This is the address they have resided at for the last 3 months.",
      zh: "此地址为过去三个月居住的地方",
    },

    deceasedPassedPlace: { en: "Where did the deceased pass away?", zh: "逝者过世地点" },
    deceasedCurrentPlace: { en: "Where is the deceased now?", zh: "逝者现在在哪里" },
    deceasedCurrentPlacePlaceholder: { en: "Eg: Home / Hospital", zh: "比如：家中/医院" },

    batteryPoweredDevices: { en: "Does the deceased have any form of battery powered devices?", zh: "逝者身上是否有由电池驱动的仪器？" },
    batteryDevicesPlaceholder: { en: "This includes all forms of pacemakers and defibrillators", zh: "这包括所有的起搏器和除颤器" },

    regularDoctor: { en: "Who is the deceased's regular doctor (GP) & surgery address?", zh: "逝者的家庭医生名字和诊所地址" },
    regularDoctorPlaceholder: { en: "Eg: Dr Adam Brown, Strathfield", zh: "比如：Adam Brown 医生，Strathfield" },

    uploadDeceasedPhoto: (name) => ({
      en: `Upload photo identification for ${name}`,
      zh: `上传照片证件（${name}）`,
    }),

    nextOfKinSectionTitle: { en: "Next of Kin Details", zh: "近亲信息" },

    kinSalutation: { en: "Salutation", zh: "称谓" },
    kinSelectChoice: { en: "Select Choice", zh: "选择" },

    kinFirstGivenName: { en: "First given name", zh: "名" },
    kinOtherGivenNames: { en: "Other given name(s)", zh: "其他名" },
    kinSurname: { en: "Surname / Family Name", zh: "姓" },

    kinCurrentAddress: { en: "Current Address", zh: "目前地址" },
    kinMobile: { en: "Mobile", zh: "手机" },
    kinEmail: { en: "Email", zh: "邮箱" },
    kinRelationship: { en: "Your relationship to deceased?", zh: "你与逝者的关系" },

    uploadKinPhoto: (name) => ({
      en: `Upload photo identification for ${name}`,
      zh: `上传照片证件（${name}）`,
    }),
    uploadFilesText: { en: "Drag & Drop Files, or Choose Files to Upload", zh: "拖拽文件，或选择文件上传" },
    uploadFilesLimit: { en: "You can upload up to 2 files.", zh: "你可以上传最多两份文件" },

    signHere: { en: "Sign Your Name Here", zh: "签名" },
    clearSignature: { en: "[Clear Signature]", zh: "清除签名" },

    submit: { en: "Submit", zh: "递交" },
  };


  return (
    <>
      <section className="py-8 w-full md:max-w-5xl mx-auto px-6">
        <div className="rounded-xl p-8">
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
        </div>
      </section>

      <section className="py-8 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto md:px-6">
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow border border-gray-300">
            <form className="space-y-12" onSubmit={handleSubmit}>
              {/* ================= DECEASED DETAILS ================= */}
              <div>
                <h3 className="text-4xl text-center font-bold mb-6">

                  {isEnglish
                    ? translations.deceasedSectionTitle.en
                    : translations.deceasedSectionTitle.zh}

                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <FormLabel required>{isEnglish
                      ? translations.salutation.en
                      : translations.salutation.zh}</FormLabel>
                    <SelectField
                      options={salutations}
                      required
                      value={deceasedFormValues.salutation}
                      onChange={(e) => handleDeceasedChange("salutation", e.target.value)}
                    />
                  </div>

                  <div>
                    <FormLabel required>{isEnglish
                      ? translations.firstGivenName.en
                      : translations.firstGivenName.zh}</FormLabel>
                    <InputField
                      type="text"
                      value={deceasedFormValues.givenName}
                      onChange={(e) => handleDeceasedChange("givenName", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <FormLabel required>{isEnglish
                      ? translations.otherGivenNames.en
                      : translations.otherGivenNames.zh}</FormLabel>
                    <InputField
                      type="text"
                      onChange={(e) => handleDeceasedChange("otherNames", e.target.value)}
                    />
                  </div>

                  <div>
                    <FormLabel required>{isEnglish
                      ? translations.surname.en
                      : translations.surname.zh}</FormLabel>
                    <InputField
                      type="text"
                      value={deceasedFormValues.surname}
                      onChange={(e) => handleDeceasedChange("surname", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <FormLabel required>{isEnglish
                      ? translations.dateOfBirth.en
                      : translations.dateOfBirth.zh}</FormLabel>
                    <InputField
                      type="date"
                      value={deceasedFormValues.dateofbirth}
                      onChange={(e) => handleDeceasedChange("dateofbirth", e.target.value)}
                      required
                    />
                  </div>

                  <div className="flex items-center pt-8">
                    <input
                      type="checkbox"
                      id="not_passed"
                      checked={hasNotPassedAway}
                      onChange={(e) => setHasNotPassedAway(e.target.checked)}
                    />
                    <label htmlFor="not_passed" className="ml-2 text-gray-700 font-medium">
                      Person Has Not Passed Away
                    </label>
                  </div>

                  {!hasNotPassedAway && (
                    <div>
                      <FormLabel required>{isEnglish
                        ? translations.dateOfDeath.en
                        : translations.dateOfDeath.zh}</FormLabel>
                      <InputField
                        type="date"
                        value={deceasedFormValues.dateofdeath}
                        onChange={(e) => handleDeceasedChange("dateofdeath", e.target.value)}
                        required
                      />
                    </div>
                  )}

                  <div className="md:col-span-2">
                    <FormLabel required>{isEnglish
                      ? translations.deceasedCurrentPlace.en
                      : translations.deceasedCurrentPlace.zh}</FormLabel>
                    <InputField
                      placeholder="This is the address they have resided at for the last 3 months."
                      value={deceasedFormValues.deceasedpersonaddress}
                      onChange={(e) => handleDeceasedChange("deceasedpersonaddress", e.target.value)}
                      required
                    />
                  </div>

                  {!hasNotPassedAway && (
                    <div className="md:col-span-2">
                      <FormLabel required>{isEnglish
                        ? translations.deceasedPassedPlace.en
                        : translations.deceasedPassedPlace.zh}</FormLabel>
                      <InputField
                        value={deceasedFormValues.deceasedPassedReason}
                        onChange={(e) => handleDeceasedChange("deceasedPassedReason", e.target.value)}
                        required
                      />
                    </div>
                  )}

                  {!hasNotPassedAway && (
                    <div className="md:col-span-2">
                      <FormLabel required>{isEnglish
                        ? translations.deceasedPassedPlace.en
                        : translations.deceasedPassedPlace.zh}</FormLabel>     <InputField
                        placeholder="Eg: Home / Hospital"
                        value={deceasedFormValues.deceasedNow}
                        onChange={(e) => handleDeceasedChange("deceasedNow", e.target.value)}
                        required
                      />
                    </div>
                  )}

                  <div className="md:col-span-2">
                    <FormLabel required>{isEnglish
                      ? translations.batteryPoweredDevices.en
                      : translations.batteryPoweredDevices.zh}</FormLabel>  <InputField
                      placeholder="This includes all forms of pacemakers and defibrillators"
                      value={deceasedFormValues.batterypowereddevices}
                      onChange={(e) => handleDeceasedChange("batterypowereddevices", e.target.value)}
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <FormLabel required>{isEnglish
                      ? translations.regularDoctor.en
                      : translations.regularDoctor.zh}</FormLabel> <InputField
                      placeholder="Eg: Dr Adam Brown, Strathfield"
                      value={deceasedFormValues.regulardoctoraddress}
                      onChange={(e) => handleDeceasedChange("regulardoctoraddress", e.target.value)}
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <FormLabel required>{isEnglish
                      ? translations.uploadDeceasedPhoto.en
                      : translations.uploadDeceasedPhoto.zh}</FormLabel>  <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleDeceasedChange("photo", e.target.files[0])}
                      className="w-full p-3 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>

              {/* ================= NEXT OF KIN ================= */}
              <div>
                <h3 className="text-4xl text-center font-bold mb-6">
                  Next of Kin Details
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <FormLabel required>{isEnglish
                      ? translations.kinSalutation.en
                      : translations.kinSalutation.zh}</FormLabel>  <SelectField
                      options={salutations}
                      value={formKinValues.salutation}
                      onChange={(e) => handleKinChange("salutation", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <FormLabel required>{isEnglish
                      ? translations.kinFirstGivenName.en
                      : translations.kinFirstGivenName.zh}</FormLabel>  <InputField
                      value={formKinValues.givenName}
                      onChange={(e) => handleKinChange("givenName", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <FormLabel required>{isEnglish
                      ? translations.kinOtherGivenNames.en
                      : translations.kinOtherGivenNames.zh}</FormLabel> <InputField
                      onChange={(e) => handleKinChange("otherNames", e.target.value)}
                    />
                  </div>

                  <div>
                    <FormLabel required>{isEnglish
                      ? translations.kinSurname.en
                      : translations.kinSurname.zh}</FormLabel> <InputField
                      value={formKinValues.surname}
                      onChange={(e) => handleKinChange("surname", e.target.value)}
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <FormLabel required>{isEnglish
                      ? translations.kinCurrentAddress.en
                      : translations.kinCurrentAddress.zh}</FormLabel>  <InputField
                      value={formKinValues.currentAddress}
                      onChange={(e) => handleKinChange("currentAddress", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <FormLabel required>{isEnglish
                      ? translations.kinMobile.en
                      : translations.kinMobile.zh}</FormLabel>  <InputField
                      type="tel"
                      value={formKinValues.mobile}
                      onChange={(e) => handleKinChange("mobile", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <FormLabel required>{isEnglish
                      ? translations.kinEmail.en
                      : translations.kinEmail.zh}</FormLabel>   <InputField
                      type="email"
                      value={formKinValues.email}
                      onChange={(e) => handleKinChange("email", e.target.value)}
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <FormLabel required>{isEnglish
                      ? translations.kinRelationship.en
                      : translations.kinRelationship.zh}</FormLabel>  <InputField
                      value={formKinValues.relation}
                      onChange={(e) => handleKinChange("relation", e.target.value)}
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <FormLabel required>{isEnglish
                      ? translations.uploadKinPhoto.en
                      : translations.uploadKinPhoto.zh}</FormLabel>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => handlePhotoUpload(e.target.files)}
                      className="w-full p-3 border border-gray-300 rounded-md"
                    />

                    <div className="flex flex-wrap gap-3 mt-4">
                      {formKinValues.photo.map((file, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${index + 1}`}
                            className="w-32 h-32 object-cover rounded border"
                          />
                          <button
                            type="button"
                            onClick={() => removePhoto(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ================= SIGNATURE ================= */}
              <div>
                <h3 className="text-4xl text-center font-bold mb-6">
                  Signature
                </h3>
                <div>
                  <FormLabel required>{isEnglish
                    ? translations.salutation.en
                    : translations.salutation.zh}</FormLabel>     <select
                      value={signatureType}
                      onChange={(e) => setSignatureType(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black bg-white"
                    >
                    <option value="Digital Signature">Screen Signature</option>
                    <option value="Upload Photo">Upload Photo</option>
                  </select>
                </div>

                {signatureType === "Upload Photo" && (
                  <div className="mt-4">
                    <FormLabel required>Upload Your Signature Here</FormLabel>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleSignatureUpload(e.target.files)}
                      className="w-full p-3 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                )}

                {signatureType === "Digital Signature" && (
                  <div className="mt-4">
                    <FormLabel required>{isEnglish
                      ? translations.salutation.en
                      : translations.salutation.zh}</FormLabel>  <div className="border rounded-md bg-gray-50 p-2">
                      <SignatureField
                        sigPadRef={sigCanvasRef}
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
                  </div>
                )}
              </div>

              {/* Error and Success Messages */}
              {error && (
                <div className="p-4 bg-red-50 text-red-700 rounded-lg">
                  {error}
                </div>
              )}

              {message && (
                <div className="p-4 bg-green-50 text-green-700 rounded-lg">
                  {message}
                </div>
              )}

              {/* ================= SUBMIT ================= */}
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

export default AgreementForm;