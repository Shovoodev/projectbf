const DisclaimerSection = () => {
  return (
    <section id="disclaimer-section" className="py-16 bg-gray-100 scroll-mt-24">
      <div className="mx-auto px-6">
        {/* --- HEADING --- */}
        <div className="mb-8">
          <h5 className="heading-lg">Disclaimer</h5>
          <div className="w-12 h-1 bg-black rounded-full"></div>
        </div>

        {/* --- CONTENT --- */}
        <div className="font-montserrat text-gray-600 text-sm md:text-base leading-relaxed space-y-4 text-justify">
          <p>
            This legal disclaimer emphasises that the pitchbook is provided
            solely for informational purposes and should not be used as
            financial or investment advice. The reader is warned that any
            reliance on the information presented in the pitchbook is at their
            own risk and that Black Tulip Funerals do not guarantee the accuracy
            or completeness of the information contained therein.
          </p>
          <p>
            The pitchbook is not intended to offer or solicit the sale or
            purchase of any securities or financial instruments, and any
            transactions or investments described in the pitchbook are subject
            to legal and regulatory requirements. Black Tulip Funerals makes no
            representations or warranties regarding the legality, suitability,
            or appropriateness of such transactions or investments.
          </p>
          <p>
            Readers are firmly advised to seek advice from their financial and
            legal advisors before making investment decisions. By using this
            pitchbook, the reader acknowledges and agrees that they have read
            and understood this legal disclaimer and that they will not hold
            Black Tulip Funerals liable for any losses or damages resulting from
            their reliance on the information contained herein.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DisclaimerSection;
