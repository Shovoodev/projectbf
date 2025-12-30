import img from "./images/Financial-Performance.png";

function Financial_Performance() {
  return (
    <section id="financial-performance" className="py-16 bg-white scroll-mt-24">
      <div className="">
        {/* Section Heading */}
        <h2 className="heading-lg">Financial Performance</h2>
        <img className="rounded-lg" src={img} alt="" />
        {/* 3-Column Grid */}
      </div>
    </section>
  );
}

export default Financial_Performance;
