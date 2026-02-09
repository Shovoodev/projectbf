import React from "react";
import { Page, View, Text, Image } from "@react-pdf/renderer";
import styles from "../Styles";

const Bullet = ({ children }) => (
    <View style={{ flexDirection: "row", marginBottom: 6 }}>
        <Text style={{ width: 12, fontSize: 10, color: "#3129A6" }}>—</Text>
        <Text style={{ flex: 1, fontSize: 9.5, color: "#374151", lineHeight: 1.25 }}>
            {children}
        </Text>
    </View>
);

export default function SlipFortySixPage({ data }) {
    // Prefer data, fallback to null
    // Put: data.adviserDeclaration.signatureImage = "data:image/png;base64,...."
    const signatureImage = data?.adviserDeclaration?.signatureImage || null;

    return (
        <Page size="A4" style={styles.page}>
            <View style={styles.formContainerBase}>
                {/* Header */}
                <View style={{ marginBottom: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: 700, color: "#111827" }}>
                        Financial Adviser Declaration
                    </Text>
                </View>

                {/* Section title */}
                <Text style={[styles.pdfSectionTitle, { fontSize: 12, marginBottom: 6 }]}>
                    3. Financial adviser declaration
                </Text>

                <Text style={{ fontSize: 10, color: "#374151", marginBottom: 8 }}>
                    By completing this form, you accept and agree to:
                </Text>

                {/* Bullet list */}
                <View style={{ marginBottom: 10 }}>
                    <Bullet>
                        <Text style={{ fontWeight: 700, color: "#374151" }}>
                            Be bound by the terms and conditions
                        </Text>{" "}
                        contained in this form.
                    </Bullet>

                    <Bullet>
                        <Text style={{ fontWeight: 700, color: "#374151" }}>
                            Only provide instructions to KeyInvest
                        </Text>{" "}
                        that have been discussed and agreed to by the Investor(s).
                    </Bullet>

                    <Bullet>
                        <Text style={{ fontWeight: 700, color: "#374151" }}>
                            Inform KeyInvest immediately
                        </Text>{" "}
                        if you cease to be licensed by the dealer group or cease to have a relationship with the Investor(s).
                    </Bullet>

                    <Bullet>
                        <Text style={{ fontWeight: 700, color: "#374151" }}>
                            Notify KeyInvest immediately
                        </Text>{" "}
                        of any dispute with the Investor(s) in relation to any instruction provided to KeyInvest under this authority.
                    </Bullet>
                </View>

                {/* Signature Section */}
                <Text style={{ fontSize: 12, fontWeight: 700, color: "#111827", marginBottom: 8 }}>
                    Signature of financial adviser
                </Text>

                <Text style={[styles.pdfLabel, { fontSize: 10, marginBottom: 3 }]}>
                    Digital Signature
                </Text>

                <View
                    style={{
                        borderWidth: 2,
                        borderColor: "#D1D5DB",
                        borderStyle: "dashed",
                        borderRadius: 8,
                        padding: 10,
                        minHeight: 90,
                        backgroundColor: "#F8FAFC",
                        justifyContent: "center",
                        marginBottom: 6,
                    }}
                >
                    {signatureImage ? (
                        <Image
                            src={signatureImage}
                            style={{ width: "100%", height: 70, objectFit: "contain" }}
                        />
                    ) : (
                        <Text style={{ fontSize: 9, color: "#9CA3AF" }}>
                            Signature not provided
                        </Text>
                    )}
                </View>

                <Text style={{ fontSize: 9, color: "#6B7280" }}>
                    Type your legal signature or use a stylus/touchpad to draw your signature.
                </Text>

                {/* Footer pinned bottom */}
                <View style={styles.pdfFooter}>
                    <Text>KeyInvest Funeral Bond PDS</Text>
                    <Text>Version: July 2026</Text>
                    <Text>Page 46</Text>
                </View>
            </View>
        </Page>
    );
}
