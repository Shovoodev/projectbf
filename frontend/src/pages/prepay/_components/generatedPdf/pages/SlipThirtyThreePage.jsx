import React from "react";
import { Page, View, Text } from "@react-pdf/renderer";
import styles from "../Styles";

// ✅ Checkbox/Radio renderer
const PdfRadio = ({ label, checked }) => (
    <View style={styles.pdfRadioItem}>
        <Text style={styles.pdfRadioText}>
            {checked ? "☑" : "☐"} {label}
        </Text>
    </View>
);

const Field = ({ label, value, width, mr }) => (
    <View style={{ width: width || "100%", marginRight: mr || 0 }}>
        <Text style={styles.pdfLabel}>{label}</Text>
        <Text style={styles.pdfIntroP}>{value ? String(value) : "-"}</Text>
    </View>
);

const FieldSm = ({ label, value, width, mr }) => (
    <View style={{ width: width || "100%", marginRight: mr || 0 }}>
        <Text style={styles.pdfLabelSm}>{label}</Text>
        <Text style={styles.pdfIntroP}>{value ? String(value) : "-"}</Text>
    </View>
);

const SectionTitle = ({ title, note }) => (
    <View style={styles.mb2}>
        <Text style={styles.pdfSectionTitle}>
            {title} {note ? <Text style={{ fontSize: 10, fontWeight: 400 }}> {note}</Text> : null}
        </Text>
    </View>
);

const SlipThirtyThreePage = ({ data }) => {
    const investor = data?.investorOne || {};

    return (
        <Page size="A4" style={styles.page} wrap={false}>
            <View style={styles.formContainerBase}>
                {/* Header */}
                <View style={styles.mb2}>
                    <Text style={styles.pdfH2}>1. Investor details</Text>
                    <Text style={{ fontSize: 11, color: "#3129A6", marginTop: 4 }}>
                        Investor 1 (all correspondence will be sent to this person)
                    </Text>
                </View>

                {/* Personal Info */}
                <SectionTitle title="Personal information" />

                <View style={[styles.flexRow, styles.mb2]}>
                    <Field label="Surname" value={investor.surname} width="48%" mr={8} />
                    <Field label="Given Names" value={investor.givenNames} width="48%" />
                </View>

                <View style={[styles.flexRow, styles.mb2]}>
                    <Field label="Date of Birth" value={investor.dob} width="48%" mr={8} />
                    <View style={{ width: "48%" }}>
                        <Text style={styles.pdfLabel}>Gender</Text>
                        <View style={styles.pdfRadioGroup}>
                            <PdfRadio label="Female" checked={investor.gender === "Female"} />
                            <PdfRadio label="Male" checked={investor.gender === "Male"} />
                            <PdfRadio label="Other" checked={investor.gender === "Other"} />
                        </View>
                    </View>
                </View>

                {/* Title */}
                <View style={styles.mb2}>
                    <Text style={styles.pdfLabel}>Title</Text>
                    <View style={styles.pdfRadioGroup}>
                        {["Mr", "Mrs", "Ms", "Miss", "Dr", "Other"].map((t) => (
                            <PdfRadio key={t} label={t} checked={investor.title === t} />
                        ))}
                    </View>
                </View>

                {/* Residential Address */}
                <SectionTitle
                    title="Residential Address"
                    note="(must not be a PO box, RMB or Locked Bag)"
                />

                <View style={[styles.flexRow, styles.mb2]}>
                    <FieldSm label="Unit Number" value={investor.unit} width="20%" mr={8} />
                    <FieldSm label="Street No" value={investor.streetNo} width="25%" mr={8} />
                    <FieldSm label="Street Name" value={investor.streetName} width="30%" mr={8} />
                    <FieldSm label="Suburb" value={investor.suburb} width="25%" />
                </View>

                <View style={[styles.flexRow, styles.mb2]}>
                    <FieldSm label="State" value={investor.state || "NSW"} width="30%" mr={8} />
                    <FieldSm label="Postcode" value={investor.postcode} width="30%" mr={8} />
                    <FieldSm label="Country" value={investor.country || "AUSTRALIA"} width="40%" />
                </View>

                {/* Mailing Address */}
                <SectionTitle title="Mailing Address" note="(if different to above address)" />

                <View style={[styles.flexRow, styles.mb2]}>
                    <FieldSm label="Unit Number" value={investor.mailunit} width="20%" mr={8} />
                    <FieldSm label="Street No" value={investor.mailstreetNo} width="25%" mr={8} />
                    <FieldSm label="Street Name" value={investor.mailstreetName} width="30%" mr={8} />
                    <FieldSm label="Suburb" value={investor.mailsuburb} width="25%" />
                </View>

                <View style={[styles.flexRow, styles.mb2]}>
                    <FieldSm label="State" value={investor.mailstate || "NSW"} width="30%" mr={8} />
                    <FieldSm label="Postcode" value={investor.mailpostcode} width="30%" mr={8} />
                    <FieldSm label="Country" value={investor.mailcountry || "AUSTRALIA"} width="40%" />
                </View>

                {/* Contact Details */}
                <SectionTitle title="Contact Details" />

                <View style={[styles.flexRow, styles.mb2]}>
                    <Field label="Daytime Telephone" value={investor.daytimeTelephone} width="48%" mr={8} />
                    <Field label="Mobile" value={investor.mobile} width="48%" />
                </View>

                <View style={[styles.flexRow, styles.mb2]}>
                    <Field label="Daytime Address" value={investor.daytimeAddress} width="48%" mr={8} />
                    <Field label="Email" value={investor.email} width="48%" />
                </View>

                <Text style={{ fontSize: 6, color: "#3129A6", marginTop: 2 }}>
                    If the application is being completed under a Power of Attorney (POA),
                    please include the attorney&apos;s contact details under
                </Text>

                {/* Footer (fixed bottom) */}
                <View
                    style={[
                        styles.pdfFooter,
                        {
                            position: "absolute",
                            left: 32,
                            right: 32,
                            bottom: 24,
                        },
                    ]}
                    fixed
                >
                    <Text>KeyInvest Funeral Bond PDS</Text>
                    <Text>Version: July 2026</Text>
                    <Text>Page 33</Text>
                </View>
            </View>
        </Page>
    );
};

export default SlipThirtyThreePage;
