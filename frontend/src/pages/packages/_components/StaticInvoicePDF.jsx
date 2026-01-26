import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { LogoPdf, btficon } from "../../../images";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    paddingVertical: 40,
  },
  container: {
    width: 515,
    marginHorizontal: "auto",
    fontSize: 11,
    color: "#222",
  },
  watermark: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: -1, // Send to back
  },
  watermarkImage: {
    width: 400,
    height: 400,
    opacity: 0.08,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  logo: { width: 160 },
  headerRight: {
    width: 240,
    textAlign: "right",
  },
  invoiceTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 6,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "2px solid #000",
    paddingBottom: 6,
    marginBottom: 10,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    borderTop: "2px solid #000",
    paddingTop: 10,
    marginTop: 10,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    marginTop: 30,
    fontSize: 9,
    lineHeight: 1.6,
    color: "#555",
  },
  // from Athik Hassan
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailsBox: {
    width: 260,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  detailLeft: {
    width: 150,
    paddingRight: 10,
    borderRight: "1px solid #eee",
    textAlign: "right",
  },
  detailRight: {
    width: 150,
    paddingLeft: 10,
    textAlign: "right",
  },
  red: {
    color: "#D9534F",
    fontWeight: "bold",
  },
  bankingBox: {
    border: "1px solid #D18B47",
    padding: 10,
    width: 220,
  },

  bankingTitle: {
    fontWeight: "bold",
    marginBottom: 6,
  },

  rightBox: {
    width: 260,
  },

  rightRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  rightCol: {
    width: 120,
    textAlign: "right",
  },

  label: {
    fontWeight: "bold",
    marginBottom: 2,
  },

  tableDivider: {
    borderBottom: "1px solid #000",
    marginVertical: 8,
  },

  amountRight: {
    textAlign: "right",
  },

  footerText: {
    fontSize: 9,
    lineHeight: 1.5,
  },

});

const StaticInvoicePDF = ({ invoiceDetails }) => {
  if (!invoiceDetails) return null;

  const rows = [
    { label: invoiceDetails.service, value: invoiceDetails.baseTotal },
    { label: invoiceDetails.urn, value: 0 },
    { label: invoiceDetails.collectionOfUrn, value: 0 },
    { label: "Additional Charges", value: invoiceDetails.totalPriceImpact },
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <View style={styles.watermark} fixed>
            <Image src={btficon} style={styles.watermarkImage} />
          </View>

          {/* HEADER */}
          <View style={styles.header}>
            <Image src={LogoPdf} style={styles.logo} />
            <View style={styles.headerRight}>
              <Text>ABN: 84 678 068 687</Text>
              <Text style={styles.invoiceTitle}>TAX INVOICE</Text>
              <Text style={{ fontWeight: "bold" }}>OVANTA PTY LTD</Text>
              <Text>25 Renown Avenue</Text>
              <Text>Oatley NSW 2223</Text>
            </View>
          </View>

          <View style={styles.rowBetween}>
            {/* BANKING DETAILS */}
            <View style={styles.bankingBox}>
              <Text style={styles.bankingTitle}>Banking Details</Text>
              <Text>Commonwealth Bank</Text>
              <Text style={{ fontWeight: "bold" }}>Black Tulip Funerals</Text>
              <Text>BSB: 062-692</Text>
              <Text>ACC: 7617 6113</Text>
            </View>

            {/* CUSTOMER / INVOICE */}
            <View style={styles.rightBox}>
              <View style={styles.rightRow}>
                <View>
                  <Text style={styles.label}>Customer Details</Text>
                  <Text>Next of Kin</Text>
                </View>
                <View style={styles.rightCol}>
                  <Text style={styles.label}>Invoice Number</Text>
                  <Text style={styles.red}>BTF9BB3252</Text>
                </View>
              </View>

              <View style={styles.rightRow}>
                <View>
                  <Text style={styles.label}>Reference</Text>
                  <Text>Deceased Name</Text>
                </View>
                <View style={styles.rightCol}>
                  <Text style={styles.label}>Due Date</Text>
                  <Text>DD/MM/YYYY</Text>
                </View>
              </View>
            </View>
          </View>

          {/* TABLE */}
          <View>
            <View style={styles.tableHeader}>
              <Text>Description</Text>
              <Text>Amount AUD</Text>
            </View>

            {rows.map((row, idx) => (
              <View style={styles.tableRow} key={idx}>
                <Text>{row.label}</Text>
                <Text style={styles.amountRight}>
                  ${row.value.toFixed(2)}
                </Text>
              </View>
            ))}

            <View style={styles.tableDivider} />

            <View style={styles.totalRow}>
              <Text>Amount Due AUD</Text>
              <Text style={styles.totalAmount}>
                ${invoiceDetails.totalPrice.toFixed(2)}
              </Text>
            </View>
          </View>


          {/* FOOTER */}
          <View style={styles.footer}>
            <Text>
              Please use invoice reference{" "}
              <Text style={{ color: "red" }}>{invoiceDetails.reference}</Text>{" "}
              when making payment. We kindly ask that payment is made
              immediately to secure the funeral service date and time. Delays in
              full payment may cause rescheduling of services. Please contact us
              if you have any questions. Once paid, it would be appreciated if
              you could email your remittance to
              accounts@blacktulipfunerals.com.au Many thanks for your custom and
              understanding, Scott and the Black Tulip team. Banking Details
              Commonwealth Bank Black Tulip Funerals BSB : 062-692 ACC: 7617
              6113 Description Amount AUD No Service Cremation Scattering Urn
              Australia Post Registered Mail $2200.00 $0.00 $0.00 Amount Due AUD
              $2200.00
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default StaticInvoicePDF;