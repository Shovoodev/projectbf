import React from "react";
import { Page, View, Text, Image } from "@react-pdf/renderer";
import styles from "../Styles";

const CheckboxLine = ({ text, checked }) => (
    <View style={{ flexDirection: "row", alignItems: "flex-start", marginBottom: 4 }}>
        <Text style={{ width: 14, fontSize: 10.5, color: "#3129A6", marginTop: 1 }}>
            {checked ? "☑" : "☐"}
        </Text>
        <Text style={{ flex: 1, fontSize: 8.8, color: "#374151", lineHeight: 1.2 }}>
            {text}
        </Text>
    </View>
);

export default function SlipFourtySevenPage({ data }) {
    const declarations = [
        "To apply for the Funeral Bond electronically online.",
        "To submit signed applications for the Funeral Bond via email.",
        "To submit the Direct Debit Request authority to make the initial payment and establish any Regular Savings Plan via email or online.",
        "Change any data entry errors submitted in the on line application to effect the establishment of the Funeral Bond. For example to correct typographical errors made to bank account details or Policy owner details (online application only).",
        "To submit signed transactional requests on your behalf via email. This includes switch requests, additional deposit requests or to vary any regular savings plans.",
        "To update Investor contact details via email, such as address, telephone numbers and email addresses.",
        "If KeyInvest reasonably believe that a person is your authorised financial adviser, or authorised delegate, then anything they do on your behalf within the constraints of this agreement will be treated as if you had done it personally.",
        "The nominated financial adviser will remain authorised, even if this financial adviser changes dealer groups (with a current dealer group release authority).",
        "Once you sign this authority we will treat your financial adviser, or authorised delegate, as being properly appointed unless you inform us otherwise.",
        "You agree to release, discharge and indemnify KeyInvest from and against any liability, cost or loss that is incurred as a result of KeyInvest acting on this authority.",
        "Agree that KeyInvest are not responsible for any loss or delay that results from an email transmission not being received by us.",
        "This authority continues until we receive written notice from you of cancellation of the authority.",
        "KeyInvest may refuse to accept an authority or permit a person to transact or carry out a transaction under this agreement.",
        "KeyInvest can cancel or vary these conditions by giving you not less than seven (7) days written notice.",
    ];

    // Put into data:
    // data.investorDeclaration = {
    //   checked: [true,false,...] // optional
    //   signatureImage: "data:image/png;base64,..."
    //   date: "2026-02-09"
    // }
    const checked = data?.investorDeclaration?.checked || [];
    const signatureImage = data?.investorDeclaration?.signatureImage || null;
    const sigDate = data?.investorDeclaration?.date || "";

    return (
        <Page size="A4" style={styles.page}>
            <View style={styles.formContainerBase}>
                {/* Header */}
                <View style={{ borderBottomWidth: 1, borderBottomColor: "#E5E7EB", paddingBottom: 6, marginBottom: 8 }}>
                    <Text style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>
                        4. Investor(s) declaration
                    </Text>
                </View>

                <Text style={{ fontSize: 9.5, fontWeight: 700, color: "#374151", marginBottom: 6 }}>
                    You authorise the nominated financial adviser, or authorised delegate:
                </Text>

                {/* Declarations */}
                <View style={{ marginBottom: 8 }}>
                    {declarations.map((t, i) => (
                        <CheckboxLine key={i} text={t} checked={!!checked[i]} />
                    ))}
                </View>

                {/* Signature Box */}
                <View
                    style={{
                        borderWidth: 1,
                        borderColor: "#E5E7EB",
                        borderRadius: 10,
                        padding: 10,
                        backgroundColor: "#F9FAFB",
                        marginTop: 4,
                    }}
                >
                    <Text style={{ fontSize: 12, fontWeight: 700, color: "#111827", marginBottom: 6 }}>
                        Signature
                    </Text>

                    <Text style={[styles.pdfLabel, { fontSize: 9.5, marginBottom: 3 }]}>
                        Signature of Investor
                    </Text>

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
                            marginBottom: 6,
                        }}
                    >
                        {signatureImage ? (
                            <Image src={signatureImage} style={{ width: "100%", height: 60, objectFit: "contain" }} />
                        ) : (
                            <Text style={{ fontSize: 9, color: "#9CA3AF" }}>Signature not provided</Text>
                        )}
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                        <Text style={[styles.pdfLabel, { fontSize: 9.5, marginBottom: 0 }]}>Date:</Text>
                        <View
                            style={{
                                width: 160,
                                borderWidth: 1,
                                borderColor: "#D1D5DB",
                                borderRadius: 4,
                                paddingVertical: 5,
                                paddingHorizontal: 8,
                                backgroundColor: "#F8FAFC",
                            }}
                        >
                            <Text style={{ fontSize: 9.5, fontWeight: 700, color: "#3129A6" }}>
                                {sigDate || "-"}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Footer pinned bottom */}
                <View style={styles.pdfFooter}>
                    <Text>KeyInvest Funeral Bond PDS</Text>
                    <Text>Version: July 2026</Text>
                    <Text>Page 47</Text>
                </View>
            </View>
        </Page>
    );
}
