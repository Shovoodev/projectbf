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
import SlipFourtyThreePage from "./pages/SlipFourtyThreePage";


const RendererPDF = ({ investorData = {} }) => {
    const formatDate = (iso) => {
        if (!iso) return "";
        const d = new Date(iso);
        return d.toLocaleDateString("en-AU", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };
    const investorOne = investorData?.investorOne || {};
    const toCheckedIndexes = (boolArray = []) =>
        (Array.isArray(boolArray) ? boolArray : [])
            .map((v, i) => (v ? i : -1))
            .filter((i) => i !== -1);
    const data = {
        contributionAmount: investorData?.amount || 0,
        paymentMethod: investorData?.paymentMethod || "eft",
        rspIncrease: "yes",
        annualIncreasePercent: "10",
        serviceFeeFixed: "220",
        serviceFeePercent: "",
        declarationsChecked: toCheckedIndexes(investorOne?.declarations || []),
        optionalChecked: toCheckedIndexes(investorOne?.optionalConsents || []),
        signatureImage: investorData?.signatures?.prePaySign || null,

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
            title: investorOne?.title || "",
            surname: investorOne?.surname || "",
            givenNames: investorOne?.givenNames || "",
            dob: investorOne?.dob || "",
            gender: investorOne?.gender || "",
            unit: investorOne?.unit || "",
            streetNo: investorOne?.streetNo || "",
            streetName: investorOne?.streetName || "",
            suburb: investorOne?.suburb || "",
            state: investorOne?.state || "NSW",
            postcode: investorOne?.postcode || "",
            country: investorOne?.country || "AUSTRALIA",
            mailunit: investorOne?.mailunit || "",
            mailstreetNo: investorOne?.mailstreetNo || "",
            mailstreetName: investorOne?.mailstreetName || "",
            mailsuburb: investorOne?.mailsuburb || "",
            mailstate: investorOne?.mailstate || "NSW",
            mailpostcode: investorOne?.mailpostcode || "",
            mailcountry: investorOne?.mailcountry || "AUSTRALIA",
            daytimeTelephone: investorOne?.daytimeTelephone || "",
            mobile: investorOne?.mobile || "",
            daytimeAddress: investorOne?.daytimeAddress || "",
            email: investorOne?.email || "",
        },
        questionnaire: {
            bondType: investorData?.questionnaire?.bondType || "Nominated",
            ageOver10: investorData?.questionnaire?.ageOver10 !== false,
            hasExistingBonds: !!investorData?.questionnaire?.hasExistingBonds,
            excessContribution: !!investorData?.questionnaire?.excessContribution,
            requiresCapitalAccess: !!investorData?.questionnaire?.requiresCapitalAccess,
        },
        updatedDate: formatDate(investorData?.updatedAt),
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
            <SlipFourtyThreePage />
            <SlipFourtyFivePage data={data} />
            <SlipFortySixPage data={data} />
            <SlipFourtySevenPage data={data} />
        </Document>
    );
};

export default RendererPDF;
