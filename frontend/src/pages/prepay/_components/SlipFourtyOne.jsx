import { usePrePayServiceApi } from "@/utility/prepay-service-provider";

const SlipFourtyOne = () => {
  const { directDebitForm, updateDirectDebitForm } = usePrePayServiceApi();
  return (
    <div className="w-full  bg-white text-[#2b2e83] px-10 py-12">
      {/* Header */}
      <h1 className="text-4xl font-bold leading-tight">
        KeyInvest Direct
        <br />
        Debit Request
      </h1>

      <hr className="my-6 border-[#2b2e83]/40" />

      {/* Description */}
      <p className="text-sm text-[#2b2e83]/90 max-w-4xl">
        Request and authority to debit the account named below to pay KeyInvest
        Ltd. Please PRINT clearly using blue or black pen, and mark boxes using
        crosses “X” where appropriate. Please return the completed form to
        KeyInvest or phone KeyInvest on 1300 658 904 with any enquiries.
      </p>

      <hr className="my-6 border-[#2b2e83]/40" />

      {/* Section 1 */}
      <h2 className="text-xl font-bold text-teal-600">
        1. Names and contact details
      </h2>

      {/* Account Holder 1 */}
      <section className="mt-6 space-y-4">
        <h3 className="font-semibold">Account Holder 1</h3>

        {/* Title */}
        <div className="flex items-center gap-6">
          <span className="w-16">Title:</span>
          {["Mr", "Mrs", "Ms", "Miss", "Dr", "Other"].map((t) => (
            <label key={t} className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4 border"
                checked={directDebitForm.accountHolders.holderOne.title === t}
                onChange={() =>
                  updateDirectDebitForm(
                    ["accountHolders", "holderOne", "title"],
                    t
                  )
                }
              />
              <span>{t}</span>
            </label>
          ))}
        </div>

        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm mb-1">
              Surname/Company/Trust Name:
            </label>
            <input
              className="pdf-input"
              onChange={(e) =>
                updateDirectDebitForm(
                  ["accountHolders", "holderOne", "surnameOrEntityName"],
                  e.target.value
                )
              }
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Given Names:</label>
            <input
              className="pdf-input"
              onChange={(e) =>
                updateDirectDebitForm(
                  ["accountHolders", "holderOne", "givenNames"],
                  e.target.value
                )
              }
            />
          </div>
        </div>
      </section>

      {/* Account Holder 2 */}
      <section className="mt-10 space-y-4">
        <h3 className="font-semibold">Account Holder 2</h3>

        {/* Title */}
        <div className="flex items-center gap-6">
          <span className="w-16">Title:</span>
          {["Mr", "Mrs", "Ms", "Miss", "Dr", "Other"].map((t) => (
            <label key={t} className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4 border"
                checked={directDebitForm.accountHolders.holderOne.title === t}
                onChange={() =>
                  updateDirectDebitForm(
                    ["accountHolders", "holderOne", "title"],
                    t
                  )
                }
              />
              <span>{t}</span>
            </label>
          ))}
        </div>

        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm mb-1">
              Surname/Company/Trust Name:
            </label>
            <input
              className="pdf-input"
              onChange={(e) =>
                updateDirectDebitForm(
                  ["accountHolders", "holderTwo", "surnameOrEntityName"],
                  e.target.value
                )
              }
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Given Names:</label>
            <input
              className="pdf-input"
              onChange={(e) =>
                updateDirectDebitForm(
                  ["accountHolders", "holderTwo", "givenNames"],
                  e.target.value
                )
              }
            />
          </div>
        </div>
      </section>

      {/* Address */}
      <section className="mt-10 space-y-4">
        <p className="text-sm font-semibold">If company ABN or Trust</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm mb-1">Address:</label>
            <input
              className="pdf-input"
              onChange={(e) =>
                updateDirectDebitForm(
                  ["accountHolders", "addressabn"],
                  e.target.value
                )
              }
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Suburb:</label>
            <input
              className="pdf-input"
              onChange={(e) =>
                updateDirectDebitForm(
                  ["accountHolders", "suburbabn"],
                  e.target.value
                )
              }
            />
          </div>

          <div>
            <label className="block text-sm mb-1">State:</label>
            <input
              className="pdf-input"
              onChange={(e) =>
                updateDirectDebitForm(
                  ["accountHolders", "stateabn"],
                  e.target.value
                )
              }
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Postcode:</label>
            <input
              className="pdf-input"
              onChange={(e) =>
                updateDirectDebitForm(
                  ["accountHolders", "postcodeabn"],
                  e.target.value
                )
              }
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Country:</label>
            <input defaultValue="AUSTRALIA" className="pdf-input" readOnly />
          </div>
        </div>
      </section>

      <hr className="my-10 border-[#2b2e83]/40" />

      {/* Section 2 */}
      <h2 className="text-xl font-bold text-teal-600">
        2. Nominated financial institution account
      </h2>

      <section className="mt-6 space-y-6">
        <div>
          <label className="block text-sm mb-1">
            Name of financial institution:
          </label>
          <input
            className="pdf-input"
            onChange={(e) =>
              updateDirectDebitForm(
                ["accountHolders", "institutionName"],
                e.target.value
              )
            }
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Branch:</label>
          <input
            className="pdf-input"
            onChange={(e) =>
              updateDirectDebitForm(
                ["accountHolders", "branch"],
                e.target.value
              )
            }
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Account Name:</label>
          <input
            className="pdf-input"
            onChange={(e) =>
              updateDirectDebitForm(
                ["accountHolders", "accountName"],
                e.target.value
              )
            }
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm mb-1">BSB Number:</label>
            <input
              className="pdf-input"
              onChange={(e) =>
                updateDirectDebitForm(
                  ["accountHolders", "bsbNumber"],
                  e.target.value
                )
              }
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Account Number:</label>
            <input
              className="pdf-input"
              onChange={(e) =>
                updateDirectDebitForm(
                  ["accountHolders", "accountNumber"],
                  e.target.value
                )
              }
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="pdf-footer">
        <div>
          <span className="text-blue-900">KeyInvest</span> Funeral Bond PDS
        </div>
        <div>Version: July 2026</div>
        <div>Page 41</div>
      </div>
    </div>
  );
};

export default SlipFourtyOne;
