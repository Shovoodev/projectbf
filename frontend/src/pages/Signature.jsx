import { useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import SignatureCanvas from "react-signature-canvas";
import DatePicker from "react-datepicker";

import Hero from "../components/common/Hero";
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

const Signature = () => {
  const salutations = ["Mr", "Mrs", "Ms", "Miss", "Dr", "Other"];

  const [firstName, setFirstName] = useState("");
  const [kinFirstName, setKinFirstName] = useState("");

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
      <Hero title={"Additional Next of Kin"} subtitle={"Signiture"} />

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
                    <SelectField options={salutations} required />
                  </div>

                  {/* Given Name */}
                  <div>
                    <FormLabel required>
                      {isEnglish ? "Given Name" : "名"}
                    </FormLabel>
                    <InputField
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>

                  {/* Surname */}
                  <div className="md:col-span-2">
                    <FormLabel required>
                      {isEnglish ? "Surname / Family Name" : "姓"}
                    </FormLabel>
                    <InputField required />
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
                    <SelectField options={salutations} required />
                  </div>

                  <div>
                    <FormLabel required>
                      {isEnglish ? "First given name" : "名"}
                    </FormLabel>
                    <InputField
                      onChange={(e) => setKinFirstName(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <FormLabel>
                      {isEnglish ? "Other given name(s)" : "其他名"}
                    </FormLabel>
                    <InputField />
                  </div>

                  <div>
                    <FormLabel required>
                      {isEnglish ? "Surname / Family Name" : "姓"}
                    </FormLabel>
                    <InputField required />
                  </div>

                  <div className="md:col-span-2">
                    <FormLabel required>
                      {isEnglish ? "Current Address" : "现住地址"}
                    </FormLabel>
                    <InputField required />
                  </div>

                  <div>
                    <FormLabel required>
                      {isEnglish ? "Mobile" : "手机号码"}
                    </FormLabel>
                    <InputField type="tel" required />
                  </div>

                  <div>
                    <FormLabel required>
                      {isEnglish ? "Email" : "邮箱"}
                    </FormLabel>
                    <InputField type="email" required />
                  </div>

                  <div className="md:col-span-2">
                    <FormLabel required>
                      {isEnglish
                        ? `Your relationship to ${nameLabel}`
                        : `您与${nameLabel}的关系`}
                    </FormLabel>
                    <InputField required />
                  </div>

                  <div className="md:col-span-2">
                    <FormLabel required>
                      {isEnglish
                        ? `Upload photo identification for ${kinNameValue}`
                        : `上传${kinNameValue}的照片证件`}
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
                        required
                        accept="image/*"
                        onChange={handleKinIdUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {uploadError && (
                    <p className="text-red-500 mt-2 text-sm">{uploadError}</p>
                  )}

                  <div className="md:col-span-2">
                    <div className="flex flex-wrap gap-2">
                      {kinIdImages.map((file, index) => (
                        <div key={index} className="relative inline-block">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${index + 1}`}
                            className="w-52 object-cover border rounded"
                          />

                          <button
                            type="button"
                            onClick={() => removeImage(index, "kin")}
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
                        multiple
                        required
                        accept="image/*"
                        onChange={signatureHandler}
                        className="hidden"
                      />
                    </label>

                    <div className="md:col-span-2 mt-4">
                      <div className="flex flex-wrap gap-2">
                        {signatureImage.map((file, index) => (
                          <div key={index} className="relative inline-block">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Preview ${index + 1}`}
                              className="w-52 object-cover border rounded"
                            />

                            <button
                              type="button"
                              onClick={() => removeImage(index, "signature")}
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
                      <SignatureCanvas
                        ref={sigPadRef}
                        penColor="black"
                        canvasProps={{ className: "w-full h-32" }}
                      />

                      <button
                        type="button"
                        onClick={() => sigPadRef.current.clear()}
                        className="mt-2 text-sm text-red-500"
                      >
                        {isEnglish ? "Clear Signature" : "清除签名"}
                      </button>
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
