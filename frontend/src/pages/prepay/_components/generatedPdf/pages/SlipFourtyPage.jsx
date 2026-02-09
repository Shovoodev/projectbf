import React from "react";
import { Page, View, Text, Image } from "@react-pdf/renderer";
import styles from "../Styles";

const CheckboxLine = ({ text, checked }) => (
    <View style={{ flexDirection: "row", marginBottom: 5 }}>
        <Text style={{ width: 14, fontSize: 11, color: "#3129A6" }}>
            {checked ? "☑" : "☐"}
        </Text>
        <Text style={[styles.pdfDeclarationText, { flex: 1 }]}>{text}</Text>
    </View>
);

export default function SlipFourtyPage({ data }) {
    const date = data?.date || "";

    const directorName = data?.funeralDirectorName || "Black Tulip Funerals";

    // base64 dataURL recommended: "data:image/png;base64,..."
    const directorSig = data?.funeralDirectorSignatureImage || null;

    const checks = data?.directorAcceptanceChecks || []; // e.g. [0,1]

    return (
        <Page size="A4" style={styles.page} wrap={false}>
            <View style={styles.formContainerBase}>
                {/* Header */}
                <Text style={[styles.pdfH2, { marginBottom: 8 }]}>
                    7. Funeral director acceptance of the assignment of the Funeral Bond
                </Text>

                {/* Instructions */}
                <View
                    style={{
                        borderWidth: 1,
                        borderColor: "#1E3A8A",
                        backgroundColor: "#EFF6FF",
                        borderRadius: 6,
                        padding: 8,
                        marginBottom: 10,
                    }}
                >
                    <Text style={[styles.pdfInstructionBold, { marginBottom: 4, fontSize: 10 }]}>
                        This section should only be completed and signed if the bond is being assigned to a
                        funeral director
                    </Text>
                    <Text style={[styles.pdfIntroP, { marginBottom: 0, fontSize: 10 }]}>
                        I accept the assignment from the Investor(s) named in this application with the full
                        understanding of the following
                    </Text>
                </View>

                {/* Declarations */}
                <View style={{ marginBottom: 12 }}>
                    <CheckboxLine
                        text="I understand and accept the investment risk associated with the Investment Option(s) selected in Section 2.1."
                        checked={checks.includes(0)}
                    />
                    <CheckboxLine
                        text="All the funeral requirements selected by the Investor(s) as a part of the pre-paid funeral contract will be provided irrespective of the final balance of the Funeral Bond."
                        checked={checks.includes(1)}
                    />
                </View>

                {/* Director signature + details */}
                <Text
                    style={[
                        styles.pdfSectionTitle,
                        { borderBottomWidth: 0, marginBottom: 6, color: "#00A99D" },
                    ]}
                >
                    Authorised Signature of Funeral Director:
                </Text>

                <View style={{ marginBottom: 10, width: 260 }}>
                    <Text style={styles.pdfLabelSm}>Signature:</Text>

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
                            alignItems: "center",
                        }}
                    >
                        {directorSig ? (
                            <Image
                                src={directorSig}
                                style={{ width: 220, height: 70, objectFit: "contain" }}
                            />
                        ) : (
                            <Text style={{ fontSize: 9, color: "#9CA3AF" }}>
                                Signature image here
                            </Text>
                        )}
                    </View>
                </View>

                <View style={{ marginBottom: 10 }}>
                    <Text style={styles.pdfLabel}>Name of Funeral Director:</Text>
                    <View
                        style={{
                            borderWidth: 1,
                            borderColor: "#D1D5DB",
                            borderRadius: 4,
                            paddingVertical: 6,
                            paddingHorizontal: 8,
                            backgroundColor: "#F8FAFC",
                            marginBottom: 8,
                        }}
                    >
                        <Text style={{ fontSize: 10, fontWeight: 700, color: "#3129A6" }}>
                            {directorName}
                        </Text>
                    </View>

                    <Text style={styles.pdfLabel}>Date</Text>
                    <View
                        style={{
                            width: "45%",
                            borderWidth: 1,
                            borderColor: "#D1D5DB",
                            borderRadius: 4,
                            paddingVertical: 6,
                            paddingHorizontal: 8,
                            backgroundColor: "#FFFFFF",
                        }}
                    >
                        <Text style={{ fontSize: 10, fontWeight: 700, color: "#3129A6" }}>
                            {date || "-"}
                        </Text>
                    </View>
                </View>

                {/* Footer pinned bottom */}
                <View style={styles.pdfFooter}>
                    <Text>KeyInvest Funeral Bond PDS</Text>
                    <Text>Version: July 2026</Text>
                    <Text>Page 40</Text>
                </View>
            </View>
        </Page>
    );
}
