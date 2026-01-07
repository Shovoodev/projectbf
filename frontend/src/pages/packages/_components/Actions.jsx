import { useNavigate } from "react-router";
import PopupEnquirey from "./PopupEnquirey";
import { useState } from "react";
import { useUserFront } from "../../../utility/use-userFront";

export function Actions({ totalPrice, geNext }) {
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
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center mt-10 pb-10">
      {/* Make Agreement button */}
      <div>
        <button
          className="px-6 py-3 rounded-full bg-gray-100 font-medium hover:bg-gray-600 hover:text-white hover:font-bold transition-all duration-300"
          onClick={() => openPopup("agreement")}
        >
          Make Agreement Now
        </button>
      </div>

      {/* Enquiry button */}
      <div>
        <button
          className="px-6 py-3 rounded-full bg-gray-100 font-medium hover:bg-gray-600 hover:text-white hover:font-bold transition-all duration-300"
          onClick={() => openPopup("enquirey")}
        >
          Enquire Now
        </button>
      </div>

      {/* PrePay button */}
      <button
        className="px-6 py-3 rounded-full bg-gray-100 font-medium hover:bg-gray-600 hover:text-white hover:font-bold transition-all duration-300"
        onClick={handlePress}
      >
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
