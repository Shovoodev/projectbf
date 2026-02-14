import React from "react";
import { Page, View, Text, Image } from "@react-pdf/renderer";
import styles from "../Styles";

const Box = ({ value, w }) => (
    <View
        style={{
            width: w || "100%",
            borderWidth: 1,
            borderColor: "#D1D5DB",
            borderRadius: 4,
            paddingVertical: 5,
            paddingHorizontal: 8,
            backgroundColor: "#F8FAFC",
        }}
    >
        <Text style={{ fontSize: 10, fontWeight: 700, color: "#3129A6" }}>
            {value !== undefined && value !== null && String(value).trim() !== ""
                ? String(value)
                : "-"}
        </Text>
    </View>
);

const CheckboxRow = ({ label, checked }) => (
    <View style={{ flexDirection: "row", alignItems: "flex-start", marginBottom: 6 }}>
        <Text style={{ width: 14, fontSize: 11, color: "#3129A6", marginTop: 1 }}>
            {checked ? "☑" : "☐"}
        </Text>
        <Text style={[styles.pdfIntroP, { fontSize: 9, marginBottom: 0, flex: 1 }]}>
            {label}
        </Text>
    </View>
);

const SignatureBox = ({ title, sigImage, date }) => (
    <View style={{ marginTop: 8, borderTopWidth: 1, borderTopColor: "#E5E7EB", paddingTop: 8 }}>
        <Text style={{ fontSize: 10, fontWeight: 700, color: "#3129A6", marginBottom: 6 }}>
            {title}
        </Text>

        <View style={{ flexDirection: "row", gap: 10 }}>
            {/* Signature */}
            <View style={{ width: "65%" }}>
                <Text style={[styles.pdfLabel, { fontSize: 10, marginBottom: 2 }]}>Signature</Text>
                <View
                    style={{
                        borderWidth: 2,
                        borderColor: "#D1D5DB",
                        borderStyle: "dashed",
                        borderRadius: 8,
                        padding: 10,
                        minHeight: 80,
                        backgroundColor: "#FFFFFF",
                        justifyContent: "center",
                    }}
                >
                    {sigImage ? (
                        <Image src={sigImage} style={{ width: "100%", height: 60, objectFit: "contain" }} />
                    ) : (
                        <Text style={{ fontSize: 9, color: "#9CA3AF" }}>Sign here</Text>
                    )}
                </View>
            </View>

            {/* Date */}
            <View style={{ width: "35%" }}>
                <Text style={[styles.pdfLabel, { fontSize: 10, marginBottom: 2 }]}>Date</Text>
                <Box value={date} />
            </View>
        </View>
    </View>
);

