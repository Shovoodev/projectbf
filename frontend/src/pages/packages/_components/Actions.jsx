import { useState } from "react";
import { useNavigate } from "react-router";
import { useUserFront } from "../../../utility/use-userFront";
import PopupEnquirey from "./PopupEnquirey";
export function Actions({ goNext }) {
  const navigate = useNavigate();
  const [activePopup, setActivePopup] = useState(null);

  const { user } = useUserFront();
  const handlePress = () => {
    try {
      navigate(`/${user._id}/prepay`);
    } catch (error) {
      console.log(error);
    }
  };

  const openPopup = (popupType) => {
    setActivePopup(popupType);
  };

  const closePopup = () => {
    setActivePopup(null);
    goNext();
  };

  const [invoiceItems, setInvoiceItems] = useState([]);

  const addToInvoice = (item) => {
    setInvoiceItems([...invoiceItems, item]);
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center mt-10 pb-10">
      {/* Make Agreement button */}
      <div>
        <button
          className="btn-primary normal"
          onClick={() => openPopup("agreement")}
        >
          Make Agreement Now
        </button>
      </div>

      {/* Enquiry button */}
      <div>
        <button
          className="btn-primary normal"
          onClick={() => openPopup("enquirey")}
        >
          Enquire Now
        </button>
      </div>

      {/* PrePay button */}
      <button className="btn-primary normal" onClick={handlePress}>
        Prepay
      </button>
      {/* Agreement Popup */}
      <PopupEnquirey
        isOpen={activePopup === "agreement"}
        onClose={closePopup}
        // mode={() => (activePopup ? "registartion" : "login")}
        mode="registration"
        title="Register to complete your aggrement"
        subtitle="Register to save your selections and complete the process"
        onSuccess={(userData) => {
          console.log("User registered:", userData);
          closePopup();
          // Redirect or update state
        }}
      />

      {/* Enquiry Popup */}
      <PopupEnquirey
        isOpen={activePopup === "enquirey"}
        onClose={closePopup}
        mode="enquirey"
        mainTitle="Please tell us what you whant to know about us"
        description="We'll get back to you shortly"
        title="Make an Enquiry"
        subtitle="We'll get back to you shortly"
        onSuccess={(userData) => {
          console.log("Enquiry submitted:", userData);
          closePopup();
          // Handle enquiry submission
        }}
      />
    </div>
  );
}
