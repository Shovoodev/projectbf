import express, { Request, Response } from "express";
import PDFDocument from "pdfkit";
import { getKinByUserId } from "../db/kinDetails";
import { getDeceasedByUserId } from "../db/deceasedPerson";
import { getAttendenceByUserId } from "../db/attendence";

const router = express.Router();

// router.get("/report/:userId/pdf",

export const pdfController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const attendance = await getAttendenceByUserId(userId);
    const kin = await getKinByUserId(userId);
    const deceased = await getDeceasedByUserId(userId);
    const reportData = {
      userId,
      attendance,
      kin,
      deceased,
    };
    console.log(reportData);
    // 3️⃣ Create PDF
    const doc = new PDFDocument({ margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=report-${userId}.pdf`
    );

    doc.pipe(res);

    const sectionTitle = (doc: PDFKit.PDFDocument, title: string) => {
      doc.fontSize(14).text(title, { underline: true }).moveDown(0.5);
    };

    const keyValue = (doc: PDFKit.PDFDocument, key: string, value: any) => {
      doc.fontSize(11).text(`${key}: ${value ?? "N/A"}`);
    };

    const drawDivider = (doc: PDFKit.PDFDocument) => {
      doc.moveDown();
      doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(50, doc.y)
        .lineTo(550, doc.y)
        .stroke();
      doc.moveDown();
    };

    doc
      .fontSize(20)
      .text("User Attendance Report", { align: "center" })
      .moveDown();

    doc
      .fontSize(12)
      .text(`User ID: ${userId}`)
      .text(`Reference / Invoice ID: ${attendance.reference}`)
      .text(`Email: ${attendance.email}`)
      .text(`Status: ${attendance.status}`)
      .moveDown();

    drawDivider(doc);

    sectionTitle(doc, "Attendance Summary");

    doc
      .fontSize(12)
      .text(`Total Price: €${attendance.totalPrice}`)
      .text(`Created At: ${new Date(attendance.createdAt).toLocaleString()}`)
      .moveDown();

    /* =========================
     RESPONSES
  ========================= */
    sectionTitle(doc, "Responses");

    if (attendance.responses?.length) {
      attendance.responses.forEach((r: any, index: number) => {
        doc
          .fontSize(11)
          .text(`${index + 1}. Question ID: ${r.questionId ?? "N/A"}`)
          .text(`   Answer: ${r.answer ?? "N/A"}`)
          .moveDown(0.5);
      });
    } else {
      doc.fontSize(11).text("No responses available").moveDown();
    }

    drawDivider(doc);

    sectionTitle(doc, "Kin Details");

    keyValue(doc, "Name", `${kin.salutation} ${kin.givenName} ${kin.surname}`);
    keyValue(doc, "Relation", kin.relation);
    keyValue(doc, "Mobile", kin.mobile);
    keyValue(doc, "Address", kin.currentAddress);

    drawDivider(doc);

    /* =========================
       DECEASED DETAILS
    ========================= */
    sectionTitle(doc, "Deceased Details");

    keyValue(
      doc,
      "Name",
      `${deceased.salutation} ${deceased.givenName} ${deceased.surname}`
    );
    keyValue(doc, "Date of Death", deceased.dateOfDeath);
    keyValue(doc, "Address", deceased.address);
    keyValue(doc, "Reason", deceased.deceasedPassedReason);
    keyValue(doc, "Current Location", deceased.deceasedNow);
    keyValue(doc, "Battery Powered Devices", deceased.batterypowereddevices);
    keyValue(doc, "Regular Doctor Address", deceased.regulardoctoraddress);

    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to generate PDF" });
  }
};

export default router;
