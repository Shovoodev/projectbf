import Hero from "../components/common/Hero";
import NotificationChecklistSection from "../components/pages/Resources/NotificationChecklistSection";
import SupportGroupsSection from "../components/pages/Resources/SupportGroupsSection";
import UsefulLinksSection from "../components/pages/Resources/UsefulLinksSection";




function Resources() {
  return (
    <>
      <Hero title={"Resources"} subtitle={"Resources"} />
      <section className="max-w-[1360px] mx-auto px-2.5 sm:px-4 lg:px-8 py-12 space-y-16">
        <UsefulLinksSection />
        <SupportGroupsSection />
        <NotificationChecklistSection />
      </section>
    </>
  );
}

export default Resources;
