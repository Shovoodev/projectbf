import React from "react";
import { FaQuoteLeft } from "react-icons/fa6";

const TestimonialCard = ({ name, text }) => (
  <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
    <FaQuoteLeft className="text-3xl text-gray-200 mb-4" />
    <div className="flex-1">
      <p className="text-gray-600 font-body text-lg leading-relaxed italic text-justify">
        {text}
      </p>
    </div>
    <div className="mt-6 pt-6 border-t border-gray-100">
      <h3 className="font-display font-bold text-gray-900 text-2xl text-center uppercase tracking-wide">
        {name}
      </h3>
    </div>
  </div>
);

const TestimonialsGridSection = () => {
  const testimonials = [
    {
      name: "Jun Ma",
      text: "Very professional, respectful and Caregiving. Best low price too. If you don’t know what to do after family passes away. Just give them a call.",
    },
    {
      name: "Jaimish Kotecha",
      text: "Wonderful service, affordable packages – best Indian Funeral Service Provider in Sydney by far – took care of things we didnt even think about. Highly recommended!",
    },
    {
      name: "Deb McDiarmid",
      text: "Most people think that arranging a funeral and organising the necessary facilities is all that is involved... Scott at Funera provided me with incredible support through the entire process... I really couldn’t fault the services they provided and genuine Customer Care.",
    },
    {
      name: "echo echo",
      text: "Many thanks to Scott & his team at Funera for making things easier for us during a difficult time... By far the best funeral business I have dealt with. And by far the best price... Low key, friendly, caring and very efficient. Highly recommended.",
    },
    {
      name: "Boh Heng",
      text: "My aunt and I wish to thank Scott and his team for their professionalism and compassion in handling my uncle’s funeral arrangement. Afterlife’s fee’s extremely competitive and Scott’s availability on phone calls albeit on Saturday night were answered. Very impressive and highly recommended.",
    },
    {
      name: "Jackson Andrews",
      text: "Scott and his staff were professional caring and very understanding of a tough situation... Prices were incredibly competitive but service quality was 100 per cent... So from our family thankyou for giving our father a short and simple but memorable send off we will be eternally grateful.",
    },
    {
      name: "Rita C. Layous",
      text: "I just wanted to say a heartfelt Thank You for all you have done... Thank You for your caring, sensitive approach in organisation and directing the funeral arrangements... Scott, You are absolutely wonderful, your caring words utmost, professionalism is second to none.",
    },

    {
      name: "Rebecca Bushell",
      text: "Scott went out of his way to help make dads service beautifuly respectful, at a reasonable price. I would highly recommend their services",
    },
    {
      name: "Noni Cole",
      text: "We are writing this review to give others in the most sensitive time in their life ,some peace of mind... Scott at Afterlife went above & beyond to help us and cater to our specific requests... Thankyou Scott & your Special team who cared for our mum so kindly & professionally.",
    },
    {
      name: "Bigfoot Online",
      text: "Great company to deal with. Very efficient and professional.",
    },
    {
      name: "Jagged Playz",
      text: "Scott is kinda caring and really cares, i’ve never met a kinder sole, wonderfull sendoff for my nana.",
    },
    {
      name: "logan brown",
      text: "Great service, very friendly staff.",
    },
    {
      name: "Butsaraphon phiromnak",
      text: "I would like to thank Scott and his staff for assisting in my Aunt’s funeral. The dedication to assisting from the first phone call, through to the personalized photo coffin wrap was exceptional... I hope not to see you again soon, but we will surely recommend your services.",
    },
    {
      name: "Samantha Li",
      text: "Scott and his team helped me through the most difficult moments of life with the utmost patience and compassion. The communication is smooth and timely, and the process is smooth. Thanks Scott for his help.",
    },
    {
      name: "Owen Li",
      text: "Very good service, all-round, patient, First choice for funeral services.",
    },
    {
      name: "Theresa and the entire Tatham family",
      text: "can’t thank you enough Scott for your immense effort and the late night conversations we shared were an absolute pleasure. Thank you for assisting us through a very emotional time and today’s service was absolutely beautiful.",
    },
    {
      name: "Sean Xue",
      text: "感谢Afterlife团队中每一个人，尤其是Scott和 Louise。他们服务专业，认真负责让我们对整个葬礼过程非常的放心，顺利的送我父亲最后一程。中文服务在沟通上完全没有障碍，耐心的解答了我一个又一个的问题。由衷感Afterlife团队陪伴我们度过这艰难的时刻。",
    },
    {
      name: "Christine S",
      text: "Scott and his team were so professional, so caring and their communication was next to none. Scott picked up the grandmas clothes from the family’s house, communicated via text late at night when I had questions, and kept me informed at every step. Afterlife is the best in the business.",
    },
    {
      name: "Qiaolin Bi (Charlie)",
      text: "Scott and his team helped me through the most difficult moments of life with the utmost patience and compassion. The communication is smooth and timely, and the process is smooth. Thanks Scott for his help.",
    },
    {
      name: "B. Yeng",
      text: "Dear Scott, This was the first time I was faced with this difficult time we have faced... I would like to thank you for your caring, sensitive approach in organisating and directing the funeral arrangements... Scott, You are absolutely wonderful, your caring, professionalism is second to none.",
    },
    {
      name: "Louise M",
      text: "Hi Scott, I would like to thank you again for all your help and hard work. I know it hasn’t been easy and you’ve made an effort to accommodate our every request, which we very much appreciate... The whole team was very professional.",
    },
    {
      name: "Leigh R",
      text: "Our family felt reassured throughout the entire process of funeral arrangement services with Afterlife. The management was exceptional being timely and meeting the specific needs. We were supported thoroughly and professionally.",
    },
    {
      name: "B. Phiromnak",
      text: "I would like to thank Scott and his staff for assisting in my Aunt’s funeral. The dedication to assisting from the first phone call, through to the personalized photo coffin wrap was exceptional. No task was to difficult for your team.",
    },
    {
      name: "Vivienne",
      text: "Scott was very understanding and helped us deal with our funeral matters professionally and compassionately. He was efficient in his communications and empathetic about our needs. Thank you Scott for all your help, we really appreciated everything.",
    },
    {
      name: "Lee",
      text: "A heartfelt thank you to Scott and the team at Funera. Your caring attitude at such a difficult time was a great help for our family. A special thanks to you, Scott, for your excellent professionalism... Thank you again for your impeccable service!",
    },
    {
      name: "Ying Zheng",
      text: "The funeral service conducted by Afterlife Funeral was a touching and memorable occasion from start to finish. The funeral director Scott and his staff were not only doing their job but showing genuine compassion throughout the service... Heartfelt appreciation & thanks.",
    },
    {
      name: "April",
      text: "On behalf of my mother, sister and family we would love to thank Louise & Scott from Funera for all their assistance and service for my father’s funeral last week... It was exactly what we wanted with their caring service and attention to detail.",
    },
    {
      name: "Peter",
      text: "Scott was extremely respectful and helpful at such a difficult time. He provided all the information and documentation we needed promptly and always kept us informed... Scott and Funera offer a leading edge service at a very competitive price.",
    },
    {
      name: "Jade",
      text: "A warm heartfelt thank you to the team at Funera. A special thank you to Scott for ensuring that a difficult day passed with ease and making myself and my family feel as comfortable as possible.",
    },
    {
      name: "Kristy & family",
      text: "Scott and his staff were professional caring and very understanding of a tough situation... Scott and his staff were amazing on the day ensuring our family were looked after and everything went smoothly. Prices were incredibly competitive but service quality was 100 per cent.",
    },
  ];

  return (
    <section className="bg-surface py-16 md:py-24">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4 uppercase tracking-wide">
            What Families Say
          </h2>
          <div className="w-16 h-1 bg-black mx-auto mb-6 opacity-10"></div>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <TestimonialCard key={idx} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsGridSection;
