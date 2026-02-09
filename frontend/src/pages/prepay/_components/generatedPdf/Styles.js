import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  // ===============================
  // BASE
  // ===============================
  p: {
    fontSize: 12,
    lineHeight: 1.6,
    marginBottom: 16,
    color: "#3129A6",
  },

  // ===============================
  // UTILITIES
  // ===============================
  textPdfPrimary: { color: "#3129A6" },
  textPdfAccent: { color: "#00A99D" },

  // ===============================
  // ROOT LAYOUT
  // ===============================
  formContainerBase: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 18,
  },

  formHeaderArea: {
    backgroundColor: "#F8FAFC",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },

  // ===============================
  // TYPOGRAPHY
  // ===============================

  // ===============================
  // INPUT-LIKE BOXES
  // ===============================
  pdfInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 4,
  },

  pdfInputReadonly: {
    backgroundColor: "#F8FAFC",
    fontWeight: 700,
  },

  pdfAdviserRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },

  pdfAdviserLabel: {
    fontSize: 14,
    fontWeight: 500,
    color: "#3129A6",
    minWidth: 180,
  },

  // ===============================
  // RADIO GROUPS (NO GAP)
  // ===============================

  // Instead of styling checkbox as a box with border shorthand
  pdfRadioBox: {
    fontSize: 25,
    marginRight: 6,
    color: "#3129A6",
  },

  pdfRadioText: {
    fontSize: 12,
    color: "#3129A6",
  },

  radioBox: {
  width: 12,
  height: 12,
  borderWidth: 1,
  borderColor: "#000",
  justifyContent: "center",
  alignItems: "center",
},

radioBoxChecked: {
  width: 8,
  height: 8,
  backgroundColor: "#000",
},
  // ===============================
  // FOOTER
  // ===============================

  // ===============================
  // TABLES (use borderWidth/borderColor)
  // ===============================
  pdfTableWrapper: { width: "100%" },

  pdfTable: {
    width: "100%",
    marginTop: 16,
    fontSize: 12,
  },

  pdfTableTh: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 4,
    paddingRight: 4,
    textAlign: "left",
    fontWeight: 700,
    color: "#00A99D",
  },

  pdfTableTd: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 4,
    paddingRight: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#00A99D",
    color: "#3129A6",
  },

  pdfTableTrHighlight: {
    backgroundColor: "#00A99D",
    color: "#FFFFFF",
    fontWeight: 700,
  },

  // ===============================
  // GRID (avoid % marginRight)
  // ===============================
  pdfAspGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
  },

  gridColumn: {
    width: "48%",
    marginRight: 8, // ✅ numeric instead of "2%"
  },

  // ===============================
  // DECLARATION
  // ===============================
  pdfDeclarationList: { marginTop: 4, marginBottom: 4 },

  pdfDeclarationItem: { flexDirection: "row", alignItems: "center" },

  pdfDeclarationText: {
    fontSize: 10,
    lineHeight: 1.6,
    color: "#3129A6",
  },

  // ===============================
  // SIGNATURE
  // ===============================
  pdfSignatureZone: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#D1D5DB",
    borderStyle: "dashed",
    borderRadius: 8,
    padding: 24,
    backgroundColor: "#F8FAFC",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  pdfUploadBtn: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 6,
    paddingBottom: 6,
    borderRadius: 4,
    fontSize: 14,
    fontWeight: 700,
    color: "#3129A6",
  },

  // ===============================
  // MISC
  // ===============================
  pdfHr: {
    borderTopWidth: 1,
    borderTopColor: "rgba(30, 58, 138, 0.2)",
    marginTop: 24,
    marginBottom: 24,
  },

  pdfInstructionBold: {
    fontSize: 14,
    fontWeight: 700,
    lineHeight: 1.6,
    marginBottom: 8,
    color: "#3129A6",
  },

  pdfLegalList: {
    paddingLeft: 16,
    marginTop: 4,
  },

  // ⚠️ remove `gap`, simulate with marginRight
  pdfLegalListItem: {
    flexDirection: "row",
    fontSize: 14,
    lineHeight: 1.6,
    color: "#374151",
  },

  pdfLegalLetter: {
    fontWeight: 700,
    fontStyle: "italic",
    minWidth: 15,
    color: "#3129A6",
    marginRight: 4,
  },

  pdfAgreementH3: {
    fontWeight: 700,
    marginBottom: 4,
    fontSize: 18,
    color: "#3129A6",
  },

  // ===============================
  // LAYOUT HELPERS
  // ===============================
  flexRow: { flexDirection: "row" },
  flexCol: { flexDirection: "column" },
  flexWrap: { flexWrap: "wrap" },
  itemsCenter: { alignItems: "center" },
  justifyBetween: { justifyContent: "space-between" },
  wFull: { width: "100%" },

  mb4: { marginBottom: 16 },
  mb2: { marginBottom: 8 },
  mb1: { marginBottom: 4 },
  mt4: { marginTop: 16 },
  mt2: { marginTop: 8 },
  mt1: { marginTop: 4 },

  px4: { paddingLeft: 16, paddingRight: 16 },
  py2: { paddingTop: 8, paddingBottom: 8 },

  // ===============================
  // PAGE HEADER (Slip 32)
  // ===============================
page: { padding: 18 },


  noteBox: {
    backgroundColor: "#FEF3C7",
    borderWidth: 1,
    borderColor: "#F59E0B",
    padding: 16,
    borderRadius: 6,
    marginTop: 32,
  },

  highlightText: {
    color: "#00A99D",
    fontWeight: 700,
  },

  paragraph: {
    fontSize: 12,
    lineHeight: 1.6,
    color: "#3129A6",
  },

mainHeader: { marginBottom: 10 }, // was 20

title: { fontSize: 20, fontWeight: 700, color: "#3129A6", textAlign: "left" }, // was 24
subtitle: { fontSize: 14, fontWeight: 400, color: "#3129A6", textAlign: "left", textTransform: "uppercase", marginTop: 2 }, // was 18 + mt 4

pdfIntroP: { fontSize: 11, lineHeight: 1.35, marginBottom: 8, color: "#3129A6" }, // was 14 + mb 16
pdfLabel: { fontSize: 11, fontWeight: 700, marginBottom: 2, color: "#3129A6" }, // was 14 + mb4

pdfH2: { fontSize: 14, fontWeight: 700, color: "#00A99D", marginTop: 6, marginBottom: 6 }, // add tighter spacing
pdfSectionTitle: { fontSize: 13, fontWeight: 700, marginTop: 6, marginBottom: 4, color: "#3129A6" }, // was 18

pdfHighlightBox: {
  backgroundColor: "#F0F9FF",
  borderWidth: 1,
  borderColor: "#3B82F6",
  padding: 10,     // was 16
  borderRadius: 6,
  marginBottom: 10 // was 16
},

// radio group tighter
pdfRadioGroup: {
  flexDirection: "row",
  flexWrap: "wrap",
  padding: 6,      // was 8
  backgroundColor: "#F8FAFC",
  borderRadius: 6,
  borderWidth: 1,
  borderColor: "#F1F5F9",
},

pdfRadioItem: {
  flexDirection: "row",
  alignItems: "center",
  marginRight: 10,  // was 14
  marginBottom: 4,  // was 6
},

// Footer: reduce huge top gap
pdfFooter: {
  marginTop: 14,     
  paddingTop: 4,
  borderTopWidth: 1,
  borderTopColor: "#E2E8F0",
  flexDirection: "row",
  justifyContent: "space-between",
  fontSize: 9,
  color: "#9CA3AF",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: 1,
},
});

export default styles;
