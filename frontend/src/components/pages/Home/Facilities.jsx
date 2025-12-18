import img1 from "./images/1.1.png";
import img2 from "./images/1.2.png";
import img3 from "./images/1.3.png";

const FacilityCard = ({ img, title, desc }) => (
  <div className="group">
    <div className="rounded-2xl overflow-hidden mb-6 shadow-md h-64">
      <img
        src={img}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>
    <h3 className="text-lg font-display font-bold text-gray-900 mb-2 uppercase tracking-wide">
      {title}
    </h3>
    <p className="text-sm text-gray-500 leading-relaxed px-4 font-body">
      {desc}
    </p>
  </div>
);

const Facilities = () => {
  const rooms = [
    {
      title: "The Auditorium",
      desc: "Sydney’s largest chapel accommodating 288 guests in 5 STAR comfort. Mood lighting, 24sqm screen, luxury seating, acoustic sound proofing.",
      img: img1,
    },
    {
      title: "The Library",
      desc: "A private and modern oasis. This chapel can accommodate 84 guests",
      img: img2,
    },
    {
      title: "Viewing Room",
      desc: "Preserve the legacy of your loved one with thoughtfully designed funeral stationery from Sydney's leading funeral parlours.",
      img: img3,
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="section-container text-center">
        <h2 className="heading-lg mb-16">
          OUR EXCLUSIVE
          <br />
          CHAPELS & VIEWING ROOMS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rooms.map((room, idx) => (
            <FacilityCard key={idx} {...room} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Facilities;
