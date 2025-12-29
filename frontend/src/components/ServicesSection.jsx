// ServicesSection.jsx
import React from "react";
import {
  FaPhoneAlt,
  FaFileAlt,
  FaUserTie,
  FaFireAlt,
  FaAmbulance,
  FaCertificate,
  FaShieldAlt,
  FaLandmark,
  FaFileMedical,
  FaVideo,
  FaSms,
  FaImages,
  FaPhotoVideo,
} from "react-icons/fa";

const ServicesSection = () => {
  const requiredServices = [
    { icon: <FaPhoneAlt />, title: "Phone or Zoom Consultation" },
    { icon: <FaFileAlt />, title: "Administration Fees" },
    { icon: <FaFileAlt />, title: "Registration of Death" },
    { icon: <FaUserTie />, title: "Celebrant or Host" },
    { icon: <FaFireAlt />, title: "Cremation Fee" },
    {
      icon: <FaAmbulance />,
      title: "Transfers from Place of Passing (Sydney Metro 24/7)",
    },
  ];

  const disbursements = [
    { icon: <FaCertificate />, title: "Medical Referee Certificate" },
    { icon: <FaShieldAlt />, title: "Cremation Risk Advice*" },
    { icon: <FaLandmark />, title: "NSW Government Services Levy" },
    {
      icon: <FaFileMedical />,
      title: "Official Death Certificate Issued by BDM",
    },
  ];

  const includedServices = [
    { icon: <FaVideo />, title: "Live Video Streaming" },
    { icon: <FaSms />, title: "SMS Photo Invitation" },
    { icon: <FaImages />, title: "Photo Slideshow" },
    { icon: <FaPhotoVideo />, title: "Photo for Screens in Chapel" },
  ];

  return (
    <div className=" bg-black m-20 py-2 rounded-2xl px-2 sm:px-6 lg:px-8">
      <div className="max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mx-[-22px]">
          <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl h-full">
            {" "}
            <div className="flex items-center  mb-2">
              <div className="w-8 h-8 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                <FaFileAlt className="w-4 h-4 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                Required Services
              </h2>
            </div>
            <div className="space-y-1">
              {requiredServices.map((service, index) => (
                <div
                  key={index}
                  className="flex items-start p-1 rounded-lg bg-red-50 hover:bg-red-100 transition-colors duration-200"
                >
                  <span className="text-red-600 mr-1 mt-1 ">
                    {service.icon}
                  </span>
                  <span className="text-gray-800 font-medium text-center">
                    {service.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="flex items-center mb-8">
              <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                <FaCertificate className="w-4 h-4 text-blue-600" />
              </div>
              <h2 className="text-xl  font-bold text-gray-900">
                Disbursements
              </h2>
            </div>

            <div className="space-y-3">
              {disbursements.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start p-1 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
                >
                  <span className="text-blue-600 mr-4 mt-1">{item.icon}</span>
                  <span className="text-gray-800 font-medium">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="flex items-center mb-8">
              <div className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                <FaVideo className="w-4 h-4 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                Included Services
              </h2>
            </div>

            <div className="space-y-3">
              {includedServices.map((service, index) => (
                <div
                  key={index}
                  className="flex items-start p-1 rounded-xl bg-green-50 hover:bg-green-100 transition-colors duration-200"
                >
                  <span className="text-green-600 mr-4 mt-1">
                    {service.icon}
                  </span>
                  <span className="text-gray-800 font-medium">
                    {service.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
