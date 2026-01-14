import React from "react";
import PrePay from "./_components/PrePay";
import { PrePayServiceProvider } from "@/utility/prepay-service-provider";

const PrePayindex = () => {
  return (
    <div>
      <PrePayServiceProvider>
        <PrePay />
      </PrePayServiceProvider>
    </div>
  );
};

export default PrePayindex;
