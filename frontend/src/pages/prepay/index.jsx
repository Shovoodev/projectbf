import React, { useEffect } from "react";
import PrePay from "./_components/PrePay";
import { PrePayServiceProvider } from "../../utility/prepay-service-provider";
import { useLocation } from "react-router-dom";

const PrePayindex = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const location = useLocation();
  const { totalPrice } = location.state || {};
  console.log("Total Price from location state:", totalPrice);
  return (
    <div>
      <PrePayServiceProvider>
        <PrePay totalPrice={totalPrice} />
      </PrePayServiceProvider>
    </div>
  );
};

export default PrePayindex;
