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

    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 15;

    const maxWidth = pageWidth - margin * 2;
    const maxHeight = pageHeight - margin * 2;

    const imgProps = pdf.getImageProperties(img);
    const imgWidth = imgProps.width;
    const imgHeight = imgProps.height;

    const widthRatio = maxWidth / imgWidth;
    const heightRatio = maxHeight / imgHeight;
    const scale = Math.min(widthRatio, heightRatio);

    const renderWidth = imgWidth * scale;
    const renderHeight = imgHeight * scale;
    const x = (pageWidth - renderWidth) / 2;
    const y = (pageHeight - renderHeight) / 2;

    pdf.addImage(img, "JPEG", x, y, renderWidth, renderHeight, "", "SLOW");

    // pdf.addImage(
    //   img,
    //   "JPEG",
    //   margin,
    //   margin,
    //   renderWidth,
    //   renderHeight,
    //   "",
    //   "SLOW",
    // );
  }

  return pdf.output("blob");
};
