import { useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import SignatureCanvas from "react-signature-canvas";
import Hero from "../../components/common/Hero";
import base64ToFile from "../../utility";
import { pdf } from "@react-pdf/renderer";
import { useServiceApi } from "../../utility/SelectedServiceProvider";
import { useNavigate } from "react-router-dom";
import SignatureField from "./_components/SignatureField";
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
  const [hasNotPassedAway, setHasNotPassedAway] = useState(false);
  const { selections } = useServiceApi();
  const [invoiceDetails, setInvoiceDetails] = useState(null);
  const [error, setError] = useState()
  const [signatureType, setSignatureType] = useState("Digital Signature");
  const navigate = useNavigate()
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
  });
  const [formKinValues, setFormKinValues] = useState({
    salutation: "",
    givenName: "",
    surname: "",
    currentAddress: "",
    mobile: "",
    email: "",
    relation: "",
    photo: null,
    sign: null,
  });
  const sigCanvasRef = useRef(null);
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
  const clearSignature = () => {
    if (sigCanvasRef.current) sigCanvasRef.current.clearCanvas();

    setFormKinValues((prev) => ({
      ...prev,
      sign: null,
    }));
  };

  const handleChange = (id, value) => {
    setFormKinValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...deceasedFormValues,
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

    const signFile = await saveSignature();
    if (!signFile) {
      alert("Please provide a signature");
      return;
    }
    console.log({ selections });
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
      setError(error)
      return;
    }
    const resSelections = await fetch(`${CORE}/all-selected-selections`, {
      credentials: "include",
    });
    if (!resSelections.ok) {
      throw new Error(`HTTP error! status:  ${resSelections.status}`);
    }
    const data = await resSelections.json();

    const invoiceData = data.data;

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

    // Send invoice
    const invoiceRes = await fetch(`${CORE}/api/send-invoice`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        selections,
        pdfAttachment: base64data,
      }),
    });

    if (!invoiceRes.ok) {
      const err = await invoiceRes.json();
      throw new Error(err.error || "Invoice email failed");
    }

    navigate(`/user`);
  };



  return (
    <>
      <Hero
        title={"BTF 's Consent and Agreement Form"}
        subtitle={"Agreement"}
      />

      <section className="py-8 w-full md:max-w-5xl mx-auto px-6">
        <div className="rounded-xl p-8">
          {/* Content */}
          <div className="w-full space-y-4 text-black text-center  font-medium  font-body leading-relaxed ">
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
      <section className="py-8 md:py-16  bg-gray-50">
        <div className="max-w-4xl mx-auto  md:px-6">
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow border border-gray-300 ">
            <form className="space-y-12">
              {/* ================= DECEASED DETAILS ================= */}

              <div>
                <h3 className="text-4xl text-center font-bold mb-6">
                  Deceased Persons Details
                </h3>

                {/* Explicit mobile-first grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <FormLabel required>Salutation</FormLabel>
                    <SelectField
                      options={salutations}
                      required
                      value={deceasedFormValues.salutation}
                      onChange={(e) =>
                        setDeceasedFormValues({
                          ...deceasedFormValues,
                          salutation: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <FormLabel required>First given name</FormLabel>
                    <InputField
                      type="text"
                      change={(e) =>
                        setDeceasedFormValues({
                          ...deceasedFormValues,
                          givenName: e.target.value,
                        })
                      }
                    />
                  </div>
                  {/* mark to be changes  */}
                  <div>
                    <FormLabel>Other given name(s)</FormLabel>
                    <InputField />
                  </div>

                  <div>
                    <FormLabel required>Surname / Family Name</FormLabel>
                    <InputField
                      // required
                      defaultValue="dddddd"
                      type="text"
                      change={(e) =>
                        setDeceasedFormValues({
                          ...deceasedFormValues,
                          surname: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <FormLabel required>Date of Birth</FormLabel>
                    <InputField
                      defaultValue={new Date()}
                      type="date"
                      change={(e) =>
                        setDeceasedFormValues({
                          ...deceasedFormValues,
                          dateofbirth: e.target.value,
                        })
                      }
                    />
                  </div>

                  {/* Checkbox row FIXED */}
                  <div className="flex items-center pt-8">
                    <input
                      type="checkbox"
                      id="not_passed"
                      checked={hasNotPassedAway}
                      onChange={(e) => setHasNotPassedAway(e.target.checked)}
                    />
                    <label
                      htmlFor="not_passed"
                      className="ml-2 text-gray-700 font-medium"
                    >
                      Person Has Not Passed Away
                    </label>
                  </div>

                  {!hasNotPassedAway && (
                    <div>
                      <FormLabel required>Date of Death</FormLabel>
                      <InputField
                        defaultValue={new Date()}
                        type="date"
                        change={(e) =>
                          setDeceasedFormValues({
                            ...deceasedFormValues,
                            dateofdeath: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  )}

                  <div className="md:col-span-2">
                    <FormLabel required>
                      Last registered address of {deceasedFormValues.givenName}
                    </FormLabel>
                    <InputField
                      defaultValue="dddddd"
                      placeholder="This is the address they have resided at for the last 3 months."
                      change={(e) =>
                        setDeceasedFormValues({
                          ...deceasedFormValues,
                          deceasedPassedReason: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  {!hasNotPassedAway && (
                    <div className="md:col-span-2">
                      <FormLabel required>
                        Where did  {deceasedFormValues.givenName} pass away?
                      </FormLabel>
                      <InputField required />
                    </div>
                  )}

                  {!hasNotPassedAway && (
                    <div className="md:col-span-2">
                      <FormLabel required>Where is  {deceasedFormValues.givenName} now?</FormLabel>
                      <InputField placeholder="Eg: Home / Hospital" required />
                    </div>
                  )}

                  <div className="md:col-span-2">
                    <FormLabel required>
                      Does  {deceasedFormValues.givenName} have any battery powered devices?
                    </FormLabel>
                    <InputField
                      required
                      placeholder="This includes all forms of pacemakers and defibrillators"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <FormLabel required>
                      Who is the  {deceasedFormValues.givenName}’s regular doctor (GP) & surgery
                      address
                    </FormLabel>
                    <InputField
                      required
                      placeholder="Eg: Dr Adam Brown, Strathfield"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <FormLabel required>
                      Upload photo identification for  {deceasedFormValues.givenName}
                    </FormLabel>

                    {/* Upload Box */}
                    <div
                      className="flex flex-col items-center justify-center w-full  border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition group p-1"
                    >
                      <div className="flex flex-col items-center justify-center text-center">
                        <svg
                          className="w-8 h-8 mb-3 mt-5 text-gray-400 group-hover:text-black transition"
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
                        <p className="text-sm text-gray-500 ">
                          You can upload up to 2 images <br />
                          (Only .jpg, .jpeg, .png, .heic files are allowed)
                        </p>
                      </div>
                    </div>

                    {/* Hidden Inputs */}
                    {/* {isMobile && (
                      <input
                        id="cameraInput"
                        type="file"
                        accept="image/*"
                        capture="environment"
                        multiple
                        onChange={handleDeaceasedIdUpload}
                        className="hidden"
                      />
                    )}

                    <input
                      id="galleryInput"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleDeaceasedIdUpload}
                      className="hidden"
                    /> */}

                    {/* Mobile Bottom Sheet */}
                    {/* {isMobile && showPicker && (
                      <div className="fixed inset-0 z-50 flex items-end bg-black/40">
                        <div className="w-full bg-white rounded-t-xl p-4">
                          <button
                            onClick={() => {
                              document.getElementById("cameraInput").click();
                              setShowPicker(false);
                            }}
                            className="w-full py-3 text-lg font-semibold"
                          >
                            📷 Take Photo
                          </button>

                          <button
                            onClick={() => {
                              document.getElementById("galleryInput").click();
                              setShowPicker(false);
                            }}
                            className="w-full py-3 text-lg font-semibold"
                          >
                            🖼️ Upload Photo
                          </button>

                          <button
                            onClick={() => setShowPicker(false)}
                            className="w-full py-3 text-gray-500"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )} */}
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
                    <SelectField
                      options={salutations}
                      value={formKinValues.salutation}
                      onChange={(e) =>
                        setFormKinValues({
                          ...formKinValues,
                          salutation: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="">
                    <FormLabel required>First given name</FormLabel>
                    <InputField
                      defaultValue="dddddd"
                      // required
                      change={(e) =>
                        setFormKinValues({
                          ...formKinValues,
                          givenName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <FormLabel>Other given name(s)</FormLabel>
                    <InputField />
                  </div>
                  <div className="">
                    <FormLabel required>Surname / Family Name</FormLabel>
                    <InputField
                      defaultValue="dddddd"
                      change={(e) =>
                        setFormKinValues({
                          ...formKinValues,
                          surname: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <FormLabel required>Current Address</FormLabel>
                    <InputField
                      defaultValue="dddddd"
                      change={(e) =>
                        setFormKinValues({
                          ...formKinValues,
                          currentAddress: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div>
                    <FormLabel required>Mobile</FormLabel>
                    <InputField
                      defaultValue="1234556"
                      type="tel"
                      change={(e) =>
                        setFormKinValues({
                          ...formKinValues,
                          mobile: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div>
                    <FormLabel required>Email</FormLabel>
                    <InputField
                      type="email"
                      change={(e) =>
                        setFormKinValues({
                          ...formKinValues,
                          email: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <FormLabel required>
                      Your relationship to {deceasedFormValues.givenName}
                    </FormLabel>
                    <InputField
                      defaultValue="dddddd"
                      change={(e) =>
                        setFormKinValues({
                          ...formKinValues,
                          relation: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <FormLabel required>
                      Upload photo identification for {formKinValues.givenName}
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
                        accept="image/*,.pdf"
                        onChange={(e) =>
                          handleChange("photo", e.target.files[0])
                        }
                        className="hidden"
                      />
                    </label>
                    {formKinValues.photo && (
                      <p className="text-sm text-green-600 mt-2 font-medium">
                        ✔ {formKinValues.photo.name} selected
                      </p>
                    )}
                  </div>
                  {error && (
                    <p className="text-red-500 mt-2 text-sm ">{error}</p>
                  )}
                  <div className="md:col-span-2">
                    <div className="flex flex-wrap gap-2">
                      {formKinValues.photo.map((file, index) => (
                        <div key={index} className="relative inline-block">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${index + 1}`}
                            className="w-52 object-cover border rounded"
                          />


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

                {signatureType === "Upload Photo" && (
                  <div className="mt-4">
                    <FormLabel required>Upload Your Signature Here</FormLabel>
                    <label className="flex flex-col items-center justify-center w-full  border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition group p-1">
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
                        className="hidden"
                      />
                    </label>
                    <div className="md:col-span-2 mt-4">
                      <div className="flex flex-wrap gap-2">
                        {/* {signatureImage.map((file, index) => (
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
                        ))} */}
                      </div>
                    </div>
                  </div>
                )}

                {signatureType === "Digital Signature" && (
                  <div className="mt-4">
                    <FormLabel required>Sign Your Name Here</FormLabel>
                    <div className="border rounded-md bg-gray-50 p-2">
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