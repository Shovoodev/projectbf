import React, { useRef, useState } from "react";
const CORE = import.meta.env.VITE_API_URL;

import SignatureField from "./_components/SignatureField";
import { useNavigate } from "react-router";
import base64ToFile from "../../utility";
import { useServiceApi } from "../../utility/SelectedServiceProvider";
import { pdf } from "@react-pdf/renderer";
import StaticInvoicePDF from "./_components/InvoicePdf";

// Reusable Form Field Components
const FormLabel = ({ children, required }) => (
  <label className="block text-sm font-bold text-gray-700 mb-1">
    {children} {required && <span className="text-red-500">*</span>}
  </label>
);

const InputField = ({
  type = "text",
  placeholder,
  required,
  change,
  defaultValue,
}) => (
  <input
    type={type}
    required={required}
    placeholder={placeholder}
    onChange={change}
    defaultValue={defaultValue}
    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
  />
);
const SelectField = ({ options, required, value, onChange }) => {
  return (
    <select
      required={required}
      value={value}
      onChange={onChange}
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white"
    >
      <option value="" disabled>
        Select Choice
      </option>

      {options.map((opt, idx) => (
        <option key={idx} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
};

const AgreementFormPage = () => {
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
  const navigate = useNavigate();
  const { selections } = useServiceApi();
  const [invoiceDetails, setInvoiceDetails] = useState(null);
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
    // const payload = {
    //   ...deceasedFormValues,
    // };

    // const res = await fetch(`${CORE}/desencepersondetailsanswer`, {
    //   method: "POST",
    //   credentials: "include",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(payload),
    // });

    // if (!res.ok) {
    //   const text = await res.text();
    //   console.error("Server Error:", text);
    //   return;
    // }

    // const signFile = await saveSignature();
    // if (!signFile) {
    //   alert("Please provide a signature");
    //   return;
    // }
    // console.log({ selections });
    // await new Promise((r) => setTimeout(r, 0));

    // const fd = new FormData();

    // fd.append("salutation", formKinValues.salutation);
    // fd.append("givenName", formKinValues.givenName);
    // fd.append("surname", formKinValues.surname);
    // fd.append("currentAddress", formKinValues.currentAddress);
    // fd.append("mobile", formKinValues.mobile);
    // fd.append("email", formKinValues.email);
    // fd.append("relation", formKinValues.relation);

    // if (formKinValues.photo instanceof File) {
    //   fd.append("photo", formKinValues.photo);
    // }

    // fd.append("sign", signFile);

    // const resforkin = await fetch(`${CORE}/next-to-keen-details`, {
    //   method: "POST",
    //   credentials: "include",
    //   body: fd,
    // });

    // if (!resforkin.ok) {
    //   console.error(await resforkin.text());
    //   return;
    // }

    // // const pdfBlob = await generatePdfBlob(displayImage);

    // // formData.append("file", pdfBlob, "Invoice.pdf");
    // // const pdfFd = new FormData();
    const resSelections = await fetch(`${CORE}/all-selected-selections`, {
      credentials: "include",
    });
    if (!resSelections.ok) {
      throw new Error(`HTTP error! status:  ${resSelections.status}`);
    }
    const data = await resSelections.json();

    setTimeout(() => {
      setInvoiceDetails(data.data);
    }, 800);
    console.log({ invoiceDetails, setInvoiceDetails });

    const blob = await pdf(
      <StaticInvoicePDF invoiceDetails={invoiceDetails} />,
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

    // navigate(`/user`);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
          <form className="space-y-12" onSubmit={(e) => handleSubmit(e)}>
            {/* ==========================================
                SECTION 1: DECEASED PERSONS DETAILS
               ========================================== */}
            <div>
              <h3 className="text-3xl text-center font-display font-bold text-gray-900 mb-6  pb-2">
                Deceased Persons Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Salutation */}
                <div className="md:col-span-2 lg:col-span-1">
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

                {/* Given Names */}
                <div className="md:col-span-2 lg:col-span-1">
                  <FormLabel required>Given Names</FormLabel>
                  <InputField
                    // required
                    type="text"
                    defaultValue="dddddd"
                    change={(e) =>
                      setDeceasedFormValues({
                        ...deceasedFormValues,
                        givenName: e.target.value,
                      })
                    }
                  />
                </div>
                {/* Surname */}
                <div className="md:col-span-2">
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

                {/* Date of Birth */}
                <div>
                  <FormLabel required>Date of Birth</FormLabel>
                  <InputField
                    // required
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

                {/* Checkbox: Not Passed Away */}
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
                  <>
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

                    {/* Last Address */}
                    <div className="md:col-span-2">
                      <FormLabel required>
                        Last Registered Address of the Deceased
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

                    {/* Where did they pass? */}
                    <div className="md:col-span-2">
                      <FormLabel required>
                        Where Did deceased Pass Away?
                      </FormLabel>
                      <InputField
                        defaultValue="dddddd"
                        placeholder="This is the address they have resided at for the last 3 months."
                        change={(e) =>
                          setDeceasedFormValues({
                            ...deceasedFormValues,
                            deceasedNow: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    {/* Current Location */}
                    <div className="md:col-span-2">
                      <FormLabel required>Where is the deceased Now?</FormLabel>
                      <InputField
                        defaultValue="dddddd"
                        placeholder="This is the address they have resided at for the last 3 months."
                        change={(e) =>
                          setDeceasedFormValues({
                            ...deceasedFormValues,
                            deceasedpersonaddress: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    {/* Devices */}
                    <div className="md:col-span-2">
                      <FormLabel required>
                        Does deceased have any form of battery powered devices?
                      </FormLabel>
                      <InputField
                        defaultValue="dddddd"
                        placeholder="This is the address they have resided at for the last 3 months."
                        change={(e) =>
                          setDeceasedFormValues({
                            ...deceasedFormValues,
                            batterypowereddevices: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    {/* Doctor */}
                    <div className="md:col-span-2">
                      <FormLabel required>
                        Who is deceased's regular doctor (GP) & surgery address?
                      </FormLabel>
                      <InputField
                        defaultValue="dddddd"
                        placeholder="Eg: Dr Adam Brown, Strathfield"
                        change={(e) =>
                          setDeceasedFormValues({
                            ...deceasedFormValues,
                            regulardoctoraddress: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* ==========================================
                SECTION 2: NEXT OF KIN DETAILS
               ========================================== */}
            <div>
              <h4 className="text-3xl text-center font-display font-bold text-gray-900 mb-6  pb-2">
                Next of Kin Details
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Salutation */}
                <div>
                  <FormLabel>Salutation</FormLabel>
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

                {/* Given Names */}
                <div>
                  <FormLabel required>Given Names</FormLabel>
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

                {/* Surname */}
                <div className="md:col-span-2">
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

                {/* Current Address */}
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

                {/* Mobile */}
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

                {/* Email */}
                <div>
                  <FormLabel required>Email</FormLabel>
                  <InputField
                    defaultValue="dddddd@gmail.com"
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

                {/* Relationship */}
                <div className="md:col-span-2">
                  <FormLabel required>Your Relationship to deceased?</FormLabel>
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

                {/* File Upload Area */}
                <div className="md:col-span-2">
                  {/* PHOTO UPLOAD */}
                  <div className="md:col-span-2">
                    <FormLabel required>
                      Upload Photo Identification For Next of Kin
                    </FormLabel>

                    <label className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group block">
                      <div className="text-gray-400 group-hover:text-black mb-3">
                        <svg
                          className="w-12 h-12 mx-auto"
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
                      </div>

                      <p className="font-bold text-gray-900">
                        Drag & Drop Files, or Click to Upload
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        JPG, PNG or PDF (Max 5MB)
                      </p>

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

                  {/* SIGNATURE FIELD */}
                  <div className="md:col-span-2">
                    <FormLabel required>Signature</FormLabel>

                    <div className="border border-gray-300 rounded-lg bg-white p-3">
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
                </div>
              </div>
            </div>
            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="bg-black text-white font-bold py-4 px-10 rounded hover:bg-gray-800 transition-colors duration-300 w-full md:w-auto"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AgreementFormPage;
