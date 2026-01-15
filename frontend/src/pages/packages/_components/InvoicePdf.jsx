import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// --- STYLES ---
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#000",
    position: "relative",
  },
  // Background Watermark
  watermarkContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1,
  },
  watermarkImage: {
    width: 300,
    opacity: 0.05, // Very faint
  },
  // Header Section
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  logoContainer: {
    width: "40%",
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 10,
    // Replace with actual logo URL or import
    backgroundColor: "#ccc",
  },
  companyName: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  companyPhone: {
    marginTop: 4,
    fontSize: 10,
  },
  invoiceHeaderRight: {
    textAlign: "right",
    width: "40%",
  },
  abnText: {
    fontSize: 8,
    marginBottom: 5,
  },
  invoiceTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 5,
  },
  companyAddress: {
    fontSize: 9,
    lineHeight: 1.4,
  },
  // Middle Section (Banking & Customer)
  middleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
    alignItems: "flex-start",
  },
  bankingBox: {
    border: "1pt solid #D4AF37", // Gold-ish border
    padding: 10,
    width: "40%",
  },
  bankingTitle: {
    fontSize: 9,
    marginBottom: 4,
    color: "#555",
  },
  bankingValue: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 2,
  },
  customerDetails: {
    width: "50%",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 6,
  },
  detailLabel: {
    fontWeight: "bold",
    marginRight: 10,
    textAlign: "right",
  },
  detailValue: {
    width: 100, // Fixed width for alignment
    textAlign: "right",
    color: "#D9534F", // Reddish color for Invoice No.
  },
  detailValueNormal: {
    width: 100,
    textAlign: "right",
  },
  // Table Section
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 5,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  colDesc: {
    width: "70%",
    fontWeight: "bold", // Headers bold
  },
  colAmount: {
    width: "30%",
    textAlign: "right",
    fontWeight: "bold",
  },
  rowDesc: {
    width: "70%",
    fontWeight: "bold", // Item names bold in image
  },
  rowAmount: {
    width: "30%",
    textAlign: "right",
  },
  totalRow: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#000",
    paddingTop: 5,
    marginTop: 200, // Pushes total to bottom of page section
  },
  // Footer
  footer: {
    marginTop: "auto", // Pushes to bottom
    textAlign: "center",
    fontSize: 9,
    lineHeight: 1.5,
    color: "#444",
  },
  highlightText: {
    color: "#D9534F",
  },
});

const InvoicePDFComponent = ({ invoiceData }) => {
  // Use placeholder logo if none provided
  const logoUrl = "https://via.placeholder.com/150";
  const bgUrl = "https://via.placeholder.com/500"; // Demo background

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* BACKGROUND IMAGE (Watermark) */}
        <View style={styles.watermarkContainer}>
          <Image src={bgUrl} style={styles.watermarkImage} />
        </View>

        {/* --- HEADER --- */}
        <View style={styles.headerRow}>
          {/* Left: Logo & Name */}
          <View style={styles.logoContainer}>
            {/* Replace with actual logo image */}
            <Image src={logoUrl} style={styles.logo} />
            <Text style={styles.companyName}>Black Tulip Funerals</Text>
            <Text style={styles.companyPhone}>Ph: 1300 11 0031</Text>
          </View>

          {/* Right: Tax Invoice Details */}
          <View style={styles.invoiceHeaderRight}>
            <Text style={styles.abnText}>ABN: 84 678 068 687</Text>
            <Text style={styles.invoiceTitle}>TAX INVOICE</Text>
            <Text style={styles.companyAddress}>OVANTA PTY LTD</Text>
            <Text style={styles.companyAddress}>25 Renown Avenue</Text>
            <Text style={styles.companyAddress}>Oatley NSW 2223</Text>
          </View>
        </View>

        {/* --- MIDDLE SECTION --- */}
        <View style={styles.middleSection}>
          {/* Banking Details Box */}
          <View style={styles.bankingBox}>
            <Text style={styles.bankingTitle}>Banking Details</Text>
            <Text style={styles.bankingValue}>Commonwealth Bank</Text>
            <Text style={styles.bankingValue}>Black Tulip Funerals</Text>
            <Text style={styles.bankingValue}>BSB: 062-692</Text>
            <Text style={styles.bankingValue}>ACC: 7617 6113</Text>
          </View>

          {/* Customer & Invoice Meta Data */}
          <View style={styles.customerDetails}>
            {/* Row 1: Customer & Invoice # */}
            <View style={styles.detailRow}>
              <View>
                <Text style={styles.detailLabel}>Customer Details</Text>
                <Text style={{ textAlign: "right", fontSize: 9 }}>
                  Next of Kin
                </Text>
              </View>
              <View style={{ marginLeft: 20 }}>
                <Text style={styles.detailLabel}>Invoice Number</Text>
                <Text style={styles.detailValue}>
                  {invoiceData?.invoiceNumber || "BTF9BB3252"}
                </Text>
              </View>
            </View>

            {/* Spacer */}
            <View style={{ height: 10 }} />

            {/* Row 2: Reference & Due Date */}
            <View style={styles.detailRow}>
              <View>
                <Text style={styles.detailLabel}>Reference</Text>
                <Text style={{ textAlign: "right", fontSize: 9 }}>
                  Deceased Name
                </Text>
              </View>
              <View style={{ marginLeft: 20 }}>
                <Text style={styles.detailLabel}>Due Date</Text>
                <Text style={styles.detailValueNormal}>
                  {invoiceData?.dueDate || "DD/MM/YYYY"}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* --- TABLE HEADER --- */}
        <View style={styles.tableHeader}>
          <Text style={styles.colDesc}>Description</Text>
          <Text style={styles.colAmount}>Amount AUD</Text>
        </View>

        {/* --- TABLE ROWS --- */}
        {/* Example Static Rows based on image, replace with dynamic map if needed */}
        <View style={styles.tableRow}>
          <Text style={styles.rowDesc}>No Service Cremation</Text>
          <Text style={styles.rowAmount}>$2200.00</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.rowDesc}>Scattering Urn</Text>
          <Text style={styles.rowAmount}>$0.00</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.rowDesc}>Australia Post Registered Mail</Text>
          <Text style={styles.rowAmount}>$0.00</Text>
        </View>

        {/* --- TOTAL ROW --- */}
        <View style={styles.totalRow}>
          <Text
            style={{ ...styles.colDesc, textAlign: "right", paddingRight: 20 }}
          >
            Amount Due AUD
          </Text>
          <Text style={styles.colAmount}>$2200.00</Text>
        </View>

        {/* --- FOOTER --- */}
        <View style={styles.footer}>
          <Text>
            Please use our invoice number{" "}
            <Text style={styles.highlightText}>
              {invoiceData?.invoiceNumber || "BTF9BB3252"}
            </Text>{" "}
            as your payment reference.
          </Text>
          <Text>
            We kindly ask that payment is made immediately to secure the funeral
            service date and time.
          </Text>
          <Text>
            Delays in full payment may cause rescheduling of services. Please
            contact us if you have any questions.
          </Text>
          <Text>
            Once paid, it would be appreciated if you could email your
            remittance to accounts@blacktulipfunerals.com.au
          </Text>
          <Text style={{ marginTop: 5, fontWeight: "bold" }}>
            Many thanks for your custom and understanding, Scott and the Black
            Tulip team.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePDFComponent;
