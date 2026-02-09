import React from "react";
import { Page, View, Text } from "@react-pdf/renderer";
import styles from "../Styles";

const RadioOption = ({ label, checked }) => (
    <View style={styles.pdfRadioItem}>
        <Text style={styles.pdfRadioBox}>{checked ? "☑" : "☐"}</Text>
        <Text style={styles.pdfRadioText}>{label}</Text>
    </View>
);

const FieldRow = ({ label, value }) => (
    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
        <Text style={[styles.pdfLabel, { width: 220, marginBottom: 0 }]}>{label}</Text>
        <View
            style={{
                flex: 1,
                borderWidth: 1,
                borderColor: "#D1D5DB",
                borderRadius: 4,
                paddingVertical: 5,
                paddingHorizontal: 8,
                backgroundColor: "#F8FAFC",
            }}
        >
            <Text style={{ fontSize: 10, color: "#3129A6" }}>{value || "-"}</Text>
        </View>
    </View>
);

const SmallInputBox = ({ value, w }) => (
    <View
        style={{
            width: w || 90,
            borderWidth: 1,
            borderColor: "#D1D5DB",
            borderRadius: 4,
            paddingVertical: 5,
            paddingHorizontal: 8,
            backgroundColor: "#F8FAFC",
            marginLeft: 6,
            marginRight: 6,
        }}
    >
        <Text style={{ fontSize: 10, color: "#3129A6", fontWeight: 700 }}>
            {value || "-"}
        </Text>
    </View>
);

export default function SlipThirtySixPage({ data }) {
    const maxValue = 25;

    const rspIncrease = data?.rspIncrease || "no"; // "yes" | "no"
    const annualIncrease = data?.annualIncreasePercent || ""; // number/string

    const serviceFeeFixed = data?.serviceFeeFixed || "220";
    const serviceFeePercent = data?.serviceFeePercent || "";

    const adviser = data?.adviser || {};
    const adviserProvider = adviser?.providerName || "Black Tulip Funerals";
    const adviserGroup = adviser?.groupName || "";
    const adviserAddress = adviser?.address || "PO Box 1033 Hurstville BC NSW 1481";
    const adviserPhone = adviser?.phone || "1300110031";
    const adviserOfficeEmail =
        adviser?.officeEmail || "keyinvest@blacktulipfunerals.com.au";
    const adviserNewEmail = adviser?.newAdviserEmail || "";
    const afsLicence = adviser?.afsLicence || "";
    const adviserCode = adviser?.adviserCode || "";

    return (
        <Page size="A4" style={styles.page} wrap={false}>
            <View style={styles.formContainerBase}>
                {/* 2.2 */}
                <Text style={[styles.pdfH2, { color: "#00A99D" }]}>
                    2.2. Automatically increase the RSP contribution amount each year?
                </Text>

                <View style={{ flexDirection: "row", marginBottom: 6 }}>
                    <RadioOption label="Yes" checked={rspIncrease === "yes"} />
                    <View style={{ width: 14 }} />
                    <RadioOption label="No" checked={rspIncrease === "no"} />
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap", marginBottom: 10 }}>
                    <Text style={[styles.pdfLabel, { marginBottom: 0 }]}>Annual percentage increase</Text>
                    <SmallInputBox value={annualIncrease} w={70} />
                    <Text style={[styles.pdfLabel, { marginBottom: 0 }]}>
                        % (up to a maximum of {maxValue}%)
                    </Text>
                </View>

                {/* divider */}
                <View style={styles.pdfHr} />

                {/* 3 */}
                <Text style={[styles.pdfH2, { color: "#00A99D" }]}>
                    3. Service fee payment instruction{" "}
                    <Text style={{ fontSize: 9, fontWeight: 400, color: "#00A99D" }}>
                        (Financial adviser use only)
                    </Text>
                </Text>

                <View style={{ marginTop: 6, marginBottom: 10 }}>
                    <Text style={{ fontSize: 11, fontWeight: 700, color: "#3129A6", marginBottom: 4 }}>
                        Initial Service Fee
                    </Text>

                    <Text style={[styles.pdfIntroP, { fontSize: 9, marginBottom: 6 }]}>
                        Where agreement has been reached to pay a financial adviser or service provider an
                        initial service fee, please insert the fee as either a fixed dollar amount or
                        percentage of the initial contribution.
                    </Text>

                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
                        <Text style={[styles.pdfLabel, { marginBottom: 0 }]}>Fixed dollar amount:</Text>
                        <SmallInputBox value={serviceFeeFixed} w={90} />
                    </View>

                    <Text style={{ textAlign: "center", fontSize: 10, fontWeight: 700, color: "#3129A6", marginBottom: 6 }}>
                        OR
                    </Text>

                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6, flexWrap: "wrap" }}>
                        <Text style={[styles.pdfLabel, { marginBottom: 0 }]}>
                            Percentage of the initial contribution:
                        </Text>
                        <SmallInputBox value={serviceFeePercent} w={70} />
                        <Text style={{ fontSize: 11, fontWeight: 700, color: "#3129A6" }}>%</Text>
                    </View>

                    <Text style={[styles.pdfIntroP, { fontSize: 9, fontStyle: "italic", marginBottom: 0 }]}>
                        Please note an initial service fee will be deducted from the initial contribution amount
                        with the lower net amount invested. The lower net amount is the amount assessed under
                        the Exempt Funeral Bond Threshold.
                    </Text>
                </View>

                {/* divider */}
                <View style={styles.pdfHr} />

                {/* 4 */}
                <Text style={[styles.pdfH2, { color: "#00A99D" }]}>
                    4. Financial adviser / Service provider details{" "}
                    <Text style={{ fontSize: 9, fontWeight: 400, color: "#00A99D" }}>
                        (Financial adviser use only)
                    </Text>
                </Text>

                <Text style={[styles.pdfIntroP, { fontSize: 9, marginTop: 4, marginBottom: 8 }]}>
                    Please note, unless Section 3 has been completed - Service fee payment instruction, the
                    financial adviser or service provider will not receive any payment from KeyInvest.
                </Text>

                {/* Adviser fields */}
                <FieldRow label="Financial Adviser/Service Provider:" value={adviserProvider} />
                <FieldRow label="Name of Financial Adviser Group:" value={adviserGroup} />
                <FieldRow label="Address:" value={adviserAddress} />
                <FieldRow label="Phone:" value={adviserPhone} />
                <FieldRow label="Office email:" value={adviserOfficeEmail} />
                <FieldRow
                    label={"Adviser's Email (new advisers only, required for online access):"}
                    value={adviserNewEmail}
                />

                <View style={{ flexDirection: "row", gap: 8 }}>
                    <View style={{ width: "50%", paddingRight: 4 }}>
                        <FieldRow label="AFS Licence number:" value={afsLicence} />
                    </View>
                    <View style={{ width: "50%", paddingLeft: 4 }}>
                        <FieldRow label="Adviser Code:" value={adviserCode} />
                    </View>
                </View>

                <Text style={[styles.pdfIntroP, { fontSize: 9, marginTop: 6, marginBottom: 0 }]}>
                    Financial advisers, please attach a current business card so we can ensure contact details
                    are kept up to date.
                </Text>

                {/* ✅ Footer pinned to bottom */}
                <View style={styles.pdfFooter}>
                    <Text>KeyInvest Funeral Bond Product Disclosure Statement (PDS)</Text>
                    <Text>Version: July 2026</Text>
                    <Text>36</Text>
                </View>
            </View>
        </Page>
    );
}
