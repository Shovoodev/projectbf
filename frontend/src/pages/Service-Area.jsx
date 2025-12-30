import Hero from "../components/common/Hero";
import ServiceAreasSection from "../components/pages/Service-Area/Service-Area";

function ServiceArea() {
  return (
    <>
      <Hero title={"Service-Area"} subtitle={"Service-Area"} />
      <section className="max-w-[1360px] mx-auto px-2.5 sm:px-4 lg:px-8 py-12 space-y-16">
        <ServiceAreasSection />
      </section>
    </>
  );
}

export default ServiceArea;
