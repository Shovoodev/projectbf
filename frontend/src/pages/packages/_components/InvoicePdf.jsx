import {
  Document,
  Image,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { btficon, LogoPdf } from "../../../images";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    paddingVertical: 40,
  },

  /* 🔥 A4 CONTENT CONTAINER */
  container: {
    width: 515, // PERFECT for A4
    marginHorizontal: "auto",
    fontSize: 11,

    color: "#222",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  logo: {
    width: 160,
  },

  headerRight: {
    width: 240,
    textAlign: "right",
  },

  invoiceTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 6,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  bankingBox: {
    width: 230,
    border: "1px solid #C5A059",
    padding: 12,
  },

  bankingTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    borderBottom: "1px solid #ddd",
    paddingBottom: 4,
  },

  detailsBox: {
    width: 260,
  },

  detailRow: {
    flexDirection: "row",
    marginBottom: 16,
  },

  detailLeft: {
    width: 130,
    paddingRight: 8,
    borderRight: "1px solid #eee",
    textAlign: "right",
  },

  detailRight: {
    width: 130,
    paddingLeft: 8,
    textAlign: "right",
  },

  bgWrapper: {
    position: "relative",
    padding: 20,
  },

  bgImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 250,
    opacity: 0.12,
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

  spacer: {
    height: 140,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    borderTop: "2px solid #000",
    paddingTop: 10,
  },

  totalLabel: {
    marginRight: 30,
    color: "#666",
  },

  totalAmount: {
    fontSize: 22,
    fontWeight: "bold",
  },

  footer: {
    marginTop: 30,
    textAlign: "center",
    fontSize: 9,
    lineHeight: 1.6,
    color: "#555",
  },

  red: {
    color: "#D9534F",
    fontWeight: "bold",
  },
});

const StaticInvoicePDF = ({ invoiceDetails }) => {
  if (!invoiceDetails) return <div>Loading PDF...</div>;
  <PDFViewer
    style={{
      width: "100vw",
      height: "100vh",
      border: "none",
    }}
  >
    <Document>
      <Page size="A4" style={styles.page}>
        {/* ✅ CONSTRAINED A4 CONTENT */}

        <View style={styles.container}>
          {/* HEADER */}
          {/* <Image src={bgImg} style={styles.bgImage} /> */}
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
            <Image src={btficon} style={styles.bgImage} />

            <View style={styles.tableHeader}>
              <Text>Description</Text>
              <Text>Amount AUD</Text>
            </View>

            {[
              { desc: "Stationery", amount: invoiceDetails.stationery },
              {
                desc: "Body Preparation",
                amount: invoiceDetails.bodyPreparation,
              },
              { desc: "Coffin", amount: invoiceDetails.coffin },
              { desc: "Flowers", amount: invoiceDetails.flowers },
              { desc: "Urn", amount: invoiceDetails.urn },
              {
                desc: "Urn Collection",
                amount: invoiceDetails.collectionOfUrn,
              },
            ].map((item, idx) => (
              <View style={styles.tableRow} key={idx}>
                <Text>{item.desc}</Text>
                <Text>${Number(item.amount).toFixed(2)}</Text>
              </View>
            ))}

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Amount Due AUD</Text>
              <Text style={styles.totalAmount}>
                ${Number(invoiceDetails.totalPrice || 0).toFixed(2)}
              </Text>
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
              Please use our invoice number{" "}
              <Text style={{ color: "red" }}>{invoiceDetails.reference}</Text>{" "}
              as your payment reference. We kindly ask that payment is made
              immediately to secure the funeral service date and time. Delays in
              full payment may cause rescheduling of services. Please contact us
              if you have any questions. Once paid, it would be appreciated if
              you could email your remittance to
              accounts@blacktulipfunerals.com.au Many thanks for your custom and
              understanding, Scott and the Black Tulip team
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  </PDFViewer>;
};

export default StaticInvoicePDF;

// import {

//   Document,
//   Image,
//   Page,
//   Text,
//   View,
//   PDFViewer,
// } from "@react-pdf/renderer";

