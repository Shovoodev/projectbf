import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
// import img from "../components/layouts/Header/btf-logo.png";
const Error = () => {
  return (
    <>
      <div className="min-h-screen bg-white flex items-center justify-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          {/* --- ERROR CODE --- */}
          <p className="text-base font-bold text-gray-700 uppercase tracking-widest">
            Error 404
          </p>

          {/* --- MAIN HEADING --- */}
          <h1 className="mt-4 text-4xl font-display font-bold tracking-tight text-gray-900 sm:text-6xl">
            Page Not Found
          </h1>

          {/* --- DESCRIPTION --- */}
          <p className="mt-6 text-base leading-7 text-gray-600 font-body max-w-lg mx-auto">
            We’re sorry, but the page you are looking for doesn’t exist or has
            been moved. Please use the button below to return to our homepage.
          </p>

          {/* --- ILLUSTRATION / ICON (Optional) --- */}
          {/* <div className="my-10 opacity-10">
          <img
            src={img}
            alt="Black Tulip Logo"
            className="w-24 mx-auto grayscale"
          />
        </div> */}

          {/* --- CTA BUTTON --- */}
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full bg-black px-8 py-4 text-sm font-bold text-white shadow-sm hover:bg-gray-800 transition-all duration-300 focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-black uppercase tracking-wide"
            >
              <FaArrowLeft className="text-xs" />
              Back to Home
            </Link>

            <Link
              to="/contact"
              className="text-sm font-bold leading-7 text-gray-900 hover:underline decoration-2 underline-offset-4"
            >
              Contact Support <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error;
