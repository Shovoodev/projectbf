import React from 'react';
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Font,
    Link
} from '@react-pdf/renderer';
import styles from './Styles';

// Helper component for radio options
const RadioOption = ({ label, value, name, checked = false, style = {} }) => (
    <View style={[styles.radioItem, style]}>
        <View style={styles.radioInput} />
        <Text style={styles.radioText}>{label}</Text>
    </View>
);

// Main PDF Component
const RemdererPDF = ({ investorData = {} }) => {
    // Default data structure
    const data = {
        investorOne: {
            title: investorData?.investorOne?.title || '',
            surname: investorData?.investorOne?.surname || '',
            givenNames: investorData?.investorOne?.givenNames || '',
            dob: investorData?.investorOne?.dob || '',
            gender: investorData?.investorOne?.gender || '',

            // Residential Address
            unit: investorData?.investorOne?.unit || '',
            streetNo: investorData?.investorOne?.streetNo || '',
            streetName: investorData?.investorOne?.streetName || '',
            suburb: investorData?.investorOne?.suburb || '',
            state: investorData?.investorOne?.state || 'NSW',
            postcode: investorData?.investorOne?.postcode || '',
            country: investorData?.investorOne?.country || 'AUSTRALIA',

            // Mailing Address
            mailunit: investorData?.investorOne?.mailunit || '',
            mailstreetNo: investorData?.investorOne?.mailstreetNo || '',
            mailstreetName: investorData?.investorOne?.mailstreetName || '',
            mailsuburb: investorData?.investorOne?.mailsuburb || '',
            mailstate: investorData?.investorOne?.mailstate || 'NSW',
            mailpostcode: investorData?.investorOne?.mailpostcode || '',
            mailcountry: investorData?.investorOne?.mailcountry || 'AUSTRALIA',

            // Contact Details
            daytimeTelephone: investorData?.investorOne?.daytimeTelephone || '',
            mobile: investorData?.investorOne?.mobile || '',
            daytimeAddress: investorData?.investorOne?.daytimeAddress || '',
            email: investorData?.investorOne?.email || '',
        }
    };

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.formContainerBase}>
                    {/* Main Header */}
                    <View style={styles.mainHeader}>
                        <Text style={styles.title}>KeyInvest Funeral Bond</Text>
                        <Text style={styles.subtitle}>application form</Text>
                        <View style={styles.pdfHr} />
                    </View>

                    {/* Introduction Text */}
                    <View style={{ marginBottom: 20 }}>
                        <Text style={styles.pdfIntroP}>
                            This Application Form (including the Direct Debit Request and the
                            Adviser Electronic Transaction Authority Form) accompanies and forms
                            part of the Product Disclosure Statement (PDS) issued by KeyInvest
                            Ltd ABN 74 087 649 474 AFSL 240667 (KeyInvest) ('we', 'us', 'our' in
                            this Application Form) for the Funeral Bond dated 28 July 2025.
                        </Text>

                        <Text style={styles.pdfIntroP}>
                            The PDS (and any Supplementary PDS issued) contain important
                            information about the Funeral Bond which you should consider before
                            making an application. The PDS is available via our website at{' '}
                            <Link src="https://keyinvest.com.au/" style={styles.link}>
                                keyinvest.com.au
                            </Link>{' '}
                            or you may request a copy from your financial adviser or funeral
                            director.
                        </Text>

                        <Text style={styles.pdfIntroP}>
                            An application to invest in the KeyInvest Funeral Bond can only be
                            made using this form. Completed Application Forms can be posted to
                            KeyInvest, Reply Paid 3340, RUNDLE MALL SA 5000 (no stamp required)
                            or emailed to:{' '}
                            <Link src="mailto:info@keyinvest.com.au" style={styles.link}>
                                info@keyinvest.com.au
                            </Link>
                        </Text>

                        <Text style={[styles.pdfLabel, { color: '#1e40af', marginTop: 16 }]}>
                            PLEASE USE CAPITAL LETTERS TO COMPLETE THE APPLICATION FORM
                        </Text>
                    </View>

                    {/* Highlight Box */}
                    <View style={styles.pdfHighlightBox}>
                        <Text style={styles.paragraph}>
                            For an individual applicant you only need to complete{' '}
                            <Text style={styles.highlightText}>Investor 1</Text>. Joint
                            applicants will complete{' '}
                            <Text style={styles.highlightText}>Investor 1 & 2</Text>. If
                            investing for a separate life insured the Investor is{' '}
                            <Text style={styles.highlightText}>Investor 1</Text> and the life insured{' '}
                            <Text style={styles.highlightText}>Investor 2</Text>.
                        </Text>
                    </View>

                    {/* Questionnaire Section */}
                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.pdfH2}>Target market questionnaire</Text>

                        <View style={{ marginTop: 16 }}>
                            {/* Q1 */}
                            <View style={{ marginBottom: 20 }}>
                                <Text style={styles.pdfLabel}>1. Funeral Bond Type:</Text>
                                <View style={[styles.pdfRadioGroup, { marginTop: 8 }]}>
                                    {["Nominated", "Unassigned", "Prepaid/Assigned"].map((opt) => (
                                        <View key={opt} style={styles.pdfRadioItem}>
                                            <View style={styles.pdfRadioInput} />
                                            <Text style={styles.pdfRadioText}>{opt}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>

                            {/* Q2 - Q5 */}
                            {[
                                { id: "age10", q: "2. Is the applicant aged 10+?" },
                                {
                                    id: "existingBonds",
                                    q: "3. Does the Applicant currently have 1 or more funeral bonds?",
                                },
                                {
                                    id: "overCost",
                                    q: "4. Does the Applicant intend to contribute more than the actual or reasonable cost of a funeral?",
                                },
                                {
                                    id: "accessCapital",
                                    q: "5. Does the Applicant require access to the capital after the 30 day cooling off period?",
                                },
                            ].map((item, index) => (
                                <View key={item.id} style={{ marginBottom: 20 }}>
                                    <Text style={styles.pdfLabel}>{item.q}</Text>
                                    <View style={[styles.pdfRadioGroup, { marginTop: 8 }]}>
                                        <View style={styles.pdfRadioItem}>
                                            <View style={styles.pdfRadioInput} />
                                            <Text style={styles.pdfRadioText}>Yes</Text>
                                        </View>
                                        <View style={styles.pdfRadioItem}>
                                            <View style={styles.pdfRadioInput} />
                                            <Text style={styles.pdfRadioText}>No</Text>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Final Notes */}
                    <View style={styles.noteBox}>
                        <Text style={{ marginBottom: 8 }}>
                            <Text style={{ fontWeight: 'bold' }}>Note:</Text> Investors must be at least 10 years old and
                            those under 16 require written consent from a parent or guardian.
                            Pre-Paid (Assigned) Funeral Bonds are exempt from Centrelink and/or
                            DVA asset and income tests if certain conditions apply. Funeral Bonds
                            (nominated or unassigned) are exempt if specific criteria are met.
                            Holding multiple Funeral Bonds may result in assets being assessable.
                            Funeral bonds can only be used to contribute to the cost of a funeral.
                            After the 30 day cooling off period there is no access to funeral bond
                            capital prior to payment of funeral expenses.
                        </Text>
                    </View>

                    {/* Footer */}
                    <View style={styles.pdfFooter}>
                        <Text style={styles.footerText}>
                            <Text style={{ color: '#1e40af', fontWeight: 'bold' }}>KeyInvest</Text> Funeral Bond PDS
                        </Text>
                        <Text style={styles.footerText}>Version: July 2026</Text>
                        <Text style={styles.pageNumber}>Page 32</Text>
                    </View>
                </View>
            </Page>
            <Page size="A4" style={styles.page}>
                <View style={styles.container}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.h2}>1. Investor details</Text>
                        <Text style={styles.subtitle}>
                            Investor 1 (all correspondence will be sent to this person)
                        </Text>
                    </View>

                    {/* Personal Info Section */}
                    <View style={styles.section}>
                        {/* Title Radio Buttons */}
                        <View style={styles.colFull}>
                            <Text style={styles.label}>Title:</Text>
                            <View style={styles.radioGroup}>
                                {["Mr", "Mrs", "Ms", "Miss", "Dr", "Other"].map((title) => (
                                    <RadioOption
                                        key={title}
                                        label={title}
                                        checked={data.investorOne.title === title}
                                        style={{ marginRight: 15 }}
                                    />
                                ))}
                            </View>
                        </View>

                        <View style={styles.formGrid}>
                            <View style={styles.colHalf}>
                                <Text style={styles.label}>Surname:</Text>
                                <View style={styles.input}>
                                    <Text>{data.investorOne.surname || '________________'}</Text>
                                </View>
                            </View>

                            <View style={styles.colHalf}>
                                <Text style={styles.label}>Given Names:</Text>
                                <View style={styles.input}>
                                    <Text>{data.investorOne.givenNames || '________________'}</Text>
                                </View>
                            </View>

                            <View style={styles.colHalf}>
                                <Text style={styles.label}>Date of Birth:</Text>
                                <View style={styles.input}>
                                    <Text>{data.investorOne.dob || 'DD/MM/YYYY'}</Text>
                                </View>
                            </View>

                            <View style={styles.colHalf}>
                                <Text style={styles.label}>Gender:</Text>
                                <View style={[styles.radioGroup, { marginTop: 8 }]}>
                                    {["Female", "Male", "Other"].map((gender) => (
                                        <RadioOption
                                            key={gender}
                                            label={gender}
                                            checked={data.investorOne.gender === gender}
                                            style={{ marginRight: 15 }}
                                        />
                                    ))}
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.spacer} />

                    {/* Residential Address */}
                    <View style={styles.section}>
                        <View style={styles.sectionTitle}>
                            <Text>
                                Residential Address{' '}
                                <Text style={styles.note}>
                                    (must not be a PO box, RMB or Locked Bag)
                                </Text>
                            </Text>
                        </View>

                        <View style={styles.addressGrid}>
                            <View style={[styles.addressField, { width: '32%' }]}>
                                <Text style={styles.labelSm}>Unit Number</Text>
                                <View style={styles.input}>
                                    <Text>{data.investorOne.unit || '________'}</Text>
                                </View>
                            </View>

                            <View style={[styles.addressField, { width: '65%' }]}>
                                <Text style={styles.labelSm}>Street No</Text>
                                <View style={styles.input}>
                                    <Text>{data.investorOne.streetNo || '________'}</Text>
                                </View>
                            </View>

                            <View style={[styles.addressField, { width: '48%' }]}>
                                <Text style={styles.labelSm}>Street Name</Text>
                                <View style={styles.input}>
                                    <Text>{data.investorOne.streetName || '_____________________'}</Text>
                                </View>
                            </View>

                            <View style={[styles.addressField, { width: '48%' }]}>
                                <Text style={styles.labelSm}>Suburb</Text>
                                <View style={styles.input}>
                                    <Text>{data.investorOne.suburb || '________________'}</Text>
                                </View>
                            </View>

                            <View style={[styles.addressField, { width: '32%' }]}>
                                <Text style={styles.labelSm}>State</Text>
                                <View style={[styles.input, styles.inputReadonly]}>
                                    <Text>{data.investorOne.state}</Text>
                                </View>
                            </View>

                            <View style={[styles.addressField, { width: '32%' }]}>
                                <Text style={styles.labelSm}>Postcode</Text>
                                <View style={styles.input}>
                                    <Text>{data.investorOne.postcode || '____'}</Text>
                                </View>
                            </View>

                            <View style={[styles.addressField, { width: '32%' }]}>
                                <Text style={styles.labelSm}>Country</Text>
                                <View style={[styles.input, styles.inputReadonly]}>
                                    <Text>{data.investorOne.country}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.spacer} />

                    {/* Mailing Address */}
                    <View style={styles.section}>
                        <View style={styles.sectionTitle}>
                            <Text>
                                Mailing Address (
                                <Text style={styles.note}>(if different to above address)</Text>
                                )
                            </Text>
                        </View>

                        <View style={styles.addressGrid}>
                            <View style={[styles.addressField, { width: '32%' }]}>
                                <Text style={styles.labelSm}>Unit Number</Text>
                                <View style={styles.input}>
                                    <Text>{data.investorOne.mailunit || '________'}</Text>
                                </View>
                            </View>

                            <View style={[styles.addressField, { width: '65%' }]}>
                                <Text style={styles.labelSm}>Street No</Text>
                                <View style={styles.input}>
                                    <Text>{data.investorOne.mailstreetNo || '________'}</Text>
                                </View>
                            </View>

                            <View style={[styles.addressField, { width: '48%' }]}>
                                <Text style={styles.labelSm}>Street Name</Text>
                                <View style={styles.input}>
                                    <Text>{data.investorOne.mailstreetName || '_____________________'}</Text>
                                </View>
                            </View>

                            <View style={[styles.addressField, { width: '48%' }]}>
                                <Text style={styles.labelSm}>Suburb</Text>
                                <View style={styles.input}>
                                    <Text>{data.investorOne.mailsuburb || '________________'}</Text>
                                </View>
                            </View>

                            <View style={[styles.addressField, { width: '32%' }]}>
                                <Text style={styles.labelSm}>State</Text>
                                <View style={[styles.input, styles.inputReadonly]}>
                                    <Text>{data.investorOne.mailstate}</Text>
                                </View>
                            </View>

                            <View style={[styles.addressField, { width: '32%' }]}>
                                <Text style={styles.labelSm}>Postcode</Text>
                                <View style={styles.input}>
                                    <Text>{data.investorOne.mailpostcode || '____'}</Text>
                                </View>
                            </View>

                            <View style={[styles.addressField, { width: '32%' }]}>
                                <Text style={styles.labelSm}>Country</Text>
                                <View style={[styles.input, styles.inputReadonly]}>
                                    <Text>{data.investorOne.mailcountry}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.spacer} />

                    {/* Contact Details */}
                    <View style={styles.section}>
                        <View style={styles.sectionTitle}>
                            <Text>Contact Details</Text>
                        </View>

                        <View style={styles.formGrid}>
                            <View style={styles.colHalf}>
                                <Text style={styles.label}>Daytime Telephone:</Text>
                                <View style={styles.input}>
                                    <Text>{data.investorOne.daytimeTelephone || '________________'}</Text>
                                </View>
                            </View>

                            <View style={styles.colHalf}>
                                <Text style={styles.label}>Mobile:</Text>
                                <View style={styles.input}>
                                    <Text>{data.investorOne.mobile || '________________'}</Text>
                                </View>
                            </View>

                            <View style={styles.colHalf}>
                                <Text style={styles.label}>Daytime Address:</Text>
                                <View style={styles.input}>
                                    <Text>{data.investorOne.daytimeAddress || '________________'}</Text>
                                </View>
                            </View>

                            <View style={styles.colHalf}>
                                <Text style={styles.label}>Email:</Text>
                                <View style={styles.input}>
                                    <Text>{data.investorOne.email || '________________@____.com'}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.spacer} />

                    {/* Additional Information */}
                    <View style={styles.introText}>
                        <Text>
                            If the application is being completed under a Power of Attorney
                            (POA), please include the attorney's contact details under
                        </Text>
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        <Text style={styles.footerBrand}>KeyInvest</Text> Funeral Bond PDS
                    </Text>
                    <Text style={styles.footerText}>Version: July 2026</Text>
                    <Text style={styles.pageNumber}>Page 33</Text>
                </View>
            </Page>
        </Document>
    );
};

export default RemdererPDF;