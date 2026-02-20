import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";
function MakeAgreementBtn() {
  return (
    <Link to="/agreement" className="btn-enquire">
      <span className="">Make Agreement</span>
      <FaLongArrowAltRight />
    </Link>
  );
}

export default MakeAgreementBtn;
