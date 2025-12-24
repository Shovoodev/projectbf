import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";

const AccordionItem = ({ title, content, isOpen, onToggle }) => (
  <div className="bg-white rounded-lg mb-4 border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
    <button
      onClick={onToggle}
      className="w-full flex justify-between items-center p-5 text-left focus:outline-none bg-gray-50 hover:bg-gray-100 transition-colors"
    >
      <span className="font-display font-bold text-gray-900 text-lg">
        {title}
      </span>
      <span className="ml-4 flex-shrink-0 text-gray-500">
        {isOpen ? <FaMinus /> : <FaPlus />}
      </span>
    </button>

    <div
      className={`px-5 font-body text-gray-600 leading-relaxed text-sm md:text-base text-justify transition-all duration-300 ease-in-out overflow-hidden ${
        isOpen ? "max-h-[1000px] opacity-100 py-5" : "max-h-0 opacity-0 py-0"
      }`}
    >
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  </div>
);

const FuneralGuideSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const items = [
    {
      title: "What is the role of the Funeral Director?",
      content:
        "At some time in life, everyone will experience the loss of someone close. The absolute grief, confusion and numbness that accompany the news of a death can sometimes make decisions, regarding funeral arrangements, difficult and stressful. We understand that this is a deeply personal and private time, when sensitivity to the memory of a loved one and the feelings of families are paramount. Our role is to answer the many questions that will arise and guide families through arrangements to create a loving and final tribute to best honour the life of their loved one.",
    },
    {
      title: "What options are there for venues?",
      content:
        "<p>Most funeral services are held in a church, funeral home chapel or at a cemetery chapel.</p><p class='mt-2'>The choice belongs to the family making the arrangements and there is now an increasing trend towards alternative locations that best reflects the deceased person and places that were dear to them. Providing permission is gained from the appropriate local authority (if needed) a funeral service can be held at almost any location.</p><p class='mt-2'>However, Black Tulip Funerals pricing is designed to conduct funerals solely within our facilities, and not at external venues.</p>",
    },
    {
      title: "Who leads or conducts the funeral service?",
      content:
        "Any person is able to lead a funeral service. Most often, families choose a minister of religion or a civil celebrant. Your funeral director is usually able to nominate the best person to suit your family’s needs. A close friend or family member can certainly fulfil this role if they are comfortable in doing so.",
    },
    {
      title: "The Eulogy",
      content:
        "<p>People often find the task of writing and performing a eulogy quite daunting, but it can be a wonderful way to remember a loved-one and share some special memories. It can also be an important part of the healing process. It is an honour to be chosen to deliver a eulogy. It means your family or loved ones believe you are capable and know the deceased well enough to write something meaningful. With the right preparation, you can create a memorable experience for everyone present and make it less traumatic for you. We are here to assist where needed. If at any point you don’t feel confident reading the eulogy, the minister or civil celebrant is always there to assist or deliver it.</p><p class='mt-3 font-bold'>Tips for delivering a Eulogy:</p><ul class='list-disc list-inside mt-2 space-y-1'><li><strong>Speaking:</strong> Deliver slowly, quite loudly, use high and low pitches, don’t be afraid to pause and breathe.</li><li><strong>Brainstorming:</strong> Obtain stories from family and friends. Funny stories always help enlighten the mood.</li><li><strong>Bio:</strong> Write a short bio on their life including place/date of birth, family, spouse, children, and grandchildren.</li><li><strong>Finale:</strong> Close with comforting words, lessons learned, and a final goodbye—perhaps a poem or quote.</li></ul>",
    },
    {
      title: "Viewings",
      content:
        "A private viewing can be arranged prior to the funeral at an additional cost or be included in the allocated funeral timing at no cost. Some families organise a double booking on the day of the funeral and have the viewing prior to the actual allocated funeral time. This gives the family and invited guests private time before the conducted funeral service. Some embalming maybe required prior to viewing a deceased person, and this is usually determined by a qualified embalmer. If additional preparation is required, the family are always consulted prior and advised of the fees applicable.",
    },
    {
      title: "Children",
      content:
        "Children are always welcome at funerals and sometimes even given a role to play as part of the funeral service. There are some families however, who may feel their children are too young to understand or participate fully. This decision is however on the parents or guardian of the children.",
    },
  ];

  return (
    <section className="py-16 md:py-10">
      <div className="section-container max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 uppercase tracking-wide mb-4">
            Funeral
          </h2>
          <div className="w-20 h-1 bg-black mx-auto opacity-20"></div>
        </div>

        {/* Accordion Items */}
        <div className="space-y-3">
          {items.map((item, idx) => (
            <AccordionItem
              key={idx}
              title={item.title}
              content={item.content}
              isOpen={openIndex === idx}
              onToggle={() => handleToggle(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FuneralGuideSection;
