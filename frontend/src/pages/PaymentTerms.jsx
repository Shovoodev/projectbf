import Hero from "../components/common/Hero";

/**
 * Reusable Paragraph Component
 * Ensures consistent 16px (text-base) and black color across the page.
 */
const Paragraph = ({ children, className = "" }) => (
  <p
    className={`text-black text-base leading-relaxed mb-6 mx-auto ${className}`}
  >
    {children}
  </p>
);

const PaymentTerms = () => {
  return (
    <div className="bg-white">
      {/* --- HERO SECTION --- */}
      <Hero
        title="Payment Terms"
        subtitle="
Payment Terms"
      />

      <main className="max-w-5xl mx-auto px-6 py-16 lg:py-24 text-center">
        {/* Prices and Payment */}
        <section className="mb-12">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
            Prices and Payment
          </h2>
          <Paragraph>
            All prices are in AUD. We accept payment using this facility by
            VISA, and Mastercard cards only.
          </Paragraph>
        </section>

        <hr className="my-12 border-gray-100" />

        {/* Charges */}
        <section className="mb-12">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
            Charges
          </h2>
          <Paragraph>
            You will not incur any surchargess made through this BPOINT
            facility.
          </Paragraph>
        </section>

        <hr className="my-12 border-gray-100" />

        {/* Customer Service */}
        <section className="mb-12">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
            Customer Service
          </h2>
          <Paragraph>Any complaints should be made to:</Paragraph>
          <Paragraph>
            Accounts <br />
            Ovanta Pty LTD
            <br />
            New South Wales <br />
            Email:{" "}
            <a
              href="mailto:accounts@afterlifefunerals.com.au"
              className="text-black underline underline-offset-4"
            >
              enquiries@blacktulipfunerals.com.au
            </a>
          </Paragraph>
          <Paragraph>
            You can e-mail, write, telephone or fax us with your complaint. Our
            normal office hours are 9am-5pm, Monday to Friday.
          </Paragraph>
        </section>

        <hr className="my-12 border-gray-100" />

        {/* Statutory Rights */}
        <section className="mb-20">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
            Statutory Rights
          </h2>
          <Paragraph>
            These Terms and Conditions do not affect any of your statutory
            rights.
          </Paragraph>
        </section>
      </main>
    </div>
  );
};

export default PaymentTerms;
