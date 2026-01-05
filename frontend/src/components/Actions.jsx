import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";

export function Actions() {
  return (
    <div className="flex flex-wrap gap-4 justify-center mt-10 pb-10">
      <button className="px-6 py-3 rounded-full bg-gray-100 font-medium hover:bg-gray-600 hover:text-white hover:font-bold">
        Make Agreement Now
      </button>
      <Link to="/contact" className="btn-enquire">
        <span className="">Enquire Now</span>
        <FaLongArrowAltRight />
      </Link>
      ;
      <button className="px-6 py-3 rounded-full bg-gray-100 font-medium hover:bg-gray-600 hover:text-white hover:font-bold">
        PrePay Now
      </button>
    </div>
  );
}
