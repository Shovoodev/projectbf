import ChapelSection from "../components/pages/Cheples/ChapelSection";
import Hero from "../components/pages/Cheples/Hero";
import img1 from "../components/pages/Cheples/images/1_3-Photo-new.jpg";
import img2 from "../components/pages/Cheples/images/middle.jpg";
import img3 from "../components/pages/Cheples/images/Viewing-Chapel-sample-design-new.jpg";
const ChapelsPage = () => {
  return (
    <div className="bg-white">
      <Hero />

      {/* 1. The Auditorium */}
      <ChapelSection
        title="The Auditorium"
        image={img1}
        hasSlider={true}
        background="bg-white"
      >
        <p>
          The Black Tulip Funerals Chapel is a truly exceptional venue,
          thoughtfully designed to provide comfort, elegance, and serenity for
          every service. With a seating capacity of 240 guests, the chapel
          features luxury seating upholstered in rich brown tones, creating an
          inviting and dignified atmosphere suitable for gatherings of all
          sizes. The space is adorned with genuine marble fixtures, including
          decorative railings and altar features, delivering a sense of timeless
          sophistication. Mood lighting, artfully integrated into the ceiling
          and walls, gently enhances the ambiance, ensuring a calming and
          respectful environment.
        </p>
        <p>
          Central to the chapel is a state-of-the-art, 24 square metre
          presentation screen, providing a vivid digital backdrop for photo
          tributes, live streams, and video content, giving families every
          opportunity to personalise their memorial experience. Acoustic
          soundproofing has been meticulously included throughout the
          architecture, guaranteeing clear audio and privacy for every ceremony.
          Additional touches—such as the grand white piano—elevate the
          experience, offering opportunities for live or recorded music to be
          shared in perfect harmony.
        </p>
        <p className="text-sm italic mt-4 opacity-80">
          Every detail of the chapel, from the luxurious seating layout to the
          luminous finishes and advanced technological features, has been
          carefully curated to deliver a modern celebration of life without
          compromise on comfort or style.
        </p>
      </ChapelSection>

      {/* 2. The Library */}
      <ChapelSection
        title="The Library"
        image={img2}
        background="bg-surface" // Using your global surface color
      >
        <p>
          The Library Chapel offers an intimate, elegantly modern space designed
          for heartfelt and meaningful gatherings. Accommodating up to 84
          guests, the chapel features gently curved, pew-style seating with
          luxurious soft padding, ensuring both comfort and dignity for every
          attendee. The contemporary architectural lines, highlighted by tall
          windows and minimalist concrete walls, create a serene and
          contemplative ambiance.
        </p>
        <p>
          A 12 square metre digital screen sits prominently at the front,
          providing a clear and vivid platform for photo tributes, live streams,
          or personalised visual presentations, ensuring every service feels
          truly unique. Integrated mood lighting, with vertical strips accenting
          the sleek lines of the ceiling and walls, subtly enhances the
          environment, fostering warmth and tranquility throughout every
          ceremony.
        </p>
        <p>
          The space is thoughtfully designed to blend openness with a sense of
          privacy—ideal for smaller, more personal farewells. Carefully selected
          décor, including indoor greenery and modern fixtures, further enhances
          the calming atmosphere. Whether reflecting in quiet moments or sharing
          memories, guests in The Library will experience a harmonious balance
          of comfort, style, and innovation, distinguishing it as a premier
          venue for meaningful remembrance.
        </p>
      </ChapelSection>

      {/* 3. Viewing Rooms */}
      <ChapelSection title="Viewing Rooms" image={img3} background="bg-white">
        <p>
          Within each Viewing Room, guests will find elegantly crafted timber
          bench seating arranged to encourage togetherness and reflection.
          Calming neutral tones and soft, contemporary décor—including fresh
          flowers and modern sculpture—promote a sense of serenity and solace
          during your visit. Throughout every booking, soothing background music
          gently fills the space, fostering a restful mood without the
          distraction of visual or audio-visual equipment, allowing your
          family's focus to remain on these heartfelt moments.
        </p>
        <p>
          The layout and design of the three rooms support both communal sharing
          and quiet contemplation, with ample space for small gatherings or
          individual reflection. By offering multiple, soundproofed suites, we
          are able to meet the needs of several families at once, all while
          maintaining the utmost respect, dignity, and privacy in every
          farewell.
        </p>
      </ChapelSection>
    </div>
  );
};

export default ChapelsPage;
