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
          celebration of the person’s life and that the choices made during the
          planning process can truly help to honour the deceased and their
          legacy. We strive to personalise each service to reflect the unique
          beliefs, culture, and nationality of our clients, and we offer a wide
          range of products and options to make the service more memorable for
          all those involved. As an Australian-owned independent family
          business, we are dedicated in providing compassionate and attentive
          support to our clients throughout the entire funeral planning process.
          Our goal is to alleviate as much stress and burden as possible, so our
          clients can focus on remembering and honouring their loved ones.
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
          and beyond our clients’ expectations. We are committed to offering
          sincerity, dignity, and compassion in all that we do and to providing
          a transparent approach that removes any pressure or hard sell. Our
          goal is to streamline the entire funeral planning process and offer an
          all-inclusive, one-stop package that takes care of everything our
          clients need during this difficult time. We believe that by focusing
          on our clients’ needs and delivering exceptional service, we can
          become a trusted and respected leader in the funeral service industry.
        </p>
      </div>
    </section>
  );
};

export default MissionVision;
