import React from "react";

const LegalDisclaimerSection = () => {
  return (
    <section className="bg-white py-16 md:py-24 border-t border-gray-200">
      <div className="section-container  mx-auto">
        {/* General Advice Warning */}
        <div className="mb-12 text-center">
          <p className="text-gray-500 text-lg md:text-lg leading-relaxed italic border border-gray-200 p-6 rounded-lg bg-gray-50">
            As this website contains general advice that has been prepared
            without taking account of your objectives, financial situation or
            needs, you should consider the appropriateness of this advice before
            acting on it. If this general advice relates to acquiring a
            financial product, you should obtain a Product Disclosure Statement
            before deciding to acquire the product.
          </p>
        </div>

        {/* Detailed Policies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-700 leading-relaxed">
          <div>
            <h4 className="font-bold text-gray-900 mb-2 uppercase text-lg tracking-wider">
              Refund Policy
            </h4>
            <p className="mb-6 text-lg">
              Black Tulip Funerals do not offer refunds. This transaction is for
              part or full payment of a funeral service. We will only refund
              money if you were accidently overcharged.
            </p>

            <h4 className="font-bold text-gray-900 mb-2 uppercase text-lg tracking-wider">
              Security Policy
            </h4>
            <p className="mb-6 text-lg">
              When purchasing from Black Tulip Funerals, card details are
              transmitted through a secure server using “Live Payments”. Card
              data is not hosted by Black Tulip Funerals after processing.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-2 uppercase text-lg tracking-wider">
              Currency
            </h4>
            <p className="mb-6 text-lg">
              Black Tulip Funerals processes all transactions only in Australian
              Dollars.
            </p>

            <h4 className="font-bold text-gray-900 mb-2 uppercase text-lg tracking-wider">
              Shipping and Delivery Policy
            </h4>
            <p className="mb-6 text-lg">
              We deliver products using Australia Post. Shipping costs are
              influenced by size and weight of the product and your location.
              Orders are dispatched within 7 business days. Shipping times are
              estimated at between 3 and 21 business days depending on your
              location.
            </p>

            <h4 className="font-bold text-gray-900 mb-2 uppercase text-lg tracking-wider">
              Shipping Destination
            </h4>
            <p>Black Tulip Funerals ships goods Australia wide.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LegalDisclaimerSection;
