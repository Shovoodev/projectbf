import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SignatureCanvas from "react-signature-canvas";
import Hero from "../components/common/Hero";

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

  //
  const [DeaceasedImages, setDeaceasedImages] = useState([]);
  const sigPadRef = useRef(null);

  const nameLabel = firstName ? firstName : "the deceased";
  const kinNameValue = kinFirstName ? kinFirstName : "Next of kin";

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

      <section className="py-8 max-w-5xl mx-auto px-6">
        <div className="rounded-xl p-8">
          {/* Content */}
          <div className="space-y-4 text-black text-center  font-medium  font-body leading-relaxed ">
            <p className="text-lg text-black ">
              I authorise{" "}
              <strong className="text-gray-900">BLACK TULIP FUNERALS</strong> to
              conduct the given funeral. I understand that I have been given a
              general quote on the entire service and note that there might be
              variations given the condition of the deceased once transferred
              into our care.
            </p>

            <p className="text-lg text-black ">
              All data that I provide in the “Firehawk Link” will be entered
              correctly and is true to the best of my knowledge. I will check
              all fields upon completion and note that I will be liable for any
              costs that incur if an error is presented and/or needs amendment.
            </p>

            <p className="text-lg text-black ">
              I consent to the transfer of the deceased by{" "}
              <strong className="text-gray-900">BLACK TULIP FUNERALS</strong> or
              their nominated transfer companies.
            </p>

            <p className="text-lg text-black ">
              I consent for the services to proceed without any delays and note
              that if I choose to delay the service, cost variations may occur.
            </p>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow border border-gray-300 ">
            <form className="space-y-12">
              {/* ================= DECEASED DETAILS ================= */}
              <div>
                <h3 className="text-4xl text-center font-bold mb-6">
                  Deceased Persons Details
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <FormLabel required>Salutation</FormLabel>
                    <SelectField options={salutations} required />
                  </div>

                  <div>
                    <FormLabel required>First given name</FormLabel>
                    <InputField
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>

                  <div>
                    <FormLabel>Other given name(s)</FormLabel>
                    <InputField />
                  </div>

                  <div>
                    <FormLabel required>Surname / Family Name</FormLabel>
                    <InputField required />
                  </div>

                  <div>
                    <FormLabel required>Date of Birth</FormLabel>
                    <DatePicker
                      selected={dob}
                      onChange={setDob}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="dd/mm/yyyy"
                      className="w-full p-3 border rounded-md"
                      required
                    />
                  </div>
                  <div className="flex items-center   col-span-2">
                    <input
                      type="checkbox"
                      checked={notPassed}
                      onChange={(e) => setNotPassed(e.target.checked)}
                      className="w-5 h-5 mr-2"
                    />
                    <span className="font-medium">
                      Person Has Not Passed Away
                    </span>
                  </div>
                  {!notPassed && (
                    <div>
                      <FormLabel required>Date of Death</FormLabel>
                      <DatePicker
                        selected={dod}
                        onChange={setDod}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="dd/mm/yyyy"
                        className="w-full p-3 border rounded-md"
                        required
                      />
                    </div>
                  )}

                  <div className="md:col-span-2">
                    <FormLabel required>
                      Last registered address of {nameLabel}
                    </FormLabel>
                    <InputField
                      required
                      placeholder={
                        "This is the address they have resided at for the last 3 months."
                      }
                    />
                  </div>

                  {!notPassed && (
                    <div className="md:col-span-2">
                      <FormLabel required>
                        Where did {nameLabel} pass away?
                      </FormLabel>
                      <InputField required />
                    </div>
                  )}
                  {!notPassed && (
                    <div className="md:col-span-2">
                      <FormLabel required>Where is {nameLabel} now?</FormLabel>
                      <InputField placeholder="Eg: Home / Hospital" required />
                    </div>
                  )}

                  <div className="md:col-span-2">
                    <FormLabel required>
                      Does {nameLabel} have any battery powered devices?
                    </FormLabel>
                    <InputField
                      required
                      placeholder={
                        "This includes all forms of pacemakers and defibrillators"
                      }
                    />
                  </div>

                  <div className="md:col-span-2">
                    <FormLabel required>
                      Who is the {nameLabel}’s regular doctor (GP) & surgery
                      address
                    </FormLabel>
                    <InputField
                      required
                      placeholder={"Eg: Dr Adam Brown, Strathfield"}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <FormLabel required>
                      Upload photo identification for {nameLabel}
                    </FormLabel>

                    <label className="flex flex-col  items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition group ">
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
                          Drag & drop files here, or click to upload
                        </p>
                        <p className="text-sm text-gray-500 mb-4">
                          You can upload up to 2 images <br /> (Only .jpg,
                          .jpeg, .png, .heic files are allowed)
                        </p>
                      </div>

                      <input
                        type="file"
                        multiple
                        required
                        accept="image/*"
                        onChange={handleDeaceasedIdUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {uploadError && (
                    <p className="text-red-500 mt-2 text-sm ">{uploadError}</p>
                  )}
                  <div className="md:col-span-2">
                    <div className="flex flex-wrap gap-2">
                      {DeaceasedImages.map((file, index) => (
                        <div key={index} className="relative inline-block">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${index + 1}`}
                            className="w-52 object-cover border rounded"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index, "deceased")}
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
                    <FormLabel required>Salutation</FormLabel>
                    <SelectField options={salutations} required />
                  </div>

                  <div>
                    <FormLabel required>First given name</FormLabel>
                    <InputField
                      onChange={(e) => setKinFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <FormLabel>Other given name(s)</FormLabel>
                    <InputField />
                  </div>
                  <div className="">
                    <FormLabel required>Surname / Family Name</FormLabel>
                    <InputField required />
                  </div>

                  <div className="md:col-span-2">
                    <FormLabel required>Current Address</FormLabel>
                    <InputField required />
                  </div>

                  <div>
                    <FormLabel required>Mobile</FormLabel>
                    <InputField type="tel" required />
                  </div>

                  <div>
                    <FormLabel required>Email</FormLabel>
                    <InputField type="email" required />
                  </div>

                  <div className="md:col-span-2">
                    <FormLabel required>
                      Your relationship to {nameLabel}
                    </FormLabel>
                    <InputField required />
                  </div>
                  <div className="md:col-span-2">
                    <FormLabel required>
                      Upload photo identification for {kinNameValue}
                    </FormLabel>

                    <label className="flex flex-col  items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition group ">
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
                          Drag & drop files here, or click to upload
                        </p>
                        <p className="text-sm text-gray-500 mb-4">
                          You can upload up to 2 images <br /> (Only .jpg,
                          .jpeg, .png, .heic files are allowed)
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
                    <p className="text-red-500 mt-2 text-sm ">{uploadError}</p>
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
                <div className="md:col-span-2">
                  <FormLabel required>Upload Your Signature Here</FormLabel>

                  <label className="flex flex-col  items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition group ">
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
                        Drag & drop files here, or click to upload
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        (Only .jpg, .jpeg, .png, .heic files are allowed)
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
                </div>
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
                <div className="mt-4">
                  <FormLabel required>Sign Your Name Here</FormLabel>
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
                      Clear Signature
                    </button>
                  </div>
                </div>
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

export default AgreementForm;
