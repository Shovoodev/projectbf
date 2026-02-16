import React from "react";
import { Page, View, Text, Image } from "@react-pdf/renderer";
import styles from "../Styles";

const CheckboxLine = ({ text, checked }) => (
    <View style={{ flexDirection: "row", marginBottom: 4 }}>
        <View
            style={{
                width: 10,
                height: 10,
                borderWidth: 1,
                borderColor: "#3129A6",
                marginRight: 4,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {checked ? <Text style={{ fontSize: 8, color: "#3129A6" }}>✓</Text> : null}
        </View>

        <Text style={[styles.pdfDeclarationText, { flex: 1 }]}>
            {text}
        </Text>
    </View>
);



export default function SlipThirtySevenPage({ data }) {
    const declarationsChecked = (data?.declarationsChecked || []).map(Number);
    const optionalChecked = (data?.optionalChecked || []).map(Number);

    // signature can be:
    // - a base64 data URL: "data:image/png;base64,...."
    // - or a normal URL
    const signatureImage = data?.signatureImage || null;

    const declarations = [
        "I/We have read and understood this Application Form and the PDS attached and to which this Application Form relates;",
        "To be bound by the terms and conditions of the PDS, this Application Form and the Constitution of KeyInvest (as amended from time to time);",
        "I/We have not relied on statements or representations made by any person, other than those made in the PDS to which this Application Form relates;",
        "The information I/We have provided in this Application Form is true and correct;",
        "The KeyInvest Funeral Bond does not mature until my/our death and that no withdrawals under the KeyInvest Funeral Bond are possible (other than where the KeyInvest Funeral Bond is 'cooled-off' in accordance with the terms of this PDS);",
        "The amount of my/our contributions to the KeyInvest Funeral Bond do not exceed my/our anticipated total amount of funeral expenses;",
        "Except for in respect of the repayment of capital of the 'Capital Guaranteed Fund', KeyInvest does not guarantee the performance of any other 'Investment Option' of the KeyInvest Funeral Bond;",
        "In the event KeyInvest is wound up and unable to meet its liabilities, I/We will contribute to the sum of $1.00 only, towards the meeting of KeyInvest's liabilities;",
        "I/We may be responsible for any Stamp Duty payable on the issue of my/our KeyInvest Funeral Bond or any subsequent assignment to a funeral director;",
        "My/Our financial adviser (where applicable), may process an application under the KeyInvest Funeral Bond using KeyInvest's online application portal;",
        "That my/our personal information will be collected, used and disclosed by KeyInvest in accordance with its Privacy Policy.",
    ];

    const optionalCheckboxes = [
        "If you do not wish to receive newsletters or information in relation to our other products and services, please mark this box",
        "If you do not wish to receive newsletters or information about goods or services from other suppliers which KeyInvest reasonably consider may be of interest to you, please mark this box.",
    ];

    return (
        <Page size="A4" style={styles.page} wrap={false}>
            <View style={styles.formContainerBase}>
                {/* Title */}
                <Text style={[styles.pdfH2, { fontSize: 18, marginBottom: 6 }]}>
                    5. Application
                </Text>

                {/* Info box */}
                <View
                    style={{
                        borderWidth: 1,
                        borderColor: "#BFDBFE",
                        backgroundColor: "#EFF6FF",
                        borderRadius: 6,
                        padding: 8,
                        marginBottom: 8,
                    }}
                >
                    <Text style={[styles.pdfIntroP, { fontSize: 10, marginBottom: 0 }]}>
                        Before signing this Application Form, Investors should read the PDS
                        to which this application is attached.
                    </Text>
                </View>

                {/* Declaration */}
                <View style={{ marginBottom: 10 }}>
                    <Text style={[styles.pdfSectionTitle, { marginBottom: 4 }]}>
                        Declaration
                    </Text>
                    <Text style={[styles.pdfIntroP, { fontSize: 10, fontWeight: 700, marginBottom: 6 }]}>
                        I/We agree and acknowledge:
                    </Text>

                    <View style={{ marginBottom: 8 }}>
                        {declarations.map((t, i) => (
                            <CheckboxLine
                                key={i}
                                text={t}
                                checked={declarationsChecked.includes(i)}
                            />
                        ))}
                    </View>

                    <View
                        style={{
                            borderTopWidth: 1,
                            borderTopColor: "#D1D5DB",
                            paddingTop: 6,
                            marginTop: 4,
                        }}
                    >
                        {optionalCheckboxes.map((t, i) => (
                            <CheckboxLine
                                key={i}
                                text={t}
                                checked={optionalChecked.includes(i)}
                            />
                        ))}
                    </View>
                </View>

                {/* Signature */}
                <View style={{ marginTop: 6 }}>
                    <Text style={[styles.pdfSectionTitle, { marginBottom: 6 }]}>
                        Signature
                    </Text>

                    {signatureImage ? (
                        <View
                            style={{
                                borderWidth: 1,
                                borderColor: "#D1D5DB",
                                borderRadius: 6,
                                padding: 8,
                                backgroundColor: "#FFFFFF",
                                width: 220,
                            }}
                        >
                            <Image
                                src={signatureImage}
                                style={{ width: 200, height: 70, objectFit: "contain" }}
                            />
                        </View>
                    ) : (
                        <View
                            style={{
                                borderWidth: 2,
                                borderColor: "#D1D5DB",
                                borderStyle: "dashed",
                                borderRadius: 8,
                                padding: 16,
                                backgroundColor: "#F8FAFC",
                                width: "100%",
                                minHeight: 90,
                                justifyContent: "center",
                            }}
                        >
                            <Text style={{ fontSize: 10, color: "#6B7280" }}>
                                Signature box (signature captured in the web form)
                            </Text>
                        </View>
                    )}
                </View>

                {/* Footer pinned bottom */}
                <View style={styles.pdfFooter}>
                    <Text>KeyInvest Funeral Bond Product Disclosure Statement (PDS)</Text>
                    <Text>Version: July 2026</Text>
                    <Text>37</Text>
                </View>
            </View>
        </Page>
    );
}
