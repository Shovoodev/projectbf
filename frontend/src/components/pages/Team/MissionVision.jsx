import { FaBullseye, FaEye } from "react-icons/fa6";

const MissionVision = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 ">
      <div className="card-mission">
        <div className="flex justify-center">
          <div className="icon-circle">
            <FaBullseye className="text-3xl text-gray-800" />
          </div>
        </div>
        <h2 className="heading-section">Our Mission</h2>
        <p className="text-text-light text-lg text-desc">
          At Black Tulip Funerals, our mission is focused on providing a
          dignified funeral service to our clients at the most affordable price
          possible. We believe that a funeral service should be a meaningful
          celebration of the person's life...
        </p>
      </div>

      <div className="card-mission">
        <div className="flex justify-center">
          <div className="icon-circle">
            <FaEye className="text-3xl text-gray-800" />
          </div>
        </div>
        <h2 className="heading-section">Our Vision</h2>
        <p className="text-text-light text-lg text-desc">
          Looking to the future, our vision is to excel in the funeral service
          industry and deliver exceptional fixed priced services that goes above
          and beyond our clients' expectations...
        </p>
      </div>
    </section>
  );
};

export default MissionVision;
