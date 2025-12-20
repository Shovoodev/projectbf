import express, { Request, Response } from "express";
import PDFDocument from "pdfkit";

const router = express.Router();

router.post("/json-to-pdf", (req: Request, res: Response) => {
  const data: Record<string, unknown> = req.body; // JSON input

  const doc = new PDFDocument({ margin: 50 });

  // Set response headers
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=data.pdf");

  // Pipe PDF to response
  doc.pipe(res);

  // Title
  doc.fontSize(18).text("JSON to PDF Report", { align: "center" }).moveDown();

  // Convert JSON to readable text
  Object.entries(data).forEach(([key, value]) => {
    doc
      .fontSize(12)
      .text(`${key}: ${JSON.stringify(value)}`)
      .moveDown(0.5);
  });
  doc.end();
});

export default router;
