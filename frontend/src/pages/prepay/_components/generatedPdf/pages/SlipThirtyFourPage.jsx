import React from "react";
import { Page, View, Text } from "@react-pdf/renderer";
import styles from "../Styles";

// simple checkbox/radio look
const RadioOption = ({ label, checked }) => (
    <View style={styles.pdfRadioItem}>
        <Text style={styles.pdfRadioBox}>{checked ? "☑" : "☐"}</Text>
        <Text style={styles.pdfRadioText}>{label}</Text>
    </View>
);

const Field = ({ label, value, w, mr }) => (
    <View style={{ width: w || "100%", marginRight: mr || 0, marginBottom: 6 }}>
        <Text style={styles.pdfLabel}>{label}</Text>
        <Text style={styles.pdfIntroP}>{value ? String(value) : "-"}</Text>
    </View>
);

export default function SlipThirtyFourPage({ data }) {
    const investorTwo = data?.investorTwo || {};

    const appType = investorTwo?.applicationType || "";

    return (
        <Page size="A4" style={styles.page} wrap={false}>
            <View style={styles.formContainerBase}>
                {/* Subtitle */}
                <View style={{ marginBottom: 8 }}>
                    <Text style={styles.pdfIntroP}>
                        Investor 2 (Only complete this section if this is to be a jointly
                        owned Policy, if being completed by a POA or if the policy is for a
                        Separate Life Insured)
                    </Text>
                </View>

                {/* Application Type */}
                <View style={{ marginBottom: 8 }}>
                    <View style={styles.pdfRadioGroup}>
                        <RadioOption label="Joint application" checked={appType === "Joint application"} />
                        <RadioOption
                            label="Separate Life Insured"
                            checked={appType === "Separate Life Insured"}
                        />
                        <RadioOption
                            label="Power of Attorney"
                            checked={appType === "Power of Attorney"}
                        />
                    </View>

                    <Text style={[styles.pdfIntroP, { fontSize: 9, marginBottom: 0, color: "#6B7280" }]}>
                        Before making a joint application please read page 7 of the PDS. To
                        make 2 single applications please complete a separate Application Form
                        for each Investor.
                    </Text>
                </View>

                {/* Personal Info */}
                <View style={{ marginBottom: 8 }}>
                    <Text style={styles.pdfSectionTitle}>Investor 2 Details</Text>

                    <View style={styles.flexRow}>
                        <Field label="Title" value={investorTwo.title} w="25%" mr={8} />
                        <Field label="Surname" value={investorTwo.surname} w="35%" mr={8} />
                        <Field label="Given Names" value={investorTwo.givenNames} w="40%" />
                    </View>

                    <View style={styles.flexRow}>
                        <Field label="Date of Birth" value={investorTwo.dob} w="48%" mr={8} />
                        <View style={{ width: "48%", marginBottom: 6 }}>
                            <Text style={styles.pdfLabel}>Gender</Text>
                            <View style={styles.pdfRadioGroup}>
                                <RadioOption label="Female" checked={investorTwo.gender === "Female"} />
                                <RadioOption label="Male" checked={investorTwo.gender === "Male"} />
                                <RadioOption label="Other" checked={investorTwo.gender === "Other"} />
                            </View>
                        </View>
                    </View>
                </View>

                {/* Residential Address */}
                <View style={{ marginBottom: 8 }}>
                    <Text style={styles.pdfSectionTitle}>Residential Address</Text>
                    <Text style={[styles.pdfIntroP, { fontSize: 9, marginBottom: 6, color: "#6B7280" }]}>
                        (must not be a PO box, RMB or Locked Bag)
                    </Text>

                    <View style={styles.flexRow}>
                        <Field label="Unit" value={investorTwo.unit} w="20%" mr={8} />
                        <Field label="Street No" value={investorTwo.streetNo} w="25%" mr={8} />
                        <Field label="Street Name" value={investorTwo.streetName} w="30%" mr={8} />
                        <Field label="Suburb" value={investorTwo.suburb} w="25%" />
                    </View>

                    <View style={styles.flexRow}>
                        <Field label="State" value={investorTwo.state || "NSW"} w="30%" mr={8} />
                        <Field label="Postcode" value={investorTwo.postcode} w="30%" mr={8} />
                        <Field label="Country" value={investorTwo.country || "AUSTRALIA"} w="40%" />
                    </View>
                </View>

                {/* Contact Details */}
                <View style={{ marginBottom: 8 }}>
                    <Text style={styles.pdfSectionTitle}>Contact Details</Text>

                    <View style={styles.flexRow}>
                        <Field
                            label="Daytime Telephone"
                            value={investorTwo.daytimeTelephone}
                            w="48%"
                            mr={8}
                        />
                        <Field label="Mobile" value={investorTwo.mobile} w="48%" />
                    </View>

                    <Field label="Email" value={investorTwo.email} />
                </View>

                {/* Footer */}
                <View style={styles.pdfFooter}>
                    <Text>KeyInvest Funeral Bond PDS</Text>
                    <Text>Version: July 2026</Text>
                    <Text>Page 34</Text>
                </View>
            </View>
        </Page>
    );
}
