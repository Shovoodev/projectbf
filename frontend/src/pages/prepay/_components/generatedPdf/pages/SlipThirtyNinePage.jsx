import React from "react";
import { Page, View, Text, Image } from "@react-pdf/renderer";
import styles from "../Styles";

export default function SlipThirtyNinePage({ data }) {
    const signatureImage = data?.signatureImage || null; // data URL recommended
    const date = data?.date || "";

    const directorName = data?.funeralDirectorName || "Black Tulip Funerals";
    const directorPhone = data?.funeralDirectorPhone || "1300110031";

    return (
        <Page size="A4" style={styles.page} wrap={false}>
            <View style={styles.formContainerBase}>
                {/* Header */}
                <Text style={[styles.pdfH2, { marginBottom: 8 }]}>
                    7. Assigning the Funeral Bond to a funeral director (Pre-Paid Funeral Bond)
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
                        This section should only be completed and signed if the bond is being assigned to
                        a funeral director.
                    </Text>
                    <Text style={[styles.pdfIntroP, { marginBottom: 0, fontSize: 10 }]}>
                        I/We in accordance with the Life Insurance Act 1995 (Cth), the Constitution of
                        KeyInvest and as outlined in the Product Disclosure Statement, wish to assign this
                        Funeral Bond to
                    </Text>
                </View>

                {/* Director Details */}
                <Text
                    style={[
                        styles.pdfSectionTitle,
                        { borderBottomWidth: 0, marginBottom: 6, color: "#00A99D" },
                    ]}
                >
                    Assigned to:
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

                {/* Note Box */}
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
                    <Text style={{ fontSize: 10, fontWeight: 700, color: "#3129A6", marginBottom: 4 }}>
                        Please Note: An assignment transfers full ownership of the Funeral Bond to the funeral
                        director
                    </Text>

                    <Text style={[styles.pdfIntroP, { fontSize: 9, marginBottom: 0, color: "#3129A6" }]}>
                        Despite the ownership transferring to the funeral director upon acceptance by KeyInvest,
                        all Investor(s) will remain Members of KeyInvest and the assigned funeral director will
                        not be admitted as a Member of KeyInvest. All future notices will be forwarded to the
                        specified funeral director. This assignment is not valid until registered by KeyInvest.
                        This assignment is subject to the Funeral Bond being issued. You must be at least 16
                        years of age to assign the Funeral Bond to a funeral director. Acknowledgment of
                        assignment – Investor 1 and Investor 2 (where applicable) and the funeral director
                        signatures are required.
                    </Text>
                </View>

                {/* Signature area */}
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
                    <Text>KeyInvest Funeral Bond PDS</Text>
                    <Text>Version: July 2026</Text>
                    <Text>Page 39</Text>
                </View>
            </View>
        </Page>
    );
}
