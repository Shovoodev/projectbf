import React from "react";

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
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNo2SNMduhNX5HzprtvzFIyqiUTfxIzMFjGSWCW81rhh0suyIcuMegKb9WRed0-fBgmPGtJu7zDWAKiCU2s-FDtMp8p5MtBHzYccJtm68lb_vWZi8z5lNOkkZWlPMGxkRgbXdNUCULvswpmhBQvK6JXxLvY15ZoGSWj_8oBMcIoquFaeClZIXq_-1ig1zDGIPseS9thEvQk3AEEW4CInEQig0BIN4D67_IchDRb2sQR3zZz6zGD6tRNYCIAeEX2kv3-RXJ6ik1ZuQ",
    },
    {
      title: "The Library",
      desc: "A private and modern oasis. This chapel can accommodate 84 guests",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDaw7G58pkGVJWe9O1IuZzVwWsM287nWjXM-IuGtwEMb3rGwxxRcASHpEotGeLTfUbjj8UaxXlIreFs2qXobMMvCxoex9w9PmkO3-ZWJEwtsGwH37WsqA9cG1HFrfpArk2nvXkT0F3q-VTwtgx9q26eUubTY3IAxQ0nB9oTvXrpp6nY90sQMalrxSGHRwSGCKiV64yzmb-LMYvenTiyTiojHFtzssSdoISpRC1m1aiJkgwU-YAJmJhwiqbVI_vb8KlBf7AF8nirnKs",
    },
    {
      title: "Viewing Room",
      desc: "Preserve the legacy of your loved one with thoughtfully designed funeral stationery from Sydney's leading funeral parlours.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5aK2ofWZD91BdNdJ8VScVM_dmrdfvgqOt9EBnZuNo5O2vhAUkYfjKV5xW0805I1t5TtEFOq1XprvFfJUi2kWCtkYnrqxnzLM_DBETeb7X0xA0aGFLikzIIJ0HcspOfQW4xGkay4gtngf1kMncHP4Mwqrv_4y2AJy6OFLlAVj6IBezJZhLOiedetAj_RoHSfjrN9FANwKy1KwChHB5saYHusOFZK-wVHQyFrIblwDUdPHc9IFC5r86nq7B-HVtdlwXjZaLeMGuLoI",
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
