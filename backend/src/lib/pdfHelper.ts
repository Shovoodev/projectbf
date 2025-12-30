import PDFDocument from "pdfkit";

export const addSection = (
  doc: PDFKit.PDFDocument,
  title: string,
  data: any
) => {
  doc.moveDown().fontSize(14).text(title, { underline: true }).moveDown(0.5);

  if (!data) {
    doc.fontSize(12).text("No data available").moveDown();
    return;
  }

  if (Array.isArray(data)) {
    data.forEach((item, index) => {
      doc
        .fontSize(12)
        .text(`${index + 1}. ${JSON.stringify(item)}`)
        .moveDown(0.3);
    });
  } else {
    Object.entries(data).forEach(([key, value]) => {
      doc.fontSize(12).text(`${key}: ${value}`).moveDown(0.3);
    });
  }
};
