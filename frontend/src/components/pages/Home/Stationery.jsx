import Slider from "./Stationary-Single-Img";

const Stationery = () => {
  // const items = [
  //   { img: img1 },
  //   { img: img2 },
  //   { img: img3 },
  //   { img: img4 },
  //   { img: img5 },
  //   { img: img6 },
  //   { img: img7 },
  //   { img: img8 },
  //   { img: img9 },
  //   { img: img10 },
  // ];

  const images = import.meta.glob("./images/Stationary/*.webp", {
    eager: true,
    import: "default",
  });

  const items = Object.values(images);

  return (
    <section className="section-padding bg-white border-t border-gray-100">
      <div className="section-container text-center">
        <h2 className="heading-lg font-semibold">
          SYDNEY'S LARGEST RANGE OF FUNERAL STATIONERY & COFFIN WRAPS
        </h2>
        <Slider items={items} />
        {/* <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-4">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="aspect-[3/4] rounded-lg overflow-hidden shadow-md group relative"
            >
              <img
                src={item.img}
                alt="Stationery"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div> */}

        <p className="mt-8 text-sm text-gray-500 max-w-4xl mx-auto font-body">
          Preserve the legacy of your loved one with thoughtfully designed
          funeral stationery from Sydney's leading funeral parlours. From
          elegant service booklets to heartfelt thank you cards, each piece
          honours their memory.
        </p>
      </div>
    </section>
  );
};

export default Stationery;
