import React, { useEffect } from "react";

const GoogleReviews = () => {
  useEffect(() => {
    // Elfsight এর স্ক্রিপ্টটি ডাইনামিক্যালি লোড করার জন্য
    const script = document.createElement("script");
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;
    document.body.appendChild(script);

    // কম্পোনেন্ট আনমাউন্ট হলে স্ক্রিপ্টটি রিমুভ করে দেওয়ার জন্য (Clean up)
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="google-reviews-container my-10 w-full overflow-hidden">
      {/* Elfsight এর কন্টেইনার ডিভ */}
      <div
        className="elfsight-app-2e607e95-bc65-4dfe-b7e7-c8ccbe5e5e17"
        data-elfsight-app-lazy
      ></div>
    </div>
  );
};

export default GoogleReviews;

// import React, { useEffect, useState } from "react";

// const GoogleReviews = () => {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // --- আপনার তথ্যগুলো এখানে দিন ---
//   const PLACE_ID = "ChIJZesvBy2fS6QR2JrQG9iHKgw";
//   const API_KEY = "YOUR_GOOGLE_API_KEY";
//   // ------------------------------

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await fetch(
//           `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&key=${API_KEY}`,
//         );
//         const data = await response.json();

//         if (data.result && data.result.reviews) {
//           setReviews(data.result.reviews);
//         }
//         setLoading(false);
//       } catch (error) {
//         console.error("রিভিউ আনতে সমস্যা হয়েছে:", error);
//         setLoading(false);
//       }
//     };

//     fetchReviews();
//   }, [PLACE_ID, API_KEY]);

//   if (loading) {
//     return (
//       <div className="text-center py-10 text-gray-500">রিভিউ লোড হচ্ছে...</div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-12 font-sans">
//       <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
//         Black Tulip Funeral - কাস্টমার রিভিউ
//       </h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {reviews.map((review, index) => (
//           <a
//             key={index}
//             href={review.author_url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="group block p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
//           >
//             <div className="flex items-center mb-4">
//               <img
//                 src={review.profile_photo_url}
//                 alt={review.author_name}
//                 className="w-12 h-12 rounded-full mr-4 border-2 border-gray-100"
//               />
//               <div>
//                 <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
//                   {review.author_name}
//                 </h3>
//                 <span className="text-xs text-gray-400">
//                   {review.relative_time_description}
//                 </span>
//               </div>
//             </div>

//             {/* স্টার রেটিং */}
//             <div className="flex mb-3">
//               {[...Array(5)].map((_, i) => (
//                 <span
//                   key={i}
//                   className={
//                     i < review.rating ? "text-yellow-400" : "text-gray-300"
//                   }
//                 >
//                   ★
//                 </span>
//               ))}
//             </div>

//             <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
//               "{review.text}"
//             </p>

//             <div className="mt-5 flex items-center text-sm font-semibold text-blue-500">
//               গুগল ম্যাপসে দেখুন
//               <svg
//                 className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M14 5l7 7m0 0l-7 7m7-7H3"
//                 />
//               </svg>
//             </div>
//           </a>
//         ))}
//       </div>

//       {/* সরাসরি গুগল ম্যাপসের সব রিভিউ দেখার বাটন */}
//       <div className="text-center mt-12">
//         <a
//           href={`https://search.google.com/local/reviews?placeid=${PLACE_ID}`}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="inline-block bg-gray-900 text-white px-10 py-4 rounded-full font-bold hover:bg-blue-600 transition-colors shadow-lg"
//         >
//           সবগুলো রিভিউ একসাথে দেখুন
//         </a>
//       </div>
//     </div>
//   );
// };

// export default GoogleReviews;
