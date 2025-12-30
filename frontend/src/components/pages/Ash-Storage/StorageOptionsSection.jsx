import { FaCreditCard, FaDollarSign, FaRegClock } from "react-icons/fa6";
import img from "./images/Combination-lock-scaled.jpg";
const StorageOptionsSection = () => {
  return (
    <section className="bg-white py-16 md:py-24 border-t border-gray-100">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* --- LEFT SIDE: IMAGE --- */}
          <div className="rounded-xl overflow-hidden shadow-lg h-full min-h-[300px] group order-1 lg:order-1">
            <img
              src={img}
              alt="Secure Combination Lock for Ashes Storage"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* --- RIGHT SIDE: CONTENT --- */}
          <div className="space-y-8 order-2 lg:order-2">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 leading-tight">
                Transparent and Flexible Storage Options
              </h2>
              <div className="w-20 h-1 bg-black opacity-10"></div>
            </div>

            <div className="space-y-6">
              <p className="text-gray-600 font-body text-base md:text-lg leading-relaxed text-justify">
                After cremation, families receive two weeks of complimentary
                ashes storage from the cremation date. Beyond this period, a fee
                of $2 per day is charged for continued secure storage, payable
                upon collection.
              </p>

              {/* Styled List */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-black text-white p-2 rounded-full text-sm">
                    <FaRegClock />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wide">
                      First 2 Weeks
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Complimentary storage from the date of cremation
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-black text-white p-2 rounded-full text-sm">
                    <FaDollarSign />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wide">
                      After 2 Weeks
                    </h4>
                    <p className="text-gray-600 text-sm">
                      $2 per day for continued secure storage
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-black text-white p-2 rounded-full text-sm">
                    <FaCreditCard />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wide">
                      Payment
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Payable upon collection
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorageOptionsSection;
