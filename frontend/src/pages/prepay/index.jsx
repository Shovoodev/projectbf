import React, { useEffect } from "react";
import PrePay from "./_components/PrePay";
import { PrePayServiceProvider } from "../../utility/prepay-service-provider";

const PrePayindex = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <PrePayServiceProvider>
        <PrePay />
      </PrePayServiceProvider>
    </div>
  );
};

export default PrePayindex;
