import React from "react";
import { Page, View, Text } from "@react-pdf/renderer";
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

const Row = ({ children, style }) => (
    <View style={[{ flexDirection: "row", width: "100%" }, style]}>{children}</View>
);

const Cell = ({ w, children, center, right, bold }) => (
    <View style={{ width: w, paddingVertical: 4, paddingHorizontal: 4 }}>
        <Text
            style={[
                styles.pdfIntroP,
                { marginBottom: 0, fontSize: 9, lineHeight: 1.2 },
                center ? { textAlign: "center" } : null,
                right ? { textAlign: "right" } : null,
                bold ? { fontWeight: 700 } : null,
            ]}
        >
            {children}
        </Text>
    </View>
);

export default function SlipThirtyFivePage({ data }) {
    const amount = Number(data?.contributionAmount ?? 0);
    const addedAmount = amount + 220;

    const paymentMethod = data?.paymentMethod || "eft"; // "bpay" | "direct_debit" | "cheque" | "eft"

    const investmentOptions = [
        {
            no: 1,
            fund: "Capital Guaranteed Fund",
            ufm: "Janus Henderson & KeyInvest Managed Investments",
            benefitNo: 50,
            lumpSum: "",
            rsp: "",
        },
    ];

    return (
        <Page size="A4" style={styles.page} wrap={false}>
            <View style={styles.formContainerBase}>
                <Text style={styles.pdfH2}>2. Contribution details</Text>

                {/* Initial Contribution */}
                <Text style={styles.pdfSectionTitle}>Initial Contribution</Text>

                <View style={{ marginBottom: 8 }}>
                    <Text style={styles.pdfLabel}>
                        Contribution amount <Text style={{ fontSize: 9 }}>1</Text> :
                    </Text>

                    <View
                        style={{
                            borderWidth: 1,
                            borderColor: "#D1D5DB",
                            borderRadius: 4,
                            paddingVertical: 6,
                            paddingHorizontal: 8,
                            backgroundColor: "#F8FAFC",
                        }}
                    >
                        <Text style={{ fontSize: 12, fontWeight: 700, color: "#3129A6" }}>
                            {addedAmount.toFixed(2)}
                        </Text>
                    </View>
                </View>

                {/* Payment Method */}
                <View style={{ marginBottom: 8 }}>
                    <Text style={[styles.pdfIntroP, { marginBottom: 4, fontSize: 10 }]}>
                        Please select how the initial contribution will be paid.
                    </Text>

                    <View style={styles.pdfRadioGroup}>
                        <RadioOption label="BPAY" checked={paymentMethod === "bpay"} />
                        <RadioOption label="Direct Debit" checked={paymentMethod === "direct_debit"} disabled />
                        <RadioOption label="Cheque" checked={paymentMethod === "cheque"} disabled />
                        <RadioOption label="EFT" checked={paymentMethod === "eft"} />
                    </View>
                </View>

                {/* Info Box */}
                <View
                    style={{
                        borderWidth: 1,
                        borderColor: "#E5E7EB",
                        backgroundColor: "#F8FAFC",
                        borderRadius: 6,
                        padding: 8,
                        marginBottom: 8,
                    }}
                >
                    <Text style={[styles.pdfIntroP, { marginBottom: 0, fontSize: 9 }]}>
                        Where the BPAY or EFT payment method is selected, KeyInvest will contact the investor(s)
                        and provide the relevant bank reference numbers for the payment method selected.
                    </Text>
                </View>

                {/* Footnote */}
                <Text style={[styles.pdfIntroP, { marginBottom: 8, fontSize: 9 }]}>
                    1 Where an initial service fee has been agreed to, the fee will be deducted from this amount
                    before being invested in the Funeral Bond.
                </Text>

                {/* Investment Options */}
                <Text style={styles.pdfH2}>2.1. Investment option(s)</Text>

                <Text style={[styles.pdfLabel, { fontSize: 10, marginBottom: 2 }]}>
                    Please select an investment option(s) from the list below.
                </Text>
                <Text style={[styles.pdfIntroP, { fontSize: 9, fontStyle: "italic", marginBottom: 6 }]}>
                    If no option is selected, contributions will be invested into the Capital Guaranteed Fund.
                </Text>

                {/* Table (React-PDF layout) */}
                <View style={{ borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 6 }}>
                    {/* Header */}
                    <Row style={{ backgroundColor: "#F8FAFC", borderBottomWidth: 1, borderBottomColor: "#E5E7EB" }}>
                        <Cell w="6%" bold>No.</Cell>
                        <Cell w="24%" bold>Fund</Cell>
                        <Cell w="26%" bold>UFM</Cell>
                        <Cell w="12%" bold center>
                            Benefit{"\n"}Fund No.
                        </Cell>
                        <Cell w="16%" bold>Lump sum invested</Cell>
                        <Cell w="16%" bold>
                            Regular Savings{"\n"}Plan (per month)
                        </Cell>
                    </Row>

                    {/* Thin highlight row like your PDF */}
                    <View style={{ height: 8, backgroundColor: "#00A99D" }} />

                    {/* Rows */}
                    {investmentOptions.map((opt) => (
                        <Row key={opt.no} style={{ borderTopWidth: 1, borderTopColor: "#EEF2F7" }}>
                            <Cell w="6%">{opt.no}</Cell>
                            <Cell w="24%" bold>{opt.fund}</Cell>
                            <Cell w="26%">{opt.ufm}</Cell>
                            <Cell w="12%" center>{opt.benefitNo}</Cell>
                            <Cell w="16%">{opt.lumpSum ? `$ ${opt.lumpSum}` : "$"}</Cell>
                            <Cell w="16%">{opt.rsp ? `$ ${opt.rsp}` : "$"}</Cell>
                        </Row>
                    ))}
                </View>

                {/* ✅ Footer pinned to bottom */}
                <View style={styles.pdfFooter}>
                    <Text>KeyInvest Funeral Bond PDS</Text>
                    <Text>Version: July 2026</Text>
                    <Text>Page 35</Text>
                </View>
            </View>
        </Page>
    );
}
