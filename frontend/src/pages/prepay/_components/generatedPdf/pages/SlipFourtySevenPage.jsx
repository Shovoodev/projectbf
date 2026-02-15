import React from "react";
import { Page, View, Text, Image } from "@react-pdf/renderer";
import styles from "../Styles";
const CheckboxLine = ({ text, checked }) => (
    <View style={{ flexDirection: "row", marginBottom: 4 }}>
        <View
            style={{
                width: 10,
                height: 10,
                border: "1px solid #3129A6",
                marginRight: 4,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {checked && (
                <Text style={{ fontSize: 8, color: "#3129A6" }}>X</Text>
            )}
        </View>

        <Text style={[styles.pdfDeclarationText, { flex: 1 }]}>
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


    const checked = data?.investorDeclaration?.checked || [];
    const signatureImage = data?.signatureImage || null;

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

                {/* Signature block */}
                <View
                    style={{
                        borderWidth: 1,
                        borderColor: "#E5E7EB",
                        borderRadius: 8,
                        backgroundColor: "#F8FAFC",
                        padding: 10,
                    }}
                >
                    <View style={{ flexDirection: "row", gap: 10 }}>
                        {/* Signature */}
                        <View style={{ width: "65%" }}>
                            <Text style={styles.pdfLabelSm}>Signature of investor</Text>

                            <View
                                style={{
                                    marginTop: 6,
                                    borderWidth: 2,
                                    borderColor: "#D1D5DB",
                                    borderStyle: "dashed",
                                    borderRadius: 8,
                                    padding: 10,
                                    minHeight: 90,
                                    backgroundColor: "#FFFFFF",
                                    justifyContent: "center",
                                }}
                            >
                                {signatureImage ? (
                                    <Image
                                        src={signatureImage}
                                        style={{ width: "100%", height: 70, objectFit: "contain" }}
                                    />
                                ) : (
                                    <Text style={{ fontSize: 9, color: "#9CA3AF" }}>
                                        Signature captured in web form
                                    </Text>
                                )}
                            </View>
                        </View>

                        {/* Date */}
                        <View style={{ width: "35%" }}>
                            <Text style={styles.pdfLabelSm}>Date:</Text>
                            <View
                                style={{
                                    marginTop: 6,
                                    borderWidth: 1,
                                    borderColor: "#D1D5DB",
                                    borderRadius: 4,
                                    paddingVertical: 6,
                                    paddingHorizontal: 8,
                                    backgroundColor: "#FFFFFF",
                                }}
                            >
                                <Text style={{ fontSize: 10, fontWeight: 700, color: "#3129A6" }}>
                                    {data.updatedDate}
                                </Text>
                            </View>
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
