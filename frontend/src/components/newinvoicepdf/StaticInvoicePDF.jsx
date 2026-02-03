import { Document, Image, Page, Text, View } from "@react-pdf/renderer";

import { styles } from "../../assets/css/invoicePdf.js";
import logo from "../pages/packages/invoicepdf/images/BTF Logo without BG 3.png";
import bgImg from "../pages/packages/invoicepdf/images/Invoice pdf.jpg";
const StaticInvoicePDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* ✅ CONSTRAINED A4 CONTENT */}
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <Image src={logo} style={styles.logo} />

          <View style={styles.headerRight}>
            <Text>ABN: 84 678 068 687</Text>
            <Text style={styles.invoiceTitle}>TAX INVOICE</Text>
            <Text style={{ fontWeight: "bold" }}>OVANTA PTY LTD</Text>
            <Text>25 Renown Avenue</Text>
            <Text>Oatley NSW 2223</Text>
          </View>
        </View>

        {/* BANKING + DETAILS */}
        <View style={styles.rowBetween}>
          <View style={styles.bankingBox}>
            <Text style={styles.bankingTitle}>BANKING DETAILS</Text>
            <Text>Commonwealth Bank</Text>
            <Text style={{ fontWeight: "bold" }}>Black Tulip Funerals</Text>
            <Text>BSB: 062-692</Text>
            <Text>ACC: 7617 6113</Text>
          </View>

          <View style={styles.detailsBox}>
            <View style={styles.detailRow}>
              <View style={styles.detailLeft}>
                <Text style={{ fontWeight: "bold" }}>CUSTOMER DETAILS</Text>
                <Text>Sarah Jenkins</Text>
                <Text>Next of Kin</Text>
              </View>
              <View style={styles.detailRight}>
                <Text style={{ fontWeight: "bold" }}>INVOICE NO</Text>
                <Text style={styles.red}>BTF9BB3252</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailLeft}>
                <Text style={{ fontWeight: "bold" }}>REFERENCE</Text>
                <Text>Robert Jenkins</Text>
              </View>
              <View style={styles.detailRight}>
                <Text style={{ fontWeight: "bold" }}>DUE DATE</Text>
                <Text>17/01/2026</Text>
              </View>
            </View>
          </View>
        </View>

        {/* TABLE */}
        <View style={styles.bgWrapper}>
          <Image src={bgImg} style={styles.bgImage} />

          <View style={styles.tableHeader}>
            <Text>Description</Text>
            <Text>Amount AUD</Text>
          </View>

          <View style={styles.tableRow}>
            <Text>No Service Cremation</Text>
            <Text>$2200.00</Text>
          </View>

          <View style={styles.tableRow}>
            <Text>Scattering Urn</Text>
            <Text>$0.00</Text>
          </View>

          <View style={styles.tableRow}>
            <Text>Australia Post Registered Mail</Text>
            <Text>$0.00</Text>
          </View>

          <View style={styles.spacer} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Amount Due AUD</Text>
            <Text style={styles.totalAmount}>$2200.00</Text>
          </View>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text>
            Please use invoice number <Text style={styles.red}>BTF9BB3252</Text>{" "}
            as your payment reference.
          </Text>
          <Text>
            Once paid, email remittance to accounts@blacktulipfunerals.com.au
          </Text>
          <Text>Many thanks, Scott and the Black Tulip team.</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default StaticInvoicePDF;
