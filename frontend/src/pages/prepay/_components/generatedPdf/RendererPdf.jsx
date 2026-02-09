import React from "react";
import { Document, Page, View, Text } from "@react-pdf/renderer";
import styles from "./Styles";
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

// ✅ Helper component for radio options
const RadioOption = ({ label, checked }) => (
    <View style={styles.pdfRadioItem}>
        <Text style={styles.pdfRadioBox}>{checked ? "☑" : "☐"}</Text>

        <Text style={styles.pdfRadioText}>{label}</Text>
    </View>
);

// ✅ Helper component for address section
const AddressSection = ({ title, data }) => (
    <View style={styles.mb4}>
        <Text style={styles.pdfSectionTitle}>{title}</Text>

        <View style={[styles.flexRow, styles.mb2]}>
            <View style={{ width: "20%", marginRight: 8 }}>
                <Text style={styles.pdfLabel}>Unit</Text>
                <Text style={styles.pdfIntroP}>{data.unit || "-"}</Text>
            </View>

            <View style={{ width: "25%", marginRight: 8 }}>
                <Text style={styles.pdfLabel}>Street No</Text>
                <Text style={styles.pdfIntroP}>{data.streetNo || "-"}</Text>
            </View>

            <View style={{ width: "30%", marginRight: 8 }}>
                <Text style={styles.pdfLabel}>Street Name</Text>
                <Text style={styles.pdfIntroP}>{data.streetName || "-"}</Text>
            </View>

            <View style={{ width: "25%" }}>
                <Text style={styles.pdfLabel}>Suburb</Text>
                <Text style={styles.pdfIntroP}>{data.suburb || "-"}</Text>
            </View>
        </View>

        <View style={[styles.flexRow, styles.mb2]}>
            <View style={{ width: "30%", marginRight: 8 }}>
                <Text style={styles.pdfLabel}>State</Text>
                <Text style={styles.pdfIntroP}>{data.state || "-"}</Text>
            </View>

            <View style={{ width: "30%", marginRight: 8 }}>
                <Text style={styles.pdfLabel}>Postcode</Text>
                <Text style={styles.pdfIntroP}>{data.postcode || "-"}</Text>
            </View>

            <View style={{ width: "40%" }}>
                <Text style={styles.pdfLabel}>Country</Text>
                <Text style={styles.pdfIntroP}>{data.country || "-"}</Text>
            </View>
        </View>
    </View>
);

