import { useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { pdf } from "@react-pdf/renderer";
import { useLocation, useNavigate } from "react-router-dom";
import base64ToFile from "../../utility";
const CORE = import.meta.env.VITE_API_URL;
import Paragraph from "./aggrementComponent/Paragraph";
import SignatureField from "./_components/SignatureField";
import StaticInvoicePDF from "./_components/StaticInvoicePDF";
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

  const [notPassed, setNotPassed] = useState(false);
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
    photo: []
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
    if (!sigCanvasRef.current) return null;

    try {
      const dataUrl = await sigCanvasRef.current.exportImage("png"); // base64
      if (!dataUrl) return null;
      const file = base64ToFile(dataUrl, "signature.png");

      setFormKinValues((prev) => ({
        ...prev,
        sign: file,
      }));

      return file;
    } catch (error) {
      console.error("Error saving signature:", error);
      return null;
    }
  };
  const removeDeceasedPhoto = (index) => {
    setDeceasedFormValues((prev) => ({
      ...prev,
      photo: prev.photo.filter((_, i) => i !== index),
    }));
  };

  const clearSignature = () => {
    if (sigCanvasRef.current) {
      sigCanvasRef.current.clearCanvas();
    }

    setFormKinValues((prev) => ({
      ...prev,
      sign: null,
    }));
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
  const handleDeceasedPhotoUpload = (files) => {
    const fileArray = Array.from(files);

    setDeceasedFormValues((prev) => ({
      ...prev,
      photo: [...prev.photo, ...fileArray].slice(0, 2),
    }));
  };

  const removeKinPhoto = (index) => {
    setFormKinValues((prev) => ({
      ...prev,
      photo: prev.photo.filter((_, i) => i !== index),
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

      const deceasedFD = new FormData();

      Object.entries(deceasedFormValues).forEach(([key, value]) => {
        if (key !== "photo") {
          deceasedFD.append(key, value);
        }
      });

      deceasedFormValues.photo.forEach((file) => {
        deceasedFD.append("photo", file);
      });

      const deceasedRes = await fetch(`${CORE}/desencepersondetailsanswer`, {
        method: "POST",
        credentials: "include",
        body: deceasedFD,
      });


      if (!deceasedRes.ok) {
        const text = await deceasedRes.text();
        throw new Error(text || "Failed to save deceased details");
      }


      // 6. Save next of kin details
      const signFile = await saveSignature();
      if (!signFile) {
        alert("Please provide a signature");
        return;
      }
      console.log({ signFile });
      await new Promise((r) => setTimeout(r, 0));

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
        console.error(await resforkin.text());
        return;
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
      // setTimeout(() => {
      //   navigate("/");
      // }, 2000);

    } catch (err) {
      console.error("Submit error:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const deceasedLabel = deceasedFormValues.givenName || "deceased"
  const kinLabel = formKinValues.givenName || "Next of kin"

  const translations = {
    deceasedSectionTitle: { en: "Deceased Person Details", zh: "逝者信息" },
    salutation: { en: "Salutation", zh: "称谓" },
    selectChoice: { en: "Select Choice", zh: "选择" },
    firstGivenName: { en: "First given name", zh: "名" },
    otherGivenNames: { en: "Other given name(s)", zh: "其他名" },
    surname: { en: "Surname / Family Name", zh: "姓" },
    dateOfBirth: { en: "Date of Birth", zh: "出生年月" },
    dobPlaceholder: { en: "dd/mm/yyyy", zh: "日/月/年" },
    dateOfDeath: { en: "Date of Death", zh: "过世日期" },
    dodPlaceholder: { en: "dd/mm/yyyy", zh: "日/月/年" },
    personNotPassed: { en: "person has not passed away", zh: "还未过世" },
    lastRegisteredAddress: {
      en: "Last registered address of the deceased",
      zh: "最近注册过的居住地址",
    },
    lastAddressPlaceholder: {
      en: "This is the address they have resided at for the last 3 months.",
      zh: "此地址为过去三个月居住的地方",
    },
    deceasedPassedPlace: { en: `Where did  ${deceasedLabel} pass away?`, zh: "逝者过世 地点" },
    deceasedCurrentPlace: { en: `Where is  ${deceasedLabel} now?`, zh: "逝者现在在哪里" },
    deceasedCurrentPlacePlaceholder: { en: "Eg: Home / Hospital", zh: "比如：家中/医院" },
    batteryPoweredDevices: { en: `Does the ${deceasedLabel} have any form of battery powered devices?`, zh: "逝者身上是否有由电池驱动的仪器？" },
    batteryDevicesPlaceholder: { en: "This includes all forms of pacemakers and defibrillators", zh: "这包括所有的起搏器和除颤器" },
    regularDoctor: { en: `Who is the ${deceasedLabel}'s regular doctor (GP) & surgery address?`, zh: "逝者的家庭医生名字和诊所地址" },
    regularDoctorPlaceholder: { en: "Eg: Dr Adam Brown, Strathfield", zh: "比如：Adam Brown 医生，Strathfield" },
    uploadDeasedPhoto: {
      en: `Upload photo identification for ${deceasedLabel}`,
      zh: `上传照片证件 `,
    },
    nextOfKinSectionTitle: { en: "Next of Kin Details", zh: "近亲信息" },
    kinSalutation: { en: "Salutation", zh: "称谓" },
    kinSelectChoice: { en: "Select Choice", zh: "选择" },
    kinFirstGivenName: { en: "First given name", zh: "名" },
    kinOtherGivenNames: { en: "Other given name(s)", zh: "其他名" },
    kinSurname: { en: "Surname / Family Name", zh: "姓" },
    kinCurrentAddress: { en: "Current Address", zh: "目前地址" },
    kinMobile: { en: "Mobile", zh: "手机" },
    kinEmail: { en: "Email", zh: "邮箱" },
    kinRelationship: { en: `Your relationship to ${deceasedLabel}?`, zh: "你与逝者的关系" },
    uploadKinPhoto: {
      en: `Upload photo identification for ${kinLabel}`,
      zh: `上传照片证件 `,
    },
    uploadFilesText: { en: "Drag & Drop Files, or Choose Files to Upload", zh: "拖拽文件，或选择文件上传" },
    uploadFilesLimit: { en: "You can upload up to 2 files.", zh: "你可以上传最多两份文件" },

    signHere: { en: "Sign Your Name Here", zh: "签名" },
    clearSignature: { en: "[Clear Signature]", zh: "清除签名" },

    submit: { en: "Submit", zh: "递交" },
  };


  return (
    <>

      <Paragraph />
      <section className="py-8 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto md:px-6">
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow border border-gray-300">
            <form className="space-y-12" onSubmit={handleSubmit}>
              {/* ================= DECEASED DETAILS ================= */}
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
                  <div className="flex items-center w-full md:col-span-2">
                    <input
                      type="checkbox"
                      checked={notPassed}
                      onChange={(e) => setNotPassed(e.target.checked)}
                      className="w-5 h-5 mr-2"
                    />
                    <span className="font-medium">
                      {isEnglish ? translations.personNotPassed.en : translations.personNotPassed.zh}
                    </span>
                  </div>


                  {!notPassed && (
                    <div>
                      <FormLabel required>
                        {isEnglish
                          ? translations.dateOfBirth.en
                          : translations.dateOfBirth.zh}
                      </FormLabel>
                      <InputField
                        type="date"
                        value={deceasedFormValues.dateofdeath}
                        onChange={(e) => handleDeceasedChange("dateofdeath", e.target.value)}
                        required
                      />

                    </div>
                  )}

                  <div className="md:col-span-2">
                    <FormLabel required>
                      {isEnglish ? translations.lastRegisteredAddress.en : translations.lastRegisteredAddress.zh}
                    </FormLabel>

                    <InputField
                      required
                      value={deceasedFormValues.deceasedpersonaddress}
                      onChange={(e) =>
                        handleDeceasedChange("deceasedpersonaddress", e.target.value)
                      }
                      placeholder={
                        isEnglish
                          ? "This is the address they have resided at for the last 3 months."
                          : "此地址为过去三个月居住的地方"
                      }
                    />
                  </div>

                  {!notPassed && (
                    <>
                      <div className="md:col-span-2">
                        <FormLabel required>
                          {isEnglish ? translations.deceasedPassedPlace.en : translations.deceasedPassedPlace.zh}

                        </FormLabel>

                        <InputField required onChange={(e) => handleDeceasedChange("deceasedNow", e.target.value)}
                          placeholder={
                            isEnglish
                              ? "This is the address they have resided at for the last 3 months."
                              : "此地址为过去三个月居住的地方"
                          } />
                      </div>
                      <div className="md:col-span-2">
                        <FormLabel required>
                          {isEnglish ? translations.deceasedCurrentPlace.en : translations.deceasedCurrentPlace.zh}

                        </FormLabel>

                        <InputField
                          placeholder={
                            isEnglish ? "Eg: Home / Hospital" : "比如：家中/医院"
                          }
                          value={deceasedFormValues.deceasedPassedReason}
                          onChange={(e) =>
                            handleDeceasedChange("deceasedPassedReason", e.target.value)
                          }

                          required
                        />
                      </div>
                    </>
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
                    <FormLabel required>
                      {isEnglish ? translations.uploadDeasedPhoto.en : translations.uploadDeasedPhoto.zh}
                    </FormLabel>

                    <label className="flex flex-col  items-center justify-center w-full  border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition group ">
                      <div className="flex flex-col items-center justify-center text-center p-4">
                        <svg
                          className="w-12 h-12 mb-3 mt-5 text-gray-400 group-hover:text-black transition"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>

                        <p className="text-sm text-gray-500 mb-4">
                          {isEnglish ? (
                            <>
                              You can upload up to 2 images <br /> (Only .jpg, .jpeg,
                              .png, .heic files are allowed)
                            </>
                          ) : (
                            <>
                              您最多可以上传 2 张图片 <br /> （仅允许
                              .jpg、.jpeg、.png、.heic 文件）
                            </>
                          )}
                        </p>
                      </div>

                      <input
                        type="file"
                        required
                        onChange={(e) => handleDeceasedPhotoUpload(e.target.files)}

                      />
                    </label>


                  </div>
                  <div className="md:col-span-2">
                    <div className="flex flex-wrap gap-2">
                      {deceasedFormValues?.photo?.map((file, index) => (
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
                    <FormLabel required>
                      {isEnglish ? translations.uploadKinPhoto.en : translations.uploadKinPhoto.zh}

                    </FormLabel>

                    <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition group">
                      <div className="flex flex-col items-center justify-center text-center p-4">
                        <svg
                          className="w-12 h-12 mb-3 mt-5 text-gray-400 group-hover:text-black transition"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>

                        <p className="font-semibold text-gray-900">
                          {isEnglish
                            ? "Drag & drop files here, or click to upload"
                            : "拖放文件到此处，或点击上传"}
                        </p>

                        <p className="text-sm text-gray-500 mb-4">
                          {isEnglish ? (
                            <>
                              You can upload up to 2 images <br /> (Only .jpg, .jpeg,
                              .png, .heic files are allowed)
                            </>
                          ) : (
                            <>
                              您最多可以上传 2 张图片 <br /> （仅允许
                              .jpg、.jpeg、.png、.heic 文件）
                            </>
                          )}
                        </p>
                      </div>

                      <input
                        type="file"
                        onChange={(e) => handlePhotoUpload(e.target.files)}
                      />
                    </label>
                  </div>
                  <div className="md:col-span-2">
                    <div className="flex flex-wrap gap-2">
                      {formKinValues?.photo?.map((file, index) => (
                        <div key={index} className="relative inline-block">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${index + 1}`}
                            className="w-52 object-cover border rounded"
                          />

                          <button
                            type="button"
                            onClick={() => removeKinPhoto(index)}
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

              {/* ================= SIGNATURE ================= */}
              <div>
                <h3 className="text-4xl text-center font-bold mb-6">
                  {isEnglish ? "Signature" : "签名"}
                </h3>

                <div>
                  <FormLabel required>
                    {isEnglish ? "Choose Your Signature Type" : "选择签名方式"}
                  </FormLabel>

                  <select
                    value={signatureType}
                    onChange={(e) => setSignatureType(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black bg-white"
                  >
                    <option value="Digital Signature">
                      {isEnglish ? "Screen Signature" : "屏幕签名"}
                    </option>
                    <option value="Upload Photo">
                      {isEnglish ? "Upload Photo" : "上传照片"}
                    </option>
                  </select>
                </div>

                {/* Upload Signature Image */}
                {signatureType === "Upload Photo" && (
                  <div className="mt-4">
                    <FormLabel required>
                      {isEnglish ? "Upload Your Signature Here" : "在此上传您的签名"}
                    </FormLabel>

                    <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition group p-1">
                      <div className="flex flex-col items-center justify-center text-center py-4">
                        <svg
                          className="w-12 h-12 mb-3 mt-5 text-gray-400 group-hover:text-black transition"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>

                        <p className="font-semibold text-gray-900">
                          {isEnglish
                            ? "Drag & drop files here, or click to upload"
                            : "将文件拖放到此处，或点击上传"}
                        </p>

                        <p className="text-sm text-gray-500 mb-4">
                          {isEnglish
                            ? "(Only .jpg, .jpeg, .png, .heic files are allowed)"
                            : "（仅允许 .jpg、.jpeg、.png、.heic 文件）"}
                        </p>
                      </div>

                      <input
                        type="file"
                        required
                        accept="image/*"

                      />
                    </label>

                    <div className="md:col-span-2">
                      <div className="flex flex-wrap gap-2">
                        {formKinValues?.photo?.map((file, index) => (
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


                )}

                {/* Digital Signature */}
                {signatureType === "Digital Signature" && (
                  <div className="mt-4">
                    <FormLabel required>
                      {isEnglish ? "Sign Your Name Here" : "请在此签名"}
                    </FormLabel>

                    <div className="border rounded-md bg-gray-50 p-2">
                      <SignatureField
                        sigPadRef={sigCanvasRef}
                        saveSignature={saveSignature}
                        clearSignature={clearSignature}
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