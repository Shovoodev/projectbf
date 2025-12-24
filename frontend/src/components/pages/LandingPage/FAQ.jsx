import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";

const FAQItem = ({ q, a, isOpen, onToggle }) => (
  <div className="bg-black text-white rounded-lg mb-4 border border-white/10 overflow-hidden shadow-md hover:border-white/30 transition-colors duration-300">
    <button
      onClick={onToggle}
      className="w-full flex justify-between items-start p-5 text-left focus:outline-none"
    >
      <span className="font-display text-white font-bold text-lg leading-snug pr-4">
        {q}
      </span>
      <span className="mt-1 flex-shrink-0 text-white/70 text-sm">
        {isOpen ? <FaMinus /> : <FaPlus />}
      </span>
    </button>

    <div
      className={`px-5 font-body text-sm leading-relaxed text-gray-300 text-justify transition-all duration-300 ease-in-out overflow-hidden ${
        isOpen ? "max-h-[500px] opacity-100 pb-6" : "max-h-0 opacity-0"
      }`}
    >
      {a}
    </div>
  </div>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const faqs = [
    {
      q: "Is live streaming available?",
      a: "Most cemetery/crematorium chapels in Sydney now offer FREE live streaming during COVID-19. Venues such as churches and halls don’t offer this service, though there are external companies that offer the service at an additional charge.",
    },
    {
      q: "What if I am feeling unwell?",
      a: "If you are unwell with flu-like symptoms or have been in contact with a person diagnosed with COVID-19 within the last 14 days, we ask for your cooperation in not attending the funeral.",
    },
    {
      q: "Why do I need to give you my personal details when attending a funeral?",
      a: "The Government guidelines require us to keep a register of all attendees at funeral services. This register is to be held securely by Black Tulip Funerals and the attending venue for 30 days and only released if requested by the Department of Health for contact tracing.",
    },
    {
      q: "First Steps of Death Occurrence - Private Residence",
      a: "When a person dies in a private residence, a medical certificate cause of death will usually be signed by the family doctor. We highly recommend especially for families choosing to cremate, that the attending doctor is your normal GP. Sometimes there is a need for Police involvement, especially for accidental, unexplained or unexpected death.",
    },
    {
      q: "First Steps of Death Occurrence - Nursing Home",
      a: "When a person dies in a nursing home, a medical certificate cause of death is issued by the normal nursing home GP. Sadly though, most nursing homes push the families to have the deceased transferred immediately and have an afterhours GP or Registered Nurse sign an interim certificate.",
    },
    {
      q: "First Steps of Death Occurrence - Hospital",
      a: "When a person dies in a private hospital or public hospital the hospital doctor will usually sign the medical certificate cause of death. Once a death has been verified, the family is able to contact a funeral director of their choice to request transfer of the deceased.",
    },
    {
      q: "What is the role of the Funeral Director?",
      a: "Our role is to answer the many questions that will arise and guide families through arrangements to create a loving and final tribute to best honour the life of their loved one.",
    },
    {
      q: "What options are there for venues?",
      a: "Most funeral services are held in a church, funeral home chapel or at a cemetery chapel. The choice belongs to the family making the arrangements. However, Black Tulip Funerals pricing is designed to conduct funerals solely within our facilities.",
    },
    {
      q: "Who leads or conducts the funeral service?",
      a: "Any person is able to lead a funeral service. Most often, families choose a minister of religion or a civil celebrant. Your funeral director is usually able to nominate the best person to suit your family’s needs.",
    },
    {
      q: "The Eulogy",
      a: "People often find the task of writing and performing a eulogy quite daunting, but it can be a wonderful way to remember a loved-one and share some special memories. It is an honour to be chosen to deliver a eulogy.",
    },
    {
      q: "Viewings",
      a: "A private viewing can be arranged prior to the funeral at an additional cost or be included in the allocated funeral timing at no cost. Some families organise a double booking on the day of the funeral and have the viewing prior to the actual allocated funeral time.",
    },
    {
      q: "Children",
      a: "Children are always welcome at funerals and sometimes even given a role to play as part of the funeral service. There are some families however, who may feel their children are too young to understand or participate fully.",
    },
    {
      q: "How do we obtain the Death Certificate?",
      a: "Your funeral director will provide you with the New South Wales Birth, Deaths & Marriages Death Registration form for you to complete. Once registered, the official Death Certificate will take approximately 2-3 weeks to arrive.",
    },
    {
      q: "Flowers",
      a: "Our arrangers can assist with all your floral needs, from casket sprays to individual reflection flowers. We support our local florists and can share their details if you wish to personally speak to them.",
    },
    {
      q: "Transport",
      a: "Most families tend to utilize their own vehicles these days, though we can provide chauffeured sedans and limousines as per the family’s requests. All pricing is on application due to distance and services needed.",
    },
    {
      q: "Can the funeral service be personalised?",
      a: "Yes, our packages provide the normal necessary requirements, though we always make recommendations to families on how they can personally contribute to make a unique experience that reflects and honours the life of your loved one.",
    },
    {
      q: "Can we release balloons?",
      a: "Though we are all conscious of the emotional significance releasing balloons can have at a funeral, these releases can also have a negative effect on the environment. NSW has restrictions limiting the maximum number to 19 balloons at any one time.",
    },
    {
      q: "Personalised Coffin",
      a: "This can certainly be done. Your arranger can assist with suggestions to create a coffin that is very unique and personal for your loved one. The family can be provided the coffin to personalize in their own time.",
    },
    {
      q: "Newspaper Notices",
      a: "Newspaper death notices are usually placed by family and friends of the deceased prior to the funeral service taking place. The newspaper will give you ideas on what is generally mentioned in the notice.",
    },
    {
      q: "Social Media",
      a: "Social media platforms such as Facebook, Twitter and Instagram are commonly used by families to share the passing of a loved one and scheduled funeral details. If funeral stationery has been ordered through Funera, we include a complimentary picture notice.",
    },
    {
      q: "How much does a funeral cost?",
      a: "Costs of a funeral varies, depending on the options you and your family choose. We provide a range of standard packages that cover most family’s needs, while providing options that allow you and your family to tailor the funeral.",
    },
    {
      q: "Insurance Funds",
      a: "If you are aware of any Funeral Insurance Policies, it is advisable to speak directly with the provider before discussing your requirements with a funeral director. Most insurance companies pay the beneficiary noted on the policy, and not the funeral director.",
    },
    {
      q: "What is the difference between a coffin and a casket?",
      a: "A coffin is tapered in shape, wider at the shoulders and narrower at the head and foot. A casket is rectangular in shape, comes mostly with a hinged lid and can be supplied in MDF, solid timber or metal.",
    },
    {
      q: "Embalming",
      a: "Embalming is an important option we recommend to families. The process involves a range of hygienic and cosmetic procedures, the purpose of which are to slow down the deterioration of the body and facilitate viewing.",
    },
    {
      q: "Family owned versus large organisations.",
      a: "At Black Tulip Funerals, we are a family owned service provider. We are devoted to providing the best possible service to satisfy the needs of our families without the distraction of corporate mandates.",
    },
    {
      q: "What are the benefits of a prepaid funeral?",
      a: "A Prepaid Funeral Plan not only enables you to ease the financial burden on loved ones, but it also allows you to plan your goodbye the way you would like it to be. Unlike funeral insurance, a prepaid funeral is a one-off cost.",
    },
    {
      q: "How much does a prepaid funeral cost?",
      a: "The cost of a prepaid funeral will vary depending on the type of funeral service that you choose. Many people now pre-pay for their funeral earlier in life because the cost is more affordable and the price is protected against inflation.",
    },
    {
      q: "Who should I tell about my prepaid plans?",
      a: "Some people may feel comfortable discussing their funeral plans with a spouse, adult children or another member of the family. We would strongly advise that if your immediate family is not informed, a trusted friend, solicitor or executor should be notified.",
    },
    {
      q: "How secure are my funds? What if you go out of business?",
      a: "The administration of the funds is handled by a well-respected independent public company and have government security. If we were to go out of business, your funds are held by the trust.",
    },
    {
      q: "What happens if my circumstances change?",
      a: "You have the right, at any time during your lifetime, to cancel the agreement and withdraw from the plan. With the exception of administration expenses, all money paid by you would be refunded.",
    },
  ];

  // We split the array in half to create two columns,
  // BUT we keep the original index so the toggle logic works globally.
  const midPoint = Math.ceil(faqs.length / 2);
  const leftColumn = faqs.slice(0, midPoint);
  const rightColumn = faqs.slice(midPoint);

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="section-container">
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4 uppercase tracking-wide">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-1 bg-black mx-auto mb-6 opacity-10"></div>
          <p className="text-gray-600 font-body">
            Here you’ll find clear, compassionate answers to help guide you
            through the process with confidence and peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0 items-start">
          {/* Left Column */}
          <div>
            {leftColumn.map((item, idx) => (
              <FAQItem
                key={idx}
                {...item}
                isOpen={openIndex === idx} // Uses original index 0 to midPoint
                onToggle={() => handleToggle(idx)}
              />
            ))}
          </div>

          {/* Right Column */}
          <div>
            {rightColumn.map((item, idx) => {
              const globalIndex = idx + midPoint; // Calculate true global index
              return (
                <FAQItem
                  key={globalIndex}
                  {...item}
                  isOpen={openIndex === globalIndex}
                  onToggle={() => handleToggle(globalIndex)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
