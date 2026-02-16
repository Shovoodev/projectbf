import React from "react";
import { Page, View, Text, Link } from "@react-pdf/renderer";
import styles from "../Styles";

const RadioOption = ({ label, checked }) => (
    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
        <View
            style={{
                width: 10,
                height: 10,
                borderWidth: 1,
                borderColor: "#000",
                marginRight: 6,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {checked && (
                <View
                    style={{
                        width: 6,
                        height: 6,
                        backgroundColor: "#000",
                    }}
                />
            )}
        </View>

        <Text style={{ fontSize: 11 }}>{label}</Text>
    </View>
);


const YesNo = ({ yesChecked }) => (
    <View style={styles.pdfRadioGroup}>
        <RadioOption label="Yes" checked={!!yesChecked} />
        <RadioOption label="No" checked={!yesChecked} />
    </View>
);

const SlipThirtyTwoPage = ({ data }) => {
    const q = data?.questionnaire || {};

    return (
        <Page size="A4" style={styles.page} wrap={false}>
            <View style={styles.formContainerBase}>
                {/* Header */}
                <View style={styles.mb2}>
                    <Text style={[styles.title, { textAlign: "left" }]}>
                        KeyInvest Funeral Bond{"\n"}application form
                    </Text>

                    <View style={styles.pdfHr} />
                </View>

                {/* Intro */}
                <View style={styles.mb2}>
                    <Text style={styles.pdfIntroP}>
                        This Application Form (including the Direct Debit Request and the
                        Adviser Electronic Transaction Authority Form) accompanies and forms
                        part of the Product Disclosure Statement (PDS) issued by KeyInvest
                        Ltd ABN 74 087 649 474 AFSL 240667 (KeyInvest) (“we”, “us”, “our” in
                        this Application Form) for the Funeral Bond dated 28 July 2025.
                    </Text>

                    <Text style={styles.pdfIntroP}>
                        The PDS (and any Supplementary PDS issued) contain important
                        information about the Funeral Bond which you should consider before
                        making an application. The PDS is available via our website at{" "}
                        <Link src="https://keyinvest.com.au/">keyinvest.com.au</Link> or you
                        may request a copy from your financial adviser or funeral director.
                    </Text>

                    <Text style={styles.pdfIntroP}>
                        An application to invest in the KeyInvest Funeral Bond can only be
                        made using this form. Completed Application Forms can be posted to
                        KeyInvest, Reply Paid 3340, RUNDLE MALL SA 5000 (no stamp required)
                        or emailed to:{" "}
                        <Link src="mailto:info@keyinvest.com.au">info@keyinvest.com.au</Link>
                    </Text>

                    <Text style={styles.pdfLabel}>
                        PLEASE USE CAPITAL LETTERS TO COMPLETE THE APPLICATION FORM
                    </Text>
                </View>

                {/* Highlight Box */}
                <View style={[styles.pdfHighlightBox, styles.mb2]}>
                    <Text style={styles.pdfIntroP}>
                        For an individual applicant you only need to complete{" "}
                        <Text style={styles.highlightText}>Investor 1</Text>. Joint
                        applicants will complete{" "}
                        <Text style={styles.highlightText}>Investor 1 &amp; 2</Text>. If
                        investing for a separate life insured the Investor is{" "}
                        <Text style={styles.highlightText}>Investor 1</Text> and the life
                        insured <Text style={styles.highlightText}>Investor 2</Text>.
                    </Text>
                </View>

                {/* Questionnaire */}
                <Text style={styles.pdfH2}>Target market questionnaire</Text>

                {/* Q1 */}
                <View style={styles.mb2}>
                    <Text style={styles.pdfLabel}>1. Funeral Bond Type:</Text>
                    <View style={styles.pdfRadioGroup}>
                        <RadioOption label="Nominated" checked={q.bondType === "Nominated"} />
                        <RadioOption
                            label="Unassigned"
                            checked={q.bondType === "Unassigned"}
                        />
                        <RadioOption
                            label="Prepaid/Assigned"
                            checked={q.bondType === "Prepaid/Assigned"}
                        />
                    </View>
                </View>

                {/* Q2 */}
                <View style={styles.mb2}>
                    <Text style={styles.pdfLabel}>2. Is the applicant aged 10+?</Text>
                    <YesNo yesChecked={q.ageOver10 !== false} />
                </View>

                {/* Q3 */}
                <View style={styles.mb2}>
                    <Text style={styles.pdfLabel}>
                        3. Does the Applicant currently have 1 or more funeral bonds?
                    </Text>
                    <YesNo yesChecked={!!q.hasExistingBonds} />
                </View>

                {/* Q4 */}
                <View style={styles.mb2}>
                    <Text style={styles.pdfLabel}>
                        4. Does the Applicant intend to contribute more than the actual or
                        reasonable cost of a funeral?
                    </Text>
                    <YesNo yesChecked={!!q.excessContribution} />
                </View>

                {/* Q5 */}
                <View style={styles.mb2}>
                    <Text style={styles.pdfLabel}>
                        5. Does the Applicant require access to the capital after the 30 day
                        cooling off period?
                    </Text>
                    <YesNo yesChecked={!!q.requiresCapitalAccess} />
                </View>

                {/* Notes */}
                <View style={{ marginTop: 6 }}>
                    <Text style={{ fontSize: 9.5, lineHeight: 1.4, color: "#3129A6" }}>
                        Note: Investors must be at least 10 years old and those under 16
                        require written consent from a parent or guardian. Pre-Paid
                        (Assigned) Funeral Bonds are exempt from Centrelink and/or DVA asset
                        and income tests if certain conditions apply. Funeral Bonds
                        (nominated or unassigned) are exempt if specific criteria are met.
                        Holding multiple Funeral Bonds may result in assets being assessable.
                        Funeral bonds can only be used to contribute to the cost of a
                        funeral. After the 30 day cooling off period there is no access to
                        funeral bond capital prior to payment of funeral expenses.
                    </Text>
                </View>

                {/* Footer fixed bottom */}
                <View
                    style={[
                        styles.pdfFooter,
                        { position: "absolute", left: 32, right: 32, bottom: 24 },
                    ]}
                    fixed
                >
                    <Text>KeyInvest Funeral Bond PDS</Text>
                    <Text>Version: July 2026</Text>
                    <Text>Page 32</Text>
                </View>
            </View>
        </Page>
    );
};

export default SlipThirtyTwoPage;
