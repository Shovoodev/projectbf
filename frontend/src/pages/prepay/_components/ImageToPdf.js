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

  // A4 dimensions in mm
  const PAGE_WIDTH = 200;
  const PAGE_HEIGHT = 280;

  for (let i = 0; i < images.length; i++) {
    const img = images[i];

    if (i !== 0) pdf.addPage();

    // Get image dimensions
    const imgWidth = pdf.getImageProperties(img).width;
    const imgHeight = pdf.getImageProperties(img).height;

    // Calculate aspect ratios
    const pageRatio = PAGE_WIDTH / PAGE_HEIGHT;
    const imgRatio = imgWidth / imgHeight;

    let finalWidth, finalHeight, x, y;

    if (imgRatio > pageRatio) {
      // Image is wider than page
      finalWidth = PAGE_WIDTH;
      finalHeight = PAGE_WIDTH / imgRatio;
      x = 0;
      y = (PAGE_HEIGHT - finalHeight) / 2;
    } else {
      // Image is taller than page
      finalHeight = PAGE_HEIGHT;
      finalWidth = PAGE_HEIGHT * imgRatio;
      x = (PAGE_WIDTH - finalWidth) / 2;
      y = 0;
    }

    // Fill page (centered, maintaining aspect ratio)
    pdf.addImage(img, "JPEG", x, y, finalWidth, finalHeight, "", "FAST");
  }

  return pdf.output("blob");
};
