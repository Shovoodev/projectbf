import Discounted_Cashflow_Model from "./Discounted_Cashflow_Model";
import EquityValuationSection from "./EquityValuationSection";
import Financial_Performance from "./Financial_Performance";
import SwotWotSection from "./SwotWotSection";
import Target_Market from "./Target_Market";
import Use_of_Funds from "./Use_of_Funds";

function Index() {
  return (
    <>
      <SwotWotSection />
      <Target_Market />
      <Use_of_Funds />
      <Financial_Performance />
      <Discounted_Cashflow_Model />
      <EquityValuationSection />
    </>
  );
}

export default Index;
