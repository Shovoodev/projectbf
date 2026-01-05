import { FaPhoneAlt } from "react-icons/fa";

const CallToActionSection = () => {
  return (
    <section className="relative py-24 bg-surface isolate overflow-hidden">
      <div className="absolute inset-0 -z-10 "></div>

      <div className="section-container max-w-4xl mx-auto px-6 text-center">
        {/* --- HEADING --- */}
        <h2 className="text-4xl md:text-5xl font-display font-bold text-black mb-6 leading-tight">
          You’re Not Alone
          <br />
          <span className="text-black">We’re Just a Call Away</span>
        </h2>

        {/* --- DESCRIPTION --- */}
        <p className="text-black text-lg">
          We understand that saying goodbye is never easy. Our caring team is
          here to offer guidance, comfort, and support whenever you need it —
          simply reach out, and we’ll be by your side every step of the way.
        </p>

        {/* --- BUTTON --- */}
        <div className="flex flex-col items-center gap-4 mt-3">
          <a href="tel:1300110031" className="btn-enquire">
            <FaPhoneAlt className="text-sm" />
            <span>Let's Talk</span>
          </a>

          {/* --- SUB TEXT --- */}
          <h4 className="text-gray-400 text-lg font-medium tracking-wide mt-4">
            All queries are replied within 24h.
          </h4>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
