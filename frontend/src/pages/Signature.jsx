import { useEffect, useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Hero from './../components/common/Hero'
import base64ToFile from "../utility";
import SignatureField from "./packages/_components/SignatureField";
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

const Signature = () => {
  const salutations = ["Mr", "Mrs", "Ms", "Miss", "Dr", "Other"];

  const [signatureType, setSignatureType] = useState("Digital Signature");

  const [isEnglish, setIsEnglish] = useState(true); // English default

  const [signatureForm, setSignatureForm] = useState({
    deaceasedSalutation: "",
    deaceasedGivenName: "",
    deaceasedSurname: "",

    nextToKeenSalutation: "",
    nextToKeenGivenName: "",
    nextToKeenOtherGivenName: "",
    nextToKeenSurname: "",
    nextToKeenCurrentAddress: "",
    nextToKeenMobile: "",
    nextToKeenEmail: "",
    nextToKeenRelation: "",

    nextToKeenPhoto: [],
    nextToKeenSignPhoto: "",
    nextToKeenSign: null,
  });

  const Deceased = isEnglish ? "the deceased" : "去世";
  const NextOfKin = isEnglish ? "the next of kin" : "近亲";

  // for mobile camera feature
  useEffect(() => {
    return () => {
      signatureForm.nextToKeenPhoto.forEach(file =>
        URL.revokeObjectURL(file)
      );
    };
  }, [signatureForm.nextToKeenPhoto]);

  const [error, setError] = useState("");
  const sigCanvasRef = useRef(null);

  const saveSignature = async () => {
    if (!sigCanvasRef.current) return null;

    try {
      const dataUrl = await sigCanvasRef.current.exportImage("png"); // base64
      if (!dataUrl) return null;
      const file = base64ToFile(dataUrl, "signatureRegister.png");

      setSignatureForm((prev) => ({
        ...prev,
        nextToKeenSign: file,
      }));

      return file;
    } catch (error) {
      console.error("Error saving signature:", error);
      return null;
    }
  };

  const clearSignature = () => {
    if (sigCanvasRef.current) {
      sigCanvasRef.current.clearCanvas();
    }

    setSignatureForm((prev) => ({
      ...prev,
      nextToKeenSign: null,
    }));
  };

  const handleKinPhotoUpload = (files) => {
    const fileArray = Array.from(files);

    setSignatureForm((prev) => ({
      ...prev,
      nextToKeenPhoto: [...prev.nextToKeenPhoto, ...fileArray].slice(0, 2),
    }));
  };

  const handleSignatureChange = (field, value) => {
    setSignatureForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const removeKinPhoto = (index) => {
    setSignatureForm((prev) => {
      const newPhotos = [...prev.nextToKeenPhoto];
      const removedFile = newPhotos[index];
      URL.revokeObjectURL(removedFile);
      newPhotos.splice(index, 1);

      return {
        ...prev,
        nextToKeenPhoto: newPhotos,
      };
    });
  };

  const removeKinSignPhoto = () => {
    setSignatureForm((prev) => {
      if (prev.nextToKeenSign && prev.nextToKeenSign instanceof File) {
        URL.revokeObjectURL(prev.nextToKeenSign);
      }
      return {
        ...prev,
        nextToKeenSign: null,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 1. Register the user (if needed)
      const registerPayload = {
        email: signatureForm.nextToKeenEmail,
        password: signatureForm.deaceasedGivenName,
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

      // 2. Login the user
      const loginRes = await fetch(`${CORE}/blacktulipauth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerPayload),
        credentials: "include",
      });

      if (!loginRes.ok) {
        const errorData = await loginRes.json();
        throw new Error(errorData.message || "Login failed");
      }

      // 3. Handle signature based on type
      let signFile = null;

      if (signatureType === "Digital Signature") {
        signFile = await saveSignature();
        if (!signFile) {
          setError("Please provide a signature");
          return;
        }
      } else if (signatureType === "Upload Photo") {
        signFile = signatureForm.nextToKeenSign;
        if (!signFile) {
          setError("Please upload a signature photo");
          return;
        }
      }

      // 4. Prepare FormData - Use EXACT field names expected by Multer
      const formData = new FormData();

      // Add all text fields
      formData.append("deaceasedSalutation", signatureForm.deaceasedSalutation);
      formData.append("deaceasedGivenName", signatureForm.deaceasedGivenName);
      formData.append("deaceasedSurname", signatureForm.deaceasedSurname);
      formData.append("nextToKeenSalutation", signatureForm.nextToKeenSalutation);
      formData.append("nextToKeenGivenName", signatureForm.nextToKeenGivenName);
      formData.append("nextToKeenOtherGivenName", signatureForm.nextToKeenOtherGivenName || "");
      formData.append("nextToKeenSurname", signatureForm.nextToKeenSurname);
      formData.append("nextToKeenCurrentAddress", signatureForm.nextToKeenCurrentAddress);
      formData.append("nextToKeenMobile", signatureForm.nextToKeenMobile);
      formData.append("nextToKeenEmail", signatureForm.nextToKeenEmail);
      formData.append("nextToKeenRelation", signatureForm.nextToKeenRelation);

      // Add photos - Multer expects field name "photo" for multiple files
      signatureForm.nextToKeenPhoto.forEach((file) => {
        formData.append("photo", file); // Field name must match Multer config
      });

      // Add signature file - Multer expects field name "sign" for single file
      if (signFile) {
        formData.append("sign", signFile); // Field name must match Multer config
      }

      // 5. Submit to signature endpoint
      const deceasedRes = await fetch(`${CORE}/signature-register`, {
        method: "POST",
        credentials: "include",
        // DO NOT set Content-Type header - let browser set it with boundary
        body: formData,
      });

      if (!deceasedRes.ok) {
        const errorData = await deceasedRes.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to save signature details");
      }

      const result = await deceasedRes.json();
      console.log("Form submitted successfully:", result);

      alert("Signature details saved successfully!");

    } catch (error) {
      console.error("Submit error:", error);
      setError(error.message || "An error occurred. Please try again.");
    }
  };


  return (
    <>
      <Hero title={"Additional Next of Kin"} subtitle={"Signature"} />

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

            <form className="space-y-12" onSubmit={handleSubmit}>
              {/* ================= DECEASED DETAILS ================= */}
              <div>
                <h3 className="text-4xl text-center font-bold mb-6">
                  {isEnglish ? "Deceased Persons Details" : "逝者信息"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Salutation */}
                  <div>
                    <FormLabel required>
                      {isEnglish ? "Salutation" : "称谓"}
                    </FormLabel>
                    <SelectField
                      options={salutations}
                      required
                      value={signatureForm.deaceasedSalutation}
                      onChange={(e) => handleSignatureChange("deaceasedSalutation", e.target.value)}
                    />
                  </div>

                  {/* Given Name */}
                  <div>
                    <FormLabel required>
                      {isEnglish ? "Given Name" : "名"}
                    </FormLabel>
                    <InputField
                      value={signatureForm.deaceasedGivenName}
                      onChange={(e) => handleSignatureChange("deaceasedGivenName", e.target.value)}
                      required
                    />
                  </div>

                  {/* Surname */}
                  <div className="md:col-span-2">
                    <FormLabel required>
                      {isEnglish ? "Surname / Family Name" : "姓"}
                    </FormLabel>
                    <InputField
                      value={signatureForm.deaceasedSurname}
                      onChange={(e) => handleSignatureChange("deaceasedSurname", e.target.value)}
                      required
                    />
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
                    <FormLabel required>
                      {isEnglish ? "Salutation" : "称谓"}
                    </FormLabel>
                    <SelectField
                      options={salutations}
                      required
                      value={signatureForm.nextToKeenSalutation}
                      onChange={(e) => handleSignatureChange("nextToKeenSalutation", e.target.value)}
                    />
                  </div>

                  <div>
                    <FormLabel required>
                      {isEnglish ? "First given name" : "名"}
                    </FormLabel>
                    <InputField
                      value={signatureForm.nextToKeenGivenName}
                      onChange={(e) => handleSignatureChange("nextToKeenGivenName", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <FormLabel>
                      {isEnglish ? "Other given name(s)" : "其他名"}
                    </FormLabel>
                    <InputField
                      value={signatureForm.nextToKeenOtherGivenName}
                      onChange={(e) => handleSignatureChange("nextToKeenOtherGivenName", e.target.value)}
                    />
                  </div>

                  <div>
                    <FormLabel required>
                      {isEnglish ? "Surname / Family Name" : "姓"}
                    </FormLabel>
                    <InputField
                      value={signatureForm.nextToKeenSurname}
                      onChange={(e) => handleSignatureChange("nextToKeenSurname", e.target.value)}
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <FormLabel required>
                      {isEnglish ? "Current Address" : "现住地址"}
                    </FormLabel>
                    <InputField
                      value={signatureForm.nextToKeenCurrentAddress}
                      onChange={(e) => handleSignatureChange("nextToKeenCurrentAddress", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <FormLabel required>{isEnglish ? "Mobile" : "手机"}</FormLabel>
                    <InputField
                      type="tel"
                      value={signatureForm.nextToKeenMobile}
                      onChange={(e) => handleSignatureChange("nextToKeenMobile", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <FormLabel required>{isEnglish ? "Email" : "邮箱"}</FormLabel>
                    <InputField
                      type="email"
                      value={signatureForm.nextToKeenEmail}
                      onChange={(e) => handleSignatureChange("nextToKeenEmail", e.target.value)}
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <FormLabel>
                      {isEnglish
                        ? `Your relationship to ${signatureForm.deaceasedGivenName || "Deceased"}`
                        : `您与${signatureForm.deaceasedGivenName || "去世"}的关系`}
                    </FormLabel>
                    <InputField
                      value={signatureForm.nextToKeenRelation}
                      onChange={(e) => handleSignatureChange("nextToKeenRelation", e.target.value)}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <FormLabel>
                      {isEnglish
                        ? `Upload photo identification for ${signatureForm.nextToKeenGivenName}`
                        : `上传${signatureForm.nextToKeenGivenName}的照片证件`}
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
                              You can upload up to 2 images <br /> (Only .jpg,
                              .jpeg, .png, .heic files are allowed)
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
                        multiple
                        accept="image/*"
                        onChange={(e) => handleKinPhotoUpload(e.target.files)}
                        className="hidden"
                      />
                    </label>

                    {signatureForm.nextToKeenPhoto.length > 0 && (
                      <div className="mt-4">
                        <div className="flex flex-wrap gap-2">
                          {signatureForm.nextToKeenPhoto.map((file, index) => (
                            <div key={index} className="relative inline-block">
                              <img
                                src={URL.createObjectURL(file)}
                                alt={`Preview ${index + 1}`}
                                className="w-52 h-32 object-cover border rounded"
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
                    )}
                  </div>

                  {error && (
                    <p className="text-red-500 mt-2 text-sm">{error}</p>
                  )}
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
                      {isEnglish
                        ? "Upload Your Signature Here"
                        : "在此上传您的签名"}
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
                        accept="image/*"
                        onChange={(e) =>
                          setSignatureForm((prev) => ({
                            ...prev,
                            nextToKeenSign: e.target.files[0],
                          }))
                        }
                        className="hidden"
                      />
                    </label>

                    {signatureForm.nextToKeenSign && (
                      <div className="mt-4 relative inline-block">
                        <img
                          src={URL.createObjectURL(signatureForm.nextToKeenSign)}
                          alt="Signature preview"
                          className="w-52 border rounded"
                        />
                        <button
                          type="button"
                          onClick={removeKinSignPhoto}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    )}
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

export default Signature;