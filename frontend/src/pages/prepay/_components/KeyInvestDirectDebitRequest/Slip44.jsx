import { FaChevronLeft } from "react-icons/fa";

const SlipThirteen = ({ onBack }) => {
  return (
    <div className="form-container-base">
      <div className="p-4 md:p-10">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {/* Left Column: Sections 5 & 6 */}
          <div className="space-y-10">
            {/* 5. Dispute */}
            <div>
              <h3 className="pdf-agreement-h3">5. Dispute</h3>
              <div className="space-y-4 text-[12px] leading-relaxed text-slate-700">
                <p>
                  5.1 If you believe that there has been an error in a debit
                  payment from your account, you should notify us directly on
                  <span className="font-bold ml-1">1300 658 904</span> and
                  confirm that notice in writing with us as soon as possible so
                  that we can resolve your query more quickly. Alternatively,
                  you may take this up with your financial institution directly.
                </p>
                <p>
                  5.2 If we conclude as a result of our investigations that your
                  account has been incorrectly debited we will respond to your
                  query by arranging for your financial institution to adjust
                  your account (including interest and charges) accordingly. We
                  will also notify you in writing of the amount by which your
                  account has been adjusted.
                </p>
                <p>
                  5.3 If we conclude as a result of our investigations that your
                  account has not been incorrectly debited we will respond to
                  your query by providing you with reasons and any evidence for
                  this finding.
                </p>
                <p>
                  5.4 Any queries you may have about an error made in debiting
                  your account should be directed to us in the first instance so
                  that we can attempt to resolve the matter between us and you.
                  If we cannot resolve the matter you can still refer it to your
                  financial institution.
                </p>
              </div>
            </div>

            {/* 6. Accounts */}
            <div>
              <h3 className="pdf-agreement-h3">6. Accounts</h3>
              <div className="space-y-3 text-[12px] leading-relaxed text-slate-700">
                <p className="font-bold">
                  6.1 Prior to completing your Direct Debit Request, you should
                  check:
                </p>
                <div className="pdf-legal-list">
                  <div className="pdf-legal-list-item">
                    <span className="pdf-legal-letter">a)</span>
                    <span>
                      with your financial institution whether direct debiting is
                      available from your account as direct debiting is not
                      available on all accounts offered by financial
                      institutions;
                    </span>
                  </div>
                  <div className="pdf-legal-list-item">
                    <span className="pdf-legal-letter">b)</span>
                    <span>
                      your account details which you have provided to us are
                      correct by checking them against a recent account
                      statement; and
                    </span>
                  </div>
                  <div className="pdf-legal-list-item">
                    <span className="pdf-legal-letter">c)</span>
                    <span>
                      with your financial institution if you have any queries
                      about how to complete the Direct Debit Request.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sections 7 & 8 */}
          <div className="space-y-10">
            {/* 7. Confidentiality */}
            <div>
              <h3 className="pdf-agreement-h3">7. Confidentiality</h3>
              <div className="space-y-4 text-[12px] leading-relaxed text-slate-700">
                <p>
                  7.1 We will keep any information (including your account
                  details) in your Direct Debit Request confidential. We will
                  make reasonable efforts to keep any such information that we
                  have about you secure and to ensure that any of our employees
                  or agents who have access to information about you do not make
                  any unauthorised use, modification, reproduction, or
                  disclosure of that information.
                </p>
                <p className="font-bold">
                  7.2 We will only disclose information that we have about you:
                </p>
                <div className="pdf-legal-list">
                  <div className="pdf-legal-list-item">
                    <span className="pdf-legal-letter">a)</span>
                    <span>to the extent specifically required by law; or</span>
                  </div>
                  <div className="pdf-legal-list-item">
                    <span className="pdf-legal-letter">b)</span>
                    <span>
                      for the purpose of this agreement (including disclosing
                      information in connection with any query or claim).
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 8. Notice */}
            <div>
              <h3 className="pdf-agreement-h3">8. Notice</h3>
              <div className="space-y-4 text-[12px] leading-relaxed text-slate-700">
                <p>
                  8.1 If you wish to notify us in writing about anything
                  relating to this agreement, you should write to us at:
                  <span className="block font-bold mt-1">
                    PO Box 3340, Rundle Mall, Adelaide, South Australia, 5000
                  </span>
                  <span className="block mt-1">
                    or email:{" "}
                    <span className="text-[#00A99D] font-bold">
                      info@keyinvest.com.au
                    </span>
                  </span>
                </p>
                <p>
                  8.2 We will notify you by sending a notice in the ordinary
                  post to the address you have given us in the Direct Debit
                  Request.
                </p>
                <p>
                  8.3 Any notice will be deemed to have been received on the
                  date that is 3 business days after it is posted.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Branding */}
        <div className="pdf-footer mt-16 border-t border-slate-200 pt-4">
          <div className="flex flex-wrap gap-2">
            <span className="text-[rgb(49,41,166)] font-black">KeyInvest</span>
            <span className="hidden sm:inline">
              Funeral Bond Product Disclosure Statement (PDS)
            </span>
          </div>
          <div className="flex gap-8 items-center">
            <div className="hidden md:block italic">Version: July 2026</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-8 mt-6 border-t border-gray-100">
          <button
            type="button"
            onClick={onBack}
            className="btn-secondary flex items-center gap-2"
          >
            <FaChevronLeft /> Previous Section
          </button>
          <button type="submit" className="btn-primary-pdf">
            Finalize Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlipThirteen;
