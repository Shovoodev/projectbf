import React from "react";
import { Page, View, Text, Image } from "@react-pdf/renderer";
import styles from "../Styles";

export default function SlipThirtyEightPage({ data }) {
    const signatureImage = data?.signatureImage || null; // data URL recommended
    const date = data?.date || "";

    const directorName = data?.funeralDirectorName || "Black Tulip Funerals";
    const directorPhone = data?.funeralDirectorPhone || "1300110031";

    return (
        <Page size="A4" style={styles.page} wrap={false}>
            <View style={styles.formContainerBase}>
                {/* Header */}
                <Text style={[styles.pdfH2, { marginBottom: 8 }]}>
                    6. Nominate a funeral director to perform the funeral
                </Text>

                {/* Instructions box */}
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
                        This section should only be completed and signed if the Funeral Bond
                        is being &apos;NOMINATED&apos; and by the Investor(s) only.
                    </Text>
                    <Text style={[styles.pdfIntroP, { marginBottom: 0, fontSize: 10 }]}>
                        The funeral director’s signature is not required. I/We in accordance
                        with the Constitution of KeyInvest and as outlined in the Product
                        Disclosure Statement, wish to nominate this Funeral Bond to
                    </Text>
                </View>

                {/* Director details */}
                <Text style={[styles.pdfSectionTitle, { borderBottomWidth: 0, marginBottom: 6, color: "#00A99D" }]}>
                    Nominated to:
                </Text>

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

                    <Text style={styles.pdfLabel}>Phone:</Text>
                    <View
                        style={{
                            width: "50%",
                            borderWidth: 1,
                            borderColor: "#D1D5DB",
                            borderRadius: 4,
                            paddingVertical: 6,
                            paddingHorizontal: 8,
                            backgroundColor: "#F8FAFC",
                        }}
                    >
                        <Text style={{ fontSize: 10, fontWeight: 700, color: "#3129A6" }}>
                            {directorPhone}
                        </Text>
                    </View>
                </View>

                {/* Acknowledgement */}
                <View
                    style={{
                        borderWidth: 1,
                        borderColor: "#4BA6A6",
                        backgroundColor: "#F1F6F7",
                        borderRadius: 6,
                        padding: 8,
                        marginBottom: 10,
                    }}
                >
                    <Text style={{ fontSize: 10, fontWeight: 700, color: "#3129A6" }}>
                        Acknowledgement of nomination – Investor (where applicable)
                        signatures are required.
                    </Text>
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
                                    {date || "-"}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Footer pinned bottom */}
                <View style={styles.pdfFooter}>
                    <Text>KeyInvest Funeral Bond Product Disclosure Statement (PDS)</Text>
                    <Text>Version: July 2026</Text>
                    <Text>38</Text>
                </View>
            </View>
        </Page>
    );
}
