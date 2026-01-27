import {
  Document,
  Image,
  Link,
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
    textAlign: "center",
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
  //
  rowTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  bankingBox: {
    width: 170,
    border: "1px solid #E0B07A",
    padding: 10,
    fontSize: 10,
    lineHeight: 1.4,
  },

  bankingTitle: {
    fontWeight: "bold",
    marginBottom: 6,
  },

  middleBox: {
    width: 160,
    textAlign: "center",
    fontSize: 10,
    lineHeight: 1.4,
  },

  rightBox: {
    width: 160,
    textAlign: "right",
    fontSize: 10,
    lineHeight: 1.4,
  },

  label: {
    fontWeight: "bold",
    marginBottom: 4,
  },
});

const StaticInvoicePDF = ({ invoiceDetails, deceasedName, kinName }) => {
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

          <View style={styles.rowTop}>
            {/* BANKING DETAILS */}
            <View style={styles.bankingBox}>
              <Text style={styles.bankingTitle}>Banking Details</Text>
              <Text>Commonwealth Bank</Text>
              <Text style={{ fontWeight: "bold" }}>Black Tulip Funerals</Text>
              <Text>BSB : 062-692</Text>
              <Text>ACC : 7617 6113</Text>
            </View>

            {/* CUSTOMER DETAILS */}
            <View style={styles.middleBox}>
              <Text style={styles.label}>Customer Details</Text>

              <Text>{kinName}</Text>
              {/* <Text>{invoiceDetails?.nextOfKin}</Text> */}
              <Text style={[styles.label, { marginTop: 12 }]}>Reference</Text>
              <Text>{deceasedName}</Text>
            </View>

            {/* INVOICE DETAILS */}
            <View style={styles.rightBox}>
              <Text style={styles.label}>Invoice Number</Text>
              <Text style={styles.red}>{invoiceDetails?.reference}</Text>

              <Text style={[styles.label, { marginTop: 12 }]}>Due Date</Text>
              <Text>Date: {new Date().toLocaleDateString("en-GB")}</Text>
            </View>
          </View>

          {/* TABLE */}
          <View>
            <View style={styles.tableHeader}>
              <Text>Description</Text>
              <Text>Amount (AUD)</Text>
            </View>

            {rows.map((row, idx) => (
              <View style={styles.tableRow} key={idx}>
                <Text>{row.label}</Text>
                <Text>
                  {typeof row.value === "number"
                    ? `$${row.value.toFixed(2)}`
                    : row.value}
                </Text>
              </View>
            ))}

            {/* TOTAL */}
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Amount Due</Text>
              <Text style={styles.totalAmount}>
                ${Number(invoiceDetails.totalPrice).toFixed(2)}
              </Text>
            </View>
          </View>

          {/* FOOTER */}
          <View style={styles.footer}>
            <Text>
              Please use our invoice number{" "}
              <Text
                style={{
                  color: "red",
                  paddingLeft: "10px",
                  fontWeight: "bold",
                }}
              >
                {invoiceDetails?.reference}
              </Text>{" "}
              as your payment reference. We kindly ask that payment is made
              immediately to secure the funeral service date and time. Delays in
              full payment may cause rescheduling of services. Please contact us
              if you have any questions. Once paid, it would be appreciated if
              you could email your remittance to{" "}
              <Link
                src="mailto:accounts@blacktulipfunerals.com.au"
                style={{ color: "blue", textDecoration: "underline" }}
              >
                accounts@blacktulipfunerals.com.au
              </Link>{" "}
              Many thanks for your custom and understanding, Scott and the Black
              Tulip team
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default StaticInvoicePDF;