export default function SlipFourtyTwoPage({ data }) {
    const ddr = data?.directDebitRequest || {};

    const lumpSelected = !!ddr?.lumpSum?.selected;
    const lumpAmount = ddr?.lumpSum?.amount ?? 5000;

    const rspSelected = !!ddr?.regularSavingsPlan?.selected;
    const rspAmount = ddr?.regularSavingsPlan?.amount ?? 5000;

    const rspEndWhen = ddr?.rspEndCondition || "";

    // signatures as base64 dataURL
    const sig1 = ddr?.signatures?.holderOne?.image || null;
    const sig1Date = ddr?.signatures?.holderOne?.date || "";

    const sig2 = ddr?.signatures?.holderTwo?.image || null;
    const sig2Date = ddr?.signatures?.holderTwo?.date || "";

    return (
        <Page size="A4" style={styles.page}>
            <View style={styles.formContainerBasewithoutpaddingbottom}>
                {/* Header */}
                <Text style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 4 }}>
                    Direct Debit Request
                </Text>
                <Text style={{ fontSize: 9, color: "#6B7280", marginBottom: 8 }}>
                    KeyInvest Funeral Bond Product Disclosure Statement (PDS) Version: July 2025
                </Text>

                {/* Section 3 */}
                <Text style={[styles.pdfSectionTitle, { fontSize: 12, marginBottom: 6 }]}>
                    3. Amount and frequency of debits
                </Text>

                <View style={{ marginBottom: 8 }}>
                    {/* Lump Sum */}
                    <CheckboxRow
                        checked={lumpSelected}
                        label={"Lump Sum Contribution – this authority is for one payment only of $"}
                    />
                    <View style={{ marginLeft: 14, marginBottom: 6, width: "50%" }}>
                        <Box value={lumpAmount} />
                    </View>

                    {/* RSP */}
                    <CheckboxRow checked={rspSelected} label={"The Regular Savings Plan contribution of $"} />
                    <View style={{ marginLeft: 14 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 4 }}>
                            <View style={{ width: 120 }}>
                                <Box value={rspAmount} />
                            </View>
                            <Text style={{ fontSize: 9, color: "#6B7280" }}>
                                will be deducted commencing on the
                            </Text>
                        </View>
                        <Text style={{ fontSize: 9, color: "#6B7280" }}>
                            15th of the month nominated in Section 2.1 of the Application Form.
                        </Text>
                    </View>

                    {/* No selection note */}
                    <View
                        style={{
                            marginTop: 8,
                            borderLeftWidth: 4,
                            borderLeftColor: "#FBBF24",
                            backgroundColor: "#FFFBEB",
                            padding: 8,
                            borderRadius: 4,
                        }}
                    >
                        <Text style={{ fontSize: 9, color: "#374151", marginBottom: 0 }}>
                            If no selection is made the RSP will commence at the discretion of KeyInvest and be
                            confirmed in writing to you in your Policy Confirmation Letter.
                        </Text>
                    </View>

                    {/* RSP end condition */}
                    <View style={{ marginTop: 8 }}>
                        <Text style={{ fontSize: 9, color: "#374151", marginBottom: 4 }}>
                            Please end my RSP when total contributions reach $
                        </Text>
                        <Box value={rspEndWhen} w="60%" />
                    </View>
                </View>

                {/* Section 4 */}
                <Text style={[styles.pdfSectionTitle, { fontSize: 12, marginBottom: 6 }]}>
                    4. Declarations
                </Text>

                <View style={{ marginBottom: 8 }}>
                    <Text style={[styles.pdfIntroP, { fontSize: 9, marginBottom: 6, color: "#374151" }]}>
                        I/We request and authorise KeyInvest Ltd - Identification Number 113657 to arrange for
                        any amount KeyInvest Ltd may debit or charge to be debited through the Bulk Electronic
                        Clearing System from an account held at the financial institution identified above
                        subject to the terms and conditions of the Direct Debit Request Service Agreement and
                        any further instructions provided.
                    </Text>
                    <Text style={[styles.pdfIntroP, { fontSize: 9, marginBottom: 0, color: "#374151" }]}>
                        By signing this Direct Debit Request I/We acknowledge having read and understood the
                        terms and conditions governing the debit arrangements as set out in this request and in
                        the Direct Debit Request Service Agreement.
                    </Text>
                </View>

                {/* Company note */}
                <View
                    style={{
                        borderLeftWidth: 4,
                        borderLeftColor: "#60A5FA",
                        backgroundColor: "#EFF6FF",
                        padding: 8,
                        borderRadius: 4,
                        marginBottom: 6,
                    }}
                >
                    <Text style={{ fontSize: 9, color: "#374151", fontStyle: "italic" }}>
                        (If signing for a company, sign and print full name and capacity for signing e.g. Director.)
                    </Text>
                </View>

                {/* Signatures */}
                <SignatureBox
                    title="Signature of Account Holder 1"
                    sigImage={sig1}
                    date={sig1Date}
                />
                <SignatureBox
                    title="Signature of Account Holder 2"
                    sigImage={sig2}
                    date={sig2Date}
                />

                <View
                    style={{
                        marginTop: 8,
                        backgroundColor: "#F9FAFB",
                        padding: 8,
                        borderRadius: 4,
                    }}
                >
                    <Text style={{ fontSize: 9, color: "#6B7280" }}>
                        (All bank signatories must sign)
                    </Text>
                </View>

                {/* Footer pinned bottom */}
                <View style={styles.pdfFooter}>
                    <Text>KeyInvest Funeral Bond PDS</Text>
                    <Text>Version: July 2026</Text>
                    <Text>Page 42</Text>
                </View>
            </View>
        </Page>
    );
}
