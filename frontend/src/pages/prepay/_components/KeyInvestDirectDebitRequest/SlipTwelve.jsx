import React from "react";
import { FaChevronLeft } from "react-icons/fa";

const SlipTwelve = () => {
  return (
    <div className="form-container-base">
      <div className="p-4 md:p-10">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-[rgb(49,41,166)] leading-none mb-2">
            Direct Debit
          </h1>
          <h1 className="text-4xl font-bold text-[rgb(49,41,166)] leading-none">
            Request Form
          </h1>
        </header>

        <section>
          <h2 className="pdf-h2 text-[#00A99D] mb-8">
            5. Direct Debit Request Service Agreement
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {/* Column 1 */}
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-[rgb(49,41,166)] mb-3">
                  Definitions
                </h3>
                <div className="space-y-3 text-[12px] leading-relaxed text-slate-700">
                  <p>
                    <span className="font-bold text-[rgb(49,41,166)]">
                      Account
                    </span>{" "}
                    means the account held at your financial institution from
                    which we are authorised to arrange for funds to be debited.
                  </p>
                  <p>
                    <span className="font-bold text-[rgb(49,41,166)]">
                      Agreement
                    </span>{" "}
                    means this Direct Debit Request Service Agreement between
                    you and us.
                  </p>
                  <p>
                    <span className="font-bold text-[rgb(49,41,166)]">
                      Business day
                    </span>{" "}
                    means a day that is not a Saturday, Sunday or bank or public
                    holiday in South Australia.
                  </p>
                  <p>
                    <span className="font-bold text-[rgb(49,41,166)]">
                      Debit day
                    </span>{" "}
                    means the day that payment by you to us is due under your
                    Direct Debit Request and this agreement.
                  </p>
                  <p>
                    <span className="font-bold text-[rgb(49,41,166)]">
                      Debit payment
                    </span>{" "}
                    means a particular transaction where a debit is made.
                  </p>
                  <p>
                    <span className="font-bold text-[rgb(49,41,166)]">
                      Direct debit request
                    </span>{" "}
                    means the direct debit request between us and you (and
                    includes any form PD-C approved for use in the transitional
                    period).
                  </p>

                  <p>
                    <span className="font-bold text-[rgb(49,41,166)]">
                      Us our we
                    </span>{" "}
                    means KeyInvest Ltd.{" "}
                    <span className="font-bold text-[rgb(49,41,166)]">you</span>{" "}
                    means the person or entity providing the Direct Debit
                    Request.
                  </p>
                  <p>
                    <span className="font-bold text-[rgb(49,41,166)]">
                      Your financial institution
                    </span>{" "}
                    is the financial institution where you hold the account that
                    you have authorised us to arrange to debit.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-[rgb(49,41,166)] mb-3">
                  1. Debiting your account
                </h3>
                <div className="space-y-3 text-[12px] leading-relaxed text-slate-700">
                  <p>
                    1.1 By signing a Direct Debit Request, you have authorised
                    us to arrange for funds to be debited from your account. You
                    should refer to the Direct Debit Request and this agreement
                    for the terms of the arrangement between us and you.
                  </p>
                  <p>
                    1.2 We will only arrange for funds to be debited from your
                    account as authorised in the Direct Debit Request. If you
                    have selected automatic increases in the Section 3 of the
                    Direct Debit Request, you authorise us to increase your
                    regular debit payment by the nominated percentage each year
                    from the date of the Direct Debit Request.
                  </p>
                  <p>
                    1.3 If the debit day falls on a day that is not a business
                    day, we may direct your financial institution to debit your
                    account on the following business day. If you are unsure
                    about which day your account has or will be debited you
                    should ask your financial institution.
                  </p>
                </div>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-[rgb(49,41,166)] mb-3">
                  2. Changes by us
                </h3>
                <div className="text-[12px] leading-relaxed text-slate-700">
                  <p>
                    2.1 We may vary any details of this agreement or a Direct
                    Debit Request at any time by giving you at least 30 days’
                    prior written notice.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-[rgb(49,41,166)] mb-3">
                  3. Changes by you
                </h3>
                <div className="space-y-3 text-[12px] leading-relaxed text-slate-700">
                  <p>
                    3.1 Subject to 3.2, you may change the arrangements under a
                    Direct Debit Request by contacting us on 1300 658 904.
                  </p>
                  <p>
                    3.2 If you wish to stop or defer a debit payment, or cancel
                    your authority, you must notify us in writing at least 7
                    days before the next debit day. This notice should be given
                    to us in the first instance. Stops and cancellations can
                    also be directed to the Bank.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-[rgb(49,41,166)] mb-3">
                  4. Your obligations
                </h3>
                <div className="space-y-3 text-[12px] leading-relaxed text-slate-700">
                  <p>
                    4.1 It is your responsibility to ensure that there are
                    sufficient clear funds available in your account to allow a
                    debit payment to be made in accordance with the Direct Debit
                    Request and this agreement.
                  </p>
                  <p>
                    4.2 If there are insufficient clear funds in your account to
                    meet a debit payment:
                  </p>
                  <div className="pl-4 space-y-2">
                    <p>
                      a) you may be charged a fee and/or interest by your
                      financial institution;
                    </p>
                    <p>
                      b) you may also incur fees or charges imposed or incurred
                      by us; and
                    </p>
                    <p>
                      c) you must arrange for the debit payment to be made by
                      another method or arrange for sufficient clear funds to be
                      in your account by an agreed time so that we can process
                      the debit payment.
                    </p>
                  </div>
                  <p>
                    4.3 You should check your account statement to verify that
                    the amounts debited from your account are correct.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Actions */}
      </div>
    </div>
  );
};

export default SlipTwelve;
