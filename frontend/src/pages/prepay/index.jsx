import React, { useEffect } from "react";
import PrePay from "./_components/PrePay";
import { PrePayServiceProvider } from "../../utility/prepay-service-provider";
import { useLocation } from "react-router-dom";

const PrePayindex = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location = useLocation();
  const { amount } = location.state || {};
  return (
    <div>
      <PrePayServiceProvider>
        <PrePay amount={amount} />
      </PrePayServiceProvider>
    </div>
  );
};

export default PrePayindex;
