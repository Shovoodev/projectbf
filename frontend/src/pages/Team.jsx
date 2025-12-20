import Hero from "../components/common/Hero";
import CeoProfile from "../components/pages/Team/CeoProfile";
import MissionVision from "../components/pages/Team/MissionVision";
import TeamList from "../components/pages/Team/TeamList";

function Team() {
  return (
    <>
      <Hero title={"Team"} subtitle={"Team"} />
      <section className="max-w-[1360px] mx-auto px-2.5 sm:px-4 lg:px-8 py-12 space-y-16">
        <MissionVision />
        <CeoProfile />
        <TeamList />
      </section>
    </>
  );
}

export default Team;
