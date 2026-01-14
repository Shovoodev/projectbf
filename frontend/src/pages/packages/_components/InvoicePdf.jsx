import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  companyInfo: {
    fontSize: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  section: {
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    marginVertical: 5,
  },
  label: {
    width: 150,
    fontSize: 10,
    fontWeight: "bold",
  },
  value: {
    flex: 1,
    fontSize: 10,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    fontSize: 10,
    textAlign: "center",
  },
  note: {
    fontSize: 10,
    marginTop: 20,
    lineHeight: 1.5,
  },
});

const InvoicePDF = ({ invoiceData }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* ABN */}
        <Text style={{ fontSize: 10, marginBottom: 10 }}>
          ABN: 84 678 068 687
        </Text>

        {/* Title */}
        <Text style={styles.title}>TAX INVOICE</Text>

        {/* Company Info */}
        <View style={styles.companyInfo}>
          <Text>OVANTA PTY LTD</Text>
          <Text>25 Renown Avenue</Text>
          <Text>Oatley NSW 2223</Text>
        </View>

        {/* Banking Details */}
        <View style={styles.section}>
          <Text style={{ fontSize: 12, fontWeight: "bold", marginBottom: 5 }}>
            Banking Details
          </Text>
          <Text style={{ fontSize: 10 }}>Commonwealth Bank</Text>
          <Text style={{ fontSize: 10 }}>Black Tulip Funerals</Text>
          <Text style={{ fontSize: 10 }}>BSB: 062-692</Text>
          <Text style={{ fontSize: 10 }}>ACC: 7617 6113</Text>
        </View>

        {/* Customer Details */}
        <View style={styles.section}>
          <Text style={{ fontSize: 12, fontWeight: "bold", marginBottom: 5 }}>
            Customer Details
          </Text>
          <View style={styles.row}>
            <Text style={styles.label}>Next of Kin:</Text>
            <Text style={styles.value}>{invoiceData.nextOfKin}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Reference:</Text>
            <Text style={styles.value}>{invoiceData.reference}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Deceased Name:</Text>
            <Text style={styles.value}>{invoiceData.deceasedName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Invoice Number:</Text>
            <Text style={styles.value}>{invoiceData.invoiceNumber}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Due Date:</Text>
            <Text style={styles.value}>{invoiceData.dueDate}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{invoiceData.email}</Text>
          </View>
        </View>

        {/* Image placeholder - You can add actual image if needed */}
        <View style={{ marginVertical: 20 }}>
          <Text style={{ fontSize: 10, color: "#666" }}>
            [Image placeholder - Funeral service details would appear here]
          </Text>
        </View>

        {/* Payment Note */}
        <View style={styles.note}>
          <Text>
            Please use our invoice number {invoiceData.invoiceNumber} as your
            payment reference. We kindly ask that payment is made immediately to
            secure the funeral service date and time. Delays in full payment may
            cause rescheduling of services. Please contact us if you have any
            questions. Once paid, it would be appreciated if you could email
            your remittance to accounts@blacktulipfunerals.com.au
          </Text>
          <Text style={{ marginTop: 10 }}>
            Many thanks for your custom and understanding, Scott and the Black
            Tulip team.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePDF;
