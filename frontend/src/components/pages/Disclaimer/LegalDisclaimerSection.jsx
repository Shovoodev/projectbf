import React from "react";

const LegalDisclaimerSection = () => {
  return (
    <section className="bg-white py-12 border-t border-gray-200">
      <div className="section-container max-w-5xl mx-auto">
        {/* --- General Advice Warning --- */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-10 text-center">
          <p className="text-gray-500 text-xs md:text-sm leading-relaxed italic">
            As this website contains general advice that has been prepared
            without taking account of your objectives, financial situation or
            needs, you should consider the appropriateness of this advice before
            acting on it. If this general advice relates to acquiring a
            financial product, you should obtain a Product Disclosure Statement
            before deciding to acquire the product.
          </p>
        </div>

        {/* --- Policies Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 text-sm text-gray-600 leading-relaxed">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <h4 className="font-display font-bold text-gray-900 text-sm uppercase tracking-wide mb-2">
                Refund Policy
              </h4>
              <p>
                Black Tulip Funerals do not offer refunds. This transaction is
                for part or full payment of a funeral service. We will only
                refund money if you were accidently overcharged.
              </p>
            </div>

            <div>
              <h4 className="font-display font-bold text-gray-900 text-sm uppercase tracking-wide mb-2">
                Security Policy
              </h4>
              <p>
                When purchasing from Black Tulip Funerals, card details are
                transmitted through a secure server using “Live Payments”. Card
                data is not hosted by Black Tulip Funerals after processing.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <h4 className="font-display font-bold text-gray-900 text-sm uppercase tracking-wide mb-2">
                Currency
              </h4>
              <p>
                Black Tulip Funerals processes all transactions only in
                Australian Dollars.
              </p>
            </div>

            <div>
              <h4 className="font-display font-bold text-gray-900 text-sm uppercase tracking-wide mb-2">
                Shipping and Delivery Policy
              </h4>
              <p>
                We deliver products using Australia Post. Shipping costs are
                influenced by size and weight of the product and your location.
                Orders are dispatched within 7 business days. Shipping times are
                estimated at between 3 and 21 business days depending on your
                location.
              </p>
            </div>

            <div>
              <h4 className="font-display font-bold text-gray-900 text-sm uppercase tracking-wide mb-2">
                Shipping Destination
              </h4>
              <p>Black Tulip Funerals ships goods Australia wide.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LegalDisclaimerSection;
