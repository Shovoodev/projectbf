import { useEffect, useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Hero from "./../components/common/Hero";
import base64ToFile from "../utility";
import SignatureField from "./packages/_components/SignatureField";
import { showToast } from "../utility/toast";
import { Navigate } from "react-router-dom";

const CORE = import.meta.env.VITE_API_URL;

/* ================= Reusable Components ================= */

const FormLabel = ({ children, required }) => (
  <label className="block text-lg font-bold text-gray-700 mb-1">
    {children} {required && <span className="text-red-500">*</span>}
  </label>
);

const InputField = ({ type = "text", placeholder, required, value, onChange }) => (
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
  const [isEnglish, setIsEnglish] = useState(true);

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

    nextToKeenPhoto: [], // File[]
    nextToKeenSign: null, // File | null
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [accountPassword, setAccountPassword] = useState("");
  const [confirmAccountPassword, setConfirmAccountPassword] = useState("");

  const sigCanvasRef = useRef(null);

  // ✅ previews (avoid URL.createObjectURL inside JSX)
  const [kinPhotoPreviews, setKinPhotoPreviews] = useState([]); // string[]
  const [signPreview, setSignPreview] = useState(""); // string

  // cleanup previews on unmount
  useEffect(() => {
    return () => {
      kinPhotoPreviews.forEach((u) => URL.revokeObjectURL(u));
      if (signPreview) URL.revokeObjectURL(signPreview);
    };
  }, [kinPhotoPreviews, signPreview]);

  const handleSignatureChange = (field, value) => {
    setSignatureForm((prev) => ({ ...prev, [field]: value }));
  };

  const saveSignature = async () => {
    if (!sigCanvasRef.current) return null;

    try {
      const dataUrl = await sigCanvasRef.current.exportImage("png");
      if (!dataUrl) return null;

      const file = base64ToFile(dataUrl, "signatureRegister.png");
      setSignatureForm((prev) => ({ ...prev, nextToKeenSign: file }));

      // ✅ set preview url for digital signature too
      const url = URL.createObjectURL(file);
      setSignPreview((prevUrl) => {
        if (prevUrl) URL.revokeObjectURL(prevUrl);
        return url;
      });

      return file;
    } catch (err) {
      console.error("Error saving signature:", err);
      return null;
    }
  };

  const clearSignature = () => {
    if (sigCanvasRef.current) sigCanvasRef.current.clearCanvas();

    setSignatureForm((prev) => ({ ...prev, nextToKeenSign: null }));
    setSignPreview((prevUrl) => {
      if (prevUrl) URL.revokeObjectURL(prevUrl);
      return "";
    });
  };

  // ✅ ID photo upload (max 2)
  const handleKinPhotoUpload = (fileList) => {
    const files = Array.from(fileList || []).filter((f) =>
      f.type.startsWith("image/")
    );

    if (!files.length) return;

    // take only remaining slots
    const remaining = 2 - signatureForm.nextToKeenPhoto.length;
    const pick = files.slice(0, remaining);

    if (!pick.length) return;

    setSignatureForm((prev) => ({
      ...prev,
      nextToKeenPhoto: [...prev.nextToKeenPhoto, ...pick].slice(0, 2),
    }));

    const urls = pick.map((f) => URL.createObjectURL(f));
    setKinPhotoPreviews((prev) => [...prev, ...urls].slice(0, 2));
  };

  const removeKinPhoto = (index) => {
    setSignatureForm((prev) => {
      const next = [...prev.nextToKeenPhoto];
      next.splice(index, 1);
      return { ...prev, nextToKeenPhoto: next };
    });

    setKinPhotoPreviews((prev) => {
      const next = [...prev];
      if (next[index]) URL.revokeObjectURL(next[index]);
      next.splice(index, 1);
      return next;
    });
  };

  // ✅ signature upload preview
  const handleSignUpload = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Signature must be an image file (jpg/png/heic)");
      return;
    }

    setSignatureForm((prev) => ({ ...prev, nextToKeenSign: file }));

    const url = URL.createObjectURL(file);
    setSignPreview((prevUrl) => {
      if (prevUrl) URL.revokeObjectURL(prevUrl);
      return url;
    });
  };

  const removeKinSignPhoto = () => {
    setSignatureForm((prev) => ({ ...prev, nextToKeenSign: null }));
    setSignPreview((prevUrl) => {
      if (prevUrl) URL.revokeObjectURL(prevUrl);
      return "";
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      if (!accountPassword) {
        throw new Error("Password is required");
      }

      if (accountPassword.length < 8) {
        throw new Error("Password must be at least 8 characters");
      }

      if (accountPassword !== confirmAccountPassword) {
        throw new Error("Passwords do not match");
      }

      // 1) Register
      const registerPayload = {
        email: signatureForm.nextToKeenEmail,
        password: accountPassword,
      };

      const responseUser = await fetch(`${CORE}/blacktulipauth/newuser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerPayload),
      });

      if (!responseUser.ok) {
        const errorData = await responseUser.json().catch(() => ({}));
        throw new Error(errorData.message || "Registration failed");
      }

      // 2) Login
      const loginRes = await fetch(`${CORE}/blacktulipauth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerPayload),
        credentials: "include",
      });

      if (!loginRes.ok) {
        const errorData = await loginRes.json().catch(() => ({}));
        throw new Error(errorData.message || "Login failed");
      }

      // 3) Ensure signature file exists
      let signFile = null;

      if (signatureType === "Digital Signature") {
        signFile = await saveSignature();
        if (!signFile) throw new Error("Please provide a signature");
      } else {
        signFile = signatureForm.nextToKeenSign;
        if (!signFile) throw new Error("Please upload a signature photo");
      }

      // 4) Build FormData (IMPORTANT field names: photo + sign)
      const formData = new FormData();

      formData.append("deaceasedSalutation", signatureForm.deaceasedSalutation);
      formData.append("deaceasedGivenName", signatureForm.deaceasedGivenName);
      formData.append("deaceasedSurname", signatureForm.deaceasedSurname);

      formData.append("nextToKeenSalutation", signatureForm.nextToKeenSalutation);
      formData.append("nextToKeenGivenName", signatureForm.nextToKeenGivenName);
      formData.append(
        "nextToKeenOtherGivenName",
        signatureForm.nextToKeenOtherGivenName || ""
      );
      formData.append("nextToKeenSurname", signatureForm.nextToKeenSurname);
      formData.append("nextToKeenCurrentAddress", signatureForm.nextToKeenCurrentAddress);
      formData.append("nextToKeenMobile", signatureForm.nextToKeenMobile);
      formData.append("nextToKeenEmail", signatureForm.nextToKeenEmail);
      formData.append("nextToKeenRelation", signatureForm.nextToKeenRelation);

      signatureForm.nextToKeenPhoto.forEach((file) => {
        formData.append("photo", file); // ✅ multer field
      });

      formData.append("sign", signFile); // ✅ multer field

      // 5) Submit
      const deceasedRes = await fetch(`${CORE}/signature-register`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const out = await deceasedRes.json().catch(() => ({}));

      if (!deceasedRes.ok) {
        throw new Error(out?.message || "Failed to save signature details");
      }
      showToast.success("Signature Saved successFully ")
      setTimeout(() => {
        Navigate("/")
      }, 400);
      console.log("Signature register response:", out);
    } catch (err) {
      console.error("Submit error:", err);
      setError(err?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Hero title={"Additional Next of Kin"} subtitle={"Signature"} />

      <section className="py-8 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto md:px-6">
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow border border-gray-300">
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
                  <div>
                    <FormLabel required>{isEnglish ? "Salutation" : "称谓"}</FormLabel>
                    <SelectField
                      options={salutations}
                      required
                      value={signatureForm.deaceasedSalutation}
                      onChange={(e) =>
                        handleSignatureChange("deaceasedSalutation", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <FormLabel required>{isEnglish ? "Given Name" : "名"}</FormLabel>
                    <InputField
                      value={signatureForm.deaceasedGivenName}
                      onChange={(e) =>
                        handleSignatureChange("deaceasedGivenName", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <FormLabel required>{isEnglish ? "Surname / Family Name" : "姓"}</FormLabel>
                    <InputField
                      value={signatureForm.deaceasedSurname}
                      onChange={(e) =>
                        handleSignatureChange("deaceasedSurname", e.target.value)
                      }
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
                    <FormLabel required>{isEnglish ? "Salutation" : "称谓"}</FormLabel>
                    <SelectField
                      options={salutations}
                      required
                      value={signatureForm.nextToKeenSalutation}
                      onChange={(e) =>
                        handleSignatureChange("nextToKeenSalutation", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <FormLabel required>{isEnglish ? "First given name" : "名"}</FormLabel>
                    <InputField
                      value={signatureForm.nextToKeenGivenName}
                      onChange={(e) =>
                        handleSignatureChange("nextToKeenGivenName", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div>
                    <FormLabel>{isEnglish ? "Other given name(s)" : "其他名"}</FormLabel>
                    <InputField
                      value={signatureForm.nextToKeenOtherGivenName}
                      onChange={(e) =>
                        handleSignatureChange("nextToKeenOtherGivenName", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <FormLabel required>{isEnglish ? "Surname / Family Name" : "姓"}</FormLabel>
                    <InputField
                      value={signatureForm.nextToKeenSurname}
                      onChange={(e) =>
                        handleSignatureChange("nextToKeenSurname", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <FormLabel required>{isEnglish ? "Current Address" : "现住地址"}</FormLabel>
                    <InputField
                      value={signatureForm.nextToKeenCurrentAddress}
                      onChange={(e) =>
                        handleSignatureChange("nextToKeenCurrentAddress", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div>
                    <FormLabel required>{isEnglish ? "Mobile" : "手机"}</FormLabel>
                    <InputField
                      type="tel"
                      value={signatureForm.nextToKeenMobile}
                      onChange={(e) =>
                        handleSignatureChange("nextToKeenMobile", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div>
                    <FormLabel required>{isEnglish ? "Email" : "邮箱"}</FormLabel>
                    <InputField
                      type="email"
                      value={signatureForm.nextToKeenEmail}
                      onChange={(e) =>
                        handleSignatureChange("nextToKeenEmail", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div>
                    <FormLabel required>
                      {isEnglish ? "Create account password" : "创建账户密码"}
                    </FormLabel>
                    <InputField
                      type="password"
                      value={accountPassword}
                      onChange={(e) => setAccountPassword(e.target.value)}
                      placeholder={isEnglish ? "At least 8 characters" : "至少8个字符"}
                      required
                    />
                  </div>

                  <div>
                    <FormLabel required>{isEnglish ? "Confirm password" : "确认密码"}</FormLabel>
                    <InputField
                      type="password"
                      value={confirmAccountPassword}
                      onChange={(e) => setConfirmAccountPassword(e.target.value)}
                      placeholder={isEnglish ? "Re-enter password" : "再次输入密码"}
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <FormLabel>
                      {isEnglish
                        ? `Your relationship to ${signatureForm.deaceasedGivenName || "Deceased"
                        }`
                        : `您与${signatureForm.deaceasedGivenName || "去世"}的关系`}
                    </FormLabel>
                    <InputField
                      value={signatureForm.nextToKeenRelation}
                      onChange={(e) =>
                        handleSignatureChange("nextToKeenRelation", e.target.value)
                      }
                    />
                  </div>

                  {/* ===== ID Photos ===== */}
                  <div className="md:col-span-2">
                    <FormLabel>
                      {isEnglish
                        ? `Upload photo identification for ${signatureForm.nextToKeenGivenName}`
                        : `上传${signatureForm.nextToKeenGivenName}的照片证件`}
                    </FormLabel>

                    <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition group">
                      <div className="flex flex-col items-center justify-center text-center p-4">
                        <p className="font-semibold text-gray-900">
                          {isEnglish
                            ? "Drag & drop files here, or click to upload"
                            : "拖放文件到此处，或点击上传"}
                        </p>
                        <p className="text-sm text-gray-500 mb-4">
                          {isEnglish ? "You can upload up to 2 images" : "最多可上传2张图片"}
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

                    {kinPhotoPreviews.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {kinPhotoPreviews.map((url, index) => (
                          <div key={url} className="relative inline-block">
                            <img
                              src={url}
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
                    )}
                  </div>

                  {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
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
                    onChange={(e) => {
                      setSignatureType(e.target.value);

                      // reset previous signature data on switching mode
                      setSignatureForm((prev) => ({ ...prev, nextToKeenSign: null }));
                      setSignPreview((prevUrl) => {
                        if (prevUrl) URL.revokeObjectURL(prevUrl);
                        return "";
                      });
                      if (sigCanvasRef.current) sigCanvasRef.current.clearCanvas?.();
                    }}
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
                        onChange={(e) => handleSignUpload(e.target.files?.[0])}
                        className="hidden"
                      />
                    </label>

                    {signPreview && (
                      <div className="mt-4 relative inline-block">
                        <img
                          src={signPreview}
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

                    {signPreview && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-600 mb-2">
                          Saved Signature Preview:
                        </p>
                        <img src={signPreview} className="w-52 border rounded" />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* ================= SUBMIT ================= */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full text-2xl bg-black text-white py-4 rounded-lg transition font-bold ${loading ? "opacity-60 cursor-not-allowed" : "hover:bg-gray-800"
                  }`}
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

export default Signature;
