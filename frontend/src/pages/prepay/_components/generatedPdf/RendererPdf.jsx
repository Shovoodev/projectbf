import { Document } from "@react-pdf/renderer";
import SlipThirtyFourPage from "./pages/SlipThirtyFourPage";
import SlipThirtyFivePage from "./pages/SlipThirtyFivePage";
import SlipThirtySevenPage from "./pages/SlipThirtySevenPage";
import SlipThirtySixPage from "./pages/SlipThirtySixPage";
import SlipThirtyEightPage from "./pages/SlipThirtyEightPage";
import SlipThirtyNinePage from "./pages/SlipThirtyNinePage";
import SlipFourtyPage from "./pages/SlipFourtyPage";
import SlipFourtyOnePage from "./pages/SlipFourtyOnePage";
import SlipFourtyTwoPage from "./pages/SlipFourtyTwoPage";
import SlipFourtyFivePage from "./pages/SlipFourtyFivePage";
import SlipFortySixPage from "./pages/SlipFortySixPage";
import SlipFourtySevenPage from "./pages/SlipFourtySevenPage";
import SlipThirtyThreePage from "./pages/SlipThirtyThreePage";
import SlipThirtyTwoPage from "./pages/SlipThirtyTwoPage";


const RendererPDF = ({ investorData = {} }) => {
    const data = {
        contributionAmount: investorData?.amount || 0,
        paymentMethod: investorData?.paymentMethod || "eft",
        rspIncrease: "yes",
        annualIncreasePercent: "10",
        serviceFeeFixed: "220",
        serviceFeePercent: "",
        adviser: {
            providerName: "Black Tulip Funerals",
            groupName: "",
            address: "PO Box 1033 Hurstville BC NSW 1481",
            phone: "1300110031",
            officeEmail: "keyinvest@blacktulipfunerals.com.au",
            newAdviserEmail: "",
            afsLicence: "",
            adviserCode: "",
        },
        investorOne: {
            title: investorData?.investorOne?.title || "",
            surname: investorData?.investorOne?.surname || "",
            givenNames: investorData?.investorOne?.givenNames || "",
            dob: investorData?.investorOne?.dob || "",
            gender: investorData?.investorOne?.gender || "",
            unit: investorData?.investorOne?.unit || "",
            streetNo: investorData?.investorOne?.streetNo || "",
            streetName: investorData?.investorOne?.streetName || "",
            suburb: investorData?.investorOne?.suburb || "",
            state: investorData?.investorOne?.state || "NSW",
            postcode: investorData?.investorOne?.postcode || "",
            country: investorData?.investorOne?.country || "AUSTRALIA",
            mailunit: investorData?.investorOne?.mailunit || "",
            mailstreetNo: investorData?.investorOne?.mailstreetNo || "",
            mailstreetName: investorData?.investorOne?.mailstreetName || "",
            mailsuburb: investorData?.investorOne?.mailsuburb || "",
            mailstate: investorData?.investorOne?.mailstate || "NSW",
            mailpostcode: investorData?.investorOne?.mailpostcode || "",
            mailcountry: investorData?.investorOne?.mailcountry || "AUSTRALIA",
            daytimeTelephone: investorData?.investorOne?.daytimeTelephone || "",
            mobile: investorData?.investorOne?.mobile || "",
            daytimeAddress: investorData?.investorOne?.daytimeAddress || "",
            email: investorData?.investorOne?.email || "",
        },
        questionnaire: {
            bondType: investorData?.questionnaire?.bondType || "Nominated",
            ageOver10: investorData?.questionnaire?.ageOver10 !== false,
            hasExistingBonds: !!investorData?.questionnaire?.hasExistingBonds,
            excessContribution: !!investorData?.questionnaire?.excessContribution,
            requiresCapitalAccess: !!investorData?.questionnaire?.requiresCapitalAccess,
        },
    };

    return (
        <Document>
            <SlipThirtyTwoPage data={data} />
            <SlipThirtyThreePage data={data} />
            <SlipThirtyFourPage data={data} />
            <SlipThirtyFivePage data={data} />
            <SlipThirtySixPage data={data} />
            <SlipThirtySevenPage data={data} />
            <SlipThirtyEightPage data={data} />

            <SlipThirtyNinePage data={data} />
            <SlipFourtyPage data={data} />
            <SlipFourtyOnePage data={data} />
            <SlipFourtyTwoPage data={data} />
            <SlipFourtyFivePage data={data} />
            <SlipFortySixPage data={data} />
            <SlipFourtySevenPage data={data} />
        </Document>
    );
};

export default RendererPDF;
