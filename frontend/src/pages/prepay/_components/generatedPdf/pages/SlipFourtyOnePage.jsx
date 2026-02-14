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
        <Text style={[styles.pdfLabel, { fontSize: 10, marginBottom: 2 }]}>{label}</Text>
        <Box value={value} w={w} />
    </View>
);

const Checkbox = ({ label, checked }) => (
    <View style={{ flexDirection: "row", alignItems: "center", marginRight: 10, marginBottom: 4 }}>
        <Text style={{ width: 14, fontSize: 11, color: "#3129A6" }}>
            {checked ? "☑" : "☐"}
        </Text>
        <Text style={[styles.pdfIntroP, { marginBottom: 0, fontSize: 9, lineHeight: 1.2 }]}>
            {label}
        </Text>
    </View>
);

export default function SlipFourtyOnePage({ data }) {
    const form = data?.directDebitForm || {};
    const h1 = form?.accountHolders?.holderOne || {};
    const h2 = form?.accountHolders?.holderTwo || {};

    const title1 = h1?.title || "";
    const title2 = h2?.title || "";

    const titles = ["Mr", "Mrs", "Ms", "Miss", "Dr", "Other"];

    return (
        <Page size="A4" style={styles.pageWithoutpaddingborrom} wrap={false}>
            <View style={styles.formContainerBasewithoutpaddingbottom}>
                {/* Header */}
                <Text style={{ fontSize: 22, fontWeight: 700, color: "#2b2e83", lineHeight: 1.1 }}>
                    KeyInvest Direct{"\n"}Debit Request
                </Text>

                <View style={{ borderTopWidth: 1, borderTopColor: "rgba(43,46,131,0.4)", marginTop: 6, marginBottom: 6 }} />

                {/* Description */}
                <Text style={[styles.pdfIntroP, { fontSize: 9, color: "rgba(43,46,131,0.9)", marginBottom: 8 }]}>
                    Request and authority to debit the account named below to pay KeyInvest Ltd.
                    Please PRINT clearly using blue or black pen, and mark boxes using crosses “X”
                    where appropriate. Please return the completed form to KeyInvest or phone KeyInvest
                    on 1300 658 904 with any enquiries.
                </Text>

                <View style={{ borderTopWidth: 1, borderTopColor: "rgba(43,46,131,0.4)", marginTop: 2, marginBottom: 8 }} />

                {/* Section 1 */}
                <Text style={{ fontSize: 14, fontWeight: 700, color: "#00A99D", marginBottom: 6 }}>
                    1. Names and contact details
                </Text>

                {/* Account Holder 1 */}
                <View style={{ marginBottom: 8 }}>
                    <Text style={{ fontSize: 11, fontWeight: 700, color: "#3129A6", marginBottom: 4 }}>
                        Account Holder 1
                    </Text>

                    <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap", marginBottom: 6 }}>
                        <Text style={{ width: 40, fontSize: 10, color: "#3129A6", fontWeight: 700 }}>Title:</Text>
                        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                            {titles.map((t) => (
                                <Checkbox key={t} label={t} checked={title1 === t} />
                            ))}
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <Field
                            label="Surname/Company/Trust Name:"
                            value={h1?.surnameOrEntityName}
                            w="50%"
                        />
                        <Field label="Given Names:" value={h1?.givenNames} w="50%" />
                    </View>
                </View>

                {/* Account Holder 2 */}
                <View style={{ marginBottom: 8 }}>
                    <Text style={{ fontSize: 11, fontWeight: 700, color: "#3129A6", marginBottom: 4 }}>
                        Account Holder 2
                    </Text>

                    <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap", marginBottom: 6 }}>
                        <Text style={{ width: 40, fontSize: 10, color: "#3129A6", fontWeight: 700 }}>Title:</Text>
                        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                            {titles.map((t) => (
                                <Checkbox key={t} label={t} checked={title2 === t} />
                            ))}
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <Field
                            label="Surname/Company/Trust Name:"
                            value={h2?.surnameOrEntityName}
                            w="50%"
                        />
                        <Field label="Given Names:" value={h2?.givenNames} w="50%" />
                    </View>
                </View>

                {/* Address (Company ABN/Trust) */}
                <View style={{ marginBottom: 10 }}>
                    <Text style={{ fontSize: 10, fontWeight: 700, color: "#3129A6", marginBottom: 6 }}>
                        If company ABN or Trust
                    </Text>

                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <Field label="Address:" value={form?.accountHolders?.addressabn} w="50%" />
                        <Field label="Suburb:" value={form?.accountHolders?.suburbabn} w="50%" />
                    </View>

                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <Field label="State:" value={form?.accountHolders?.stateabn} w="33%" />
                        <Field label="Postcode:" value={form?.accountHolders?.postcodeabn} w="33%" />
                        <Field label="Country:" value={"AUSTRALIA"} w="34%" />
                    </View>
                </View>

                <View style={{ borderTopWidth: 1, borderTopColor: "rgba(43,46,131,0.4)", marginTop: 4, marginBottom: 8 }} />

                {/* Section 2 */}
                <Text style={{ fontSize: 14, fontWeight: 700, color: "#00A99D", marginBottom: 6 }}>
                    2. Nominated financial institution account
                </Text>

                <View style={{ marginBottom: 8 }}>
                    <Field
                        label="Name of financial institution:"
                        value={form?.accountHolders?.institutionName}
                    />
                    <Field label="Branch:" value={form?.accountHolders?.branch} />
                    <Field label="Account Name:" value={form?.accountHolders?.accountName} />

                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <Field label="BSB Number:" value={form?.accountHolders?.bsbNumber} w="50%" />
                        <Field
                            label="Account Number:"
                            value={form?.accountHolders?.accountNumber}
                            w="50%"
                        />
                    </View>
                </View>

                {/* Footer pinned bottom */}
                <View style={styles.pdfFooter}>
                    <Text>KeyInvest Funeral Bond PDS</Text>
                    <Text>Version: July 2026</Text>
                    <Text>Page 41</Text>
                </View>
            </View>
        </Page>
    );
}
