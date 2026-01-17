// import { jsPDF } from "jspdf";

// export const generatePdfBlob = async (images) => {
//   const pdf = new jsPDF();

//   for (let i = 0; i < images.length; i++) {
//     const imgData = await loadImage(images[i]);

//     if (i !== 0) pdf.addPage();

//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (imgData.height * pdfWidth) / imgData.width;

//     pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
//   }

//   return pdf.output("blob");
// };

// const loadImage = (src) =>
//   new Promise((resolve, reject) => {
//     const img = new Image();
//     img.crossOrigin = "anonymous"; // IMPORTANT
//     img.onload = () => resolve(img);
//     img.onerror = reject;
//     img.src = src;
//   });

// ImageToPdf.js
import jsPDF from "jspdf";

export const generatePdfBlob = async (images) => {
  const pdf = new jsPDF("p", "mm", "a4");

  for (let i = 0; i < images.length; i++) {
    const img = images[i];

    if (i !== 0) pdf.addPage();

    pdf.addImage(img, 'JPEG', 15, 15, 180, 0, '', 'SLOW');
  }

  return pdf.output("blob");
};
