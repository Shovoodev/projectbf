import { useEffect, useRef, useState } from "react";

const getVisibleCount = () => {
  if (window.innerWidth < 640) return 2; // mobile
  if (window.innerWidth < 1024) return 3; // tablet
  return 5; // desktop
};

const Slider = ({ items }) => {
  const [visibleCount, setVisibleCount] = useState(getVisibleCount());
  const [page, setPage] = useState(0);
  const intervalRef = useRef(null);

  // 🔁 Handle resize
  useEffect(() => {
    const onResize = () => {
      setVisibleCount(getVisibleCount());
      setPage(0);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const totalPages = Math.ceil(items.length / visibleCount);

  const startAutoSlide = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setPage((prev) => (prev + 1) % totalPages);
    }, 4000);
  };

  const stopAutoSlide = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  useEffect(() => {
    startAutoSlide();
    return stopAutoSlide;
  }, [totalPages]);

  const startIndex = page * visibleCount;
  const visibleItems = items.slice(startIndex, startIndex + visibleCount);

  return (
    <div
      className={`mt-12 grid gap-4 ${
        visibleCount === 5
          ? "grid-cols-5"
          : visibleCount === 3
          ? "grid-cols-3"
          : "grid-cols-2"
      }`}
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      {visibleItems.map((img, idx) => (
        <div
          key={idx}
          className="aspect-[3/4] rounded-lg overflow-hidden shadow-md group"
        >
          <img
            src={img}
            alt="Stationery"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ))}
    </div>
  );
};

export default Slider;
