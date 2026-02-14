import AshesStorageContentSection from "../components/pages/Ash-Storage/AshesStorageContentSection";
import AshesStorageHero from "../components/pages/Ash-Storage/AshesStorageHero";
import MeetTeamSection from "../components/pages/Ash-Storage/MeetTeamSection";
import NeedMoreTimeSection from "../components/pages/Ash-Storage/NeedMoreTimeSection";
import StorageOptionsSection from "../components/pages/Ash-Storage/StorageOptionsSection";
import WhyDelayCollectionSection from "../components/pages/Ash-Storage/WhyDelayCollectionSection";

function Ash_Storage() {
  return (
    <section>
      <AshesStorageHero />
      <AshesStorageContentSection />
      <WhyDelayCollectionSection />
      <StorageOptionsSection />
      <MeetTeamSection />
      <NeedMoreTimeSection />
    </section>
  );
}

export default Ash_Storage;