// ✅ Main PDF Component
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
            {/* ✅ PAGE 1 */}
            <Page size="A4" style={styles.page} wrap={false}>
                <View style={styles.formContainerBase}>
                    <View style={styles.mainHeader}>
                        <Text style={styles.title}>KeyInvest Funeral Bond</Text>
                        <Text style={styles.subtitle}>application form</Text>
                    </View>

                    <View style={styles.mb4}>
                        <Text style={styles.pdfIntroP}>
                            This Application Form (including the Direct Debit Request and the Adviser Electronic Transaction
                            Authority Form) accompanies and forms part of the Product Disclosure Statement (PDS) issued by KeyInvest
                            Ltd ABN 74 087 649 474 AFSL 240667 (KeyInvest).
                        </Text>

                        <Text style={[styles.pdfIntroP, styles.mt2]}>
                            The PDS contain important information about the Funeral Bond which you should consider before making an
                            application. The PDS is available via our website at keyinvest.com.au or you may request a copy from your
                            financial adviser or funeral director.
                        </Text>

                        <Text style={[styles.pdfIntroP, styles.mt2]}>
                            An application to invest in the KeyInvest Funeral Bond can only be made using this form. Completed
                            Application Forms can be posted to KeyInvest, Reply Paid 3340, RUNDLE MALL SA 5000 or emailed to:
                            info@keyinvest.com.au
                        </Text>

                        <Text style={[styles.pdfLabel, styles.mt2]}>
                            PLEASE USE CAPITAL LETTERS TO COMPLETE THE APPLICATION FORM
                        </Text>
                    </View>

                    <View style={[styles.pdfHighlightBox, styles.mb4]}>
                        <Text style={styles.pdfIntroP}>
                            For an individual applicant you only need to complete Investor 1. Joint applicants will complete Investor
                            1 &amp; 2. If investing for a separate life insured the Investor is Investor 1 and the life insured
                            Investor 2.
                        </Text>
                    </View>

                    <Text style={styles.pdfH2}>Target market questionnaire</Text>

                    <View style={styles.mb3}>
                        <Text style={styles.pdfLabel}>1. Funeral Bond Type:</Text>
                        <View style={styles.flexRow}>
                            <RadioOption label="Nominated" checked={data.questionnaire.bondType === "Nominated"} />
                            <RadioOption label="Unassigned" checked={data.questionnaire.bondType === "Unassigned"} />
                            <RadioOption label="Prepaid/Assigned" checked={data.questionnaire.bondType === "Prepaid/Assigned"} />
                        </View>
                    </View>

                    <View style={styles.mb3}>
                        <Text style={styles.pdfLabel}>2. Is the applicant aged 10+?</Text>
                        <View style={styles.flexRow}>
                            <RadioOption label="Yes" checked={data.questionnaire.ageOver10} />
                            <RadioOption label="No" checked={!data.questionnaire.ageOver10} />
                        </View>
                    </View>

                    <View style={styles.mb3}>
                        <Text style={styles.pdfLabel}>
                            3. Does the Applicant currently have 1 or more funeral bonds?
                        </Text>
                        <View style={styles.flexRow}>
                            <RadioOption label="Yes" checked={data.questionnaire.hasExistingBonds} />
                            <RadioOption label="No" checked={!data.questionnaire.hasExistingBonds} />
                        </View>
                    </View>

                    <View style={styles.mb3}>
                        <Text style={styles.pdfLabel}>
                            4. Does the Applicant intend to contribute more than the actual or reasonable cost of a funeral?
                        </Text>
                        <View style={styles.flexRow}>
                            <RadioOption label="Yes" checked={data.questionnaire.excessContribution} />
                            <RadioOption label="No" checked={!data.questionnaire.excessContribution} />
                        </View>
                    </View>

                    <View style={styles.mb3}>
                        <Text style={styles.pdfLabel}>
                            5. Does the Applicant require access to the capital after the 30 day cooling off period?
                        </Text>
                        <View style={styles.flexRow}>
                            <RadioOption label="Yes" checked={data.questionnaire.requiresCapitalAccess} />
                            <RadioOption label="No" checked={!data.questionnaire.requiresCapitalAccess} />
                        </View>
                    </View>

                    <View style={[styles.pdfFooter, styles.mt4]}>
                        <Text style={styles.pdfIntroP}>
                            Note: Investors must be at least 10 years old and those under 16 require written consent from a parent or
                            guardian. Pre-Paid (Assigned) Funeral Bonds are exempt from Centrelink and/or DVA asset tests. Funeral
                            Bonds can only be used to contribute to the cost of a funeral.
                        </Text>
                    </View>

                    <View style={[styles.pdfFooter, styles.mt4]}>
                        <Text>KeyInvest Funeral Bond PDS</Text>
                        <Text>Version: July 2026</Text>
                        <Text>Page 32</Text>
                    </View>
                </View>
            </Page>

            {/* ✅ PAGE 2 */}
            <Page size="A4" style={styles.page} wrap={false}>
                <View style={styles.formContainerBase}>
                    <View style={styles.mainHeader}>
                        <Text style={styles.title}>Investor Details Form</Text>
                        <Text style={styles.subtitle}>Personal Information</Text>
                    </View>

                    <View style={styles.mb4}>
                        <Text style={styles.pdfSectionTitle}>1. Investor Details</Text>

                        <View style={[styles.flexRow, styles.mb2]}>
                            <View style={{ width: "25%", marginRight: 8 }}>
                                <Text style={styles.pdfLabel}>Title</Text>
                                <Text style={styles.pdfIntroP}>{data.investorOne.title || "-"}</Text>
                            </View>

                            <View style={{ width: "35%", marginRight: 8 }}>
                                <Text style={styles.pdfLabel}>Surname</Text>
                                <Text style={styles.pdfIntroP}>{data.investorOne.surname || "-"}</Text>
                            </View>

                            <View style={{ width: "40%" }}>
                                <Text style={styles.pdfLabel}>Given Names</Text>
                                <Text style={styles.pdfIntroP}>{data.investorOne.givenNames || "-"}</Text>
                            </View>
                        </View>

                        <View style={[styles.flexRow, styles.mb2]}>
                            <View style={{ width: "48%", marginRight: 8 }}>
                                <Text style={styles.pdfLabel}>Date of Birth</Text>
                                <Text style={styles.pdfIntroP}>{data.investorOne.dob || "-"}</Text>
                            </View>

                            <View style={{ width: "48%" }}>
                                <Text style={styles.pdfLabel}>Gender</Text>
                                <View style={styles.pdfRadioGroup}>
                                    <RadioOption label="Male" checked={data.investorOne.gender === "Male"} />
                                    <RadioOption label="Female" checked={data.investorOne.gender === "Female"} />
                                    <RadioOption label="Other" checked={data.investorOne.gender === "Other"} />
                                </View>
                            </View>
                        </View>
                    </View>

                    <AddressSection
                        title="2. Residential Address"
                        data={{
                            unit: data.investorOne.unit,
                            streetNo: data.investorOne.streetNo,
                            streetName: data.investorOne.streetName,
                            suburb: data.investorOne.suburb,
                            state: data.investorOne.state,
                            postcode: data.investorOne.postcode,
                            country: data.investorOne.country,
                        }}
                    />

                    <AddressSection
                        title="3. Mailing Address (if different)"
                        data={{
                            unit: data.investorOne.mailunit,
                            streetNo: data.investorOne.mailstreetNo,
                            streetName: data.investorOne.mailstreetName,
                            suburb: data.investorOne.mailsuburb,
                            state: data.investorOne.mailstate,
                            postcode: data.investorOne.mailpostcode,
                            country: data.investorOne.mailcountry,
                        }}
                    />
                </View>
                <View style={styles.formContainerBase}>
                    <View style={styles.mainHeader}>
                        <Text style={styles.title}>Contact Information</Text>
                    </View>

                    <View style={styles.mb4}>
                        <Text style={styles.pdfSectionTitle}>4. Contact Details</Text>

                        <View style={[styles.flexRow, styles.mb2]}>
                            <View style={{ width: "48%", marginRight: 8 }}>
                                <Text style={styles.pdfLabel}>Daytime Telephone</Text>
                                <Text style={styles.pdfIntroP}>{data.investorOne.daytimeTelephone || "-"}</Text>
                            </View>

                            <View style={{ width: "48%" }}>
                                <Text style={styles.pdfLabel}>Mobile</Text>
                                <Text style={styles.pdfIntroP}>{data.investorOne.mobile || "-"}</Text>
                            </View>
                        </View>

                        <View style={styles.mb2}>
                            <Text style={styles.pdfLabel}>Daytime Address</Text>
                            <Text style={styles.pdfIntroP}>{data.investorOne.daytimeAddress || "-"}</Text>
                        </View>

                        <View style={styles.mb2}>
                            <Text style={styles.pdfLabel}>Email</Text>
                            <Text style={styles.pdfIntroP}>{data.investorOne.email || "-"}</Text>
                        </View>
                    </View>

                    <View style={styles.pdfFooter}>
                        <Text>© 2026 KeyInvest Funeral Bond</Text>
                        <Text>Page 33</Text>
                    </View>
                </View>
            </Page>

            {/* ✅ PAGE 3 */}
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
