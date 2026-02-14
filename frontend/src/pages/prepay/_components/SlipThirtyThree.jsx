import { useEffect, useMemo } from "react";
import { usePrePayServiceApi } from "../../../utility/prepay-service-provider";
import { useFormValidator, validators } from "../../../utility/formValidation";

const SlipThirtyThree = () => {
  const { updateInvestor, handleChange } = usePrePayServiceApi();

  const digitsOnly = (v) => String(v || "").replace(/\D/g, "");

  const rules = useMemo(
    () => ({
      surname: [validators.required("Surname")],
      givenNames: [validators.required("Given Names")],
      dob: [validators.required("Date of Birth")],
      postcode: [validators.postcodeAU("Postcode")],
      mailpostcode: [validators.postcodeAU("Mail Postcode")],
      daytimeTelephone: [validators.phoneAU("Daytime Telephone")],
      mobile: [validators.phoneAU("Mobile")],
      email: [validators.required("Email"), validators.email("Email")],
    }),
    []
  );

  const {
    setValue,
    register,
    errorFor,
    hasError,
  } = useFormValidator({
    rules,
    initialValues: {
      title: "",
      surname: "",
      givenNames: "",
      dob: "",
      gender: "",

      unit: "",
      streetNo: "",
      streetName: "",
      suburb: "",
      state: "NSW",
      postcode: "",
      country: "AUSTRALIA",

      mailunit: "",
      mailstreetNo: "",
      mailstreetName: "",
      mailsuburb: "",
      mailstate: "NSW",
      mailpostcode: "",
      mailcountry: "AUSTRALIA",

      daytimeTelephone: "",
      mobile: "",
      daytimeAddress: "",
      email: "",
    },
    onChangeField: (name, value) => {
      updateInvestor("investorOne", [name], value);
    },
    onValidSubmit: () => handleChange(),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const Err = ({ name }) =>
    errorFor(name) ? (
      <p className="text-red-600 text-xs mt-1">{errorFor(name)}</p>
    ) : null;

  return (
    <div className="form-container-base p-2">
      <div>
        <h2 className="pdf-h2">1. Investor details</h2>
        <p className="pdf-subtitle">
          Investor 1 (all correspondence will be sent to this person)
        </p>
      </div>

      <form className="p-1" onSubmit={(e) => { e.preventDefault(); handleChange(); }}>
        {/* Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          <div className="col-span-full">
            <label className="pdf-label mb-1">Title:</label>
            <div className="pdf-radio-group p-0">
              {["Mr", "Mrs", "Ms", "Miss", "Dr", "Other"].map((t) => (
                <label key={t} className="pdf-radio-item">
                  <input
                    type="radio"
                    name="title"
                    value={t}
                    onChange={(e) => setValue("title", e.target.value)}
                    className="pdf-radio-input"
                  />
                  <span className="text-gray-700 hover:text-blue-900">{t}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="pdf-label">Surname:</label>
            <input
              type="text"
              className={`pdf-input ${hasError("surname") ? "border-red-500" : ""}`}
              {...register("surname")}
            />
            <Err name="surname" />
          </div>

          <div>
            <label className="pdf-label">Given Names:</label>
            <input
              type="text"
              className={`pdf-input ${hasError("givenNames") ? "border-red-500" : ""}`}
              {...register("givenNames")}
            />
            <Err name="givenNames" />
          </div>

          <div>
            <label className="pdf-label">Date of Birth:</label>
            <input
              type="date"
              className={`pdf-input ${hasError("dob") ? "border-red-500" : ""}`}
              {...register("dob")}
            />
            <Err name="dob" />
          </div>

          <div>
            <label className="pdf-label">Gender:</label>
            <div className="pdf-radio-group mt-2">
              {["Female", "Male", "Other"].map((g) => (
                <label key={g} className="pdf-radio-item">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    onChange={(e) => setValue("gender", e.target.value)}
                    className="pdf-radio-input"
                  />
                  <span className="text-gray-700">{g}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Residential Address */}
        <h3 className="pdf-section-title">
          Residential Address{" "}
          <span className="pdf-note">(must not be a PO box, RMB or Locked Bag)</span>
        </h3>

        <div className="grid grid-cols-6 gap-2">
          <div className="col-span-2">
            <label className="pdf-label-sm">Unit Number</label>
            <input type="text" className="pdf-input" {...register("unit")} />
          </div>

          <div className="col-span-4">
            <label className="pdf-label-sm">Street No</label>
            <input type="text" className="pdf-input" {...register("streetNo")} />
          </div>

          <div className="col-span-3">
            <label className="pdf-label-sm">Street Name</label>
            <input type="text" className="pdf-input" {...register("streetName")} />
          </div>

          <div className="col-span-3">
            <label className="pdf-label-sm">Suburb</label>
            <input type="text" className="pdf-input" {...register("suburb")} />
          </div>

          <div className="col-span-2">
            <label className="pdf-label-sm">State</label>
            <input
              type="text"
              className="pdf-input pdf-input-readonly"
              {...register("state")}
            />
          </div>

          <div className="col-span-2">
            <label className="pdf-label-sm">Postcode</label>
            <input
              type="text"
              className={`pdf-input ${hasError("postcode") ? "border-red-500" : ""}`}
              {...register("postcode", { transform: digitsOnly })}
            />
            <Err name="postcode" />
          </div>

          <div className="col-span-2">
            <label className="pdf-label-sm">Country</label>
            <input
              type="text"
              className="pdf-input pdf-input-readonly"
              {...register("country")}
            />
          </div>
        </div>

        {/* Mailing Address */}
        <h3 className="pdf-section-title">
          Mailing Address <span className="pdf-note">(if different to above address)</span>
        </h3>

        <div className="grid grid-cols-6 gap-2">
          <div className="col-span-2">
            <label className="pdf-label-sm">Unit Number</label>
            <input type="text" className="pdf-input" {...register("mailunit")} />
          </div>

          <div className="col-span-4">
            <label className="pdf-label-sm">Street No</label>
            <input type="text" className="pdf-input" {...register("mailstreetNo")} />
          </div>

          <div className="col-span-3">
            <label className="pdf-label-sm">Street Name</label>
            <input type="text" className="pdf-input" {...register("mailstreetName")} />
          </div>

          <div className="col-span-3">
            <label className="pdf-label-sm">Suburb</label>
            <input type="text" className="pdf-input" {...register("mailsuburb")} />
          </div>

          <div className="col-span-2">
            <label className="pdf-label-sm">State</label>
            <input
              type="text"
              className="pdf-input pdf-input-readonly"
              {...register("mailstate")}
            />
          </div>

          <div className="col-span-2">
            <label className="pdf-label-sm">Postcode</label>
            <input
              type="text"
              className={`pdf-input ${hasError("mailpostcode") ? "border-red-500" : ""}`}
              {...register("mailpostcode", { transform: digitsOnly })}
            />
            <Err name="mailpostcode" />
          </div>

          <div className="col-span-2">
            <label className="pdf-label-sm">Country</label>
            <input
              type="text"
              className="pdf-input pdf-input-readonly"
              {...register("mailcountry")}
            />
          </div>
        </div>

        {/* Contact Details */}
        <h3 className="pdf-section-title">Contact Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <label className="pdf-label">Daytime Telephone:</label>
            <input
              type="tel"
              className={`pdf-input ${hasError("daytimeTelephone") ? "border-red-500" : ""}`}
              {...register("daytimeTelephone", { transform: digitsOnly })}
            />
            <Err name="daytimeTelephone" />
          </div>

          <div>
            <label className="pdf-label">Mobile:</label>
            <input
              type="tel"
              className={`pdf-input ${hasError("mobile") ? "border-red-500" : ""}`}
              {...register("mobile", { transform: digitsOnly })}
            />
            <Err name="mobile" />
          </div>

          <div>
            <label className="pdf-label">Daytime Address:</label>
            <input type="text" className="pdf-input" {...register("daytimeAddress")} />
          </div>

          <div>
            <label className="pdf-label">Email:</label>
            <input
              type="email"
              className={`pdf-input ${hasError("email") ? "border-red-500" : ""}`}
              {...register("email")}
            />
            <Err name="email" />
          </div>
        </div>

        <p className="pdf-intro-p">
          If the application is being completed under a Power of Attorney (POA),
          please include the attorney&apos;s contact details under
        </p>

        <div className="pdf-footer">
          <div>
            <span className="text-blue-900">KeyInvest</span> Funeral Bond PDS
          </div>
          <div>Version: July 2026</div>
          <div>Page 33</div>
        </div>
      </form>
    </div>
  );
};

export default SlipThirtyThree;
