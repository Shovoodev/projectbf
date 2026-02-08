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
const RadioOption = ({ label, checked }) => (
    <View style={{ flexDirection: 'row', marginRight: 10 }}>
        <Text>{checked ? '[X]' : '[ ]'}</Text>
        <Text style={{ marginLeft: 4 }}>{label}</Text>
    </View>
);

// Main PDF Component
const RendererPDF = ({ investorData = {} }) => {
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
                                    <Text>{data.investorOne.surname || '---------------------'}</Text>
                                </View>
                            </View>

                            <View style={styles.colHalf}>
                                <Text style={styles.label}>Given Names:</Text>
                                <View style={styles.input}>
                                    <Text>{data.investorOne.givenNames || '---------------------'}</Text>
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
                                    <Text>{data.investorOne.suburb || '---------------------'}</Text>
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
                                    <Text>{data.investorOne.mailsuburb || '---------------------'}</Text>
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
                                    <Text>{data.investorOne.daytimeTelephone || '---------------------'}</Text>
                                </View>
                            </View>

                            <View style={styles.colHalf}>
                                <Text style={styles.label}>Mobile:</Text>
                                <View style={styles.input}>
                                    <Text>{data.investorOne.mobile || '---------------------'}</Text>
                                </View>
                            </View>

                            <View style={styles.colHalf}>
                                <Text style={styles.label}>Daytime Address:</Text>
                                <View style={styles.input}>
                                    <Text>{data.investorOne.daytimeAddress || '---------------------'}</Text>
                                </View>
                            </View>

                            <View style={styles.colHalf}>
                                <Text style={styles.label}>Email:</Text>
                                <View style={styles.input}>
                                    <Text>{data.investorOne.email || '---------------------@____.com'}</Text>
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

export default RendererPDF;