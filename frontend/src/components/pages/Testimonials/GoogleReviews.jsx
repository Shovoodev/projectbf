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
