import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";


const Main = ({ onContinue, onNext, onPrev }) => {
  return (
    <div className="intro-overlay-container">
      {/* Background Image Container */}
      <div className="absolute inset-0 flex justify-center items-center transition-transform duration-300 z-0">
        <img
          alt="Funeral Bond Information"
          src="/funeral/1.jpg"
          className="max-w-full max-h-full object-contain select-none pointer-events-none"
        />
      </div>

      {/* Floating Info Card */}
      <div className="intro-card">
        <div className="flex-1">
          <h1 className="text-[rgb(44,90,160)] text-3xl font-bold mb-4">
            Funeral Bond Information
          </h1>
          <p className="text-gray-500 text-base mb-2">Page 2 - Image 1 of 30</p>
          <p className="text-gray-400 text-sm mb-6">
            Swipe left/right or use arrow keys to navigate
          </p>
          <button onClick={onContinue} className="btn-continue">
            Continue to Application Form
          </button>
        </div>
      </div>

      {/* Zoom Controls */}
      <div className="zoom-controls">
        <button className="text-gray-600 hover:text-blue-900">
          <FaMinus />
        </button>
        <span className="text-sm font-bold min-w-[40px] text-center">100%</span>
        <button className="text-gray-600 hover:text-blue-900">
          <FaPlus />
        </button>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={onPrev}
        className="nav-circle-btn left-5"
        aria-label="Previous Page"
      >
        ←
      </button>
      <button
        onClick={onNext}
        className="nav-circle-btn right-5"
        aria-label="Next Page"
      >
        →
      </button>
    </div>
  );
};

export default Main;