// import { styles } from "../../assets/css/invoicePdf.js";
// import logo from "../pages/packages/invoicepdf/images/BTF Logo without BG 3.png";
// import bgImg from "../pages/packages/invoicepdf/images/Invoice pdf.jpg";
// const StaticInvoicePDF = () => (
//   <PDFViewer>
//     <Document>
//       <Page size="A4" style={styles.page}>
//         {/* ✅ CONSTRAINED A4 CONTENT */}
//         <View style={styles.container}>
//           {/* HEADER */}
//           <View style={styles.header}>
//             <Image src={logo} style={styles.logo} />

//             <View style={styles.headerRight}>
//               <Text>ABN: 84 678 068 687</Text>
//               <Text style={styles.invoiceTitle}>TAX INVOICE</Text>
//               <Text style={{ fontWeight: "bold" }}>OVANTA PTY LTD</Text>
//               <Text>25 Renown Avenue</Text>
//               <Text>Oatley NSW 2223</Text>
//             </View>
//           </View>

//           {/* BANKING + DETAILS */}
//           <View style={styles.rowBetween}>
//             <View style={styles.bankingBox}>
//               <Text style={styles.bankingTitle}>BANKING DETAILS</Text>
//               <Text>Commonwealth Bank</Text>
//               <Text style={{ fontWeight: "bold" }}>Black Tulip Funerals</Text>
//               <Text>BSB: 062-692</Text>
//               <Text>ACC: 7617 6113</Text>
//             </View>

//             <View style={styles.detailsBox}>
//               <View style={styles.detailRow}>
//                 <View style={styles.detailLeft}>
//                   <Text style={{ fontWeight: "bold" }}>CUSTOMER DETAILS</Text>
//                   <Text>Sarah Jenkins</Text>
//                   <Text>Next of Kin</Text>
//                 </View>
//                 <View style={styles.detailRight}>
//                   <Text style={{ fontWeight: "bold" }}>INVOICE NO</Text>
//                   <Text style={styles.red}>BTF9BB3252</Text>
//                 </View>
//               </View>

//               <View style={styles.detailRow}>
//                 <View style={styles.detailLeft}>
//                   <Text style={{ fontWeight: "bold" }}>REFERENCE</Text>
//                   <Text>Robert Jenkins</Text>
//                 </View>
//                 <View style={styles.detailRight}>
//                   <Text style={{ fontWeight: "bold" }}>DUE DATE</Text>
//                   <Text>17/01/2026</Text>
//                 </View>
//               </View>
//             </View>
//           </View>

//           {/* TABLE */}
//           <View style={styles.bgWrapper}>
//             <Image src={bgImg} style={styles.bgImage} />

//             <View style={styles.tableHeader}>
//               <Text>Description</Text>
//               <Text>Amount AUD</Text>
//             </View>

//             <View style={styles.tableRow}>
//               <Text>No Service Cremation</Text>
//               <Text>$2200.00</Text>
//             </View>

//             <View style={styles.tableRow}>
//               <Text>Scattering Urn</Text>
//               <Text>$0.00</Text>
//             </View>

//             <View style={styles.tableRow}>
//               <Text>Australia Post Registered Mail</Text>
//               <Text>$0.00</Text>
//             </View>

//             <View style={styles.spacer} />

//             <View style={styles.totalRow}>
//               <Text style={styles.totalLabel}>Amount Due AUD</Text>
//               <Text style={styles.totalAmount}>$2200.00</Text>
//             </View>
//           </View>

//           {/* FOOTER */}
//           <View style={styles.footer}>
//             <Text>
//               Please use invoice number{" "}
//               <Text style={styles.red}>BTF9BB3252</Text> as your payment
//               reference.
//             </Text>
//             <Text>
//               Once paid, email remittance to accounts@blacktulipfunerals.com.au
//             </Text>
//             <Text>Many thanks, Scott and the Black Tulip team.</Text>
//           </View>
//         </View>
//       </Page>
//     </Document>
//   </PDFViewer>
// );

// export default StaticInvoicePDF;
