import Are_you_aware from "./Are_you_aware";
import ContactInfoSection from "./ContactInfoSection";
import DisclaimerSection from "./DisclaimerSection";
import Discounted_Cashflow_Model from "./Discounted_Cashflow_Model";
import EquityValuationSection from "./EquityValuationSection";
import ExitStrategySection from "./ExitStrategySection";
import Financial_Performance from "./Financial_Performance";
// import InclusionsSection from "./InclusionsSection";
import Prepaid_Funeral_Plans from "./Prepaid_Funeral_Plans";
import SocialImpactSection from "./SocialImpactSection";
import Solar from "./Solar_powered";
import SwotWotSection from "./SwotWotSection";
import Target_Market from "./Target_Market";
import TimelineSection from "./TimelineSection";
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
      <Prepaid_Funeral_Plans />
      <SocialImpactSection />
      <Solar />
      <InclusionsSection />
      <Are_you_aware />
      <ExitStrategySection />
      <TimelineSection />
      <DisclaimerSection />
      <ContactInfoSection />
      <Are_you_aware />
      {/* <InclusionsSection /> */}
    </>
  );
}

export default Index;
