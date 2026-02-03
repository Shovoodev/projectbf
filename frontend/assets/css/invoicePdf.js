import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    paddingVertical: 40,
  },

  /* 🔥 A4 CONTENT CONTAINER */
  container: {
    width: 515, // PERFECT for A4
    height: 794,
    marginHorizontal: "auto",
    fontSize: 11,

    color: "#222",
  },
  bgImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
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

  //   bgWrapper: {
  //     position: "relative",
  //     padding: 20,
  //   },

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
    paddingHorizontal: 100,
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
