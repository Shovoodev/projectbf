import { FaQuoteLeft } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function TestimonialsCarousel() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
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
      name: "Christine S",
      text: "Scott and his team were so professional, so caring and their communication was next to none. Scott picked up the grandmas clothes from the family’s house, communicated via text late at night when I had questions, and kept me informed at every step. Afterlife is the best in the business.",
    },
    {
      name: "Kristy & family",
      text: "Scott and his staff were professional caring and very understanding of a tough situation... Scott and his staff were amazing on the day ensuring our family were looked after and everything went smoothly. Prices were incredibly competitive but service quality was 100 per cent.",
    },
    {
      name: "B. Yeng",
      text: "Dear Scott, This was the first time I was faced with this difficult time we have faced... I would like to thank you for your caring, sensitive approach in organisating and directing the funeral arrangements... Scott, You are absolutely wonderful, your caring, professionalism is second to none.",
    },
  ];
  return (
    <div className="relative ">
      {/* External Navigation Buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-10 z-10 mr-2">
        <button
          ref={prevRef}
          className="p-3 bg-white rounded-full shadow hover:bg-gray-100"
        >
          <FaArrowLeft />
        </button>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 -right-10 z-10">
        <button
          ref={nextRef}
          className="p-3 bg-white rounded-full shadow hover:bg-gray-100"
        >
          <FaArrowRight />
        </button>
      </div>

      {/* Swiper */}
      <Swiper
        modules={[Autoplay, Navigation]}
        slidesPerView={3}
        spaceBetween={24}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {testimonials.map((t, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
              <FaQuoteLeft className="text-3xl text-gray-200 mb-4" />
              <div className="flex-1">
                <p className="text-gray-600 font-body text-lg leading-relaxed italic text-justify">
                  {t.text}
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="font-display font-bold text-gray-900 text-2xl text-center uppercase tracking-wide">
                  {t.name}
                </h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
