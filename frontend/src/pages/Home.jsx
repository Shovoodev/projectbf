import Facilities from "../components/pages/Home/Facilities";
import Hero from "../components/pages/Home/Hero";
import Musicians from "../components/pages/Home/Musicians";
import Packages from "../components/pages/Home/Packages";
import ServiceArea from "../components/pages/Home/ServiceArea";
import Stationery from "../components/pages/Home/Stationery";

function Home() {
  return (
    <section className="max-w-[1360px] mx-auto">
      <Hero />
      <Packages />
      <Stationery />
      <Musicians />
      <Facilities />
      <ServiceArea />
    </section>
  );
}

export default Home;
