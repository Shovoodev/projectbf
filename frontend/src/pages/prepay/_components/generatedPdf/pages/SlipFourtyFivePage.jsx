import React from "react";
import { Page, View, Text } from "@react-pdf/renderer";
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
            {value ? String(value) : "-"}
        </Text>
    </View>
);

const Field = ({ label, value, w }) => (
    <View style={{ width: w || "100%", marginBottom: 6 }}>
        <Text style={[styles.pdfLabel, { fontSize: 9.5, marginBottom: 2 }]}>{label}</Text>
        <Box value={value} w={w} />
    </View>
);

export default function SlipFourtyFivePage({ data }) {
    const f = data?.adviserAuthorityForm || {};

    const investor1 = f?.investor1 || {};
    const investor2 = f?.investor2 || {};
    const adviser = f?.adviser || {};

    return (
        <Page size="A4" style={styles.pageWithoutpaddingborrom}>
            <View style={styles.formContainerBasewithoutpaddingbottom}>
                {/* Adviser only */}
                <Text style={{ fontSize: 11, fontWeight: 700, color: "#111827", marginBottom: 6 }}>
                    ADVISER ONLY
                </Text>

                {/* Big header */}
                <Text style={{ fontSize: 18, fontWeight: 700, color: "#60A5FA", marginBottom: 6 }}>
                    KeyInvest Adviser Electronic Transaction Authority Form
                </Text>

                <View
                    style={{
                        height: 4,
                        backgroundColor: "#00A99D",
                        borderRadius: 3,
                        marginBottom: 10,
                    }}
                />

                {/* Instructions */}
                <View style={{ marginBottom: 8 }}>
                    <Text style={{ fontSize: 10, fontWeight: 700, color: "#111827", marginBottom: 4 }}>
                        Instructions:
                    </Text>
                    <Text style={{ fontSize: 9.5, color: "#374151", lineHeight: 1.25, marginBottom: 6 }}>
                        Use this form to authorise KeyInvest to accept all forms of communication and requests
                        (including new applications and transactional requests) via email or online from the
                        financial adviser nominated on this form, or any other person authorised by them under
                        the same dealer group.
                    </Text>

                    <Text style={{ fontSize: 10, fontWeight: 700, color: "#111827", marginBottom: 4 }}>
                        Please note:
                    </Text>
                    <Text style={{ fontSize: 9.5, color: "#374151", lineHeight: 1.25 }}>
                        In certain circumstances KeyInvest may still request documentation to be submitted via
                        post, such as the case when certified documents are required and in the event of death
                        claims. Please contact KeyInvest for further clarification.
                    </Text>
                </View>

                {/* Section 1 */}
                <Text style={[styles.pdfSectionTitle, { fontSize: 12, marginBottom: 6 }]}>
                    1. Investor details
                </Text>

                {/* Investor 1 */}
                <View style={{ marginBottom: 8 }}>
                    <Text style={{ fontSize: 11, fontWeight: 700, color: "#111827", marginBottom: 4 }}>
                        Investor 1
                    </Text>

                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <Field label="Full Name *" value={investor1.fullName} w="50%" />
                        <Field label="Email Address *" value={investor1.email} w="50%" />
                    </View>

                    <Field label="Address" value={investor1.address} />
                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <Field label="Company ABN (if available)" value={investor1.abn} w="50%" />
                        <Field label="Postcode" value={investor1.postcode} w="50%" />
                    </View>
                </View>

                {/* Investor 2 box */}
                <View
                    style={{
                        borderWidth: 2,
                        borderColor: "#DBEAFE",
                        borderRadius: 10,
                        padding: 10,
                        marginBottom: 10,
                    }}
                >
                    <Text style={{ fontSize: 11, fontWeight: 700, color: "#111827", marginBottom: 4 }}>
                        Investor 2
                    </Text>

                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <Field label="Full Name *" value={investor2.fullName} w="50%" />
                        <Field label="Email Address *" value={investor2.email} w="50%" />
                    </View>

                    <Field label="Address" value={investor2.address} />
                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <Field label="Company ABN (if available)" value={investor2.abn} w="50%" />
                        <Field label="Postcode" value={investor2.postcode} w="50%" />
                    </View>
                </View>

                {/* Divider */}
                <View
                    style={{
                        height: 1,
                        backgroundColor: "#E5E7EB",
                        marginBottom: 10,
                    }}
                />

                {/* Section 2 */}
                <Text style={[styles.pdfSectionTitle, { fontSize: 12, marginBottom: 6 }]}>
                    2. Financial adviser details
                </Text>

                <View style={{ flexDirection: "row", gap: 10 }}>
                    <Field label="Full Name *" value={adviser.fullName} w="50%" />
                    <Field label="Licensee Dealer Group *" value={adviser.dealerGroup} w="50%" />
                </View>

                <View style={{ flexDirection: "row", gap: 10 }}>
                    <Field label="Licensee Dealer Group AFSL No." value={adviser.afslNo} w="50%" />
                    <Field label="KeyInvest Adviser Code (if known)" value={adviser.adviserCode} w="50%" />
                </View>

                {/* Footer pinned bottom */}
                <View style={styles.pdfFooter}>
                    <Text>KeyInvest Funeral Bond PDS</Text>
                    <Text>Version: July 2026</Text>
                    <Text>Page 45</Text>
                </View>
            </View>
        </Page>
    );
}
